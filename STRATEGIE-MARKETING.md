# bang. — Stratégie marketing & audit de la page d'accueil

> Audit de la page d'accueil `atelier-bang.com` : cohérence du message, parcours de
> conversion, SEO et cohérence visuelle. Suivi d'un plan d'action priorisé.

---

## 0. Verdict en une page

**Le site est beau et premium, mais il vend mal.** Le design est au niveau ; ce qui
manque, c'est une **mécanique de conversion** : un parcours unique, des preuves réelles,
et une réponse aux objections. Aujourd'hui le visiteur admire — il ne passe pas à
l'action de façon guidée.

| Axe | Note | Résumé |
|-----|:---:|--------|
| Clarté du message | 🟢 7/10 | On comprend vite : montres automatiques sur mesure, made in France. |
| Tunnel de conversion | 🟠 4/10 | CTA contradictoires (Calendly **vs** simulateur), ordre des sections sous-optimal, le simulateur — votre meilleur outil — est sous-exploité. |
| SEO | 🟠 4/10 | Bases présentes mais : images en fond CSS (invisibles), mix de domaines `bangmod.fr`/`atelier-bang.com`, métadonnées à cadrer, perfs à surveiller. |
| Cohérence visuelle | 🟠 5/10 → 🟢 | 3 nuances d'or, largeurs et boutons hétérogènes. **Corrigé** côté code via `bang-tokens.css`. |

Les 3 chantiers à plus fort impact, dans l'ordre :
1. **Un seul tunnel : simulateur-first** (fait dans le code, à finir côté contenu).
2. **Ajouter les preuves** : vrais avis clients + FAQ (objections).
3. **SEO technique** : images réelles, domaine unique, métadonnées.

---

## 1. Cohérence du message — le client comprend-il ce que vous proposez ?

**Oui, dans les 5 premières secondes.** Le hero dit l'essentiel : « Montres
Automatiques Sur Mesure », « pièce unique », « assemblage à la main ». C'est clair et
différenciant.

**Mais 3 zones d'ombre persistent :**

- **« bang. » ne dit pas « montre ».** La marque est mémorable mais cryptique. Le
  sous-titre compense — gardez-le toujours collé au logo (jamais le logo seul).
- **Pour qui ?** On ne sait pas si c'est un achat plaisir, un cadeau, un objet de
  collectionneur. → Ajoutez 1 ligne de positionnement : *« Pour ceux qui veulent porter
  une montre que personne d'autre ne possède. »*
- **Qu'est-ce qui est « custom » exactement ?** « 12 composants personnalisables » est
  abstrait. Le simulateur répond — d'où l'importance de l'y emmener vite.

> **Action** : ajouter une phrase de positionnement « à qui ça s'adresse » sous le
> sous-titre du hero, et une mini-définition « custom = vous choisissez cadran, boîtier,
> aiguilles, bracelet… » dans la section Gammes ou Process.

---

## 2. Le tunnel de conversion — emmène-t-il vraiment vers la configuration ?

### Le problème (avant)
Vous aviez **deux destinations qui se font concurrence** :
- la plupart des boutons → **Calendly** (réserver un appel),
- le menu + le teaser → **/simulateur**.

Résultat : le visiteur ne sait pas quelle est *l'action principale*. Et on lui demande
de **réserver un appel** (engagement fort, friction haute) **avant** de l'avoir laissé
jouer avec le simulateur (engagement faible, plaisir, qualification). C'est l'inverse de
ce qu'il faut.

### La correction (appliquée dans le code) — **simulateur-first**
Le simulateur est votre meilleur actif : ludique, sans engagement, il **qualifie** le
prospect (budget, goûts) et crée l'envie. Nouveau parcours :

```
Découverte (hero)  →  CONFIGURER (simulateur)  →  Réserver l'échange (Calendly)
```

- **Hero** : CTA principal « **Configurer ma montre** » → /simulateur. CTA secondaire
  discret « Déjà décidé ? Réserver un échange » → Calendly.
- **Gammes** & **Process** : CTA « Configurer ma montre » → /simulateur.
- **Disponibilités** & **Portfolio** (bas de tunnel, intention haute) : Calendly.

### À faire ensuite : **réordonner les sections**
L'ordre actuel mélange les étapes psychologiques. Ordre recommandé (Attention →
Intérêt → Désir → Action) :

| Ordre actuel | Ordre recommandé | Pourquoi |
|---|---|---|
| 1. Hero | 1. Hero | Accroche |
| 2. Indicateurs | 2. Indicateurs | Crédibilité immédiate |
| 3. Gammes | 3. **Process** | Rassurer sur le « comment » avant de parler argent |
| 4. Teaser simulateur | 4. **Portfolio** | Preuve par la réalisation |
| 5. Disponibilités | 5. **Gammes** | L'offre + les prix, une fois l'envie créée |
| 6. Portfolio | 6. **Teaser simulateur** | Le passage à l'action (configurer) |
| 7. Process | 7. **Disponibilités** | Rareté/urgence juste avant la décision |
| — | 8. **Avis clients** (à créer) | Lever le dernier doute |
| — | 9. **FAQ** (à créer) | Lever les objections |

### Redondance à arbitrer
Vous affichez **deux fois la rareté** : le badge « 3 créneaux restants » (teaser) **et**
la grande carte « Disponibilités ». Deux signaux de rareté rapprochés peuvent sembler
manipulateurs. → Garder **un seul moment de rareté fort** (la carte Disponibilités),
et transformer le badge du teaser en bénéfice neutre (« Estimation en 2 min »).

---

## 3. SEO — tout est-il OK ?

### ✅ Déjà bon
- Langue `fr`, structure de titres globalement saine (un seul `<h1>` dans le hero).
- Menu de navigation interne riche.
- Ajouté dans `accueil.html` : `<title>` optimisé, meta description, canonical,
  Open Graph, et **données structurées `LocalBusiness`** (SEO local Dissay/Poitiers).

### 🔴 À corriger
1. **Images du hero en fond CSS** (`background-image`) → **invisibles pour Google** et
   sans `alt`. Les vraies photos de montres devraient être des `<img>` avec `alt`
   descriptif (« montre automatique sur mesure cadran squelette bang. ») sur les pages
   catalogue/atelier — c'est là que se joue le SEO image.
2. **Mix de domaines** : le portfolio charge ses images depuis **`bangmod.fr`** alors
   que le site est **`atelier-bang.com`**. Mauvais pour la cohérence de marque, la perf
   (DNS supplémentaire) et les signaux SEO. → Tout héberger sur `atelier-bang.com`.
3. **Métadonnées WordPress** : configurer dans Yoast/RankMath le title + meta de la page
   d'accueil avec les requêtes cibles (voir §6). Le `<title>` d'`accueil.html` est une
   référence, mais c'est WordPress qui pilote la vraie balise.
4. **Performance / Core Web Vitals** : les images de fond sont des **PNG** lourds
   (`Untitled-design-3.png`…). → Convertir en **WebP**, compresser, et précharger
   l'image du premier carrousel (LCP). Le chargement de police est désormais **unique**
   (corrigé) — c'est déjà un gain.
5. **Ancres peu parlantes** : « Le Club » pointe vers `/verify` (peu lisible pour
   l'utilisateur et le SEO). Clarifier l'URL (`/le-club/`).
6. **Maillage** : ajouter des liens contextuels descriptifs vers `/catalogue/` et
   `/simulateur/` dans le corps des sections (pas seulement le menu).

---

## 4. Cohérence visuelle — tout est-il au même format ?

**Non, à l'origine — et c'était visible.** Inventaire des écarts trouvés :

| Élément | Avant (incohérent) | Après (unifié) |
|---|---|---|
| **Or de marque** | 3 nuances : `#d4af37`, `#C5A572`, `#c9a96e` | **1 seul** : `#c9a96e` (+ `#e8c98a`) |
| **Largeur de contenu** | 900 / 1100 / 1200 / 1280 / 1400 px | **1280 px** partout |
| **Police** | `DM Mono` seulement dans les blocs récents | League Spartan + DM Mono, **chargées 1×** |
| **Localisation** | « Poitiers » (hero) vs « Dissay » (devis) | **« Dissay (86), près de Poitiers »** partout |
| **Logique créneaux** | dupliquée dans 2 blocs | **factorisée** (`bang-creneaux.js`) |

Tout cela est **corrigé dans le code** (`homepage/shared/bang-tokens.css` + sections
refactorisées).

### ⚠️ Reste à harmoniser (recommandation, non bloquant)
- **Système de boutons** : il existe aujourd'hui ~4 styles de boutons (plein blanc,
  plein or, contour, dégradé). → Définir **2 styles seulement** :
  - *Primaire* = fond or, texte sombre (action principale : Configurer).
  - *Secondaire* = contour or, texte or (action secondaire : Réserver).
- **Rythme des fonds** : alterner volontairement `--bang-bg-deep` (#0a0a0a) et
  `--bang-bg-panel` (#13161B) section par section, plutôt que des fonds au hasard.
- **Rayons de bordure** : choisir une valeur unique (ex. `3px`) au lieu de 2/3/8/50px.

---

## 5. Ce qui manque (et qui fait vendre)

1. **De vrais avis clients.** Vous affichez « 4,7/5 » mais aucun témoignage. → 3–5 avis
   avec prénom, ville, photo de la montre. C'est le levier de conversion n°1 sur un
   achat à 500 €+.
2. **Une FAQ** qui tue les objections : délai de fabrication, garantie (les « 2 ans »),
   étanchéité réelle, SAV, paiement (acompte ? plusieurs fois ?), retours, livraison.
3. **Réassurance d'achat** près des CTA : paiement sécurisé, fait main en France,
   garantie 2 ans, expédition assurée.
4. **Capture d'e-mail** pour les indécis : « Recevez 3 inspirations de configurations »
   → nourrit un tunnel e-mail (beaucoup ne réservent pas au 1er passage).

---

## 6. Cibles SEO suggérées (à valider avec un outil de volume)

- `montre automatique personnalisée` / `montre sur mesure`
- `montre custom France` / `atelier horloger personnalisation`
- `mod montre NH35` (requête de niche très qualifiée, communauté connaisseurs)
- `montre personnalisée Poitiers` / `atelier montre Vienne 86` (SEO local)
- `cadeau montre unique homme/femme` (intention cadeau)

→ Créer/optimiser une page par intention forte (catalogue, simulateur, atelier) plutôt
que tout faire reposer sur l'accueil.

---

## 7. Plan d'action priorisé

### ⚡ Quick wins (cette semaine)
- [x] Unifier l'or, les largeurs, la police, la localisation *(fait — code)*
- [x] Factoriser la logique Supabase *(fait — code)*
- [x] CTA simulateur-first sur Hero / Gammes / Process *(fait — code)*
- [ ] Déployer les blocs refactorisés dans WPBakery (voir `homepage/README.md`)
- [ ] Rapatrier les images `bangmod.fr` → `atelier-bang.com`
- [ ] Régler title + meta description dans Yoast/RankMath

### 📅 Court terme (2–4 semaines)
- [ ] Réordonner les sections (§2)
- [ ] Ajouter section **Avis clients** + **FAQ**
- [ ] Convertir les images en WebP + précharger le LCP
- [ ] Dédoublonner la rareté (un seul moment fort)

### 🎯 Moyen terme
- [ ] Capture e-mail + séquence de relance (abandons de simulateur)
- [ ] Système de boutons unifié (primaire/secondaire)
- [ ] Suivi analytics du tunnel (voir §8)

---

## 8. Mesurer (sinon on pilote à l'aveugle)

Mettez des événements sur le parcours pour savoir où ça coince :

| Étape | Événement à tracker |
|---|---|
| Accueil | vue de page, scroll 50 % / 90 % |
| Hero | clic « Configurer ma montre » |
| Simulateur | démarrage, complétion, prix estimé |
| Calendly | clic réservation, RDV confirmé |
| Rareté | vue de la carte Disponibilités |

**KPI nord** : taux *accueil → simulateur démarré* puis *simulateur → RDV réservé*.
C'est cette double conversion qui dira si le tunnel simulateur-first fonctionne.
