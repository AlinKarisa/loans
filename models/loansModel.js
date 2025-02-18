const db = require('../config/db'); // Mengimpor koneksi database dari file konfigurasi db

module.exports = {
  // 1. Menampilkan semua data loans
  getAllLoans: () => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk mendapatkan semua data dari tabel 'loans'
      db.query('SELECT * FROM loans', [], (err, results) => {
        if (err) return reject(err); // Jika terjadi error, reject promise dengan error
        resolve(results); // Jika berhasil, resolve promise dengan hasil query (array loans)
      });
    });
  },

  // 2. Menampilkan data loan berdasarkan ID
  getLoanById: (id) => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk mendapatkan satu loan berdasarkan ID
      db.query('SELECT * FROM loans WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err); // Jika terjadi error, reject promise dengan error
        resolve(results); // Jika berhasil, resolve promise dengan hasil query (loan tertentu)
      });
    });
  },

  // 3. Menambahkan data loan baru
  addLoan: (book_id, user_id, loan_date, return_date = null, status = 'borrowed') => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk memasukkan data baru ke dalam tabel 'loans'
      db.query(
        'INSERT INTO loans (book_id, user_id, loan_date, return_date, status) VALUES (?, ?, ?, ?, ?)',
        [book_id, user_id, loan_date, return_date, status],
        (err, result) => {
          if (err) return reject(err); // Jika terjadi error, reject promise dengan error
          resolve(result.insertId); // Jika berhasil, resolve promise dengan ID dari data yang baru ditambahkan
        }
      );
    });
  },

  // 4. Mengupdate data loan berdasarkan ID
  updateLoan: (id, return_date, status) => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk memperbarui return_date dan status berdasarkan ID loan
      db.query(
        'UPDATE loans SET return_date = ?, status = ? WHERE id = ?',
        [return_date, status, id],
        (err, result) => {
          if (err) return reject(err); // Jika terjadi error, reject promise dengan error
          resolve(result); // Jika berhasil, resolve promise dengan hasil query (jumlah baris yang terpengaruh)
        }
      );
    });
  },

  // 5. Menghapus loan berdasarkan ID
  deleteLoan: (id) => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk menghapus loan berdasarkan ID
      db.query('DELETE FROM loans WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err); // Jika terjadi error, reject promise dengan error
        resolve(result); // Jika berhasil, resolve promise dengan hasil query (jumlah baris yang terhapus)
      });
    });
  },
};
