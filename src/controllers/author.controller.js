import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Author } from "../models/author.models.js";
import { ApiResponse } from "../utils/ApiResponse.js"


// Add new Author
const registerAuthor = asyncHandler(async (req, res) => {
    // 1. get input from user
    // 2. check for no empty fields
    // 3. check weather the author already exists or not (by name and DOB)
    // 4. create user object, create entry in db
    // 5.check wheter the author is now created or not
    // 6.return response

    // get input from user
    const { name, nationality, birthDate } = req.body

    // checking for no empty fields
    if (name === "") {
        throw new ApiError(400, "Email is mandatory")
    }
    else if (nationality === "") {
        throw new ApiError(400, "Username is mandatory")
    }
    else if (birthDate === "") {
        throw new ApiError(400, "Password is Mandatory")
    }

    // check weather the author already exists or not (by name and DOB)
    const existedAuthor = await Author.findOne({
        $and: [{ birthDate }, { name }]
    })

    if (existedAuthor) {
        throw new ApiError(400, "Author already exists with this DOB and Name")
    }

    // create user object, create entry in db
    const author = await Author.create({
        birthDate,
        nationality,
        name
    })

    // check wheter the author is now created or not
    const createdAuthor = await Author.findById(author._id)

    if (!createdAuthor) {
        throw new ApiError(500, "Something went wrong while registering the Author")
    }


    // return response
    return res.status(201).json(
        new ApiResponse(200, createdAuthor, "Author registered Successfully ")
    )
})

// Get list of all the Authors
const getAuthors = asyncHandler(async (req, res) => {
    try {
        const authors = await Author.find();
        return res.status(201).json(
            new ApiResponse(200, authors, "List of all the Authors fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Failed to fetch Authors")
    }
});

// get a particular author
const getUserProfile = asyncHandler(async (req, res) => {
    // const author = await Author.findById(req.params.id);
    // if (!author) {
    //     throw new ApiError(400, "invalid author id")
    // }
    res.send(req.author)

})

// Update Author Details
const updateAuthorProfile = asyncHandler(async (req, res) => {
    const { name, nationality, birthDate } = req.body

    const author = await Author.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                name,
                nationality,
                birthDate
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, author, "Account details updated successfully"))

})

// Deleting user 
const deleteAuthor = asyncHandler(async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            throw new ApiError(400, "invalid author id")
        }
        return res
            .status(200)
            .json(new ApiResponse(200, author, "author Successfully deleted"))
    } catch (error) {
        throw new ApiError(400, "Cannot delete author")
    }
});
export { registerAuthor, getAuthors, getUserProfile, updateAuthorProfile, deleteAuthor }