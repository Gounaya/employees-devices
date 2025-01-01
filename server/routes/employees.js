import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) return console.log(err.message);
});

// Récupérer tous les employés
router.get('/', (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Ajouter un nouvel employé
router.post('/', (req, res) => {
  const { name, role } = req.body;
  db.run("INSERT INTO employees (name, role) VALUES (?, ?)", [name, role], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Mettre à jour un employé
router.put('/:id', (req, res) => {
  const { name, role } = req.body;
  const { id } = req.params;
  db.run("UPDATE employees SET name = ?, role = ? WHERE id = ?", [name, role, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ updatedID: id });
  });
});

// Supprimer un employé
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM employees WHERE id = ?", id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

// Filtrer les employés par rôle
// router.get('/role/:role', (req, res) => {
//   const { role } = req.params;
//   db.all("SELECT * FROM employees WHERE role = ?", [role], (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({ data: rows });
//   });
// });

export default router;