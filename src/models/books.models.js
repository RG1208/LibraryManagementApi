import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    genre: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true
    }
})

export const Book = mongoose.model("Book", bookSchema)