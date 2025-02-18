const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController'); // Import controller loans

// Route untuk mendapatkan semua loans
router.get('/', loansController.getAllLoans);

// Route untuk mendapatkan loan berdasarkan ID
router.get('/:id', loansController.getLoanById);

// Route untuk menambahkan loan baru
router.post('/', loansController.store);

// Route untuk memperbarui loan berdasarkan ID
router.put('/:id', loansController.update);

// Route untuk menghapus loan berdasarkan ID
router.delete('/:id', loansController.delete);

module.exports = router; // Mengekspor router agar bisa digunakan di file lain
