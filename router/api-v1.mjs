import express from 'express';
import path from 'path';
import { getAllLinks, addLink, getLinkByUrl } from '../database/database.mjs';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.accepts('html')) {
    res.sendFile(path.resolve('static/index.html'));
    return;
  }
  getAllLinks((err, rows) => {
    if (err) return res.status(500).json({ error: 'Erreur DB' });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url manquant' });
  addLink(url, (err, link) => {
    if (err) return res.status(500).json({ error: 'Erreur DB ou doublon' });
    res.status(201).json(link);
  });
});


export default router;
