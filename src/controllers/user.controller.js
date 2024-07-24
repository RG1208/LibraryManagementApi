import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { generateAccessAndRefreshToken } from "../utils/AccessRefreshToken.js";

// Register User
const registerUser = asyncHandler(async (req, res) => {
    // 1. get input from user
    // 2. check for no empty fields
    // 3. check weather the user already exists or not
    // 4. create user object, create entry in db
    // 5.remove password and refresh token from response
    // 6.check wheter the user is now created or not
    // 7.return response

    // getting input from user
    const { email, username, password, role } = req.body

    // checking for no empty fields
    if (email === "") {
        throw new ApiError(400, "Email is mandatory")
    }
    else if (username === "") {
        throw new ApiError(400, "Username is mandatory")
    }
    else if (password === "") {
        throw new ApiError(400, "Password is Mandatory")
    }
    else if (role === "") {
        throw new ApiError(400, "role is mandatory")
    }

    // check weather the user already exists or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User already exists with this username or email")
    }

    // create user object, create entry in db
    const user = await User.create({
        role,
        password,
        email,
        username
    })

    // remove password and refresh token from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    // check wheter the user is now created or not
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully ")
    )
})

// Login User
const loginUser = asyncHandler(async (req, res) => {
    // 1.fetch data from req.body
    // 2.check for no empty fields
    // 3.find the user
    // 4.check whether the password is correct or not 
    // 5.generate access and refresh token
    // 6.cookie

    // fetch data from req.body
    const { email, password, username } = req.body

    // check for no empty fields
    if (email === "") {
        throw new ApiError(400, "Email is mandatory")
    }
    else if (username === "") {
        throw new ApiError(400, "Username is mandatory")
    }
    else if (password === "") {
        throw new ApiError(400, "Password is Mandatory")
    }

    // find the user
    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    // check whether the password is correct or not 
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Password")
    }
    // generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    // cookie
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User LoggedIn Successfully"
            )
        )



})

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined// this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out Successfully"))
})

// Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.send(req.user);
})

// Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                email,
                password: await bcrypt.hash(password, 10)
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))

})

// Deleting user 
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            throw new ApiError(400, "invalid user id")
        }
        return res
            .status(200)
            .json(new ApiResponse(200, user, "User Successfully deleted"))
    } catch (error) {
        throw new ApiError(400, "Cannot delete user")
    }
});

export { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, deleteUser }