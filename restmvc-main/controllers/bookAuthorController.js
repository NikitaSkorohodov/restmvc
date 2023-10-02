const BookAuthor = require("../models/bookauthor");

// Метод для получения всех идентификаторов связей между книгами и авторами
exports.getAllBookAuthorIds = async (req, res) => {
  try {
    const bookAuthorIds = await BookAuthor.findAll({
      attributes: ["BookId", "AuthorId"], // Выбираем только идентификаторы
    });

    res.json(bookAuthorIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Метод для создания связи между книгой и автором
exports.create = async (req, res) => {
  try {
    const { BookId, AuthorId } = req.body;

    if (!BookId || !AuthorId) {
      return res.status(400).json({ message: "Both BookId and AuthorId are required." });
    }

    const existingRelation = await BookAuthor.findOne({ where: { BookId, AuthorId } });

    if (existingRelation) {
      return res.status(400).json({ message: "Relation already exists." });
    }

    const newRelation = await BookAuthor.create({ BookId, AuthorId });

    res.json(newRelation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Метод для обновления автора книги
exports.updateAuthor = async (req, res) => {
    try {
      const { BookId, AuthorId } = req.body;
  
      if (!BookId || !AuthorId || !Array.isArray(AuthorId)) {
        return res.status(400).json({ message: "Invalid request body." });
      }
  
      // Удаляем старые связи книги с категориями
      await BookAuthor.destroy({ where: { BookId } });
  
      // Создаем новые связи книги с категориями
      const newRelations = AuthorId.map(AuthorId => ({ BookId, AuthorId }));
      await BookAuthor.bulkCreate(newRelations);
  
      res.json({ message: "Relations updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Метод для удаления связи между книгой и автором
exports.deleteRelation = async (req, res) => {
  try {
    const { BookId, AuthorId } = req.body;

    if (!BookId || !AuthorId) {
      return res.status(400).json({ message: "Both BookId and AuthorId are required." });
    }

    const existingRelation = await BookAuthor.findOne({ where: { BookId, AuthorId } });

    if (!existingRelation) {
      return res.status(404).json({ message: "Relation not found." });
    }

    await existingRelation.destroy(); // Удаляем связь

    res.json({ message: "Relation deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
