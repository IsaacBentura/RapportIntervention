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

## Notes (lot 1) – /ventura/notes/ et /kidebouchetou/notes/
Page séparée, accessible par le bouton « Notes » de l'app Rapports et installable comme icône à part.
- Notes en texte libre (même mise en forme automatique que les rapports), titre, carnet, étiquettes,
  épingle, rappel daté (badge et tri ; notification seulement si l'app est ouverte), photos compressées.
- Tri (⇅ dans la barre) : mise à jour, création, titre, rappel ; épinglées toujours en haut. Filtres carnets et étiquettes multiples (OU) via les boutons ⚲ à gauche des puces (liste cochable avec recherche) ; badges des filtres actifs sous les puces.
- Recherche plein texte, corbeille (purge automatique à 30 jours), export PDF (en-tête société partagé).
- « Partager vers » Android : un texte ou un lien partagé depuis une autre app crée une note préremplie.
- Drive : dossier « Notes – Société » à la racine, un fichier n_<id>.json par note + notebooks.json.
  La connexion Google est celle de l'app Rapports (mêmes jetons) ; se connecter depuis Rapports ▸ Réglages.
- Pièces jointes (lot 2) : enregistrement audio dans l'app (micro), documents (PDF, Word, Excel…),
  vidéos. Audio et documents vont dans le sous-dossier « Pièces jointes » du dossier Notes du Drive
  (lien public) ; les vidéos sur YouTube en non répertoriée (autorisation YouTube faite dans Rapports).
  Le PDF de la note liste chaque pièce jointe avec son lien cliquable (vignette pour les vidéos).
- « Partager vers » avec fichiers : photos, vidéos, audio, PDF… partagés depuis une autre app arrivent
  dans une nouvelle note (le service worker reçoit le partage puis rouvre la page).
- Lien note ↔ rapport : dans un rapport, section « Notes liées » (lier, ouvrir, reprendre à la carte :
  texte, photos, vidéos, audio/documents) et section « Pièces jointes » (liens Drive repris de notes,
  listés dans le PDF du rapport). Dans une note, section « Rapports liés » (lier, ouvrir) et
  « Créer un rapport » depuis la note avec choix de ce qui est repris. Le lien est enregistré des deux
  côtés ; chaque app synchronise son côté (un lien fait depuis Notes est poussé côté Rapports à la
  prochaine ouverture de l'app Rapports sur ce téléphone). Le PDF du rapport ne mentionne pas les notes.

## Import Evernote
Notes ▸ Carnets ▸ « Importer depuis Evernote (.enex) ». Dans Evernote sur ordinateur : clic droit sur
un carnet ▸ Exporter ▸ ENEX (un fichier par carnet ; le nom du fichier devient le nom du carnet,
modifiable avant l'import). Conversion : titres → MAJUSCULES, listes → puces, cases cochées → coches,
tableaux → une puce par ligne, liens conservés entre parenthèses ; images → photos compressées ;
PDF/audio/autres → pièces jointes envoyées sur le Drive après l'import ; étiquettes, dates de création
et rappels conservés. Une note déjà importée (même titre et date de création) est ignorée au réimport. Case « Restaurer uniquement les dates de modification » : relit les .enex et remet la date Evernote sur les notes déjà importées, sans rien créer.
Date de modification : changée uniquement par une saisie du plombier ; les envois de fichiers, liens avec un rapport, corbeille et synchro utilisent une révision technique séparée (`rev`).
Le fichier est lu en flux, note par note : des exports de plusieurs centaines de Mo (centaines de photos) passent sur PC. Le téléphone récupère les notes par la synchronisation. La liste affiche 200 notes puis « Afficher plus ».
