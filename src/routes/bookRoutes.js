const express = require('express');
//calling an instance of router
const router = express.Router();
const BookCtrl = require('../controllers/bookControllers')
// POST request to /books to create a new book
router.post('/books', BookCtrl.createNewBook)
// GET request to /books to fetch all books
router.get('/books', BookCtrl.fetchAllBooks)
// GET request to /books/:id to fetch a single book
router.get('/books/:id', BookCtrl.fetchSingleBook)
// PUT request to /books/:id to update single book
router.put('/books/:id', BookCtrl.updateSingleBook)
// DELETE request to /books/:id to destroy a book
router.delete('/books/:id', BookCtrl.deleteSingleBook)
module.exports = router;