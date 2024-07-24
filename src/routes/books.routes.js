import { Router } from "express";
import { createBook, getBooks, getBookProfile, updateBook, deleteBook } from "../controllers/books.controllers.js";


const router = Router()

router.route("/register").post(createBook)
router.route("/getBooks").get(getBooks)
router.route("/:id").get(getBookProfile)
router.route("/:id").put(updateBook)
router.route("/:id").delete(deleteBook)

export default router
