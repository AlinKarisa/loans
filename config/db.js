const mysql = require('mysql2'); // Mengimpor modul mysql2 untuk menghubungkan aplikasi dengan database MySQL

// Membuat koneksi ke database MySQL dengan konfigurasi berikut:
const db = mysql.createConnection({
    host: '127.0.0.1',    // Alamat server database (localhost jika berjalan di mesin yang sama)
    user: 'root',         // Username MySQL (default: root)
    password: '',         // Password MySQL (kosong jika belum diset)
    database: 'library',
    port: 3307  // Nama database yang akan digunakan
});

// Menghubungkan ke database MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err); // Jika terjadi error, tampilkan pesan error
        return;
    }
    console.log('Connected to MySQL Database'); // Jika sukses, tampilkan pesan koneksi berhasil
});

module.exports = db; // Mengekspor objek db agar bisa digunakan di file lain