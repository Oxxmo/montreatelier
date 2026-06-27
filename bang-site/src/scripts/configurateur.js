/**
 * Configurateur bang. — logique interactive (phase suivante)
 *
 * 6 étapes : Cadran → Aiguilles/Index → Boîtier → Mouvement → Bracelet → Signature
 */

// Prix de base par gamme
const PRIX_BASE = {
  Initiale: 320,
  Signature: 520,
};

// Structure de la configuration courante
let config = {
  gamme: 'Initiale',
  cadran: null,
  aiguilles: null,
  boitier: null,
  mouvement: null,
  bracelet: null,
  signature: { gravure: '', rotor: null },
};

// Calcule le prix indicatif à partir de la config
function calculerPrix() {
  const base = PRIX_BASE[config.gamme] ?? PRIX_BASE.Initiale;
  // Les suppléments seront ajoutés ici en phase 2
  return base;
}

// Met à jour l'affichage du prix dans le résumé
function afficherPrix() {
  const el = document.getElementById('prix-indicatif');
  if (el) {
    el.textContent = `à partir de ${calculerPrix()} €`;
  }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  afficherPrix();
});

export { config, calculerPrix };
