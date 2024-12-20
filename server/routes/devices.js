import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err) return console.log(err.message);
});
// Récupérer tous les appareils
router.get('/', (req, res) => {
  db.all("SELECT * FROM devices", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Ajouter un nouvel appareil
router.post('/', (req, res) => {
  const { name, type, owner } = req.body;
  db.run("INSERT INTO devices (name, type, owner) VALUES (?, ?, ?)", [name, type, owner], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Mettre à jour un appareil
router.put('/:id', (req, res) => {
  const { name, type, owner } = req.body;
  const { id } = req.params;
  db.run("UPDATE devices SET name = ?, type = ?, owner = ? WHERE id = ?", [name, type, owner, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ updatedID: id });
  });
});

// Supprimer un appareil
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM devices WHERE id = ?", id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

// Filtrer les appareils par type
router.get('/type/:type', (req, res) => {
  const { type } = req.params;
  db.all("SELECT * FROM devices WHERE type = ?", [type], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Filtrer les appareils par propriétaire
router.get('/owner/:owner', (req, res) => {
  const { owner } = req.params;
  db.all("SELECT * FROM devices WHERE owner = ?", [owner], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

export default router;