# CLAUDE.md — bang. atelier de montres uniques

## Identité du projet

bang. est un atelier artisanal de montres automatiques sur mesure, basé à Dissay (86), France.
Chaque montre est une pièce unique, assemblée à la main, limitée à 7 commandes/mois.
Gammes : Initiale (à partir de 320 €) et Signature (à partir de 520 €).
Fondateur : Scott — responsable commercial en parallèle, micro-entrepreneur.
Site : atelier-bang.com
Devise : "Carpe Diem."

## Stack technique

- **Framework** : Astro (SSG, pages statiques ultra-rapides)
- **Hébergement** : Vercel (déploiement via `git push`)
- **Base de données** : Supabase (configurateur, leads, Club, passeport)
  - URL : `https://fybbiyghjnjsnigjzatv.supabase.co`
  - Clé publique : `sb_publishable_177KiLL6i-E3SxxRckZpVQ_5oZFD7KF`
- **Contenu éditorial** : Markdown dans le repo (dossier `src/content/journal/`)
  - Pas de CMS externe pour la V1 — les articles sont des fichiers `.md` avec frontmatter
- **Interactivité** : Vanilla JS (pas de React/Vue sauf besoin explicite)
- **Email transactionnel** : Brevo (Sendinblue) ou Resend — à brancher en phase 3
- **Domaine** : atelier-bang.com (DNS à pointer vers Vercel)

## Tokens de marque

### Typographie
- **Display / titres** : `League Spartan` (variable, Google Fonts) — weight 500-700
- **Mono / accents techniques** : `DM Mono` (Google Fonts) — références, prix, numéros de série
- **Body** : `Inter` (variable, Google Fonts) — weight 400-500, corps de texte

### Couleurs
```css
:root {
  --gold: #C5A572;
  --gold-light: #D4BC91;
  --gold-dark: #9E7E4F;
  --noir: #0A0A0A;
  --noir-surface: #141414;
  --noir-card: #1A1A1A;
  --gris-texte: #A3A3A3;
  --gris-muted: #6B6B6B;
  --blanc: #F5F5F0;
  --blanc-pur: #FFFFFF;
  --accent-error: #E24B4A;
  --accent-success: #1D9E75;
}
```

### Signature visuelle
- Fond noir, or sur noir — jamais d'arrière-plan blanc ou clair
- Bordures fines `1px solid rgba(197, 165, 114, 0.15)`
- Border-radius : `8px` (cards), `12px` (sections), `50%` (avatars)
- Pas de gradients décoratifs, pas d'ombres portées, pas de néon
- Photos : contrastes élevés, fond sombre, lumière directionnelle sur la montre

### Tonalité éditoriale
- Registre : luxe discret, jamais criard — "le luxe qui chuchote"
- Pas de majuscules intégrales sauf le logo "bang."
- Signature de fermeture : `bang. — Carpe Diem.`
- Vouvoiement pour le client, tutoiement proscrit
- Pas de superlatifs vides ("exceptionnel", "incroyable") — être factuel et précis

## Architecture du site

### Menu principal (6 entrées)
1. **Configurer** (`/configurer`) — Le configurateur, pilier central du site
2. **Réalisations** (`/realisations`) — Portfolio des montres livrées + galerie artworks
3. **La Maison** (`/la-maison`) — Récit fondateur + philosophie + méthode (fusion de l'ancien /notre-histoire et /a-propos)
4. **Le Journal** (`/journal`) — Blog éditorial (catégories : Culture, Style, Atelier, Mécanique)
5. **Le Club** (`/club`) — Page publique de présentation du programme (capture email) — PAS le portail de vérification
6. **Contact** (`/contact`) — Formulaire de brief + Calendly embarqué

### Footer
- **Passeport** (`/passeport`) — Portail de vérification pour propriétaires (ex /verify)
- **FAQ** (`/faq`) — Questions fréquentes
- **Mentions légales** (`/mentions-legales`)
- **CGV** (`/cgv`)
- **Politique de confidentialité** (`/confidentialite`)

### Redirections 301 (dans vercel.json)
```
/simulateur       → /configurer
/atelier          → /realisations
/atelier/         → /realisations
/notre-histoire   → /la-maison
/notre-histoire/  → /la-maison
/a-propos         → /la-maison
/catalogue        → /configurer
/catalogue/       → /configurer
/verify           → /passeport
/verify/          → /passeport
/lejournalbang    → /journal
/lejournalbang/   → /journal
/category/culture → /journal/culture
/category/style   → /journal/style
/category/atelier → /journal/atelier
/category/mecanique → /journal/mecanique
/mentionslegales  → /mentions-legales
```

## Structure des dossiers

```
bang-site/
├── CLAUDE.md                  ← ce fichier
├── astro.config.mjs
├── vercel.json                ← redirections 301, headers, rewrites
├── package.json
├── tsconfig.json
├── public/
│   ├── fonts/                 ← fichiers .woff2 si self-hosted
│   ├── images/
│   │   ├── realisations/      ← photos des montres livrées
│   │   ├── artworks/          ← visuels clients
│   │   ├── journal/           ← images des articles
│   │   └── ui/                ← logo, favicon, og-image, icônes
│   └── robots.txt
├── src/
│   ├── layouts/
│   │   └── Base.astro         ← layout global (head, header, footer)
│   ├── components/
│   │   ├── Header.astro       ← menu principal — UN SEUL, partout
│   │   ├── Footer.astro       ← footer — UN SEUL, partout
│   │   ├── Hero.astro
│   │   ├── Configurateur.astro ← wrapper du configurateur JS
│   │   ├── CarteMontre.astro  ← card réutilisable pour une réalisation
│   │   ├── Temoignage.astro
│   │   ├── BarreRarete.astro  ← source de vérité unique pour la rareté
│   │   ├── CtaPersistant.astro ← barre CTA sticky bas de page
│   │   └── SectionJournal.astro
│   ├── pages/
│   │   ├── index.astro        ← accueil
│   │   ├── configurer.astro
│   │   ├── realisations.astro
│   │   ├── la-maison.astro
│   │   ├── journal/
│   │   │   ├── index.astro    ← hub du journal
│   │   │   └── [...slug].astro ← article dynamique
│   │   ├── club.astro
│   │   ├── contact.astro
│   │   ├── passeport.astro
│   │   ├── faq.astro
│   │   ├── mentions-legales.astro
│   │   ├── cgv.astro
│   │   └── confidentialite.astro
│   ├── content/
│   │   ├── config.ts          ← schémas Astro Content Collections
│   │   ├── journal/           ← articles en .md avec frontmatter
│   │   └── realisations/      ← fiches montres en .md ou .json
│   ├── scripts/
│   │   └── configurateur.js   ← logique du configurateur (vanilla JS)
│   └── styles/
│       └── global.css         ← tokens, reset, typographie, utilitaires
└── .gitignore
```

## Règles de développement

### Cohérence absolue
- Le header et le footer sont des composants uniques importés dans Base.astro
- Jamais de header/footer dupliqué ou inline dans une page
- La rareté (créneaux restants) est gérée par UN SEUL composant (BarreRarete.astro)
  qui lit une valeur depuis Supabase ou une config — jamais de chiffre en dur dans le HTML
- Un seul compte Instagram partout : `atelier.bang`

### Performance
- Score Lighthouse cible : 95+ sur les 4 axes
- Images en WebP/AVIF via `astro:assets` (import + composant Image)
- Fonts : preload les .woff2, display: swap
- JS minimal : pas de jQuery, pas de framework lourd
- Le configurateur est le seul JS conséquent — il se charge en lazy

### SEO
- Chaque page a un `<title>` unique et une `<meta description>` unique
- Données structurées JSON-LD sur l'accueil (LocalBusiness) et les réalisations (Product)
- Sitemap auto via `@astrojs/sitemap`
- Canonical sur chaque page
- Hreflang FR/EN quand la version anglaise existe

### Accessibilité
- Contraste WCAG AA minimum sur tous les textes
- `alt` descriptif sur chaque image de montre
- Navigation au clavier fonctionnelle
- `aria-label` sur les boutons icônes
- Pas d'animations sans `prefers-reduced-motion`

## Tunnel de conversion — règles métier

### Trois températures de capture
1. **Froid (~70%)** : lead magnet (guide PDF) ou inscription Club → email seul
2. **Tiède (~25%)** : "Sauvegarder ma config" dans le configurateur → email + config stockée en Supabase
3. **Chaud (~5%)** : "Réserver mon brief" → Calendly 30 min

### Le configurateur (pilier)
- 6 étapes dans cet ordre : Cadran → Aiguilles/Index → Boîtier → Mouvement → Bracelet → Signature (gravure + rotor)
- Prix indicatif en temps réel (jamais verrouillé derrière l'email)
- Bouton "Sauvegarder ma config" = capture email + stockage Supabase + envoi fiche projet PDF
- Bouton "Réserver mon brief" = lien Calendly
- Badge de niveau (Initiale / Signature) qui apparaît dynamiquement selon les choix
- Pas de compte à rebours artificiel — la rareté vraie (créneaux/mois) suffit

### Anti-patterns interdits
- ❌ Compteur à rebours qui se réinitialise (dark pattern)
- ❌ Chiffres de rareté contradictoires (7 ET 10 ET 6 sur la même page)
- ❌ Compteurs animés affichant "0" (mieux vaut pas de compteur qu'un compteur cassé)
- ❌ "Restauration de montres anciennes" (hors périmètre, dilue le positionnement)
- ❌ Liste nominative des fournisseurs (protéger le sourcing)
- ❌ Google AdSense / publicités sur un site premium
- ❌ Lien vers bangmod.fr (ancien domaine, à rediriger)

## Références et assets

### Projet phare
Le trio **Zanzibar** (client Loïc) : 3 montres — carbone forgé, NH34 GMT, cadrans météorite,
gravure rotor éléphant. C'est LA référence à utiliser dans le contenu et les exemples.

### Témoignages vérifiés (à réutiliser)
- Paul C. : "Superbe réalisation jusque dans les moindres détails" (2 montres)
- Nicolas H. : "De l'écoute, des échanges productifs" (2 montres)
- Fred L. : "Les meilleures montres que j'ai pu acheter" (2 montres)

### Chiffres réels (à afficher si pertinents)
- Satisfaction : 4.7/5
- Créations livrées : 77+
- Lecteurs du journal : 2.1K+

## Ce qui ne doit JAMAIS apparaître
- Le terme "PIVOT 7" — dans aucun contexte, jamais
- Le domaine bangmod.fr (sauf en redirection 301)
- Des prix fermes (toujours "à partir de" ou "estimation indicative")
- Du contenu généré par IA non relu (photos IA = OK si fidèles au produit réel)
