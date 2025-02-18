const express = require('express'); // Mengimpor framework Express.js
const bodyParser = require('body-parser'); // Middleware untuk mengelola request body
const loansRoutes = require('./routes/loans'); // Mengimpor router review

const app = express(); // Membuat instance aplikasi Express
const port = 5000; // Menentukan port server

app.use(bodyParser.json()); // Middleware untuk parsing JSON dari request body

// Endpoint utama untuk mengecek apakah server berjalan
app.get('/', (req, res) => {
  res.send('Hello World!'); // Menampilkan pesan di browser atau Postman
});

// Menggunakan route untuk review, semua request dengan prefix '/reviews' akan diarahkan ke reviewsRoutes
app.use('/loans', loansRoutes);

// Menjalankan server dan mendengarkan request pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});