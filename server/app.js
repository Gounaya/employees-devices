import express from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

// Initialiser la base de données SQLite
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err.message);
});

db.serialize(() => {
  db.run("CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, role TEXT)");
  db.run("CREATE TABLE devices (id INTEGER PRIMARY KEY, name TEXT, type TEXT, owner INTEGER, FOREIGN KEY(owner) REFERENCES employees(id))");
});

// Importer les routeurs
import employeeRouter from './routes/employees.js';
import deviceRouter from './routes/devices.js';

// Utiliser les routeurs
app.use('/employees', employeeRouter);
app.use('/devices', deviceRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});