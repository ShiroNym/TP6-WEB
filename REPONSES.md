# Questions TP6-WEB

1. **Commande httpie équivalente à la commande curl POST :**

```bash
http POST http://localhost:8080/api-v1/ url="https://perdu.com"
```

2. **Différences entre mode production et développement :**
- Production (`npm run http-prod`) : logs moins verbeux, meilleures performances, erreurs moins détaillées, variables d’environnement différentes.
- Développement (`npm run http-dev`) : rechargement automatique (nodemon), logs détaillés, erreurs complètes, variables d’environnement adaptées au dev.

3. **Script npm pour formatter tous les fichiers .mjs :**
Ajoutez dans `package.json` :
```json
"scripts": {
  "format": "prettier --write \"*.mjs\""
}
```

4. **Désactiver l’en-tête X-Powered-By dans Express :**
```js
app.disable('x-powered-by');
```

5. **Middleware pour ajouter le header X-API-version :**
```js
app.use((req, res, next) => {
  res.setHeader('API-Ver', '1.0'); 
  next();
});
```

6. **Middleware pour servir favicon.ico avec static/logo_univ_16.png :**
```js
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/logo_univ_16.png'));
});
```

7. **Documentation du driver SQLite utilisé :**
- [sqlite3 sur npm](https://www.npmjs.com/package/sqlite3)
- [Documentation officielle](https://github.com/TryGhost/node-sqlite3/wiki)

8. **Ouverture et fermeture de la connexion à la base de données :**
- Ouverture : généralement au démarrage de l’application ou lors de la première requête nécessitant la base.
- Fermeture : à l’arrêt de l’application ou lors d’une opération spécifique.

9. **Gestion du cache par Express (après navigation privée et rechargement forcé) :**
- Express sert par défaut les fichiers statiques avec des headers de cache. Un rechargement forcé (`Ctrl+Shift+R`) ignore le cache du navigateur et recharge tout.

10. **Deux instances sur 8080 et 8081, liens visibles entre elles :**
- Les deux instances utilisent la même base de données (`database/database.sqlite`). Les liens créés sur l’une sont stockés dans la base et donc visibles sur l’autre, car elles partagent le même fichier de données.
