import mongoose from "mongoose";
const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        }
    },
    { timestamps: true })

export const Author = mongoose.model("Author", authorSchema)