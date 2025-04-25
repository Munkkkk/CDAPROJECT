const express = require('express');
const router = express.Router();
const { addJoke, getAllJokes, getJokeById, getRandomJoke } = require('../controllers/jokeController');

// 1. Récupérer toutes les blagues
/** 
@swagger
* /api/blagues:
*   get:
*     summary: Récupérer toutes les blagues
*     description: Renvoie une liste de toutes les blagues dans la base de données.
*     responses:
*       200:
*         description: Liste des blagues récupérées avec succès
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                   text:
*                     type: string
*                   createdAt:
*                     type: string
*                   updatedAt:
*                     type: string
*       500:
*         description: Erreur serveur
*/
router.get('/blagues', getAllJokes);


// 2. Récupérer une blague aléatoire
/**
 * @swagger
 * /api/blagues/random:
 *   get:
 *     summary: Récupérer une blague aléatoire
 *     description: Cette route renvoie une blague aléatoire de la base de données.
 *     responses:
 *       200:
 *         description: Blague aléatoire récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Aucune blague dans la base de données
 *       500:
 *         description: Erreur serveur
 */
router.get('/blagues/random', getRandomJoke);


// 3. Récupérer une blague via son ID
/** 
 * @swagger
 * /api/blagues/{id}:
 *   get:
 *     summary: Récupérer une blague spécifique
 *     description: Cette route renvoie une blague spécifique en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la blague à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blague trouvée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Blague non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/blagues/:id', getJokeById);

// 4. Ajouter une nouvelle blague
/**
 * @swagger
 * /api/blagues:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     description: Cette route permet d'ajouter une nouvelle blague dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Le texte de la blague
 *     responses:
 *       201:
 *         description: Blague ajoutée avec succès
 *       400:
 *         description: Mauvaise requête (par exemple, texte de la blague manquant)
 *       500:
 *         description: Erreur serveur
 */
router.post('/blagues', addJoke);


module.exports = router;
