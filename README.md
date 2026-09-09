# Rapports d'intervention – deux sociétés

Structure à déposer à la racine du dépôt GitHub (remplace les anciens fichiers) :

    index.html            page d'accueil : choix de la société
    ventura/              application Ventura      (index.html, manifest.json, sw.js, icônes)
    kidebouchetou/        application Kidebouchetou.com (idem)

Chaque dossier est une application installable distincte : icône et couleur propres,
base locale propre, dossier Drive propre :
- Ventura → « Rapports d'intervention » (dossier existant, rien ne bouge)
- Kidebouchetou.com → « Rapports d'intervention – Kidebouchetou.com »

Le compte Google (evadsarl26) est partagé : se connecter dans l'une des deux applis
connecte aussi l'autre. L'ID client OAuth est le même, aucune modification côté Google.

Sur le téléphone du plombier :
1. Ouvrir https://isaacbentura.github.io/RapportIntervention/ventura/ ▸ ⋮ ▸ « Ajouter à l'écran d'accueil »
2. Ouvrir https://isaacbentura.github.io/RapportIntervention/kidebouchetou/ ▸ idem
3. Dans l'une des deux : Réglages ▸ « Se connecter à Google »
4. Dans Kidebouchetou.com : Réglages ▸ compléter l'en-tête (adresse, téléphone, mail, RCS) et le logo.

Photos HEIC (iPhone) : converties à l'import grâce à heic2any.min.js (1,3 Mo), présent dans chaque dossier et chargé seulement au premier besoin.

Mise à jour : le même index.html est copié dans ventura/ et kidebouchetou/.
Ajouter une troisième société : dupliquer un dossier, ajouter une entrée dans COMPANIES en tête du script.

Note : les anciens raccourcis pointant sur la racine (…/RapportIntervention/index.html)
doivent être supprimés ; l'ancien fichier index.html à la racine est remplacé par la page d'accueil.
Les rapports Ventura déjà saisis sont récupérés depuis le Drive à la première synchronisation.

Vidéos : stockées temporairement sur le téléphone puis publiées sur YouTube (chaîne du compte
evadsarl26) en « non répertoriée » : lisibles par toute personne ayant le lien, absentes des
recherches et de la chaîne. Le PDF contient la vignette cliquable et le lien youtu.be.
Au premier envoi, l'app demande l'autorisation YouTube (bouton « Autoriser l'envoi sur YouTube »).
Quota Google : ~6 vidéos par jour pour toute l'équipe ; au-delà, les vidéos restent « en attente »
et partent le lendemain. Activer « YouTube Data API v3 » dans le projet Google Cloud
(https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=882950350881)
et ajouter la portée .../auth/youtube.upload dans l'écran de consentement OAuth.
