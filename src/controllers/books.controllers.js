import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Book } from "../models/books.models.js";
import { ApiResponse } from "../utils/ApiResponse.js"



// create Book
const addBook = asyncHandler(async (req, res) => {
    // 1. get input from user
    // 2. check for no empty fields
    // 3. check weather the book already exists or not (with title)
    // 4. create book object, create entry in db
    // 5.check wheter the book is now created or not
    // 6.return response

    // get input from user
    const { title, author, genre, publicationDate, availableCopies } = req.body

    // check for no empty fields
    if (title === "") {
        throw new ApiError(400, "Email is mandatory")
    }
    else if (author === "") {
        throw new ApiError(400, "Username is mandatory")
    }
    else if (genre === "") {
        throw new ApiError(400, "Password is Mandatory")
    }
    else if (publicationDate === "") {
        throw new ApiError(400, "role is mandatory")
    }
    else if (availableCopies === "") {
        throw new ApiError(400, "role is mandatory")
    }

    // check weather the book already exists or not (with title)
    const existedBook = await Book.findOne({
        $or: [{ title }]
    })
    if (existedBook) {
        throw new ApiError(409, "Book already exists with this title")
    }

    // create book object, create entry in db
    const book = await Book.create({
        title,
        author,
        genre,
        publicationDate,
        availableCopies
    })

    // check wheter the user is now created or not
    const createdBook = await Book.findById(book._id)
    if (!createdBook) {
        throw new ApiError(400, "Something went wrong while creating a new book")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdBook, "Book created Successfully ")
    )
})

export { addBook }