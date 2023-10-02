const Book = require("../models/books");
const { Sequelize } = require('sequelize');
const BookAuthor = require("../models/bookauthor");
const Author = require("../models/authors");
const Category = require("../models/categories");
const BookCategory = require("../models/bookcategory");

exports.create = (req, res) => {
    if (!req.body.title || !req.body.isbn) {
        res.status(400).send({
            message: "Title and ISBN are required fields!"
        });
        return;
    }

    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        publishedDate: req.body.publishedDate,
        thumbnailUrl: req.body.thumbnailUrl,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        status: req.body.status,

    };

    Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

exports.findAll = (req, res) => {
    Book.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
exports.update = (req, res) => {
    const bookId = req.params.id;

    if (!bookId) {
        res.status(400).send({
            message: "Book ID is required."
        });
        return;
    }

    Book.findByPk(bookId)
        .then(book => {
            if (!book) {
                res.status(404).send({
                    message: `Book with ID ${bookId} not found.`
                });
            } else {
            
                book.title = req.body.title || book.title;
                book.isbn = req.body.isbn || book.isbn;
                book.pageCount = req.body.pageCount || book.pageCount;
                book.publishedDate = req.body.publishedDate || book.publishedDate;
                book.thumbnailUrl = req.body.thumbnailUrl || book.thumbnailUrl;
                book.shortDescription = req.body.shortDescription || book.shortDescription;
                book.longDescription = req.body.longDescription || book.longDescription;
                book.status = req.body.status || book.status;

                book.save()
                    .then(() => {
                        res.send({
                            message: `Book with ID ${bookId} has been updated successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while updating the book."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
exports.delete = (req, res) => {
    const bookId = req.params.id;

    if (!bookId) {
        res.status(400).send({
            message: "Book ID is required."
        });
        return;
    }

    // Ищем книгу по идентификатору
    Book.findByPk(bookId)
        .then(book => {
            if (!book) {
                res.status(404).send({
                    message: `Book with ID ${bookId} not found.`
                });
            } else {
                // Удаляем книгу из базы данных
                book.destroy()
                    .then(() => {
                        res.send({
                            message: `Book with ID ${bookId} has been deleted successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while deleting the book."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
exports.searchByTitle = (req, res) => {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm) {
        res.status(400).send({
            message: "Search term is required."
        });
        return;
    }

    // Используем оператор LIKE для поиска книг по названию, содержащему searchTerm
    Book.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: `%${searchTerm}%`
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
exports.findByAuthorName = (req, res) => {
    const authorName = req.params.name;

    if (!authorName) {
        res.status(400).send({
            message: "Author name is required."
        });
        return;
    }

    // Используйте модель `Author` для нахождения автора по его имени
    Author.findOne({
        where: {
            name: authorName
        }
    })
    .then(authorData => {
        if (!authorData) {
            res.status(404).send({
                message: `Author with name '${authorName}' not found.`
            });
            return;
        }

        // Теперь найдите связанные с автором книги
        BookAuthor.findAll({
            where: {
                AuthorId: authorData.id
            }
        })
        .then(bookAuthorData => {
            // Извлеките ID книг из результата
            const bookIds = bookAuthorData.map(item => item.BookId);

            // Теперь найдите сами книги по их ID
            Book.findAll({
                where: {
                    id: bookIds
                }
            })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    });
};
exports.findByCategory = (req, res) => {
    const categoryName = req.params.name;

    if (!categoryName) {
        res.status(400).send({
            message: "Category name is required."
        });
        return;
    }

    // Используйте модель `Category` для нахождения категории по ее имени
    Category.findOne({
        where: {
            name: categoryName
        }
    })
    .then(categoryData => {
        if (!categoryData) {
            res.status(404).send({
                message: `Category with name '${categoryName}' not found.`
            });
            return;
        }

        // Теперь найдите связанные с категорией книги
        BookCategory.findAll({
            where: {
                CategoryId: categoryData.id
            }
        })
        .then(bookCategoryData => {
            // Извлеките ID книг из результата
            const bookIds = bookCategoryData.map(item => item.BookId);

            // Теперь найдите сами книги по их ID
            Book.findAll({
                where: {
                    id: bookIds
                }
            })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred."
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    });
};
