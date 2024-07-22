import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            index: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        avatar: {
            type: String, //Cloudinary URL
            required: true
        },
        coverImage: {
            type: String
        },
        watchHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }

    },
    { timestamps: true })



export const User = mongoose.model("User", userSchema)

