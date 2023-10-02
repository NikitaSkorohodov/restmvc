

/**
 * @swagger
 * tags:
 *   name: BookCategories
 *   description: API endpoints for managing book categories.
 */

module.exports = (app) => {
  const bookCategoryController = require("../controllers/bookCategoryController");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/bookcategories:
   *   get:
   *     summary: Get all book category IDs
   *     tags: [BookCategories]
   *     responses:
   *       '200':
   *         description: Successfully retrieved all book category IDs.
   *       '500':
   *         description: Internal server error.
   */
  router.get("/", bookCategoryController.getAllBookCategoryIds);

  /**
   * @swagger
   * /api/bookcategories:
   *   post:
   *     summary: Create a new book category relation
   *     tags: [BookCategories]
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
   *               CategoryId:
   *                 type: integer
   *                 description: The ID of the category.
   *     responses:
   *       '200':
   *         description: Successfully created a new book category relation.
   *       '400':
   *         description: Bad request. Missing required fields or relation already exists.
   *       '500':
   *         description: Internal server error.
   */
  router.post("/", bookCategoryController.create);
  /**
   * @swagger
   * /api/bookcategories:
   *   put:
   *     summary: Update book category relation
   *     tags: [BookCategories]
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
   *               CategoryIds:
   *                 type: integer
   *                 description: The ID of the new category.
   *     responses:
   *       '200':
   *         description: Successfully updated book category relation.
   *       '400':
   *         description: Bad request. Missing required fields or relation not found.
   *       '500':
   *         description: Internal server error.
   */
  router.put("/", bookCategoryController.updateCategory);
  

  /**
 * @swagger
 * /api/bookcategories:
 *   delete:
 *     summary: Delete book category relation
 *     tags: [BookCategories]
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
 *               CategoryId:
 *                 type: integer
 *                 description: The ID of the category.
 *     responses:
 *       '200':
 *         description: Successfully deleted book category relation.
 *       '400':
 *         description: Bad request. Missing required fields or relation not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/", bookCategoryController.deleteRelation);


  app.use('/api/bookcategories', router);
};
