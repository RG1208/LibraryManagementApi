import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/users.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request received")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        console.error("JWT Verification Error:", error);
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})


export const adminMiddleware = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user?._id);

    if (!user)
        throw new ApiError(404, "User not Found")
    if (user.role !== 'admin')
        throw new ApiError(400, "Admin access required")
    next();
})
