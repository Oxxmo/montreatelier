/* ============================================================
   bang. — CRÉNEAUX (source unique, factorisée)
   Une seule requête Supabase alimente DEUX widgets :
     • le badge du teaser simulateur (#bst-slots-text / #bst-urgency)
     • la carte « Disponibilités Atelier »   (#status-card …)
   À charger UNE SEULE FOIS sur la page d'accueil.
   Remplace les 2 scripts Supabase qui étaient dupliqués.
   ============================================================ */
(function () {
  'use strict';

  /* ── Configuration (un seul endroit à éditer) ── */
  var SUPABASE_URL       = 'https://fybbiyghjnjsnigjzatv.supabase.co';
  var SUPABASE_ANON_KEY  = 'sb_publishable_177KiLL6i-E3SxxRckZpVQ_5oZFD7KF';
  var CAPACITY           = 7;          // capacité mensuelle de l'atelier
  var COUNT_MODE         = 'actifs';   // 'actifs'  = tout projet non terminé
                                       // 'acompte' = uniquement commandes fermes (acompte reçu)
  var FALLBACK_REMAINING = 5;          // affiché si Supabase est injoignable

  /* ── Formulation de la phrase du badge ── */
  function phrase(n) {
    if (n <= 0) return 'Complet ce mois — liste d\'attente';
    if (n === 1) return '<strong>1</strong> créneau restant ce mois';
    return '<strong>' + n + '</strong> créneaux restants ce mois';
  }

  /* ── Widget 1 : badge du teaser simulateur ── */
  function renderBadge(remaining) {
    var el = document.getElementById('bst-slots-text');
    if (el) el.innerHTML = phrase(remaining);
    var badge = document.getElementById('bst-urgency');
    if (badge) badge.classList.toggle('bst-full', remaining <= 0);
  }

  /* ── Widget 2 : carte « Disponibilités Atelier » ── */
  function renderCard(remaining) {
    var card = document.getElementById('status-card');
    if (!card) return;
    remaining = Math.max(0, Math.min(CAPACITY, remaining));

    var fill      = document.getElementById('capacity-fill');
    var slotsLeft = document.getElementById('slots-left');
    var ctaText   = document.getElementById('cta-text');
    var monthEl   = document.getElementById('current-month-display');

    if (monthEl) {
      var d = new Date();
      monthEl.innerText = d.toLocaleString('fr-FR', { month: 'long', year: 'numeric' }).toUpperCase();
    }

    /* compteur animé */
    var current = 0;
    if (slotsLeft) slotsLeft.textContent = '0';
    var iv = setInterval(function () {
      if (slotsLeft && current < remaining) {
        current++;
        slotsLeft.textContent = current;
        slotsLeft.classList.add('counting');
        setTimeout(function () { slotsLeft.classList.remove('counting'); }, 300);
      } else {
        clearInterval(iv);
      }
    }, 80);

    var total = document.getElementById('total-capacity');
    if (total) total.innerText = CAPACITY;
    var capText = document.getElementById('capacity-text');
    var used = CAPACITY - remaining;
    if (capText) capText.innerText = used + '/' + CAPACITY;

    var pct = (used / CAPACITY) * 100;
    setTimeout(function () { if (fill) fill.style.width = pct + '%'; }, 800);

    card.classList.remove('urgent', 'full');
    if (remaining === 0) {
      card.classList.add('full');
      if (fill) { fill.style.background = 'linear-gradient(90deg,#F44336 0%,#E53935 100%)'; fill.style.boxShadow = '0 0 15px rgba(244,67,54,0.6)'; }
      if (slotsLeft) { slotsLeft.innerText = 'COMPLET'; slotsLeft.style.fontSize = '55px'; }
      if (ctaText) ctaText.innerText = 'LISTE D\'ATTENTE';
    } else if (remaining <= 3) {
      card.classList.add('urgent');
      if (fill) { fill.style.background = 'linear-gradient(90deg,#FFC107 0%,#FFD54F 100%)'; fill.style.boxShadow = '0 0 15px rgba(255,193,7,0.5)'; }
    } else if (fill) {
      fill.style.background = 'linear-gradient(90deg,#4CAF50 0%,#66BB6A 100%)';
      fill.style.boxShadow = '0 0 12px rgba(76,175,80,0.5)';
    }
  }

  function apply(remaining) {
    renderBadge(remaining);
    renderCard(remaining);
  }

  /* ── Une seule requête réseau pour les deux widgets ── */
  async function load() {
    var hasBadge = !!document.getElementById('bst-slots-text');
    var hasCard  = !!document.getElementById('status-card');
    if (!hasBadge && !hasCard) return;   // aucun widget sur la page

    try {
      var res = await fetch(SUPABASE_URL + '/rest/v1/projets?select=stage,acompte_recu', {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY }
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var rows = await res.json();

      var used = (COUNT_MODE === 'acompte')
        ? rows.filter(function (r) { return r.acompte_recu && r.stage !== 'termine'; }).length
        : rows.filter(function (r) { return r.stage !== 'termine'; }).length;

      apply(Math.max(0, CAPACITY - used));
    } catch (e) {
      console.warn('bang. — créneaux dynamiques indisponibles, valeur de secours affichée.', e);
      /* le badge garde sa valeur écrite en dur ; la carte reçoit le fallback */
      renderCard(FALLBACK_REMAINING);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();
})();
