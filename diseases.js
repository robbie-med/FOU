// diseases.js — FUO knowledge base
// To add a disease: append an object to DISEASES following the schema below.
// Trigger field values must match chip values in fuo-workup.html.
// Weights: 1-2 supportive, 3-4 moderately specific, 5-6 highly specific, 7-8 near-pathognomonic.

const DISEASES = [

  // ── INFECTIONS ──────────────────────────────────────────────────────────────

  {
    id: 'tb', name: 'Tuberculosis (incl. extrapulmonary, miliary)',
    category: 'infection', alwaysConsider: true, globalFlag: true,
    triggers: [
      ['tb_contact', 4], ['hiv', 4], ['homeless', 3], ['incarcerated', 3],
      ['immunosuppressed', 3], ['weight_loss', 2], ['night_sweats', 2],
      ['hemoptysis', 3], ['cough', 2], ['lad_localized', 1],
      ['hypercalcemia', 2], ['pyuria_sterile', 2],
      ['ssafrica', 2], ['south_asia', 2], ['se_asia', 2], ['outside_us', 2]
    ],
    lookFor: [
      'Chronic cough, hemoptysis, weight loss, drenching night sweats',
      'Cervical lymphadenitis (scrofula)',
      'Sterile pyuria (genitourinary TB)',
      'Bone/joint pain — Pott disease of spine',
      'Miliary pattern on CXR; cryptic disseminated TB in elderly/immunosuppressed'
    ],
    order: [
      'CXR; CT chest if normal but suspicion remains',
      'IGRA (preferred over PPD)',
      'Sputum AFB × 3 with cultures, NAAT',
      'Urine AFB if GU symptoms; LP if CNS suspected; bone marrow/liver bx for miliary'
    ],
    redFlag: 'Miliary or CNS TB — start empiric RIPE in immunosuppressed FUO with weight loss + night sweats.',
    refs: [
      { label: 'CDC TB', url: 'https://www.cdc.gov/tb/hcp/clinical-overview/index.html' }
    ]
  },

  {
    id: 'endocarditis', name: 'Subacute infective endocarditis',
    category: 'infection', alwaysConsider: true,
    triggers: [
      ['ivdu', 5], ['prosthetic', 5], ['dental_work', 3], ['indwelling_line', 3],
      ['new_murmur', 5], ['embolic_phenomena', 4], ['splinter_hem', 4],
      ['recent_surgery', 1], ['thrombocytopenia', 1], ['hematuria_lab', 2],
      ['proteinuria', 1], ['anemia', 1]
    ],
    lookFor: [
      'New / changing regurgitant murmur',
      'Janeway lesions, Osler nodes, Roth spots, splinter hemorrhages',
      'Embolic stroke, splenic/renal infarcts, mycotic aneurysm',
      'Microscopic hematuria from immune-complex glomerulonephritis'
    ],
    order: [
      'Blood cultures × 3 from separate sites, BEFORE antibiotics',
      'TTE; if non-diagnostic and suspicion remains → TEE',
      'CBC, ESR, CRP, RF, urinalysis',
      'Culture-negative workup: Bartonella, Coxiella (Q fever), Brucella, fungal'
    ],
    redFlag: 'If patient toxic / prosthetic valve / acute decompensation — empiric coverage after blood cultures.',
    refs: [
      { label: 'IDSA/AHA guideline', url: 'https://www.idsociety.org/practice-guideline/endocarditis-management/' }
    ]
  },

  {
    id: 'brucellosis', name: 'Brucellosis',
    category: 'infection', regional: true,
    triggers: [
      ['cattle_sheep_goat', 5], ['raw_milk', 5], ['undercooked_meat', 3],
      ['mediterranean', 3], ['me_nafrica', 3], ['south_central_us', 2],
      ['sacroiliitis', 3], ['transaminitis', 2], ['leukopenia', 2],
      ['hepatomegaly', 1], ['splenomegaly', 2], ['arthralgia', 1], ['night_sweats', 2]
    ],
    lookFor: [
      'Undulant fever pattern, malodorous sweats',
      'Sacroiliitis or peripheral arthritis',
      'Hepatosplenomegaly, mild transaminitis',
      'Can cause culture-negative endocarditis'
    ],
    order: [
      'Brucella serology (SAT) and blood cultures (hold ≥21 days; alert lab)',
      'Bone marrow culture if blood cultures negative',
      'MRI SI joints if back pain'
    ],
    refs: [
      { label: 'CDC Brucellosis', url: 'https://www.cdc.gov/brucellosis/hcp/clinical-overview/' }
    ]
  },

  {
    id: 'qfever', name: 'Q fever (Coxiella burnetii)',
    category: 'infection', regional: true,
    triggers: [
      ['cattle_sheep_goat', 5], ['raw_milk', 3], ['south_central_us', 2],
      ['transaminitis', 3], ['atypical_pneumonia', 3], ['cough', 1],
      ['hepatomegaly', 2], ['prosthetic', 2]
    ],
    lookFor: [
      'Atypical pneumonia with markedly elevated AST/ALT',
      'Granulomatous hepatitis ("doughnut granulomas")',
      'Chronic Q fever: culture-negative endocarditis (esp prosthetic valve)'
    ],
    order: [
      'Coxiella burnetii phase I and II IgG (IFA)',
      'Echocardiography if persistent fever or cardiac history',
      'Doxycycline if highly suspected with hepatitis'
    ],
    refs: [
      { label: 'CDC Q fever', url: 'https://www.cdc.gov/q-fever/hcp/clinical-guidance/index.html' }
    ]
  },

  {
    id: 'rmsf', name: 'Rocky Mountain Spotted Fever',
    category: 'infection', regional: true,
    triggers: [
      ['tick', 6], ['rash_wrists_ankles', 6], ['new_headache', 2],
      ['myalgia', 2], ['thrombocytopenia', 3], ['transaminitis', 3],
      ['hyponatremia', 3], ['south_central_us', 3]
    ],
    lookFor: [
      'South-Central US (OK, AR, MO, KS, TN) accounts for >60% of US cases',
      'Maculopapular → petechial rash starting wrists/ankles → central (palms/soles late)',
      'Rash absent or late in first 5 days — "spotless" RMSF possible',
      'Triad: fever + headache + myalgia in spring/summer',
      'Hyponatremia, thrombocytopenia, transaminitis are classic lab findings'
    ],
    order: [
      'EMPIRIC doxycycline immediately — do not wait for serology',
      'RMSF IgG/IgM (acute and convalescent at 2–4 wk)',
      'Skin biopsy with IFA if rash present',
      'PCR available at some reference labs'
    ],
    redFlag: 'Mortality rises sharply after day 5. Treat empirically on any suspicion — tick exposure or unexplained thrombocytopenia + transaminitis in South-Central US.',
    empiricRx: 'Doxycycline 100 mg PO/IV BID (all ages including children — AAP-endorsed)',
    refs: [
      { label: 'CDC RMSF', url: 'https://www.cdc.gov/rocky-mountain-spotted-fever/hcp/clinical-care/index.html' }
    ]
  },

  {
    id: 'ehrlichiosis', name: 'Ehrlichiosis / Anaplasmosis',
    category: 'infection', regional: true,
    triggers: [
      ['tick', 5], ['leukopenia', 3], ['thrombocytopenia', 3],
      ['transaminitis', 3], ['new_headache', 2], ['myalgia', 2],
      ['south_central_us', 3]
    ],
    lookFor: [
      'Lone Star tick (Amblyomma americanum) endemic in South-Central and SE US',
      'Headache, fever, myalgias WITHOUT prominent rash in adults',
      'Leukopenia + thrombocytopenia + transaminitis triad',
      'Morulae in monocytes (Ehrlichia) or granulocytes (Anaplasma) on smear — rarely seen'
    ],
    order: [
      'Empiric doxycycline — same urgency as RMSF',
      'PCR (most sensitive in first week of illness)',
      'Serology (IFA) acute + convalescent at 2–4 wk'
    ],
    refs: [
      { label: 'CDC Ehrlichiosis', url: 'https://www.cdc.gov/ehrlichiosis/hcp/clinical-overview/index.html' }
    ]
  },

  {
    id: 'tularemia', name: 'Tularemia',
    category: 'infection', regional: true,
    triggers: [
      ['rabbit_wildgame', 6], ['tick', 4], ['deer_hunt', 3],
      ['lad_localized', 3], ['transaminitis', 2], ['south_central_us', 3]
    ],
    lookFor: [
      'South-Central US (OK, AR, KS, MO) has highest national incidence',
      'Ulceroglandular: painful ulcer at inoculation site + regional lymphadenopathy',
      'Typhoidal form: undifferentiated fever, no rash, hepatosplenomegaly',
      'Pneumonic form from aerosol exposure — can be severe'
    ],
    order: [
      'Tularemia serology (microagglutination); titer ≥1:160 suggestive',
      'HIGH BIOHAZARD — do not culture without alerting lab; biosafety level 3',
      'Streptomycin or gentamicin preferred; ciprofloxacin alternative'
    ],
    refs: [
      { label: 'CDC Tularemia', url: 'https://www.cdc.gov/tularemia/hcp/clinical-care/index.html' }
    ]
  },

  {
    id: 'lyme', name: 'Lyme disease (Borrelia burgdorferi)',
    category: 'infection', regional: true,
    triggers: [
      ['northeast_greatlakes', 5], ['tick', 5],
      ['arthritis', 4], ['mononeuritis', 3],
      ['new_headache', 2], ['myalgia', 2], ['lad_localized', 1]
    ],
    lookFor: [
      'Ixodes scapularis belt: New England, Mid-Atlantic, upper Midwest (MN, WI)',
      'Erythema migrans (~80% of early Lyme) may have resolved before FUO presentation',
      'Early disseminated: facial palsy (bilateral), AV block, meningitis, multiple EM',
      'Late Lyme: oligoarticular large-joint arthritis (esp knee), subtle encephalopathy',
      'Seronegative in first 2–4 weeks — repeat if suspicion persists'
    ],
    order: [
      'Two-tier Lyme serology: ELISA, reflex to IgM + IgG Western blot if positive/equivocal',
      'Lyme PCR on synovial fluid if Lyme arthritis suspected',
      'LP with CSF Lyme Ab index if neurologic symptoms',
      'ECG if palpitations or syncope (AV block in early disseminated Lyme)'
    ],
    refs: [
      { label: 'CDC Lyme', url: 'https://www.cdc.gov/lyme/hcp/clinical-care/index.html' }
    ]
  },

  {
    id: 'babesiosis', name: 'Babesiosis (Babesia microti)',
    category: 'infection', regional: true,
    triggers: [
      ['northeast_greatlakes', 5], ['tick', 5],
      ['hemolytic_anemia', 5], ['thrombocytopenia', 3],
      ['splenomegaly', 2], ['transaminitis', 2],
      ['immunosuppressed', 3], ['transplant', 2]
    ],
    lookFor: [
      'Same Ixodes scapularis tick as Lyme — co-infection common, check both',
      '"Maltese cross" tetrad form on peripheral smear — pathognomonic when present',
      'Hemolytic anemia, thrombocytopenia, transaminitis, splenomegaly',
      'Severe disease in asplenic, elderly, and immunosuppressed — potentially fatal',
      'Can persist for months in immunocompromised hosts'
    ],
    order: [
      'Thick and thin Giemsa smear (Maltese cross tetrad)',
      'Babesia PCR — more sensitive than smear, especially low-level parasitemia',
      'B. microti serology (IgG/IgM)',
      'Check concurrent Lyme ELISA and Anaplasmosis PCR',
      'Atovaquone + azithromycin (mild-moderate); clindamycin + quinine (severe)'
    ]
  },

  {
    id: 'histo', name: 'Histoplasmosis',
    category: 'infection', regional: true,
    triggers: [
      ['ms_ohio_valley', 5], ['birds_bats', 5], ['caves', 4],
      ['demolition', 4], ['river_valley', 4],
      ['immunosuppressed', 3], ['hiv', 3],
      ['lad_generalized', 2], ['splenomegaly', 2], ['hepatomegaly', 2],
      ['pancytopenia', 3], ['transaminitis', 2]
    ],
    lookFor: [
      'Mississippi-Ohio River Valley endemic; highest in MO, TN, KY, AR, IN, OH',
      'Disseminated in immunocompromised: pancytopenia, hepatosplenomegaly, mucosal ulcers',
      'Mediastinal lymphadenopathy on imaging',
      'Adrenal involvement can lead to adrenal insufficiency'
    ],
    order: [
      'Histoplasma urine + serum antigen (best sensitivity in disseminated disease)',
      'Serology (CF and ID) for non-disseminated',
      'Bone marrow biopsy with stains/culture if disseminated suspected'
    ],
    refs: [
      { label: 'CDC Histoplasmosis', url: 'https://www.cdc.gov/histoplasmosis/hcp/clinical-overview/index.html' }
    ]
  },

  {
    id: 'blasto', name: 'Blastomycosis',
    category: 'infection', regional: true,
    triggers: [
      ['ms_ohio_valley', 4], ['river_valley', 5],
      ['demolition', 2], ['bone_pain', 2], ['cough', 2]
    ],
    lookFor: [
      'Mississippi-Ohio Valley and Great Lakes region; also SE US',
      'Pulmonary disease ± verrucous/ulcerative skin lesions',
      'Bony involvement, prostatic disease',
      'Mimics malignancy on CXR — mass-like consolidation'
    ],
    order: [
      'Blastomyces urine antigen (cross-reacts with Histoplasma)',
      'Sputum/tissue fungal cultures and KOH prep',
      'Skin biopsy if lesions present'
    ],
    refs: [
      { label: 'CDC Blastomycosis', url: 'https://www.cdc.gov/blastomycosis/hcp/clinical-overview/index.html' }
    ]
  },

  {
    id: 'cocci', name: 'Coccidioidomycosis',
    category: 'infection', globalFlag: true,
    triggers: [
      ['sw_us', 5], ['mexico_central', 3], ['eosinophilia', 3],
      ['erythema_nodosum', 3], ['arthralgia', 2], ['cough', 2]
    ],
    lookFor: [
      'Sonoran Desert endemic: Arizona, central CA, southern NM, W Texas, N Mexico',
      '"Valley fever": fever + erythema nodosum/multiforme + arthralgias + eosinophilia',
      'Disseminated disease in Filipino/African ancestry, pregnancy, immunosuppression'
    ],
    order: [
      'Coccidioides serology (IgM/IgG by EIA, confirm with ID/CF)',
      'Urine antigen if disseminated suspected',
      'CXR + chest CT'
    ],
    refs: [
      { label: 'CDC Valley Fever', url: 'https://www.cdc.gov/valley-fever/hcp/clinical-overview/index.html' }
    ]
  },

  {
    id: 'ebv', name: 'EBV (mononucleosis / chronic active)',
    category: 'infection',
    triggers: [
      ['pharyngitis', 3], ['lad_generalized', 3], ['atypical_lymph', 4],
      ['splenomegaly', 3], ['transaminitis', 3], ['lad_localized', 1]
    ],
    lookFor: [
      'Exudative pharyngitis (may be remote or missed)',
      'Posterior cervical lymphadenopathy prominent',
      'Splenomegaly, transaminitis; atypical lymphocytes >10% on smear',
      'Chronic active EBV in immunosuppressed — EBV PCR essential'
    ],
    order: [
      'Heterophile antibody (monospot) — falsely negative early and in children',
      'EBV VCA IgM/IgG, EBNA',
      'EBV PCR (quantitative) if chronic active or post-transplant'
    ]
  },

  {
    id: 'cmv', name: 'CMV',
    category: 'infection',
    triggers: [
      ['transplant', 4], ['hiv', 3], ['immunosuppressed', 3],
      ['atypical_lymph', 3], ['transaminitis', 3], ['transfusion', 2]
    ],
    lookFor: [
      'Mononucleosis-like syndrome in immunocompetent (less LAD/pharyngitis than EBV)',
      'In transplant/HIV: retinitis, colitis, pneumonitis, hepatitis',
      'Tissue-invasive disease confirmed on biopsy with IHC'
    ],
    order: [
      'CMV PCR (quantitative)',
      'CMV IgM/IgG',
      'Tissue biopsy with IHC if organ-invasive suspected'
    ]
  },

  {
    id: 'acute_hiv', name: 'Acute HIV (seroconversion)',
    category: 'infection',
    triggers: [
      ['msm_new_partners', 5], ['commercial_sex', 4], ['ivdu', 4],
      ['pharyngitis', 2], ['lad_generalized', 3], ['morbilliform', 2], ['leukopenia', 2]
    ],
    lookFor: [
      'Mononucleosis-like illness 2–4 weeks after exposure',
      'Maculopapular rash, oral/genital ulcers, pharyngitis, lymphadenopathy',
      'Aseptic meningitis possible'
    ],
    order: [
      '4th-generation HIV Ag/Ab (detects p24 antigen in acute infection)',
      'HIV RNA viral load if high suspicion and Ag/Ab negative or equivocal',
      'Repeat in 2–4 weeks if initial negative and suspicion remains'
    ]
  },

  {
    id: 'dengue', name: 'Dengue fever (DENV 1–4)',
    category: 'infection', globalFlag: true,
    triggers: [
      ['caribbean', 5], ['mexico_central', 4], ['south_america', 4],
      ['se_asia', 4], ['ssafrica', 2], ['mosquito', 4],
      ['thrombocytopenia', 4], ['leukopenia', 3],
      ['myalgia', 3], ['new_headache', 2], ['transaminitis', 2], ['morbilliform', 2]
    ],
    lookFor: [
      'Most common febrile illness in returned tropical travelers after malaria',
      '"Breakbone fever": severe myalgia, arthralgia, retro-orbital headache',
      'Leukopenia + thrombocytopenia characteristic; maculopapular rash',
      'Warning signs for severe dengue: abdominal pain, persistent vomiting, mucosal bleeding, rapid deterioration',
      'Secondary infection (different serotype) markedly increases severe disease risk'
    ],
    order: [
      'NS1 antigen (days 1–5 of illness), dengue IgM/IgG (from day 5)',
      'Dengue PCR if early in illness',
      'Daily CBC if thrombocytopenic — watch for nadir',
      'No aspirin or NSAIDs — hemorrhage risk',
      'Supportive care; no specific antiviral'
    ]
  },

  {
    id: 'toxo', name: 'Toxoplasmosis',
    category: 'infection',
    triggers: [
      ['cat_feces', 4], ['undercooked_meat', 4], ['immunosuppressed', 3],
      ['hiv', 3], ['lad_localized', 3], ['atypical_lymph', 1]
    ],
    lookFor: [
      'Bilateral non-tender posterior cervical LAD in immunocompetent',
      'Reactivation in HIV/transplant: encephalitis (ring-enhancing lesions on MRI)',
      'Chorioretinitis'
    ],
    order: [
      'Toxoplasma IgM/IgG (avidity testing for timing)',
      'CSF PCR if CNS disease suspected',
      'Brain MRI in HIV with CD4 <100'
    ]
  },

  {
    id: 'csd', name: 'Cat scratch disease (Bartonella henselae)',
    category: 'infection',
    triggers: [
      ['cats_kittens', 6], ['lad_localized', 4]
    ],
    lookFor: [
      'Tender regional LAD draining the inoculation site, weeks after kitten scratch',
      'Atypical: hepatosplenic disease, neuroretinitis, FUO especially in children',
      'B. quintana: trench fever, culture-negative endocarditis (homeless populations)'
    ],
    order: [
      'Bartonella henselae IgG (titers ≥1:256 suggestive)',
      'PCR or Warthin-Starry stain on tissue if diagnosis uncertain',
      'Echo if endocarditis suspected (culture-negative)'
    ]
  },

  {
    id: 'chagas', name: 'Chagas disease (Trypanosoma cruzi) — chronic',
    category: 'infection', globalFlag: true,
    triggers: [
      ['south_america', 5], ['mexico_central', 3], ['caribbean', 2],
      ['outside_us', 2], ['transfusion', 2],
      ['immunosuppressed', 3], ['hiv', 3], ['transplant', 3], ['dyspnea', 2]
    ],
    lookFor: [
      'Latin American origin or immigration — >8 million infected worldwide',
      'Chronic phase: dilated cardiomyopathy with apical aneurysm, arrhythmias, megaesophagus/megacolon',
      'Reactivation in immunosuppressed: subcutaneous nodules, encephalitis with ring-enhancing lesions',
      'Triatomine "kissing bug" exposure; also blood transfusion and vertical transmission',
      'Romaña sign (periorbital edema) only in acute phase, often missed'
    ],
    order: [
      'Two serologic assays required (ELISA + IFA or RIPA) per PAHO/WHO guidelines',
      'PCR (high sensitivity in acute phase and reactivation)',
      'Thick and thin smear in acute phase',
      'ECG (RBBB + left anterior fascicular block = classic pattern), echocardiography',
      'Benznidazole or nifurtimox — most effective early; still recommended in chronic phase'
    ]
  },

  {
    id: 'typhoid', name: 'Typhoid / paratyphoid (S. typhi)',
    category: 'infection', globalFlag: true,
    triggers: [
      ['south_asia', 6], ['mexico_central', 3], ['ssafrica', 3],
      ['relative_brady', 4], ['leukopenia', 3], ['transaminitis', 2],
      ['hepatomegaly', 1], ['abd_pain', 2], ['outside_us', 2]
    ],
    lookFor: [
      'Stepwise fever, relative bradycardia (Faget sign)',
      'Rose spots (faint blanching trunk macules, 2–4 mm)',
      'Constipation early → diarrhea later; risk of intestinal perforation in week 3'
    ],
    order: [
      'Blood cultures × 3 (highest yield in week 1)',
      'Stool and bone marrow culture (highest overall sensitivity)',
      'Typhidot / Widal serology limited utility'
    ]
  },

  {
    id: 'malaria', name: 'Malaria',
    category: 'infection', globalFlag: true,
    triggers: [
      ['ssafrica', 8], ['south_asia', 5], ['se_asia', 5],
      ['caribbean', 3], ['south_america', 4], ['mexico_central', 3],
      ['periodic_pattern', 4], ['hemolytic_anemia', 4],
      ['thrombocytopenia', 3], ['mosquito', 4], ['splenomegaly', 2]
    ],
    lookFor: [
      'Periodic fever: tertian (q48h, P. vivax/ovale/falciparum), quartan (q72h, P. malariae)',
      'Hemolytic anemia, thrombocytopenia, hyperbilirubinemia',
      'P. falciparum: cerebral malaria, ARDS, AKI, severe anemia — medical emergency'
    ],
    order: [
      'Thick and thin smears × 3 over 24–48 h + rapid diagnostic test (RDT)',
      'Quantify parasitemia % if positive',
      'PCR for species confirmation in select cases'
    ],
    redFlag: 'ALWAYS rule out malaria FIRST in any febrile returned traveler from endemic area. Falciparum can kill within 24 hours.',
    refs: [
      { label: 'CDC Malaria', url: 'https://www.cdc.gov/malaria/hcp/clinical-guidance/index.html' }
    ]
  },

  {
    id: 'leish', name: 'Visceral leishmaniasis (kala-azar)',
    category: 'infection', globalFlag: true,
    triggers: [
      ['mediterranean', 5], ['me_nafrica', 5], ['south_asia', 5],
      ['ssafrica', 4], ['south_america', 3], ['outside_us', 2],
      ['splenomegaly', 5], ['hepatomegaly', 3], ['pancytopenia', 4], ['hiv', 3]
    ],
    lookFor: [
      'Massive splenomegaly out of proportion to clinical picture',
      'Pancytopenia, polyclonal hypergammaglobulinemia',
      'Hyperpigmentation ("kala-azar" = "black sickness" in Hindi)'
    ],
    order: [
      'rK39 rapid antigen test',
      'Bone marrow or splenic aspirate with Giemsa stain (amastigotes)',
      'PCR for Leishmania species confirmation'
    ]
  },

  {
    id: 'schisto', name: 'Schistosomiasis',
    category: 'infection', globalFlag: true,
    triggers: [
      ['freshwater', 5], ['ssafrica', 4], ['south_america', 3],
      ['se_asia', 3], ['me_nafrica', 3], ['eosinophilia', 5],
      ['hematuria', 3], ['hepatomegaly', 2]
    ],
    lookFor: [
      'Acute Katayama fever: weeks after freshwater exposure; fever + urticaria + eosinophilia',
      'S. haematobium: terminal hematuria, bladder dysfunction',
      'S. mansoni/japonicum: hepatosplenic disease, portal hypertension'
    ],
    order: [
      'Stool and/or urine for ova (concentrated technique)',
      'Schistosoma serology (Sm/Sj/Sh)',
      'Eosinophil count; biopsy of bladder/rectum if persistent'
    ]
  },

  {
    id: 'amebic', name: 'Amebic liver abscess (E. histolytica)',
    category: 'infection', globalFlag: true,
    triggers: [
      ['mexico_central', 4], ['south_asia', 4], ['ssafrica', 3],
      ['ruq_pain', 4], ['cholestasis', 3], ['hepatomegaly', 3], ['leukocytosis', 1]
    ],
    lookFor: [
      'Single right hepatic lobe abscess, typically without prior dysentery',
      'RUQ pain, fever, tender hepatomegaly, elevated alkaline phosphatase',
      'Stool typically negative for trophozoites by the time abscess forms'
    ],
    order: [
      'US or CT abdomen',
      'E. histolytica serology (highly sensitive in extra-intestinal disease)',
      'Aspirate ("anchovy paste") only if diagnosis unclear or rupture risk'
    ]
  },

  {
    id: 'lepto', name: 'Leptospirosis',
    category: 'infection', globalFlag: true,
    triggers: [
      ['freshwater', 5], ['conj_suffusion', 5], ['jaundice', 3],
      ['transaminitis', 2], ['thrombocytopenia', 2]
    ],
    lookFor: [
      'Freshwater, sewer, or rodent exposure — occupational or recreational',
      'Conjunctival suffusion (injection without discharge) — very characteristic',
      'Biphasic illness; Weil disease = jaundice + AKI + hemorrhage'
    ],
    order: [
      'Leptospira IgM (MAT is reference; IgM ELISA widely available)',
      'PCR (highest sensitivity in acute febrile phase)',
      'Blood culture in first week, urine culture after'
    ]
  },

  {
    id: 'melioidosis', name: 'Melioidosis (Burkholderia pseudomallei)',
    category: 'infection', globalFlag: true,
    triggers: [
      ['se_asia', 5], ['south_asia', 3], ['outside_us', 2],
      ['immunosuppressed', 3],
      ['cough', 2], ['hemoptysis', 2], ['weight_loss', 2]
    ],
    lookFor: [
      'Endemic in SE Asia, N Australia, Indian subcontinent — dramatically underdiagnosed globally',
      'Diabetes is the single strongest risk factor, even in immunocompetent hosts',
      'Mimics TB: pulmonary cavities, weight loss, chronic cough — but AFB negative',
      'Protean presentations: pneumonia, liver/splenic abscesses, septicemia, skin lesions',
      'Blood cultures positive in up to 60% of acute septicemic form'
    ],
    order: [
      'Blood cultures (alert lab — grows on routine media but can be missed)',
      'Culture of sputum, wound, urine as appropriate',
      'CT chest and abdomen (cavitary lesions, multiple abscesses)',
      'IV ceftazidime or meropenem (intensive phase), then TMP-SMX (eradication phase)'
    ]
  },

  {
    id: 'whipple', name: 'Whipple disease (T. whipplei)',
    category: 'infection',
    triggers: [
      ['chronic_diarrhea', 4], ['arthralgia', 3], ['weight_loss', 3], ['lad_generalized', 2]
    ],
    lookFor: [
      'Older male; chronic seronegative arthralgia often precedes GI symptoms by years',
      'Diarrhea, malabsorption, weight loss',
      'CNS involvement: oculomasticatory myorhythmia — pathognomonic if present'
    ],
    order: [
      'Duodenal biopsy: PAS-positive macrophages (foamy appearance)',
      'T. whipplei PCR on tissue, CSF, or synovial fluid'
    ]
  },

  {
    id: 'relapsing_fever', name: 'Relapsing fever (tick-borne / louse-borne Borrelia)',
    category: 'infection', regional: true,
    triggers: [
      ['tick', 4], ['periodic_pattern', 5],
      ['homeless', 3], ['incarcerated', 2],
      ['caves', 3], ['pacific_nw', 2],
      ['thrombocytopenia', 2], ['hepatomegaly', 2], ['splenomegaly', 2]
    ],
    lookFor: [
      'Tick-borne (B. hermsii/turicatae): western US mountains, rustic cabins with rodent exposure',
      'Louse-borne (B. recurrentis): homeless and refugee populations worldwide',
      'Febrile episodes 3–7 days with asymptomatic intervals of similar length',
      'Spirochetes visible on Wright-Giemsa blood smear during febrile episode',
      'Warn patients: Jarisch-Herxheimer reaction common after first antibiotic dose'
    ],
    order: [
      'Peripheral smear during febrile episode (Wright-Giemsa stain)',
      'Borrelia PCR — more sensitive than smear',
      'Serology less reliable for relapsing fever Borrelia species',
      'Doxycycline (tick-borne); doxycycline or erythromycin (louse-borne)'
    ]
  },

  {
    id: 'crypto', name: 'Cryptococcosis (C. neoformans / C. gattii)',
    category: 'infection',
    triggers: [
      ['hiv', 5], ['immunosuppressed', 4], ['transplant', 4],
      ['pacific_nw', 3],
      ['new_headache', 3], ['vision_change', 2], ['lad_generalized', 1]
    ],
    lookFor: [
      'C. neoformans: HIV/immunosuppressed; subacute meningitis — CD4 usually <100 in HIV',
      'C. gattii: Pacific NW and BC; can infect immunocompetent hosts',
      'Often presents as FUO + progressive headache before meningismus develops',
      'Opening pressure may be very high (>250 mm H₂O) — manage with serial LPs'
    ],
    order: [
      'Serum cryptococcal antigen (CrAg) — >95% sensitivity, excellent screen',
      'CT head before LP; LP: India ink, CrAg, fungal culture, opening pressure',
      'Blood fungal cultures',
      'Liposomal amphotericin B + flucytosine (severe/CNS); fluconazole (mild-moderate)'
    ]
  },

  {
    id: 'actinomycosis', name: 'Actinomycosis (Actinomyces spp.)',
    category: 'infection',
    triggers: [
      ['dental_pain', 4], ['dental_work', 3], ['facial_pain', 3],
      ['abd_pain', 3], ['ruq_pain', 2], ['weight_loss', 2]
    ],
    lookFor: [
      'Classic "great masquerader" — mimics malignancy, TB, and abscess',
      'Cervicofacial (most common): indolent jaw/neck swelling with sinus tracts after dental trauma',
      'Thoracic: lung mass with chest wall extension',
      'Abdominal/pelvic: RLQ mass (mimics appendiceal tumor); IUD-associated pelvic actinomycosis',
      'Sulfur granules in draining sinuses — hallmark; months of low-grade fever typical'
    ],
    order: [
      'CT of affected region — dense fibrotic mass, sinus tracts, crosses anatomic planes',
      'Tissue biopsy with anaerobic culture (notify lab; may take >2 weeks)',
      'Sulfur granules on histology: gram-positive branching filamentous rods',
      'High-dose penicillin for 6–12 months is curative'
    ]
  },

  {
    id: 'vibrio', name: 'Vibrio vulnificus septicemia',
    category: 'infection', regional: true,
    triggers: [
      ['gulf_coast', 6], ['raw_shellfish', 6],
      ['cirrhosis', 5], ['hbv_hcv', 3], ['immunosuppressed', 4],
      ['alcohol_use', 2], ['leukocytosis', 1]
    ],
    lookFor: [
      'Gulf Coast raw oysters or warm saltwater wound exposure (May–October peak)',
      'Fulminant primary septicemia in liver disease or immunosuppression — mortality >50%',
      'Hallmark: rapidly expanding hemorrhagic bullae on extremities within hours',
      'Wound infection form: saltwater or seafood wound → necrotizing fasciitis',
      'Healthy hosts get self-limited gastroenteritis only'
    ],
    order: [
      'Blood cultures — alert lab to suspect Vibrio; grows on standard media',
      'Wound cultures + urgent surgical evaluation if skin lesions present',
      'Doxycycline + ceftriaxone empirically',
      'Rapid surgical debridement for necrotizing wound infection'
    ],
    redFlag: 'Cirrhosis + Gulf Coast raw shellfish/saltwater + hemorrhagic bullae = Vibrio vulnificus. Mortality >50% without immediate antibiotics + surgery.'
  },

  {
    id: 'abscess', name: 'Occult abscess (hepatic, splenic, perinephric, psoas)',
    category: 'infection', alwaysConsider: true,
    triggers: [
      ['ruq_pain', 3], ['flank_pain', 3], ['abd_pain', 2],
      ['cholestasis', 2], ['leukocytosis', 2], ['immunosuppressed', 2], ['recent_surgery', 2]
    ],
    lookFor: [
      'Diabetics: liver abscess (K. pneumoniae, esp Asian ancestry)',
      'Perinephric abscess: flank pain + sterile pyuria',
      'Psoas abscess: hip flexion contracture, back pain',
      'Can be remarkably silent clinically — CT is essential'
    ],
    order: [
      'CT abdomen/pelvis with IV contrast',
      'Blood cultures',
      'IR-guided drainage with culture for identification and sensitivities'
    ]
  },

  {
    id: 'osteo', name: 'Vertebral osteomyelitis / discitis',
    category: 'infection',
    triggers: [
      ['ivdu', 3], ['indwelling_line', 2], ['sacroiliitis', 2],
      ['esr_high', 3], ['esr_very_high', 4], ['bone_pain', 4]
    ],
    lookFor: [
      'Focal back pain, often without prominent fever spikes',
      'Markedly elevated ESR/CRP; may have few other clues',
      'S. aureus most common; consider Brucella, TB, and fungal in chronic or endemic-region patients'
    ],
    order: [
      'MRI spine with contrast (most sensitive imaging)',
      'Blood cultures before any antibiotics',
      'CT-guided bone biopsy if blood cultures negative'
    ]
  },

  {
    id: 'dental', name: 'Periapical / dental abscess',
    category: 'infection',
    triggers: [
      ['dental_pain', 4], ['dental_work', 1]
    ],
    lookFor: [
      'Often missed — look in the mouth on every FUO evaluation',
      'Can seed endocarditis or form brain abscess',
      'Tender on percussion of individual teeth'
    ],
    order: [
      'Dental exam + panoramic X-ray (Panorex)',
      'CT face/neck if deep space infection suspected'
    ]
  },

  {
    id: 'sinusitis', name: 'Chronic / fungal sinusitis',
    category: 'infection',
    triggers: [
      ['facial_pain', 3], ['immunosuppressed', 2]
    ],
    lookFor: [
      'Often underappreciated in hospitalized or NGT-dependent patients',
      'Invasive fungal sinusitis in immunosuppressed = surgical emergency'
    ],
    order: [
      'CT sinuses without contrast',
      'ENT consult for endoscopic evaluation and biopsy if invasive fungal suspected'
    ]
  },

  // ── MALIGNANCY ───────────────────────────────────────────────────────────────

  {
    id: 'hodgkin', name: 'Hodgkin lymphoma',
    category: 'malignancy', alwaysConsider: true,
    triggers: [
      ['weight_loss', 3], ['drenching_sweats', 3], ['night_sweats', 2],
      ['pruritus', 4], ['alcohol_ln_pain', 5], ['lad_localized', 4],
      ['periodic_pattern', 2], ['esr_high', 2], ['elevated_ldh', 2]
    ],
    lookFor: [
      'Bimodal age distribution: young adults and age >55',
      'Pel-Ebstein fever: cyclic 1–2 week on/off pattern',
      'Cervical or mediastinal LAD, often rubbery and painless',
      'Classic clues: alcohol-induced LN pain, pruritus after hot bath'
    ],
    order: [
      'Contrast CT neck/chest/abdomen/pelvis',
      'Excisional lymph node biopsy — NOT fine-needle aspiration',
      'PET-CT for staging',
      'LDH, CBC, ESR, beta-2-microglobulin'
    ]
  },

  {
    id: 'nhl', name: 'Non-Hodgkin lymphoma',
    category: 'malignancy', alwaysConsider: true,
    triggers: [
      ['weight_loss', 2], ['drenching_sweats', 2], ['night_sweats', 2],
      ['lad_generalized', 4], ['hepatomegaly', 2], ['splenomegaly', 3],
      ['elevated_ldh', 3], ['anemia', 1], ['hiv', 2], ['immunosuppressed', 2]
    ],
    lookFor: [
      'Generalized LAD more common than Hodgkin lymphoma',
      'Extranodal sites: GI tract, CNS, skin, testes',
      'High LDH suggests aggressive histology'
    ],
    order: [
      'Excisional lymph node biopsy with flow cytometry',
      'CT and PET-CT for staging',
      'Bone marrow biopsy',
      'LDH, uric acid, CMP, HIV, HBV, HCV serology'
    ]
  },

  {
    id: 'leukemia', name: 'Acute leukemia',
    category: 'malignancy',
    triggers: [
      ['blasts', 6], ['pancytopenia', 4], ['anc_low', 3],
      ['bone_pain', 3], ['lad_generalized', 1], ['splenomegaly', 2],
      ['anemia', 1], ['thrombocytopenia', 2], ['elevated_ldh', 1]
    ],
    lookFor: [
      'Pancytopenia or blast cells on peripheral smear',
      'Gum hypertrophy (AML M5), DIC with APL (M3)',
      'Bone pain, especially prominent in children'
    ],
    order: [
      'Peripheral smear with manual differential — look for blasts',
      'Bone marrow biopsy with flow cytometry, cytogenetics, FISH, molecular',
      'LDH, uric acid, coagulation studies + fibrinogen (DIC screen)'
    ]
  },

  {
    id: 'rcc', name: 'Renal cell carcinoma',
    category: 'malignancy',
    triggers: [
      ['hematuria', 4], ['hematuria_lab', 4], ['flank_pain', 3],
      ['weight_loss', 2], ['polycythemia', 3], ['hypercalcemia', 2], ['elevated_ldh', 1]
    ],
    lookFor: [
      'Classic triad (hematuria + flank pain + palpable mass) present in only ~10%',
      'Can present with FUO alone — the "internist\'s tumor"',
      'Paraneoplastic: erythrocytosis (EPO), hypercalcemia (PTHrP), Stauffer syndrome'
    ],
    order: [
      'CT abdomen/pelvis with and without contrast (renal mass protocol)',
      'Urinalysis',
      'CBC, calcium, alkaline phosphatase'
    ]
  },

  {
    id: 'hcc', name: 'Hepatocellular carcinoma',
    category: 'malignancy',
    triggers: [
      ['cirrhosis', 5], ['hbv_hcv', 4], ['alcohol_use', 2],
      ['ruq_pain', 3], ['weight_loss', 3], ['jaundice', 2],
      ['hepatomegaly', 3], ['transaminitis', 1]
    ],
    lookFor: [
      'Underlying cirrhosis: HBV, HCV, alcohol, MASLD',
      'Decompensation of previously stable cirrhosis can be presenting feature',
      'Often missed if surveillance imaging is not current'
    ],
    order: [
      'Multiphase liver CT or MRI (LI-RADS criteria)',
      'AFP (insensitive alone — do not use as sole screen)'
    ]
  },

  {
    id: 'myxoma', name: 'Atrial myxoma',
    category: 'malignancy',
    triggers: [
      ['embolic_phenomena', 4], ['new_murmur', 3], ['weight_loss', 2],
      ['esr_high', 2], ['anemia', 1]
    ],
    lookFor: [
      'Constitutional symptoms mimicking endocarditis or vasculitis',
      'Tumor "plop" on auscultation; murmur changes with position',
      'Embolic stroke in young patient without other risk factors'
    ],
    order: [
      'TTE (usually diagnostic); TEE for confirmation and surgical planning',
      'Cardiac MRI for tissue characterization'
    ]
  },

  {
    id: 'castleman', name: 'Castleman disease',
    category: 'malignancy',
    triggers: [
      ['lad_generalized', 4], ['lad_localized', 2], ['hiv', 3],
      ['anemia', 2], ['elevated_ldh', 1], ['splenomegaly', 2]
    ],
    lookFor: [
      'Unicentric: single LN mass, often mediastinal or abdominal',
      'Multicentric: HHV-8 associated, often with HIV; systemic illness',
      'IL-6 driven inflammation — IL-6 levels can be very high'
    ],
    order: [
      'Excisional LN biopsy with HHV-8 immunostaining',
      'HIV and HHV-8 serology, IL-6 levels',
      'CT staging'
    ]
  },

  {
    id: 'mm', name: 'Multiple myeloma',
    category: 'malignancy',
    triggers: [
      ['bone_pain', 4], ['anemia', 3], ['hypercalcemia', 4], ['esr_very_high', 3]
    ],
    lookFor: [
      'CRAB: hyperCalcemia, Renal failure, Anemia, Bone lesions',
      'Rouleaux formation on smear; markedly elevated total protein with low albumin'
    ],
    order: [
      'SPEP and serum free light chains (kappa/lambda ratio)',
      'UPEP with Bence Jones protein',
      'Skeletal survey or whole-body low-dose CT / PET',
      'Bone marrow biopsy if abnormal protein studies'
    ]
  },

  {
    id: 'crc', name: 'Colorectal carcinoma',
    category: 'malignancy',
    triggers: [
      ['weight_loss', 2], ['anemia', 3], ['abd_pain', 1]
    ],
    lookFor: [
      'Iron-deficiency anemia in adult male or post-menopausal female — colonoscopy required',
      'Right-sided CRC may present with FUO via local inflammation or secondary infection'
    ],
    order: [
      'Colonoscopy',
      'CT abdomen/pelvis',
      'Iron studies, CEA'
    ]
  },

  // ── INFLAMMATORY / RHEUMATIC ─────────────────────────────────────────────────

  {
    id: 'still', name: "Adult-onset Still's disease",
    category: 'inflammatory',
    triggers: [
      ['quotidian', 5], ['salmon_evanescent', 5], ['pharyngitis', 3],
      ['arthritis', 3], ['arthralgia', 2], ['leukocytosis', 4],
      ['ferritin_high', 3], ['ferritin_extreme', 5],
      ['lad_generalized', 2], ['splenomegaly', 2], ['hepatomegaly', 1], ['elevated_ldh', 1]
    ],
    lookFor: [
      'Yamaguchi criteria: quotidian fever, salmon rash, arthralgia, leukocytosis',
      'Sore throat is an underappreciated early feature',
      'Markedly elevated ferritin (often >10,000); low glycosylated ferritin fraction'
    ],
    order: [
      'Ferritin (and glycosylated ferritin fraction if available)',
      'CBC with differential, LFTs, ESR/CRP',
      'ANA and RF (typically negative in Still\'s disease)',
      'Rheumatology consult'
    ]
  },

  {
    id: 'gca', name: 'Giant cell arteritis (temporal arteritis)',
    category: 'inflammatory', alwaysConsider: true,
    triggers: [
      ['new_headache', 4], ['jaw_claudication', 6], ['scalp_tender', 5],
      ['vision_change', 6], ['prox_stiff', 3],
      ['esr_high', 3], ['esr_very_high', 5], ['anemia', 2]
    ],
    lookFor: [
      'Age ≥50 essentially always; peak incidence in 70s',
      'New headache + jaw claudication + scalp tenderness + visual symptoms',
      'PMR overlap in ~50%; ESR usually >50; CRP more sensitive'
    ],
    order: [
      'START high-dose prednisone IMMEDIATELY if vision is threatened — do not wait for biopsy',
      'Temporal artery biopsy within 1–2 weeks of starting steroids',
      'Temporal artery ultrasound ("halo sign") if available',
      'CT or MR angiography for large-vessel involvement'
    ],
    redFlag: 'Risk of irreversible vision loss. Any FUO patient ≥50 with elevated ESR and head/visual symptoms — treat empirically before biopsy.',
    empiricRx: 'Prednisone 40–60 mg/d (or IV methylprednisolone 1 g/d × 3 if visual symptoms)',
    refs: [
      { label: 'ACR vasculitis guideline', url: 'https://rheumatology.org/vasculitis-guideline' }
    ]
  },

  {
    id: 'pmr', name: 'Polymyalgia rheumatica',
    category: 'inflammatory',
    triggers: [
      ['prox_stiff', 5], ['esr_high', 3], ['esr_very_high', 3], ['arthralgia', 1]
    ],
    lookFor: [
      'Age ≥50; bilateral shoulder + hip girdle aching/stiffness',
      'Morning stiffness >45 minutes',
      'Dramatic response to prednisone 15 mg within days'
    ],
    order: [
      'ESR, CRP, CK (CK normal in PMR — if high, reconsider myositis)',
      'Trial of prednisone 15 mg with clinical response as confirmation',
      'Screen for concurrent GCA in all PMR patients'
    ]
  },

  {
    id: 'sle', name: 'Systemic lupus erythematosus',
    category: 'inflammatory',
    triggers: [
      ['malar_rash', 4], ['arthritis', 2], ['arthralgia', 2],
      ['pleuritic_pain', 2], ['leukopenia', 3], ['thrombocytopenia', 2],
      ['anemia', 2], ['proteinuria', 3], ['hematuria_lab', 2]
    ],
    lookFor: [
      'Young female predominantly; multisystem involvement',
      'Malar rash, photosensitivity, oral ulcers, serositis, arthritis, nephritis, cytopenias',
      'Acute SLE can present as FUO without skin or joint findings'
    ],
    order: [
      'ANA (sensitive screen), then anti-dsDNA, anti-Smith (specific)',
      'Complement C3/C4 (low in active disease)',
      'Urinalysis with microscopy, spot UPCR',
      'CBC, antiphospholipid panel'
    ]
  },

  {
    id: 'pan', name: 'Polyarteritis nodosa',
    category: 'inflammatory',
    triggers: [
      ['mononeuritis', 5], ['hbv_hcv', 3], ['abd_pain', 2],
      ['weight_loss', 2], ['proteinuria', 2], ['hematuria_lab', 2]
    ],
    lookFor: [
      'Medium-vessel vasculitis — lungs spared (unlike ANCA vasculitis)',
      'Hypertension, renal infarcts, mesenteric ischemia',
      'Mononeuritis multiplex (foot drop, wrist drop)',
      'HBV association in ~30% of cases'
    ],
    order: [
      'CT angiography of abdominal vasculature (microaneurysms)',
      'HBV serology',
      'Tissue biopsy (sural nerve or skin)',
      'ANCA typically NEGATIVE in PAN — if positive, reconsider GPA/MPA'
    ]
  },

  {
    id: 'anca', name: 'ANCA-associated vasculitis (GPA, MPA, EGPA)',
    category: 'inflammatory',
    triggers: [
      ['facial_pain', 3], ['hemoptysis', 4], ['eosinophilia', 4],
      ['mononeuritis', 3], ['proteinuria', 3], ['hematuria_lab', 4], ['atypical_pneumonia', 3]
    ],
    lookFor: [
      'GPA: sinus/nasal disease + lung nodules + glomerulonephritis (c-ANCA/PR3)',
      'MPA: pulmonary-renal syndrome (p-ANCA/MPO)',
      'EGPA: asthma + eosinophilia + peripheral neuropathy (p-ANCA in ~40%)'
    ],
    order: [
      'ANCA (PR3, MPO), urinalysis with microscopy (RBC casts)',
      'CT chest and sinus imaging',
      'Renal or pulmonary biopsy for definitive diagnosis'
    ]
  },

  {
    id: 'hlh', name: 'HLH / Macrophage activation syndrome (MAS)',
    category: 'inflammatory',
    triggers: [
      ['ferritin_extreme', 8], ['ferritin_high', 3],
      ['pancytopenia', 5], ['splenomegaly', 4],
      ['transaminitis', 3], ['elevated_ldh', 3],
      ['hiv', 3], ['immunosuppressed', 2], ['transplant', 3], ['lad_generalized', 2]
    ],
    lookFor: [
      'HLH-2004 criteria (≥5/8): fever, splenomegaly, ≥2-line cytopenias, hypertriglyceridemia, low fibrinogen, ferritin ≥500, hemophagocytosis on BM, absent/low NK activity',
      'Ferritin >10,000 is ~90% sensitive for HLH in adults with systemic inflammation',
      'MAS = secondary HLH in rheumatic disease context (Still\'s, SLE, AOSD)',
      'Triggers: EBV, CMV, HIV, lymphoma, sepsis, rheumatic flare',
      'Frequently mistaken for refractory sepsis — critical distinction'
    ],
    order: [
      'Ferritin (if >500: add triglycerides, fibrinogen, NK activity, sIL-2R/CD25)',
      'Peripheral smear; bone marrow biopsy for hemophagocytosis',
      'Viral panel: EBV PCR, CMV PCR, HIV, parvovirus B19',
      'Immediate hematology + rheumatology consult',
      'HLH protocol: dexamethasone ± etoposide; cyclosporine for MAS/Still\'s'
    ],
    redFlag: 'Ferritin >10,000 + cytopenias + splenomegaly = HLH until proven otherwise. Life-threatening — do not treat as refractory sepsis without excluding HLH.'
  },

  {
    id: 'vexas', name: 'VEXAS syndrome (UBA1 mutation)',
    category: 'inflammatory',
    triggers: [
      ['anemia', 3], ['thrombocytopenia', 2], ['pancytopenia', 2],
      ['esr_very_high', 3], ['crp_high', 2]
    ],
    lookFor: [
      'Described 2020 (Beck et al., NEJM) — somatic UBA1 mutation in hematopoietic stem cells',
      'Almost exclusively males, typically >50 years; refractory steroid-dependent inflammation',
      'Overlap with relapsing polychondritis (ear/nose), Sweet syndrome, vasculitis, MDS features',
      'Vacuoles in myeloid and erythroid precursors on bone marrow biopsy — key clue',
      'Consider in any older male with unexplained cytopenias + refractory systemic inflammation'
    ],
    order: [
      'UBA1 mutation testing (peripheral blood DNA — send to reference lab)',
      'Bone marrow biopsy (cytoplasmic vacuoles in precursors, dysplastic features)',
      'CT chest/abdomen/pelvis',
      'Rheumatology + hematology co-management; JAK inhibitors and azacitidine under study'
    ]
  },

  {
    id: 'igg4', name: 'IgG4-related disease (IgG4-RD)',
    category: 'inflammatory',
    triggers: [
      ['lad_generalized', 3], ['lad_localized', 2],
      ['ruq_pain', 3], ['cholestasis', 3], ['jaundice', 2],
      ['weight_loss', 2], ['esr_high', 2]
    ],
    lookFor: [
      'Middle-aged males predominate; fibro-inflammatory disease affecting multiple organs',
      'Classic sites: pancreas (autoimmune pancreatitis type 1), bile ducts, salivary/lacrimal glands, orbits, kidneys, aorta',
      'Pancreatic mass + obstructive jaundice frequently resected as cancer before diagnosis',
      'Serum IgG4 >135 mg/dL in ~70% — but non-specific; can be normal in disease',
      'Dramatic steroid response is characteristic'
    ],
    order: [
      'Serum IgG4 level',
      'CT/MRI chest, abdomen, pelvis (sausage-shaped pancreas, rim-enhancing aortic wall)',
      'Tissue biopsy: IgG4+ plasma cells >10/hpf, storiform fibrosis, obliterative phlebitis',
      'Prednisone trial (dramatic response supports diagnosis)',
      'Rheumatology referral; rituximab or azathioprine for refractory/relapsing disease'
    ]
  },

  {
    id: 'kikuchi', name: 'Kikuchi-Fujimoto disease (necrotizing histiocytic lymphadenitis)',
    category: 'inflammatory',
    triggers: [
      ['lad_localized', 5], ['lad_generalized', 2], ['leukopenia', 3]
    ],
    lookFor: [
      'Young females, often of Asian or Hispanic descent; self-limited — resolves in 1–4 months',
      'Tender posterior cervical lymphadenopathy is hallmark',
      'Leukopenia common; ANA may be weakly positive',
      'Associated with SLE in 5–30% of cases — follow up after resolution',
      'FNA insufficient for diagnosis; excisional biopsy required'
    ],
    order: [
      'Excisional lymph node biopsy (posterior cervical preferred)',
      'ANA (screen for associated SLE)',
      'EBV, CMV, HIV, Toxoplasma (exclusion)',
      'CBC (leukopenia common)',
      'NSAIDs or hydroxychloroquine for symptom relief — no specific treatment'
    ]
  },

  {
    id: 'reactive_arthritis', name: 'Reactive arthritis',
    category: 'inflammatory',
    triggers: [
      ['arthritis', 4], ['sacroiliitis', 4], ['dysuria_no_bact', 3],
      ['chronic_diarrhea', 3], ['uveitis', 3], ['arthralgia', 2], ['msm_new_partners', 2]
    ],
    lookFor: [
      'Triggered 1–4 weeks after GI infection (Salmonella, Shigella, Campylobacter, Yersinia) or GU Chlamydia',
      'Classic triad: asymmetric oligoarthritis + urethritis + uveitis',
      'HLA-B27 in ~70%; sacroiliitis and axial involvement possible',
      'Circinate balanitis, keratoderma blennorrhagica (palmar/plantar psoriasiform lesions)'
    ],
    order: [
      'HLA-B27',
      'Chlamydia NAAT (urine, urethral, or cervical)',
      'Stool culture if GI illness preceded arthritis',
      'MRI SI joints if sacroiliitis suspected',
      'NSAIDs first line; sulfasalazine or biologics (TNF-i) for chronic disease'
    ]
  },

  {
    id: 'dermatomyositis', name: 'Dermatomyositis / polymyositis',
    category: 'inflammatory',
    triggers: [
      ['ck_high', 5], ['prox_stiff', 4], ['myalgia', 3],
      ['malar_rash', 2], ['weight_loss', 2]
    ],
    lookFor: [
      'Proximal muscle weakness + elevated CK (can be >10,000 IU/L)',
      'DM-specific: heliotrope rash (periorbital), Gottron papules (MCP/PIP), V-sign, shawl sign',
      'Interstitial lung disease in ~30% — check anti-Jo-1',
      'Adult DM associated with malignancy in ~30% — requires oncologic screening',
      'Antisynthetase syndrome: ILD + arthritis + mechanic\'s hands + fever'
    ],
    order: [
      'CK, aldolase, LDH',
      'ANA, anti-Jo-1, comprehensive myositis panel (anti-Mi-2, MDA5, TIF1-gamma, NXP2)',
      'CT chest/abdomen/pelvis (ILD evaluation + malignancy screen)',
      'MRI of muscles (distribution of edema and inflammation)',
      'Muscle biopsy if diagnosis uncertain'
    ]
  },

  {
    id: 'takayasu', name: 'Takayasu arteritis',
    category: 'inflammatory',
    triggers: [
      ['esr_high', 2], ['weight_loss', 2]
    ],
    lookFor: [
      'Young female, often of Asian descent — "pulseless disease"',
      'BP discrepancy between arms, claudication, arterial bruits',
      'Constitutional pre-pulseless phase can present as FUO for months'
    ],
    order: [
      'CT or MR angiography of aorta and branches',
      'ESR, CRP'
    ]
  },

  {
    id: 'behcet', name: 'Behçet disease',
    category: 'inflammatory',
    triggers: [
      ['ulcers_genital', 6], ['uveitis', 4],
      ['mediterranean', 3], ['me_nafrica', 3], ['erythema_nodosum', 2]
    ],
    lookFor: [
      'Recurrent oral + genital ulcers + uveitis (classic triad)',
      'Pathergy: sterile pustule at needle-stick site (test with intradermal saline)',
      'Highest prevalence along the ancient Silk Road'
    ],
    order: [
      'Clinical diagnosis (ICBD criteria)',
      'Ophthalmology referral for uveitis',
      'HLA-B51 association — supportive but not diagnostic'
    ]
  },

  {
    id: 'fmf', name: 'Familial Mediterranean fever',
    category: 'inflammatory',
    triggers: [
      ['periodic_pattern', 5], ['family_periodic_fever', 5],
      ['mediterranean', 4], ['me_nafrica', 4],
      ['abd_pain', 3], ['pleuritic_pain', 2], ['arthritis', 2], ['arthralgia', 2]
    ],
    lookFor: [
      'Recurrent 1–3 day febrile attacks with serositis (abdominal, pleural, joint, scrotal)',
      'Ethnic predisposition: Sephardic Jewish, Armenian, Turkish, Arab',
      'Risk of AA amyloidosis and renal failure if untreated for years',
      'Colchicine prevents attacks and amyloidosis — response is diagnostic'
    ],
    order: [
      'Clinical diagnosis (Tel Hashomer criteria)',
      'MEFV gene testing for confirmation',
      'Trial of colchicine — dramatic response is diagnostic'
    ]
  },

  {
    id: 'sarcoid', name: 'Sarcoidosis',
    category: 'inflammatory',
    triggers: [
      ['hilar_lad_cxr', 5], ['erythema_nodosum', 4], ['uveitis', 3],
      ['cough', 1], ['dyspnea', 2], ['arthralgia', 2],
      ['hypercalcemia', 3], ['cholestasis', 2]
    ],
    lookFor: [
      'Bilateral hilar LAD on CXR is highly suggestive',
      'Löfgren syndrome: hilar LAD + erythema nodosum + arthritis (good prognosis)',
      'Hypercalcemia from extrarenal 1,25-hydroxyvitamin D production',
      'Granulomatous hepatitis can be FUO presentation without pulmonary findings'
    ],
    order: [
      'CXR + chest CT',
      'ACE level, calcium, alkaline phosphatase',
      'Biopsy of accessible tissue (skin, peripheral LN, liver) for non-caseating granulomas'
    ]
  },

  // ── MISCELLANEOUS ────────────────────────────────────────────────────────────

  {
    id: 'drug_fever', name: 'Drug fever',
    category: 'misc', alwaysConsider: true,
    triggers: [
      ['new_med', 6], ['morbilliform', 3], ['eosinophilia', 3],
      ['relative_brady', 2], ['rel_well', 3], ['transaminitis', 2]
    ],
    lookFor: [
      'Common culprits: anticonvulsants, allopurinol, sulfonamides, beta-lactams, minocycline, antipsychotics, procainamide',
      'Patient often appears WELL despite fever — key clue',
      'Relative bradycardia, eosinophilia, mild transaminitis',
      'Fever can persist for years if the culprit drug is never stopped'
    ],
    order: [
      'STOP all nonessential medications',
      'Fever should resolve within 72 hours (up to 7 days for long half-life drugs)',
      'CBC for eosinophilia, LFTs',
      'Evaluate for DRESS if rash + systemic features (organ involvement, atypical lymphocytes)'
    ]
  },

  {
    id: 'vte', name: 'Venous thromboembolism / PE',
    category: 'misc', alwaysConsider: true,
    triggers: [
      ['leg_swelling', 4], ['dyspnea', 3], ['pleuritic_pain', 3], ['recent_surgery', 2]
    ],
    lookFor: [
      'Low-grade fever occurs in 10–20% of acute PE',
      'Risk factors: surgery, malignancy, immobilization, estrogen, hereditary thrombophilia',
      'Consider Wells score and PERC rule',
      'Paradoxical embolism through PFO in young patients'
    ],
    order: [
      'D-dimer (if low pretest probability and PERC negative)',
      'CT pulmonary angiogram or V/Q scan',
      'Lower extremity compression ultrasound',
      'Consider malignancy workup if unprovoked VTE'
    ]
  },

  {
    id: 'adrenal_insuff', name: 'Adrenal insufficiency',
    category: 'misc',
    triggers: [
      ['hyponatremia', 4], ['weight_loss', 3],
      ['immunosuppressed', 3], ['hiv', 3],
      ['tb_contact', 2], ['ssafrica', 1], ['south_asia', 1]
    ],
    lookFor: [
      'Low-grade fever, profound fatigue, anorexia, weight loss, orthostatic hypotension',
      'Hyponatremia + hyperkalemia in primary AI; eukalemic in secondary/tertiary',
      'Causes: autoimmune (most common in high-income countries), TB and fungal (global), metastatic cancer, bilateral adrenal hemorrhage',
      'Hyperpigmentation in chronic primary AI: buccal mucosa, skin creases, pressure points',
      'Can precipitate adrenal crisis with any physiologic stress'
    ],
    order: [
      'AM cortisol (<3 mcg/dL highly suggestive, >18 mcg/dL essentially excludes)',
      'ACTH stimulation test (250 mcg cosyntropin; cortisol <18 at 60 min = abnormal)',
      'Plasma ACTH (elevated in primary, low/normal in secondary)',
      'CT adrenals (enlargement with calcification = TB/fungal; hemorrhage; metastases)',
      'Anti-21-hydroxylase antibodies for autoimmune etiology'
    ]
  },

  {
    id: 'alcoholic_hepatitis', name: 'Alcoholic hepatitis',
    category: 'misc',
    triggers: [
      ['alcohol_use', 6], ['jaundice', 4], ['transaminitis', 4],
      ['cholestasis', 3], ['ascites', 3], ['leukocytosis', 3]
    ],
    lookFor: [
      'Heavy alcohol use + fever + jaundice + leukocytosis = alcoholic hepatitis until proven otherwise',
      'AST:ALT ratio >2:1 (often 2–3:1); AST rarely exceeds 500 in isolated alcoholic hepatitis',
      'Calculate Maddrey discriminant function (4.6 × PT prolongation + bilirubin) — ≥32 = severe',
      'Must rule out concurrent SBP, bacteremia — co-occurs frequently and changes management',
      'Leukocytosis can reflect hepatitis itself, not only infection'
    ],
    order: [
      'LFTs with bilirubin, PT/INR, albumin, CBC',
      'Maddrey discriminant function or MELD score for severity',
      'Blood cultures; diagnostic paracentesis if ascites present',
      'RUQ ultrasound with Doppler (exclude biliary obstruction, portal vein thrombosis)',
      'Prednisolone 40 mg/d if Maddrey ≥32 and no contraindication to steroids'
    ]
  },

  {
    id: 'thyroiditis', name: 'Subacute (de Quervain) thyroiditis',
    category: 'misc',
    triggers: [
      ['pharyngitis', 2]
    ],
    lookFor: [
      'Recent viral illness; neck pain radiating to jaw or ears',
      'Thyrotoxic phase → hypothyroid phase → recovery',
      'Tender, firm thyroid on palpation'
    ],
    order: [
      'TSH, free T4, free T3',
      'Thyroid uptake scan (low uptake in subacute thyroiditis)',
      'ESR markedly elevated'
    ]
  },

  {
    id: 'ibd', name: 'Inflammatory bowel disease (Crohn / UC)',
    category: 'misc',
    triggers: [
      ['chronic_diarrhea', 4], ['abd_pain', 3], ['weight_loss', 3],
      ['arthralgia', 2], ['erythema_nodosum', 2], ['anemia', 2]
    ],
    lookFor: [
      'Crohn can present with fever + abdominal pain + weight loss without prominent diarrhea',
      'Extraintestinal manifestations: arthritis, erythema nodosum, pyoderma, uveitis, PSC',
      'Iron-deficiency anemia and low albumin are common'
    ],
    order: [
      'Fecal calprotectin',
      'Colonoscopy with biopsies',
      'CT enterography or MR enterography for small-bowel disease'
    ]
  },

  {
    id: 'cirrhosis_disease', name: 'Decompensated cirrhosis / SBP',
    category: 'misc',
    triggers: [
      ['cirrhosis', 5], ['ascites', 4], ['jaundice', 4],
      ['hbv_hcv', 3], ['alcohol_use', 3], ['hepatomegaly', 1], ['splenomegaly', 2]
    ],
    lookFor: [
      'SBP must be excluded in any cirrhotic with fever, worsening ascites, or encephalopathy',
      'Diagnostic paracentesis is mandatory — PMN ≥250 cells/mm³ = SBP'
    ],
    order: [
      'Diagnostic paracentesis (cell count + differential + culture in blood culture bottles at bedside)',
      'Third-generation cephalosporin empirically (cefotaxime or ceftriaxone)',
      'Albumin 1.5 g/kg on day 1, 1 g/kg on day 3 (prevents hepatorenal syndrome)'
    ]
  },

  {
    id: 'factitious', name: 'Factitious fever',
    category: 'misc',
    triggers: [
      ['medical_personnel', 5], ['rel_well', 3]
    ],
    lookFor: [
      'Discrepancy between fever and patient appearance / clinical status',
      'Absence of normal pulse-temperature coupling',
      'Fever documented only when unobserved',
      'Often medical, nursing, or paramedical background'
    ],
    order: [
      'Witnessed temperature with fresh thermometer (oral and rectal simultaneously)',
      'Urine temperature should match core temperature',
      'Avoid direct confrontation; involve psychiatry early'
    ]
  },

  {
    id: 'periodic_other', name: 'Other periodic fever syndromes (TRAPS, HIDS, PFAPA, CAPS)',
    category: 'misc',
    triggers: [
      ['periodic_pattern', 4], ['family_periodic_fever', 4], ['pharyngitis', 2]
    ],
    lookFor: [
      'PFAPA: pediatric — periodic Fever, Aphthous stomatitis, Pharyngitis, Adenitis',
      'TRAPS: prolonged attacks >7 days, migratory myalgia, periorbital edema',
      'HIDS: elevated IgD, vaccination-triggered attacks',
      'CAPS (MWS/FCAS): cold-induced or systemic, urticaria, sensorineural hearing loss'
    ],
    order: [
      'Genetic panel (TNFRSF1A, MVK, NLRP3)',
      'IgD level (HIDS)',
      'Urinary mevalonic acid during attack (HIDS)'
    ]
  }

]; // end DISEASES


// ── STAGE CHECKLISTS ─────────────────────────────────────────────────────────

const STAGE1 = [
  { text: 'Repeat comprehensive H&P (animal, travel, occupational, sexual, dietary, meds, family hx)', why: 'Single highest-yield test' },
  { text: 'Stop all nonessential medications (drug fever workup)' },
  { text: 'CBC with differential and PERIPHERAL SMEAR — look at it yourself' },
  { text: 'CMP — full LFTs, renal function, electrolytes' },
  { text: 'ESR and CRP' },
  { text: 'LDH and uric acid' },
  { text: 'Creatine kinase' },
  { text: 'Urinalysis with microscopy + urine culture' },
  { text: 'Blood cultures × 3 from separate sites, OFF antibiotics' },
  { text: 'HIV 4th-gen Ag/Ab' },
  { text: 'TB IGRA (preferred over PPD)' },
  { text: 'Hepatitis B and C serologies' },
  { text: 'TSH' },
  { text: 'ANA, RF' },
  { text: 'SPEP and serum free light chains' },
  { text: 'Ferritin' },
  { text: 'CXR (or CT chest if clinical suspicion)' },
  { text: 'Age-appropriate cancer screening up to date (colon, breast, cervical, prostate, lung)' }
];

const STAGE2 = [
  { text: 'CT chest / abdomen / pelvis with IV contrast' },
  { text: 'TTE (TEE if endocarditis suspected and TTE non-diagnostic)' },
  { text: 'Procalcitonin (helps distinguish bacterial vs noninfectious inflammation)' },
  { text: 'ANCA panel (PR3, MPO) — if any sinus, pulmonary, or renal involvement' },
  { text: 'Complement levels (C3, C4)' },
  { text: 'Cryoglobulins' },
  { text: 'Repeat and complete physical exam — new findings often emerge on serial exams' },
  { text: 'Fundoscopy / formal ophtho consult (Roth spots, uveitis, choroidal TB granuloma)' },
  { text: 'Lyme two-tier serology if Northeastern/Great Lakes residence or tick exposure' },
  { text: 'Directed serologies based on exposures (Brucella, Coxiella, Bartonella, Toxoplasma, Coccidioides, Histoplasma, Babesia)' },
  { text: 'Repeat blood cultures × 3 if any cardiac concern' }
];

const STAGE3 = [
  { text: 'FDG-PET/CT — especially if CRP/ESR elevated and no localizing clue on prior imaging' },
  { text: 'Bone marrow biopsy with cultures (TB, fungal, AFB) — if cytopenias or atypical cells' },
  { text: 'Temporal artery biopsy if age ≥50 and ESR elevated' },
  { text: 'Lymph node biopsy — posterior cervical, supra/infraclavicular, or epitrochlear preferred (avoid inguinal/axillary/anterior cervical)' },
  { text: 'Liver biopsy if abnormal liver enzymes or hepatic imaging findings' },
  { text: 'TEE if any residual concern for endocarditis' },
  { text: 'Specialty consults: Infectious Disease, Rheumatology, Hematology/Oncology' },
  { text: 'Naproxen trial (Naprosyn test) — response suggests malignancy (fever suppressed); non-response suggests infection' },
  { text: 'Reconsider factitious fever; witnessed temperature measurement' }
];

const DONTDO = [
  { strong: 'Don\'t shotgun empiric broad-spectrum antibiotics', text: 'in a stable, immunocompetent patient — they mask endocarditis, TB, and lymphoma without curing them.' },
  { strong: 'Don\'t give empiric steroids', text: 'until infection (especially TB) and lymphoma are ruled out — unless GCA with vision threat or HLH is the diagnosis.' },
  { strong: 'Don\'t scattershot the imaging', text: '— targeted imaging based on PDCs (potentially diagnostic clues) outperforms whole-body imaging in low-pretest probability FUO. Exception: FDG-PET/CT in Stage 3.' },
  { strong: 'Don\'t routinely give antipyretics', text: '— they mask the fever pattern and blunt key clues (Pel-Ebstein, quotidian, periodic). Acetaminophen only if hemodynamically necessary or significant cardiac disease.' },
  { strong: 'Don\'t forget the mouth, anus, and skin folds', text: '— periapical dental abscess, perianal abscess, and intertriginous infection are missed every rotation.' },
  { strong: 'Don\'t skip the medication review', text: '— drug fever can persist for years if the culprit is never stopped. Stop ALL nonessential drugs when stuck.' },
  { strong: 'Don\'t forget to look', text: 'at the smear yourself, look at the imaging yourself, and re-examine the patient. The diagnosis frequently appears on the third pass.' }
];
