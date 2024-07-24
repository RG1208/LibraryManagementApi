import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Book } from "../models/books.models.js";
import { Author } from "../models/author.models.js";
import { ApiResponse } from "../utils/ApiResponse.js"

// create Book
const createBook = asyncHandler(async (req, res) => {
    try {
        const author = await Author.findOne({ name: req.body.author });
        if (!author) {
            throw new ApiError(400, "Author Not Found")
        }

        const book = new Book({
            title: req.body.title,
            author: author._id,
            genre: req.body.genre,
            publicationDate: req.body.publicationDate,
            availableCopies: req.body.availableCopies
        });

        await book.save();

        return res
            .status(200)
            .json(new ApiResponse(200, book, "Successfully Created Book"))

    } catch (error) {
        throw new ApiError(400, "Failed to create a Book")
    }


});

// Get list of all the Books
const getBooks = asyncHandler(async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books)

    } catch (error) {
        throw new ApiError(500, "Failed to fetch Books")
    }
});

// get a particular Book
const getBookProfile = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new ApiError(400, "invalid Book id")
    }
    res.send(book)

})

// Update Book Details
const updateBook = asyncHandler(async (req, res) => {
    const { title, author, genre, publicationDate, availableCopies } = req.body

    const book = await Book.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                title,
                author,
                genre,
                publicationDate,
                availableCopies
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, book, "Book details updated successfully"))

})

// Deleting user 
const deleteBook = asyncHandler(async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            throw new ApiError(400, "invalid book id")
        }
        return res
            .status(200)
            .json(new ApiResponse(200, book, "Book Successfully deleted"))
    } catch (error) {
        throw new ApiError(400, "Cannot delete book")
    }
});



export { createBook, getBooks, getBookProfile, updateBook, deleteBook }

//     // 1. get input from user
//     // 2. check for no empty fields
//     // 3. check weather the book already exists or not (with title)
//     // 4. create book object, create entry in db
//     // 5.check wheter the book is now created or not
//     // 6.return response

//     // get input from user
//     const { title, author, genre, publicationDate, availableCopies } = req.body

//     // check for no empty fields
//     if (title === "") {
//         throw new ApiError(400, "Title is mandatory")
//     }
//     else if (author === "") {
//         throw new ApiError(400, "author is mandatory")
//     }
//     else if (genre === "") {
//         throw new ApiError(400, "genre is Mandatory")
//     }
//     else if (publicationDate === "") {
//         throw new ApiError(400, "Publication Date is mandatory")
//     }
//     else if (availableCopies === "") {
//         throw new ApiError(400, "Available copies are mandatory")
//     }

//     // check weather the book already exists or not (with title)
//     const existedBook = await Book.findOne({
//         $or: [{ title }]
//     })
//     if (existedBook) {
//         throw new ApiError(409, "Book already exists with this title")
//     }

//     // create book object, create entry in db
//     const book = await Book.create({
//         title,
//         author,
//         genre,
//         publicationDate,
//         availableCopies
//     })

//     // check wheter the user is now created or not
//     const createdBook = await Book.findById(book._id)
//     if (!createdBook) {
//         throw new ApiError(400, "Something went wrong while creating a new book")
//     }

//     // return response
//     return res.status(201).json(
//         new ApiResponse(200, createdBook, "Book created Successfully ")
//     )
// })


















// 