# Rapports d'intervention – PWA synchronisée Google Drive

Contenu du dossier à publier tel quel sur GitHub Pages :
`index.html` (l'application), `manifest.json`, `sw.js` (hors-ligne), `icon-192.png`, `icon-512.png`.

## 1. Publier sur GitHub Pages
1. Créer un dépôt (par ex. `rapports-intervention`), y déposer ces fichiers à la racine.
2. Settings ▸ Pages ▸ Source : branche `main`, dossier `/ (root)`.
3. Noter l'URL obtenue : `https://<compte>.github.io/rapports-intervention/`

## 2. Créer l'identifiant client Google (10 minutes, gratuit)
Avec le **compte Google partagé de l'équipe** (celui dont le Drive contiendra les rapports) :

1. Ouvrir https://console.cloud.google.com et créer un projet (« Rapports intervention »).
2. **API et services ▸ Bibliothèque** : rechercher *Google Drive API* ▸ Activer.
3. **API et services ▸ Écran de consentement OAuth** (ou « Google Auth Platform ») :
   - Type d'utilisateur : *Externe* ; nom de l'application ; e-mail d'assistance.
   - Champs d'application : ajouter `.../auth/drive.file` (accès uniquement aux fichiers créés par l'application).
   - **Utilisateurs test** : ajouter l'adresse du compte partagé. (Tant que l'application est en mode « Test », seuls ces comptes peuvent se connecter — suffisant ici, pas besoin de validation Google.)
4. **API et services ▸ Identifiants ▸ Créer des identifiants ▸ ID client OAuth** :
   - Type : *Application Web*.
   - **Origines JavaScript autorisées** : `https://<compte>.github.io` (sans chemin, sans barre finale).
   - Pas d'URI de redirection nécessaire.
5. Copier l'**ID client** (`xxxx.apps.googleusercontent.com`).

## 3. Renseigner l'identifiant client
Deux possibilités :
- dans `index.html`, remplacer `__GOOGLE_CLIENT_ID__` par l'ID client (une seule occurrence) et republier ;
- ou, sur chaque appareil, le coller dans *Réglages ▸ Identifiant client Google* et enregistrer.

## 4. Sur chaque téléphone
1. Ouvrir l'URL dans Chrome ▸ menu ⋮ ▸ *Ajouter à l'écran d'accueil* (icône et plein écran).
2. Réglages ▸ *Se connecter à Google* ▸ choisir le compte partagé de l'équipe.
3. L'application crée le dossier « Rapports d'intervention » dans le Drive et synchronise.

## Fonctionnement
- Un fichier JSON par rapport (photos incluses), `clients.json`, `settings.json` (en-tête société partagé).
- Les PDF générés sont déposés dans le sous-dossier « PDF » du Drive.
- Synchronisation au démarrage, 1,5 s après chaque enregistrement, au retour du réseau, et via le bouton ↻.
- Conflit : la modification la plus récente gagne. Une suppression sur un appareil est répercutée partout.
- Hors ligne : tout reste utilisable ; l'envoi se fait au retour du réseau.
- Le jeton Google dure 1 h ; il est renouvelé silencieusement. Si Google demande de se reconnecter, la barre d'état le signale (« Reconnexion à Google nécessaire »).

## Sécurité
- L'ID client est public par nature ; il est protégé par la liste des origines autorisées.
- L'application n'accède qu'aux fichiers qu'elle a créés (portée `drive.file`).
- Les rapports sont visibles de quiconque possède le mot de passe du compte partagé : activer la validation en deux étapes sur ce compte.
