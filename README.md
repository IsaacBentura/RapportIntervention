# Ancienne adresse de « Rapports d'intervention »

Ce dépôt ne contient que des redirections : l'application est désormais sur
https://isaacbentura.github.io/TEST_123/

- Chaque ancienne page (accueil, Ventura, Kidebouchetou, Notes, Factures, confidentialité, conditions)
  redirige vers la même page à la nouvelle adresse, avec paramètres et ancre conservés ; `404.html`
  couvre toutes les autres adresses.
- Chaque `sw.js` remplace l'ancien service worker des téléphones : il retire du cache les pages de
  l'ancienne adresse, renvoie la fenêtre ouverte vers la nouvelle adresse et se désinstalle.
  Les données (même domaine) ne sont pas touchées.

À garder en ligne au moins quelques mois (Settings ▸ Pages ▸ main / root).
Ne pas renommer ni supprimer ce dépôt tant que des téléphones utilisent les anciennes icônes.
