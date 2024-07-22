import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/users.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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

export { registerUser }