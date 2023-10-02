/**
 * @swagger
 * tags:
 *   name: BookAuthors
 *   description: API endpoints for managing book authors.
 */

module.exports = (app) => {
    const bookAuthorController = require("../controllers/bookAuthorController");
    const router = require("express").Router();
  
    /**
     * @swagger
     * /api/bookauthors:
     *   get:
     *     summary: Get all book author IDs
     *     tags: [BookAuthors]
     *     responses:
     *       '200':
     *         description: Successfully retrieved all book author IDs.
     *       '500':
     *         description: Internal server error.
     */
    router.get("/", bookAuthorController.getAllBookAuthorIds);
  
    /**
     * @swagger
     * /api/bookauthors:
     *   post:
     *     summary: Create a new book author relation
     *     tags: [BookAuthors]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               BookId:
     *                 type: integer
     *                 description: The ID of the book.
     *               AuthorId:
     *                 type: integer
     *                 description: The ID of the author.
     *     responses:
     *       '200':
     *         description: Successfully created a new book author relation.
     *       '400':
     *         description: Bad request. Missing required fields or relation already exists.
     *       '500':
     *         description: Internal server error.
     */
    router.post("/", bookAuthorController.create);
  
   
    /**
     * @swagger
     * /api/bookauthors:
     *   put:
     *     summary: Update author of a book
     *     tags: [BookAuthors]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               BookId:
     *                 type: integer
     *                 description: The ID of the book.
     *               AuthorId:
     *                 type: integer
     *                 description: The ID of the new author.
     *     responses:
     *       '200':
     *         description: Successfully updated author of the book.
     *       '400':
     *         description: Bad request. Missing required fields or relation not found.
     *       '500':
     *         description: Internal server error.
     */
    router.put("/", bookAuthorController.updateAuthor);

  
    /**
     * @swagger
     * /api/bookauthors:
     *   delete:
     *     summary: Delete book author relation
     *     tags: [BookAuthors]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               BookId:
     *                 type: integer
     *                 description: The ID of the book.
     *               AuthorId:
     *                 type: integer
     *                 description: The ID of the author.
     *     responses:
     *       '200':
     *         description: Successfully deleted book author relation.
     *       '400':
     *         description: Bad request. Missing required fields or relation not found.
     *       '500':
     *         description: Internal server error.
     */
    router.delete("/", bookAuthorController.deleteRelation);
  
    app.use('/api/bookauthors', router);
  };
  