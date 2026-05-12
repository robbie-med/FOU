# FUO Workup — robbie.med

Interactive clinical decision support tool for **fever of unknown origin** workup. Four static files — no build step, no server, no dependencies. Drop the folder on GitHub Pages or open `fuo-workup.html` directly in a browser.

---

## What it is

A reactive, exposure-driven differential generator for FUO. You check off patient features (geography, travel, exposures, symptoms, lab clues) and the tool scores and ranks 68 diseases in real time, shows you *why* each diagnosis is on the list, fires red-flag alerts with empiric treatment recommendations, and outputs a copyable case summary.

Geography is handled in two evidence-based layers (Bleeker-Rovers et al., *Ann Intern Med* 2007; Wright & Auwaerter, *Open Forum Infect Dis* 2020):

- **Residence** — where the patient *lives* (endemic baseline risk). Six US epidemiological zones plus "Outside US."
- **Travel** — where the patient has *recently been* (imported-disease risk).

---

## What's in it

**68 diseases across 4 categories**

| Category | Count | Examples |
|---|---|---|
| Infection | 35 | TB, endocarditis, RMSF, Lyme, malaria, histoplasmosis, dengue, Vibrio, Chagas |
| Malignancy | 9 | Hodgkin/NHL, leukemia, RCC, HCC, myeloma, atrial myxoma |
| Inflammatory | 16 | Still's, GCA, SLE, ANCA vasculitis, sarcoid, HLH/MAS, VEXAS, IgG4-RD, Kikuchi |
| Misc | 8 | Drug fever, VTE, IBD, factitious fever, adrenal insufficiency, alcoholic hepatitis |

**Panels and features**

- **Reactive DDx** — diseases score from weighted triggers (exposures, symptoms, labs, home region). The list re-ranks on every chip click. Match tags show exactly which inputs moved a disease up the list.
- **Red-flag strip** — fires on combined criteria, not individual flags. Examples: tick exposure + South-Central US + thrombocytopenia/transaminitis → empiric doxycycline prompt; ferritin >50,000 + cytopenias + splenomegaly → HLH workup; Gulf Coast residence + raw shellfish + cirrhosis → Vibrio empiric coverage.
- **Always-consider diseases** — TB, endocarditis, Hodgkin, NHL, occult abscess, GCA, drug fever, and VTE appear in the DDx regardless of inputs, because they're missed often enough to warrant a standing reminder.
- **Three staged checklists** — Stage 1 (initial evaluation), Stage 2 (if no PDC after stage 1), Stage 3 (persistent FUO, advanced workup). Items are clickable strikethrough for use at the bedside.
- **Don't-do panel** — shotgun antibiotics, premature steroids, antipyretics, skipping the mouth/skin, etc.
- **Case summary generator** — outputs a plain-text block with FUO type, demographics, inputs, top ranked differential with scores, and always-consider list.
- **Print stylesheet** — hides the input panel, prints the workup as a clean handout.

---

## File structure

```
fuo-workup.html    # Page skeleton, chip inputs, layout — edit for UI/structure changes
fuo-workup.css     # All styles — edit for visual changes
diseases.js        # Disease objects, staged checklists — edit to add/modify diseases
app.js             # Scoring engine, rendering, state — edit for logic changes
```

`fuo-workup.html` loads `fuo-workup.css` in `<head>` and loads `diseases.js` then `app.js` at the bottom of `<body>`. No build step; edit and refresh.

---

## How it works

### State

```js
const state = {
  febrile: 'yes', duration: '3wk+', setting: 'classic',
  home: 'other_us', age: '', sex: '',
  travel: new Set(), exposure: new Set(), feature: new Set(), lab: new Set()
};
```

The four `Set` objects hold active checkbox values. `home` is a string. Every input change calls `render()`.

### Scoring

Each disease has a `triggers` array of `[fieldValue, weight]` pairs:

```js
{
  id: 'rmsf', name: 'Rocky Mountain Spotted Fever',
  category: 'infection', regional: true,
  triggers: [
    ['tick', 6], ['rash_wrists_ankles', 6], ['south_central_us', 3],
    ['thrombocytopenia', 3], ['transaminitis', 3], ['hyponatremia', 3],
    ['new_headache', 2], ['myalgia', 2]
  ],
  ...
}
```

`scoreDisease()` iterates triggers and checks all four state Sets **plus** `state.home`:

```js
const hit = state.travel.has(field) || state.exposure.has(field) ||
            state.feature.has(field) || state.lab.has(field) ||
            state.home === field;
```

The DDx list sorts by score descending. `alwaysConsider: true` diseases appear at the bottom of the zero-score group.

### Red flags

`renderRedFlags()` checks combined conditions against `state` directly — it doesn't use the scoring system. Each condition is a logical `&&` / `||` check that produces a colored alert strip with specific empiric treatment text. Conditions intentionally require *multiple* criteria to avoid alert fatigue.

---

## How to add a disease

Add an object to the `DISEASES` array in **`diseases.js`**:

```js
{
  id: 'unique_id',           // string, used internally
  name: 'Display name',      // shown in the card header
  category: 'infection',     // 'infection' | 'malignancy' | 'inflammatory' | 'misc'

  // optional flags
  alwaysConsider: true,      // show even at score 0
  regional: true,            // shows "regional" badge
  globalFlag: true,          // shows "Global / traveler" badge

  triggers: [
    ['field_value', weight], // weight: 1–8 (see calibration notes below)
    ...
  ],

  lookFor: [                 // bullet points shown on the card
    'Clinical clue 1',
    'Clinical clue 2',
  ],

  order: [                   // what to order — bullets on the card
    'Test or action 1',
    'Test or action 2',
  ],

  // optional
  redFlag: 'Text shown in the red alert box at the bottom of the card.',
  empiricRx: 'Drug, dose, route — shown alongside redFlag.',
}
```

### Available trigger field values

**Home region** (`state.home`): `other_us`, `ms_ohio_valley`, `south_central_us`, `sw_us`, `northeast_greatlakes`, `pacific_nw`, `gulf_coast`, `outside_us`

**Travel** (`state.travel`): `mexico_central`, `south_america`, `caribbean`, `ssafrica`, `me_nafrica`, `south_asia`, `se_asia`, `mediterranean`, `sw_us`

**Exposure** (`state.exposure`): `cattle_sheep_goat`, `raw_milk`, `undercooked_meat`, `rabbit_wildgame`, `tick`, `mosquito`, `cats_kittens`, `cat_feces`, `birds_bats`, `caves`, `demolition`, `river_valley`, `freshwater`, `deer_hunt`, `recent_surgery`, `indwelling_line`, `prosthetic`, `dental_work`, `ivdu`, `transfusion`, `immunosuppressed`, `hiv`, `transplant`, `new_med`, `msm_new_partners`, `commercial_sex`, `tb_contact`, `incarcerated`, `homeless`, `alcohol_use`, `medical_personnel`, `hbv_hcv`, `cirrhosis`, `raw_shellfish`

**Feature** (`state.feature`): `weight_loss`, `night_sweats`, `drenching_sweats`, `pruritus`, `periodic_pattern`, `quotidian`, `alcohol_ln_pain`, `early_anorexia`, `family_periodic_fever`, `new_headache`, `jaw_claudication`, `scalp_tender`, `vision_change`, `uveitis`, `facial_pain`, `dental_pain`, `pharyngitis`, `new_murmur`, `embolic_phenomena`, `splinter_hem`, `dyspnea`, `cough`, `hemoptysis`, `pleuritic_pain`, `leg_swelling`, `atypical_pneumonia`, `rash_wrists_ankles`, `salmon_evanescent`, `erythema_nodosum`, `malar_rash`, `ulcers_genital`, `morbilliform`, `lad_localized`, `lad_generalized`, `splenomegaly`, `hepatomegaly`, `arthralgia`, `arthritis`, `prox_stiff`, `myalgia`, `sacroiliitis`, `bone_pain`, `abd_pain`, `ruq_pain`, `chronic_diarrhea`, `jaundice`, `ascites`, `hematuria`, `dysuria_no_bact`, `flank_pain`, `mononeuritis`, `conj_suffusion`

**Lab** (`state.lab`): `leukocytosis`, `leukopenia`, `anc_low`, `eosinophilia`, `atypical_lymph`, `blasts`, `anemia`, `hemolytic_anemia`, `thrombocytopenia`, `thrombocytosis`, `pancytopenia`, `polycythemia`, `transaminitis`, `cholestasis`, `hyponatremia`, `hypercalcemia`, `elevated_ldh`, `esr_high`, `esr_very_high`, `crp_high`, `ferritin_high`, `ferritin_extreme`, `procalcitonin_high`, `ck_high`, `pyuria_sterile`, `hematuria_lab`, `proteinuria`, `hilar_lad_cxr`, `relative_brady`, `rel_well`

### Weight calibration

| Weight | Meaning |
|---|---|
| 1–2 | Supportive / non-specific |
| 3–4 | Moderately specific or important |
| 5–6 | Highly specific or nearly pathognomonic |
| 7–8 | Reserved for near-defining features (e.g., malaria + SSA travel) |

---

## How to add a new input chip

1. Add the `<label class="chip">` element to the appropriate `<details>` section in **`fuo-workup.html`**, with a unique `value`:
   ```html
   <label class="chip"><input type="checkbox" value="my_new_field"><span>Display label</span></label>
   ```
2. Add a human-readable label to the `LABELS` object in **`app.js`**:
   ```js
   my_new_field: 'display label',
   ```
3. Reference `my_new_field` in any disease's `triggers` array in **`diseases.js`**.

The chip is picked up automatically by the `data-multi` binding — no additional JS needed.

---

## How to add a home region

1. Add an `<option>` to the `<select id="home">` in **`fuo-workup.html`**:
   ```html
   <option value="my_region">Region display name</option>
   ```
2. Add the key to `LABELS` in **`app.js`**:
   ```js
   my_region: 'Region display name',
   ```
3. Add `['my_region', weight]` to any disease's `triggers` array in **`diseases.js`**.
4. If a red-flag condition applies, add a block to `renderRedFlags()` in **`app.js`**.

---

## How to add a red flag

Add a block inside `renderRedFlags()` in **`app.js`**:

```js
if (state.exposure.has('some_field') && state.feature.has('other_field')) {
  flags.push(`<div class="redflag-strip">
    <strong>Short label.</strong> Explanation and empiric action.
  </div>`);
}
```

Red flags require *combined* criteria (not a single trigger) to avoid alert fatigue.

---

## Deployment

The four files are self-contained. Options:

- **GitHub Pages** — commit the folder to any Pages-enabled repo. It renders immediately.
- **Local** — open `fuo-workup.html` directly in a browser. No server needed.
- **Embedded** — `fuo-workup.html` can be iframed into an existing page without modification.

No state persistence by design — no cookies, no localStorage, no server calls. Safe for clinical environments where no PHI should be stored.

---

*Educational support only — not a substitute for clinical judgment. robbie.med*
