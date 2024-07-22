import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }
})

export const User = mongoose.model("User", userSchema)