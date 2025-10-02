import express from 'express';
import { getAllLinks, addLink, getLinkByShort, deleteAllLinks, deleteLinkByShortAndSecret } from '../database/database.mjs';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  getAllLinks((err, links) => {
    if (err) return res.status(500).send('Erreur DB');
    res.format({
      'application/json': () => {
        res.json({ count: links.length });
      },
      'text/html': () => {
        res.render('root', { count: links.length, links, created: null });
      },
      'default': () => {
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

router.post('/', (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send('url manquant');
  addLink(url, (err, link, isDuplicate) => {
    if (err) return res.status(500).send('Erreur DB');
    getAllLinks((err2, links) => {
      if (err2) return res.status(500).send('Erreur DB');
      res.format({
        'application/json': () => {
          const status = isDuplicate ? 200 : 201;
          const response = {
            short: link.short,
            url: link.url,
            shortUrl: `${req.protocol}://${req.get('host')}/api-v2/${link.short}`,
            duplicate: isDuplicate
          };
          if (!isDuplicate && link.secret) {
            response.secret = link.secret;
          }
          res.status(status).json(response);
        },
        'text/html': () => {
          res.render('root', { count: links.length, links, created: link });
        },
        'default': () => {
          res.status(406).send('Not Acceptable');
        }
      });
    });
  });
});

router.delete('/', (req, res) => {
  deleteAllLinks((err) => {
    if (err) return res.status(500).send('Erreur DB');
    res.format({
      'application/json': () => res.json({ success: true }),
      'text/html': () => res.send('Tous les liens ont été supprimés.'),
      'default': () => res.status(406).send('Not Acceptable')
    });
  });
});

router.get('/:short', (req, res) => {
  const short = req.params.short;
  getLinkByShort(short, (err, link) => {
    if (err || !link) {
      res.format({
        'application/json': () => res.status(404).json({ error: 'Lien non trouvé' }),
        'text/html': () => res.status(404).send('Lien non trouvé'),
        'default': () => res.status(406).send('Not Acceptable')
      });
      return;
    }
    res.format({
      'application/json': () => {
        const { short, url } = link;
        res.json({ short, url, shortUrl: `${req.protocol}://${req.get('host')}/api-v2/${short}` });
      },
      'text/html': () => {
        res.redirect(link.url);
      },
      'default': () => {
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

router.delete('/:short', (req, res) => {
  const short = req.params.short;
  const apiKey = req.header('X-API-KEY');
  deleteLinkByShortAndSecret(short, apiKey, (err, link, status) => {
    if (err) return res.status(500).json({ error: 'Erreur DB' });
    if (status === 'notfound') return res.status(404).json({ error: 'Lien non trouvé' });
    if (status === 'unauthorized') return res.status(401).json({ error: 'Clé API manquante' });
    if (status === 'forbidden') return res.status(403).json({ error: 'Clé API incorrecte' });
    res.status(200).json({ success: true });
  });
});

export default router;
