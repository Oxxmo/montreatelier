# Page d'accueil bang. — blocs HTML

Ce dossier contient la page d'accueil de `atelier-bang.com`, **nettoyée, valide et
factorisée**. Avant, la page était une suite de documents HTML complets imbriqués
(plusieurs `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` dans une même page = HTML
invalide). Ici, chaque section est un **fragment propre**, prêt à coller.

## Arborescence

```
homepage/
├── accueil.html              ← page complète VALIDE (preview / test)
├── shared/
│   ├── bang-tokens.css       ← charte visuelle (couleurs, polices, largeurs) — UNE source
│   └── bang-creneaux.js      ← créneaux Supabase (factorisé : alimente les 2 widgets)
└── sections/
    ├── 01-hero.html
    ├── 02-indicateurs.html
    ├── 03-gammes.html
    ├── 04-teaser-simulateur.html
    ├── 05-disponibilites.html
    ├── 06-portfolio.html
    └── 07-process.html
```

## Ce qui a changé

1. **HTML valide** — chaque bloc ne contient plus que `<style>` + markup + `<script>`
   utile. Plus de `<!DOCTYPE>`, `<html>`, `<head>`, `<title>`, `<meta>` en double.
2. **Une seule charte (`bang-tokens.css`)** — l'or de marque était décliné en 3 nuances
   différentes (`#d4af37`, `#C5A572`, `#c9a96e`). Tout est unifié sur **`#c9a96e`**
   (+ `#e8c98a` en clair). Largeur de contenu unifiée à **1280 px**.
3. **Logique Supabase factorisée** — les blocs « teaser » et « disponibilités »
   faisaient chacun leur propre requête Supabase. Désormais **une seule requête**
   (`bang-creneaux.js`) alimente les deux widgets.
4. **Police chargée une seule fois** — l'`@import` Google Fonts était répété dans chaque
   bloc. Maintenant un seul chargement global (voir ci-dessous).
5. **Tunnel simulateur-first** — le CTA principal du Hero, des Gammes et du Process
   pointe vers `/simulateur/`. Calendly reste en CTA secondaire / fin de tunnel.
6. **Localisation cohérente** — partout « Dissay (86), près de Poitiers ».

## Aperçu local

```bash
# depuis la racine du dépôt
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/homepage/accueil.html
```
> Ouvrir le fichier en `file://` ne marchera pas (les `fetch` d'inclusion sont bloqués).
> Sur Vercel, `accueil.html` fonctionne tel quel.

## Intégration dans WordPress / WPBakery

1. **Une seule fois**, dans l'en-tête du thème (Apparence → Personnaliser → CSS/En-tête,
   ou un plugin type « Insert Headers and Footers ») :
   ```html
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="https://atelier-bang.com/wp-content/uploads/bang/bang-tokens.css">
   ```
   (téléverser `shared/bang-tokens.css` à l'emplacement choisi)

2. **Dans chaque bloc HTML personnalisé WPBakery**, coller le contenu du fichier
   `sections/0X-….html` correspondant, dans l'ordre.

3. **Une seule fois en pied de page** (ou dans le dernier bloc), charger les créneaux :
   ```html
   <script src="https://atelier-bang.com/wp-content/uploads/bang/bang-creneaux.js" defer></script>
   ```

## Sécurité Supabase

La clé `sb_publishable_…` est **publique par design** (clé *publishable*). La sécurité
repose entièrement sur les **politiques RLS** de la table `projets` : vérifier qu'un
visiteur anonyme ne peut lire que `stage` / `acompte_recu` (pas les données clients), et
ne peut **rien écrire**.
