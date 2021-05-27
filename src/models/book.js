const mongoose = require('mongoose')
//create schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    purchaseCount: Number,
    category: String,
    tags: Array,
    imageUrl: String
});
//define a model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;