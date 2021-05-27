const Book = require('../models/book');
exports.createNewBook = (req, res) => {
    // const { book } = req.body;
    Book.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        purchaseCount: req.body.purchaseCount,
        category: req.body.category,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl
    }, (err, newBook) => {
        if (err) {
            return res.status(500).json({ message: 'an error occurred', err })
        } else {
            return res.status(200).json({ message: 'new book created', newBook })
        }
    })
};

exports.fetchAllBooks = (req, res) => {
    Book.find({}, (err, books) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else {
            return res.status(200).json({ books })
        }
    })
}

exports.fetchSingleBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
        else if (!book) {
            return res.status(404).json({ message: 'book not found' })
        }
        else {
            return res.status(200).json({ book })
        }
    })
}

exports.updateSingleBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: req.body.category
    }, (err, book) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
        else if (!book) {
            return res.status(404).json({ message: 'book not found' })
        }
        else {
            book.save((err, savedBook) => {
                if (err) {
                    return res.status(400).json({ message: err })
                } else {
                    return res.status(200).json({ message: "book updated successfully" })
                }
            })
        }
    })
}

exports.deleteSingleBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else if (!book) {
            return res.status(404).json({ message: 'book not found' })
        } else {
            return res.status(200).json({ message: "book deleted" })
        }
    })
}