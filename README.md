# TP6-WEB : Raccourcisseur d’URL
## Render: Cloud Application Platform
[Accès serveur](https://tp6-web.onrender.com/)

## Présentation
Ce projet est une application web Node.js permettant de raccourcir des liens.

La documentation de l’API est disponible via Swagger UI.

## Structure du projet
```
TP6-WEB/
├── database/
│   └── database.mjs         # Gestion de la base SQLite
├── router/
│   ├── api-v1.mjs           # Routes API v1 
│   └── api-v2.mjs           # Routes API v2 
├── static/
│   ├── client.html          # SPA client
│   ├── app.js               # Logique JS du client
│   ├── style.css            # CSS
│   ├── api-doc.html         # Documentation statique
│   └── open-api.yaml        # Spécification OpenAPI
├── views/
│   └── root.ejs             # Template EJS pour API v2 HTML
├── config.mjs               # Configuration
├── server-http.mjs          # Serveur principal Express
├── package.json             # Dépendances et scripts
└── REPONSES.md              # Réponses aux questions du TP
```

## Commandes pour démarrer le serveur

### Instance par défaut (port 8080)
```bash
npm run dev
```


## Fonctionnalités principales
- **Raccourcissement d’URL** : Génération de liens courts (6 caractères) avec un code secret associé à chaque lien.
- **Gestion des doublons** : Un même lien n’est jamais ajouté deux fois.
- **Suppression globale** : Bouton pour effacer tous les liens.
- **Suppression sécurisée d’un lien** :
  - Chaque lien possède un code secret généré à la création.
  - Une section dédiée dans le front permet de supprimer un lien en saisissant son code raccourci et son code secret.
  - La route DELETE `/api-v2/:short` nécessite l’en-tête `X-API-KEY` contenant le code secret.
  - Seul l’auteur (possédant le code secret) peut supprimer le lien.
- **API REST** :
  - v1 : GET/POST basiques
  - v2 : Content negotiation (JSON/HTML), short URL, suppression globale, suppression sécurisée par clé API
- **SPA client** : Ajout, affichage, copie dans le presse-papier, suppression de tous les liens, suppression individuelle par code secret.
- **Documentation interactive** : Swagger UI disponible sur `/api-docs` avec gestion de l’authentification par clé API (champ sécurisé pour la suppression).

## Documentation API
- Swagger UI : [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- Spécification OpenAPI : `static/open-api.yaml`
- Suppression sécurisée :
  - Route : `DELETE /api-v2/{short}`
  - Authentification : en-tête `X-API-KEY` (code secret)
  - Codes de réponse : 200 (succès), 401 (clé manquante), 403 (clé incorrecte), 404 (lien non trouvé)

