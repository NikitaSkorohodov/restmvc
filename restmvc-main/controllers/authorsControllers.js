const Author = require("../models/authors");

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const author = {
        name: req.body.name,
    };

    Author.create(author)
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
    Author.findAll()
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
    const authorId = req.params.id;

    if (!authorId) {
        res.status(400).send({
            message: "Author ID is required."
        });
        return;
    }

    // Извлечение автора из базы данных по его идентификатору
    Author.findByPk(authorId)
        .then(author => {
            if (!author) {
                res.status(404).send({
                    message: `Author with ID ${authorId} not found.`
                });
            } else {
                // Обновление данных автора на основе данных из запроса
                author.name = req.body.name || author.name;

                // Сохранение обновленных данных в базе данных
                author.save()
                    .then(() => {
                        res.send({
                            message: `Author with ID ${authorId} has been updated successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while updating the author."
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
    const authorId = req.params.id;

    if (!authorId) {
        res.status(400).send({
            message: "Author ID is required."
        });
        return;
    }

    // Ищем автора по идентификатору
    Author.findByPk(authorId)
        .then(author => {
            if (!author) {
                res.status(404).send({
                    message: `Author with ID ${authorId} not found.`
                });
            } else {
                // Удаляем автора из базы данных
                author.destroy()
                    .then(() => {
                        res.send({
                            message: `Author with ID ${authorId} has been deleted successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while deleting the author."
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
