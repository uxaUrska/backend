import express from 'express';

import { addStrosek, deleteStrosek, getStroski } from '../controllers/strosekController';

const router = express.Router();

/**
 * @swagger
 * /stroski:
 *   get:
 *     summary: Pridobi seznam vseh stroškov
 *     responses:
 *       200:
 *         description: Uspešno pridobljen seznam stroškov
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   naziv:
 *                     type: string
 *                     description: Naziv stroška
 *                   znesek:
 *                     type: number
 *                     description: Znesek stroška
 */
router.get('/', getStroski);

/**
 * @swagger
 * /stroski/add:
 *   post:
 *     summary: Dodaj nov strošek
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/Strosek'
 *     responses:
 *       201:
 *         description: Uspešno dodan strošek
 *       400:
 *         description: Napaka pri dodajanju stroška
 */
router.post('/add', addStrosek);

/**
 * @swagger
 * /stroski/delete/{id}:
 *   delete:
 *     summary: Izbriši strošek
 *     description: Izbriše strošek na podlagi podanega ID-ja.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID stroška, ki ga želite izbrisati
 *     responses:
 *       200:
 *         description: Strošek uspešno izbrisan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Strošek uspešno izbrisan."
 *       400:
 *         description: Neveljaven ID
 *       404:
 *         description: Strošek ni bil najden
 *       500:
 *         description: Napaka na strežniku
 */
router.delete('/delete/:id', deleteStrosek);

export = router;