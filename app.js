// app.js — FUO workup application logic
// Depends on: diseases.js (DISEASES, STAGE1, STAGE2, STAGE3, DONTDO)

// ── STATE ────────────────────────────────────────────────────────────────────

const state = {
  febrile: 'yes',
  duration: '3wk+',
  setting: 'classic',
  home: 'other_us',
  age: '',
  sex: '',
  travel: new Set(),
  exposure: new Set(),
  feature: new Set(),
  lab: new Set()
};

// ── LABELS (human-readable display for match tags) ───────────────────────────

const LABELS = {
  // Home regions
  ms_ohio_valley: 'Miss-Ohio Valley',
  south_central_us: 'South-Central US',
  sw_us: 'SW US/Sonoran',
  northeast_greatlakes: 'NE/Great Lakes',
  pacific_nw: 'Pacific NW',
  gulf_coast: 'Gulf Coast',
  outside_us: 'outside US',
  // Travel
  mexico_central: 'C America travel',
  south_america: 'S America travel',
  caribbean: 'Caribbean travel',
  ssafrica: 'SSA travel',
  me_nafrica: 'MENA travel',
  south_asia: 'S Asia travel',
  se_asia: 'SE Asia travel',
  mediterranean: 'Med travel',
  // Exposures
  cattle_sheep_goat: 'livestock',
  raw_milk: 'raw milk',
  raw_shellfish: 'raw shellfish',
  undercooked_meat: 'undercooked meat',
  rabbit_wildgame: 'rabbit/wild game',
  tick: 'tick exposure',
  mosquito: 'mosquito',
  cats_kittens: 'kittens',
  cat_feces: 'cat litter/soil',
  birds_bats: 'bird/bat exposure',
  caves: 'caves',
  demolition: 'demolition',
  river_valley: 'river valley',
  freshwater: 'freshwater swim',
  deer_hunt: 'hunting',
  recent_surgery: 'recent surgery',
  indwelling_line: 'line/cath',
  prosthetic: 'prosthetic',
  dental_work: 'dental',
  ivdu: 'IVDU',
  transfusion: 'transfusion',
  immunosuppressed: 'immunosuppressed',
  hiv: 'HIV',
  transplant: 'transplant',
  new_med: 'new med',
  msm_new_partners: 'sexual exposure',
  commercial_sex: 'sexual exposure',
  tb_contact: 'TB contact',
  incarcerated: 'incarcerated/shelter',
  homeless: 'homeless',
  alcohol_use: 'alcohol',
  medical_personnel: 'healthcare worker',
  hbv_hcv: 'HBV/HCV',
  cirrhosis: 'cirrhosis',
  // Features
  weight_loss: 'weight loss',
  night_sweats: 'night sweats',
  drenching_sweats: 'drenching sweats',
  pruritus: 'pruritus',
  periodic_pattern: 'periodic fever',
  quotidian: 'quotidian fever',
  alcohol_ln_pain: 'alcohol→LN pain',
  early_anorexia: 'early anorexia',
  family_periodic_fever: 'FHx periodic fever',
  new_headache: 'new HA',
  jaw_claudication: 'jaw claudication',
  scalp_tender: 'scalp tender',
  vision_change: 'vision change',
  uveitis: 'uveitis',
  facial_pain: 'sinus/facial pain',
  dental_pain: 'dental pain',
  pharyngitis: 'pharyngitis',
  new_murmur: 'new murmur',
  embolic_phenomena: 'emboli',
  splinter_hem: 'periph stigmata',
  dyspnea: 'dyspnea',
  cough: 'chronic cough',
  hemoptysis: 'hemoptysis',
  pleuritic_pain: 'pleuritic pain',
  leg_swelling: 'leg swelling',
  atypical_pneumonia: 'atypical PNA',
  rash_wrists_ankles: 'centripetal rash',
  salmon_evanescent: 'salmon rash',
  erythema_nodosum: 'erythema nodosum',
  malar_rash: 'malar rash',
  ulcers_genital: 'oral+genital ulcers',
  morbilliform: 'morbilliform rash',
  lad_localized: 'localized LAD',
  lad_generalized: 'gen LAD',
  splenomegaly: 'splenomegaly',
  hepatomegaly: 'hepatomegaly',
  arthralgia: 'arthralgia',
  arthritis: 'arthritis',
  prox_stiff: 'proximal stiffness',
  myalgia: 'myalgia',
  sacroiliitis: 'sacroiliitis',
  bone_pain: 'bone pain',
  abd_pain: 'abd pain',
  ruq_pain: 'RUQ pain',
  chronic_diarrhea: 'chronic diarrhea',
  jaundice: 'jaundice',
  ascites: 'ascites',
  hematuria: 'hematuria',
  dysuria_no_bact: 'sterile pyuria',
  flank_pain: 'flank pain',
  mononeuritis: 'mononeuritis multiplex',
  conj_suffusion: 'conjunctival suffusion',
  // Labs
  leukocytosis: 'leukocytosis',
  leukopenia: 'leukopenia',
  anc_low: 'ANC<500',
  eosinophilia: 'eosinophilia',
  atypical_lymph: 'atypical lymphs',
  blasts: 'blasts on smear',
  anemia: 'anemia',
  hemolytic_anemia: 'hemolysis',
  thrombocytopenia: 'thrombocytopenia',
  thrombocytosis: 'thrombocytosis',
  pancytopenia: 'pancytopenia',
  polycythemia: 'polycythemia',
  transaminitis: 'transaminitis',
  cholestasis: 'cholestatic LFTs',
  hyponatremia: 'hyponatremia',
  hypercalcemia: 'hypercalcemia',
  elevated_ldh: 'high LDH',
  esr_high: 'ESR>50',
  esr_very_high: 'ESR>100',
  crp_high: 'high CRP',
  ferritin_high: 'ferritin>500',
  ferritin_extreme: 'ferritin>10k',
  procalcitonin_high: 'procal high',
  ck_high: 'high CK',
  pyuria_sterile: 'sterile pyuria',
  hematuria_lab: 'hematuria UA',
  proteinuria: 'proteinuria',
  hilar_lad_cxr: 'bihilar LAD',
  relative_brady: 'relative brady',
  rel_well: 'well-appearing'
};

function lbl(k) { return LABELS[k] || k.replace(/_/g, ' '); }

// ── SCORING ──────────────────────────────────────────────────────────────────

function scoreDisease(d) {
  let score = 0;
  const matches = [];
  if (!d.triggers) return { score, matches };
  for (const [field, weight] of d.triggers) {
    const hit = state.travel.has(field) || state.exposure.has(field) ||
                state.feature.has(field) || state.lab.has(field) ||
                state.home === field;
    if (hit) { score += weight; matches.push(field); }
  }
  return { score, matches };
}

// ── INPUT BINDING ─────────────────────────────────────────────────────────────

function bindInputs() {
  // Pill groups (radio: febrile, duration, setting)
  document.querySelectorAll('.pill-group').forEach(group => {
    const name = group.dataset.radio;
    group.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const input = pill.querySelector('input');
        input.checked = true;
        state[name] = input.value;
        render();
      });
    });
  });

  // Chip groups (multi-select checkboxes)
  document.querySelectorAll('.chips').forEach(group => {
    const name = group.dataset.multi;
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', e => {
        e.preventDefault();
        const input = chip.querySelector('input');
        input.checked = !input.checked;
        chip.classList.toggle('active', input.checked);
        if (input.checked) state[name].add(input.value);
        else state[name].delete(input.value);
        updateSummaryCounts();
        render();
      });
    });
  });

  // Selects and text inputs
  document.getElementById('home').addEventListener('change', e => { state.home = e.target.value; render(); });
  document.getElementById('age').addEventListener('input', e => { state.age = e.target.value; render(); });
  document.getElementById('sex').addEventListener('change', e => { state.sex = e.target.value; render(); });

  // Category tabs
  document.querySelectorAll('#cat-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#cat-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderDDx(tab.dataset.cat);
    });
  });
}

function updateSummaryCounts() {
  document.querySelectorAll('details.section').forEach(d => {
    const count = d.querySelectorAll('input[type=checkbox]:checked').length;
    let badge = d.querySelector('.summary-count');
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'summary-count';
        d.querySelector('summary').appendChild(badge);
      }
      badge.textContent = count;
    } else if (badge) {
      badge.remove();
    }
  });
}

// ── FUO STATUS BANNER ────────────────────────────────────────────────────────

function fuoStatus() {
  const banner = document.getElementById('fuo-status');
  if (state.febrile !== 'yes') {
    banner.className = 'fuo-banner not';
    banner.textContent = 'No documented temperature >38.3°C — FUO criteria not met. Confirm temps with a clinic thermometer.';
    return;
  }
  if (state.duration !== '3wk+') {
    banner.className = 'fuo-banner partial';
    banner.textContent = 'Prolonged febrile illness (<3 wk) — not yet classic FUO. Use this framework and reassess.';
    return;
  }
  const map = {
    classic: 'Meets criteria for CLASSIC FUO (≥3 weeks, >38.3°C, undiagnosed after adequate initial workup).',
    nosocomial: 'NOSOCOMIAL FUO. Top considerations: drug fever, C. difficile, line-associated infection, occult abscess, VTE, sinusitis.',
    neutropenic: 'NEUTROPENIC FUO — medical emergency. Empiric broad-spectrum antibiotics within 1 hour after cultures.',
    hiv: 'HIV-ASSOCIATED FUO. Consider: MAC, disseminated histo/cocci, CMV, PJP, lymphoma, IRIS.'
  };
  banner.className = 'fuo-banner meets';
  banner.textContent = map[state.setting];
}

// ── RED FLAGS ────────────────────────────────────────────────────────────────

function renderRedFlags() {
  const wrap = document.getElementById('redflags');
  const flags = [];

  // South-Central US tick-borne (RMSF/Ehrlichia)
  if (state.home === 'south_central_us' &&
      (state.exposure.has('tick') || (state.lab.has('thrombocytopenia') && state.lab.has('transaminitis')))) {
    flags.push(`<div class="redflag-strip"><strong>Tick-borne — treat empirically.</strong> South-Central US is the highest-incidence region for RMSF and Ehrlichiosis. Tick exposure or unexplained thrombocytopenia + transaminitis warrant <strong>doxycycline 100 mg BID</strong> without waiting for serology. Mortality climbs sharply after day 5.</div>`);
  }

  // GCA — older patient + head/vision + elevated ESR
  const age = parseInt(state.age);
  if (age >= 50 &&
      (state.feature.has('new_headache') || state.feature.has('jaw_claudication') ||
       state.feature.has('vision_change') || state.feature.has('scalp_tender')) &&
      (state.lab.has('esr_high') || state.lab.has('esr_very_high'))) {
    flags.push(`<div class="redflag-strip"><strong>Suspected giant cell arteritis.</strong> If vision threatened — <strong>prednisone 60 mg PO (or methylpred 1 g IV × 3 d) NOW</strong>. Temporal artery biopsy within 1–2 weeks; steroids do not invalidate biopsy if done promptly. Risk of irreversible vision loss.</div>`);
  }

  // Neutropenic fever
  if (state.setting === 'neutropenic' || state.lab.has('anc_low')) {
    flags.push(`<div class="redflag-strip"><strong>Neutropenic fever = medical emergency.</strong> Blood cultures + UA + CXR + lactate, then broad-spectrum antipseudomonal antibiotics within 1 hour. Add MRSA coverage or antifungal based on MASCC risk score.</div>`);
  }

  // Returned traveler — malaria first
  if (state.travel.has('ssafrica') || state.travel.has('south_asia') || state.travel.has('se_asia') ||
      state.travel.has('caribbean') || state.travel.has('south_america') || state.travel.has('mexico_central')) {
    flags.push(`<div class="redflag-strip"><strong>Returned traveler — rule out malaria first.</strong> Thick and thin smears × 3 over 24–48 h + RDT before any other workup. P. falciparum can kill within 24 hours. Do not anchor on more exotic diagnoses until malaria is excluded.</div>`);
  }

  // Endocarditis — high suspicion
  if ((state.feature.has('new_murmur') || state.feature.has('embolic_phenomena') || state.feature.has('splinter_hem')) &&
      (state.exposure.has('ivdu') || state.exposure.has('prosthetic'))) {
    flags.push(`<div class="redflag-strip"><strong>Endocarditis — high suspicion.</strong> Blood cultures × 3 from separate sites BEFORE antibiotics, then TTE → TEE. Consider empiric coverage only if patient is toxic or hemodynamically unstable.</div>`);
  }

  // Disseminated TB
  if ((state.exposure.has('hiv') || state.exposure.has('immunosuppressed') || state.exposure.has('tb_contact')) &&
      state.feature.has('weight_loss') && state.feature.has('night_sweats')) {
    flags.push(`<div class="redflag-strip"><strong>Consider disseminated / miliary TB.</strong> Sputum AFB × 3, urine AFB if GU symptoms, blood AFB cultures, IGRA. Empiric RIPE if rapidly deteriorating with high pre-test probability.</div>`);
  }

  // SBP in cirrhotic
  if (state.exposure.has('cirrhosis') && state.feature.has('ascites')) {
    flags.push(`<div class="redflag-strip"><strong>SBP must be excluded.</strong> Diagnostic paracentesis is mandatory in any cirrhotic with fever or change in ascites. PMN ≥250 cells/mm³ = SBP — treat empirically with cefotaxime + albumin.</div>`);
  }

  // HLH
  if (state.lab.has('ferritin_extreme') &&
      (state.lab.has('pancytopenia') || (state.lab.has('thrombocytopenia') && state.lab.has('anemia'))) &&
      state.feature.has('splenomegaly')) {
    flags.push(`<div class="redflag-strip"><strong>Suspected HLH / macrophage activation syndrome.</strong> Ferritin >10,000 + cytopenias + splenomegaly = HLH until proven otherwise. Immediate hematology + rheumatology consult. Check triglycerides, fibrinogen, NK activity, sIL-2R. Do not treat as refractory sepsis without excluding HLH.</div>`);
  }

  // Vibrio — Gulf Coast + liver disease + shellfish
  if ((state.home === 'gulf_coast' || state.exposure.has('raw_shellfish')) &&
      (state.exposure.has('cirrhosis') || state.exposure.has('immunosuppressed') || state.exposure.has('hbv_hcv'))) {
    flags.push(`<div class="redflag-strip"><strong>Vibrio vulnificus — high-risk patient.</strong> Gulf Coast raw shellfish or saltwater wound + liver disease/immunosuppression. Hemorrhagic bullae = hallmark. Empiric <strong>doxycycline + ceftriaxone immediately</strong>. Surgical evaluation for any wound.</div>`);
  }

  // DRESS
  if (state.exposure.has('new_med') &&
      (state.feature.has('morbilliform') || state.feature.has('lad_generalized')) &&
      (state.lab.has('eosinophilia') || state.lab.has('transaminitis'))) {
    flags.push(`<div class="redflag-strip"><strong>Possible DRESS syndrome.</strong> New medication + rash + LAD + eosinophilia/transaminitis. Stop the suspect drug immediately. Monitor for liver, renal, and cardiac involvement. Consider systemic steroids.</div>`);
  }

  wrap.innerHTML = flags.length
    ? flags.join('')
    : '<div class="empty">No emergent red flags from current inputs — but always reassess clinically.</div>';
}

// ── CHECKLISTS ────────────────────────────────────────────────────────────────

function renderChecklist(listId, items) {
  const ul = document.getElementById(listId);
  ul.innerHTML = items.map(item => `
    <li onclick="this.classList.toggle('done'); this.querySelector('input').checked = this.classList.contains('done')">
      <input type="checkbox" onclick="event.stopPropagation(); this.parentElement.classList.toggle('done', this.checked)">
      <div>
        <span>${item.text}</span>
        ${item.why ? `<span class="why">→ ${item.why}</span>` : ''}
      </div>
    </li>
  `).join('');
}

function renderDontDo() {
  const wrap = document.getElementById('dontdo');
  wrap.innerHTML = DONTDO.map(d => `
    <div class="card warn">
      <strong style="color: var(--warning); font-family: 'JetBrains Mono', monospace; font-size: 12.5px; text-transform: uppercase; letter-spacing: 0.05em;">${d.strong}</strong>
      <p style="margin-top:6px; color: var(--text-dim); font-size: 13.5px;">${d.text}</p>
    </div>
  `).join('');
}

// ── DDX RENDERING ────────────────────────────────────────────────────────────

let currentDDxFilter = 'all';

function renderDDx(filter) {
  if (filter) currentDDxFilter = filter;
  const wrap = document.getElementById('ddx-list');

  const scored = DISEASES.map(d => {
    const s = scoreDisease(d);
    return { d, score: s.score, matches: s.matches };
  });

  // Update tab counts
  const counts = { all: 0, infection: 0, malignancy: 0, inflammatory: 0, misc: 0 };
  scored.forEach(x => {
    if (x.score > 0 || x.d.alwaysConsider) {
      counts.all++;
      counts[x.d.category]++;
    }
  });
  for (const k in counts) {
    const el = document.getElementById('n-' + k);
    if (el) el.textContent = counts[k];
  }

  let filtered = scored.filter(x => x.score > 0 || x.d.alwaysConsider);
  if (currentDDxFilter !== 'all') {
    filtered = filtered.filter(x => x.d.category === currentDDxFilter);
  }

  // Sort by score desc; alwaysConsider at bottom of zero-score group
  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.d.alwaysConsider && !b.d.alwaysConsider) return 1;
    if (!a.d.alwaysConsider && b.d.alwaysConsider) return -1;
    return 0;
  });

  if (filtered.length === 0) {
    wrap.innerHTML = '<div class="empty">No matches in this category yet. Add clinical features and exposures on the left.</div>';
    return;
  }

  wrap.innerHTML = filtered.map(x => renderDiseaseCard(x.d, x.score, x.matches)).join('');
}

function renderDiseaseCard(d, score, matches) {
  let cardClass = 'card';
  if (score >= 8) cardClass += ' high';
  if (d.redFlag) cardClass += ' alert';

  const regionalBadge = d.regional ? `<span class="badge regional">regional</span>` : '';
  const globalBadge = d.globalFlag ? `<span class="badge global">traveler</span>` : '';
  const matchBadge = score > 0 ? `<span class="badge match">${score} pt${score > 1 ? 's' : ''}</span>` : '';

  return `
    <div class="${cardClass}">
      <div class="card-head">
        <div>
          <h3>${d.name}</h3>
          <div style="margin-top: 4px; display: flex; gap: 4px; flex-wrap: wrap;">
            <span class="badge ${d.category}">${d.category}</span>
            ${regionalBadge}${globalBadge}${matchBadge}
          </div>
        </div>
      </div>
      ${matches.length
        ? `<div class="matches">${matches.map(m => `<span class="match-tag">${lbl(m)}</span>`).join('')}</div>`
        : `<div style="font-size: 12px; color: var(--text-muted); margin: 4px 0 8px; font-family: 'JetBrains Mono', monospace;">⤷ always consider</div>`
      }
      <div class="row"><div class="label">Look for</div><div><ul>${d.lookFor.map(x => `<li>${x}</li>`).join('')}</ul></div></div>
      <div class="row"><div class="label">Order</div><div><ul>${d.order.map(x => `<li>${x}</li>`).join('')}</ul></div></div>
      ${d.redFlag ? `<div class="alert-note"><strong>Red flag:</strong> ${d.redFlag}${d.empiricRx ? `<br><strong>Empiric Rx:</strong> ${d.empiricRx}` : ''}</div>` : ''}
      ${d.refs && d.refs.length ? `<div class="card-refs">${d.refs.map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ref-link">${r.label} ↗</a>`).join('')}</div>` : ''}
    </div>
  `;
}

// ── MASTER RENDER ─────────────────────────────────────────────────────────────

function render() {
  fuoStatus();
  renderRedFlags();
  renderChecklist('stage1-list', STAGE1);
  renderChecklist('stage2-list', STAGE2);
  renderChecklist('stage3-list', STAGE3);
  renderDDx();
  renderDontDo();
}

// ── UTILITY ACTIONS ───────────────────────────────────────────────────────────

function resetAll() {
  if (!confirm('Clear all inputs?')) return;
  state.travel.clear();
  state.exposure.clear();
  state.feature.clear();
  state.lab.clear();
  state.age = '';
  state.sex = '';
  state.home = 'other_us';
  document.querySelectorAll('.chip input').forEach(i => {
    i.checked = false;
    i.parentElement.classList.remove('active');
  });
  document.getElementById('age').value = '';
  document.getElementById('sex').value = '';
  document.getElementById('home').value = 'other_us';
  updateSummaryCounts();
  document.getElementById('summary-output').classList.remove('shown');
  render();
}

function generateSummary() {
  const out = document.getElementById('summary-output');
  const lines = [];
  lines.push('FUO WORKUP — Case Summary');
  lines.push('Generated: ' + new Date().toLocaleString());
  lines.push('='.repeat(48));
  lines.push('');
  lines.push(`FUO type: ${state.setting}`);
  lines.push(`Patient: ${state.age || '?'} y/o ${state.sex || '?'}`);
  lines.push(`Resides: ${lbl(state.home)}`);
  if (state.travel.size) lines.push(`Travel: ${[...state.travel].map(lbl).join(', ')}`);
  if (state.exposure.size) lines.push(`Exposures: ${[...state.exposure].map(lbl).join(', ')}`);
  if (state.feature.size) lines.push(`Features: ${[...state.feature].map(lbl).join(', ')}`);
  if (state.lab.size) lines.push(`Lab clues: ${[...state.lab].map(lbl).join(', ')}`);
  lines.push('');
  lines.push('-- TOP DIFFERENTIAL --');

  const scored = DISEASES.map(d => {
    const s = scoreDisease(d);
    return { d, score: s.score, matches: s.matches };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

  scored.forEach((x, i) => {
    lines.push(`${i + 1}. ${x.d.name}  [${x.score} pts]  (${x.d.category})`);
    lines.push(`   matches: ${x.matches.map(lbl).join(', ')}`);
    if (x.d.redFlag) lines.push(`   *** RED FLAG: ${x.d.redFlag}`);
    if (x.d.empiricRx) lines.push(`   Empiric Rx: ${x.d.empiricRx}`);
  });

  lines.push('');
  lines.push('-- ALWAYS CONSIDER (regardless of features) --');
  DISEASES
    .filter(d => d.alwaysConsider && !scored.some(s => s.d.id === d.id))
    .forEach(d => lines.push(`• ${d.name} (${d.category})`));

  out.textContent = lines.join('\n');
  out.classList.add('shown');
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── TEACHING PANEL ───────────────────────────────────────────────────────────

function openTeachPanel() {
  document.getElementById('teach-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTeachPanel() {
  document.getElementById('teach-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function expandAllTeachSections() {
  document.querySelectorAll('.teach-section').forEach(d => { d.open = true; });
}

function collapseAllTeachSections() {
  document.querySelectorAll('.teach-section').forEach(d => { d.open = false; });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeTeachPanel();
});

// ── INIT ──────────────────────────────────────────────────────────────────────

bindInputs();
render();
