# Application Android (APK) – compilée par GitHub Actions

Rien à installer sur votre PC. Le workflow `.github/workflows/android.yml` compile et signe l'APK à chaque dépôt
sur `main` (ou à la demande : Actions ▸ Android APK ▸ Run workflow), puis le publie dans Releases.

## Mise en place (une seule fois)
1. Déposer ces fichiers dans le dépôt (`android-app/`, `.github/workflows/android.yml`).
2. Onglet **Actions** ▸ activer les workflows si GitHub le demande ▸ « Android APK » ▸ **Run workflow**.
   Le premier passage échoue volontairement après avoir **généré la clé de signature** : ouvrir le job,
   lire le **résumé** (Summary), copier les deux secrets indiqués dans *Settings ▸ Secrets and variables ▸
   Actions* : `ANDROID_KEYSTORE_PASS` et `ANDROID_KEYSTORE_B64`. Conservez-les aussi ailleurs : sans cette clé,
   les futures versions ne s'installeront pas par-dessus l'ancienne.
3. Console Google Cloud ▸ Identifiants ▸ **Créer des identifiants ▸ ID client OAuth ▸ Android** :
   package `fr.ventura.rapports`, empreinte SHA-1 affichée dans le résumé. Copier l'ID obtenu dans une
   **variable** du dépôt : *Settings ▸ Secrets and variables ▸ Actions ▸ Variables* ▸ `ANDROID_CLIENT_ID`.
   (Un client Android n'a pas de secret ; la connexion passe par le navigateur du téléphone et revient
   dans l'app par un lien `com.googleusercontent.apps.…:/oauth2redirect`.)
4. Relancer le workflow : l'APK apparaît dans **Releases** (`rapports-intervention-<version>.apk`).

## Sur le téléphone
Télécharger l'APK depuis la page Releases, l'ouvrir, autoriser « installer des applications inconnues »
pour Chrome si demandé. Ouvrir l'app ▸ société ▸ Rapports ▸ Réglages ▸ Se connecter à Google (le navigateur
s'ouvre, puis revient dans l'app) ▸ Autoriser YouTube de la même façon. Les données sont alors dans l'espace
privé de l'application : réinitialiser Chrome ne les touche plus. L'app propose elle-même les nouvelles
versions (bannière « Nouvelle version … disponible ▸ Télécharger »).

## Différences avec la version web
- Pas de « Partager vers » l'application (réception de fichiers) dans ce premier lot.
- Les mises à jour s'installent manuellement (téléchargement de l'APK) ; la PWA sur PC reste à jour seule.
- La PWA et l'APK coexistent sans conflit : mêmes dossiers Drive.
