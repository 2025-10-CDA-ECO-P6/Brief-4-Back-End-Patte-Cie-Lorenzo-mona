# Patte & Cie – Backend

Backend de l’application **Patte & Cie** (carnet de santé animal).
Ce projet fournit une API REST basée sur **Node.js**, **Express** et **PostgreSQL (Neon)**.
---
## MCD - MLD - MPD 
![MCD](database/mcd.png)
![MLD](database/mld.png)
![MPD](database/mpd.png)

## Techno
- **Node.js** : environnement d’exécution JavaScript  
- **Express** : framework backend pour la création de l’API REST  
- **TypeScript** : typage statique pour sécuriser le code  
- **PostgreSQL** : base de données relationnelle  
- **Neon** : hébergement de la base de données PostgreSQL  
- **Prisma** : ORM pour l’accès et la gestion de la base de données  
- **Git / GitHub** : gestion de versions et travail collaboratif

## Architecture du projet 

## Swagger
```bash
http://localhost:3000/api-docs/
```

## Lancer le projet en local
```bash
npm install
npm run dev
```

## Base de données
La base de données est une base **PostgreSQL** hébergée sur **Neon**.

### Création et données
- La structure de la base est définie dans `database/create_tables.sql`
- Un script de test permet d’injecter des données : `database/seed.sql`

### Accès à la base de données
- La base de données est hébergée sur **neon.tech**
- L’accès à la base se fait via **Prisma** (ORM)

### UUID
Les identifiants sont générés sous forme d’**UUID directement en base de données**, afin de :
- garantir l’unicité des identifiants
- éviter les conflits lors du travail collaboratif
- ne pas exposer des identifiants incrémentaux

### Commandes Prisma principales
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations en local
npx prisma migrate dev

# Ouvrir Prisma Studio
npx prisma studio
```

## Gestion des erreurs
L’API utilise une gestion des erreurs centralisée  

### La logique est la suivante :   
- Services : détectent et déclenchent les erreurs métier  
- Controllers : transmettent les erreurs  
- Middleware d’erreurs : formate la réponse HTTP  

### Types d’erreurs gérées
- 400 : Données invalides ou manquantes
- 404 : Ressource inexistante = app.ts
- 500 : Erreur interne du serveur