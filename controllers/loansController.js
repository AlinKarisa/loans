const loansModel = require('../models/loansModel'); // Mengimpor model 'loansModel' yang berisi query database

module.exports = {
  // 1. Menampilkan semua data loans
  getAllLoans: (req, res) => {
    loansModel
      .getAllLoans() // Memanggil fungsi getAllLoans dari model
      .then((results) => {
        res.json(results); // Mengembalikan data loans dalam format JSON
      })
      .catch((err) => {
        res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons status 500 dengan pesan error
      });
  },

  // 2. Menampilkan data loan berdasarkan ID
  getLoanById: (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL

    loansModel
      .getLoanById(id) // Memanggil fungsi getLoanById dari model dengan parameter ID
      .then((results) => {
        if (results.length === 0) {
          return res.status(404).json({ message: 'Loan not found' }); // Jika loan tidak ditemukan, kirim respons 404
        }
        res.json(results[0]); // Jika ditemukan, kirim hanya satu objek loan (bukan array)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons status 500 dengan pesan error
      });
  },

  // 3. Menambahkan data loan baru
  store: (req, res) => {
    const { book_id, user_id, loan_date, return_date, status } = req.body; // Mengambil data dari body request

    // Validasi: Pastikan field wajib (book_id, user_id, loan_date) diisi
    if (!book_id || !user_id || !loan_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    loansModel
      .addLoan(book_id, user_id, loan_date, return_date, status) // Memanggil fungsi addLoan untuk menambahkan data loan
      .then((insertId) => {
        res.json({ id: insertId, book_id, user_id, loan_date, return_date, status }); // Kirim respons JSON dengan data yang baru dimasukkan
      })
      .catch((err) => {
        res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons status 500 dengan pesan error
      });
  },

  // 4. Mengupdate data loan berdasarkan ID
  update: (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL
    const { return_date, status } = req.body; // Mengambil data yang akan diperbarui dari body request

    loansModel
      .updateLoan(id, return_date, status) // Memanggil fungsi updateLoan dari model
      .then((result) => {
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Loan not found' }); // Jika tidak ada loan yang diupdate, kirim respons 404
        }
        res.json({ message: 'Loan updated successfully' }); // Jika berhasil, kirim pesan sukses
      })
      .catch((err) => {
        res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons status 500 dengan pesan error
      });
  },

  // 5. Menghapus loan berdasarkan ID
  delete: (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL

    loansModel
      .deleteLoan(id) // Memanggil fungsi deleteLoan dari model
      .then((result) => {
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Loan not found' }); // Jika tidak ada loan yang dihapus, kirim respons 404
        }
        res.json({ message: 'Loan deleted successfully' }); // Jika berhasil, kirim pesan sukses
      })
      .catch((err) => {
        res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons status 500 dengan pesan error
      });
  },
};