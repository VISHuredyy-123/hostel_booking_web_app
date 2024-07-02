const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Replace with your MySQL password
    database: 'hostel_booking' // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create database and table (if not exists)
connection.query('CREATE DATABASE IF NOT EXISTS hostel_booking', (err) => {
    if (err) throw err;
    console.log('Database created or already exists');
    connection.query('USE hostel_booking', (err) => {
        if (err) throw err;
        console.log('Using hostel_booking database');
        const sql = `CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            checkin DATE NOT NULL,
            checkout DATE NOT NULL,
            roomtype VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        connection.query(sql, (err) => {
            if (err) throw err;
            console.log('Table created or already exists');
        });
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, checkin, checkout, roomtype } = req.body;
    const sql = 'INSERT INTO bookings (name, email, checkin, checkout, roomtype) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, checkin, checkout, roomtype], (err, result) => {
        if (err) {
            console.error('Error inserting booking:', err);
            res.status(500).json({ message: 'Error inserting booking' });
            return;
        }
        console.log('Booking inserted:', result);
        res.json({ message: 'Booking submitted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
