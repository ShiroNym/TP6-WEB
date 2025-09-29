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
- **Raccourcissement d’URL** : Génération de liens courts (6 caractères).
- **Gestion des doublons** : Un même lien n’est jamais ajouté deux fois.
- **Suppression globale** : Bouton pour effacer tous les liens.
- **API REST** :
  - v1 : GET/POST basiques
  - v2 : Content negotiation (JSON/HTML), short URL, suppression globale
- **SPA client** : Ajout, affichage, copie dans le presse-papier, suppression de tous les liens.
- **Documentation interactive** : Swagger UI disponible sur `/api-docs`

## Documentation API
- Swagger UI : [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- Spécification OpenAPI : `static/open-api.yaml`

