// ==========================================================================
// 1. CONFIGURAZIONE E CATALOGO DI DEFAULT A 3 LIVELLI
//    Macro-categoria -> Fornitore -> Modello -> Dati Tecnici & Descrizione
// ==========================================================================
const DEFAULT_COMPANY = {
  name: "NOME AZIENDA / SERRAMENTI",
  address: "Via delle Industrie, 12 - 00100 Roma (RM)",
  taxId: "P.IVA / C.F.: 01234567890",
  contacts: "Tel: 06 1234567 | Cell: 340 0000000 | Email: info@azienda.it",
  logo: ""
};

const DEFAULT_CATALOG = {
  "Portoncini": {
    suppliers: [
      {
        id: "supp_port_qfort",
        name: "QFORT",
        models: [
          { id: "mod_baby_stars", name: "Baby Stars", specs: "Alluminio/PVC coibentato, serratura automatica 5 punti", glass: "Vetro blindato antisfondamento", desc: "Portoncino d'ingresso ad elevata sicurezza con pannello coibentato ad alto isolamento termico ed acustico." }
        ]
      },
      {
        id: "supp_port_blindati",
        name: "Blindati Artigianali",
        models: [
          { id: "mod_classe3", name: "Porta Blindata Classe 3", specs: "Doppia lamiera zincata, cilindro europeo alta sicurezza", glass: "-", desc: "Porta blindata d'ingresso certificata classe antieffrazione 3 con defender e lama parafreddo a pavimento." }
        ]
      }
    ]
  },
  "Serramenti": {
    suppliers: [
      {
        id: "supp_ser_qfort",
        name: "QFORT",
        models: [
          { id: "mod_4_stars", name: "4 Stars (70mm - 5 camere)", specs: "70 mm - 5 camere - 2 guarnizioni di battuta", glass: "24 mm B.E. Warm Edge", desc: "Profilo in PVC classe A da 70 mm a 5 camere con rinforzi in acciaio zincato. Sistema a 2 guarnizioni di battuta in EPDM." },
          { id: "mod_5_stars", name: "5 Stars (70mm - 5 camere)", specs: "70 mm - 5 camere - 2 guarnizioni", glass: "24 mm o 30 mm B.E. Warm Edge", desc: "Design squadrato ed essenziale. Profilo in PVC da 70 mm a 5 camere, ferramenta perimetrale con scontri antieffrazione." },
          { id: "mod_7_stars", name: "7 Stars (85mm - 7 camere)", specs: "85 mm - 7 camere - 3 guarnizioni (giunto aperto)", glass: "Triplo vetro 44 mm selettivo B.E. Warm Edge", desc: "Top di gamma a taglio termico passivo. Profilo da 85 mm a 7 camere e 3 guarnizioni per case a bassissimo consumo energetico." },
          { id: "mod_stars_epiq", name: "Stars Epiq (82mm - 6 camere)", specs: "82 mm - 6 camere - 3 guarnizioni", glass: "Triplo vetro alte prestazioni", desc: "Sistema innovativo con estetica moderna e complanare o semi-complanare per grandi aperture." }
        ]
      },
      {
        id: "supp_ser_cosmet",
        name: "Cosmet",
        models: [
          { id: "mod_cosmet_sintesi", name: "Sintesi 76 (76mm - 5 camere)", specs: "76 mm - 5 camere - 2 guarnizioni", glass: "Vetrocamera 28 mm B.E. con gas Argon", desc: "Serramento in PVC Cosmet Serie Sintesi. Spessore 76 mm, ottimo bilanciamento tra leggerezza visiva ed isolamento termo-acustico." },
          { id: "mod_cosmet_diamante", name: "Diamante 84 (84mm - 6 camere)", specs: "84 mm - 6 camere - 3 guarnizioni di tenuta", glass: "Triplo vetro 48 mm selettivo acustico", desc: "Sistema top level Cosmet Diamante. Elevatissimo isolamento termico con guarnizione centrale vulcanizzata e profili rinforzati." },
          { id: "mod_cosmet_kristal", name: "Kristal (Tutto Vetro complanare)", specs: "Profilo a scomparsa con anta a tutto vetro", glass: "Vetro strutturale temperato/stratificato", desc: "Soluzione minimale Cosmet con anta a scomparsa per la massima luminosità naturale e design contemporaneo." }
        ]
      },
      {
        id: "supp_ser_alluminio",
        name: "Alluminio Taglio Termico",
        models: [
          { id: "mod_all_75", name: "Serie 75 TT", specs: "75 mm taglio termico poliammide", glass: "33.1/16/33.1 B.E.", desc: "Profili estrusi in lega primaria a taglio termico. Massima indeformabilità, resistenza agli agenti atmosferici e minima manutenzione." }
        ]
      }
    ]
  },
  "Zanzariere": {
    suppliers: [
      {
        id: "supp_zanz_bettio",
        name: "Bettio",
        models: [
          { id: "mod_scenica", name: "Scenica (Senza guida a terra)", specs: "Rete in fibra di vetro, guida a terra zero barriere", glass: "Rete alta trasparenza", desc: "Zanzariera laterale senza inciampo a pavimento, arresto manuale in qualsiasi posizione intermedia." },
          { id: "mod_verticale", name: "Verticale a molla", specs: "Cassonetto 50 mm con freno frizionato", glass: "Rete grigia standard", desc: "Zanzariera classica a scorrimento verticale con guide dotate di spazzolini antivento." }
        ]
      },
      {
        id: "supp_zanz_mvline",
        name: "MV Line",
        models: [
          { id: "mod_mv_bora", name: "Bora Laterale", specs: "Sistema antivento brevettato, guida bassa 3 mm", glass: "Rete rinforzata", desc: "Zanzariera ad avvolgimento laterale resistente a forti raffiche di vento." }
        ]
      }
    ]
  },
  "Avvolgibili": {
    suppliers: [
      {
        id: "supp_avv_pinto",
        name: "Pinto",
        models: [
          { id: "mod_pinto_all", name: "Alluminio Coibentato Duero/Standard", specs: "Poliuretano espanso alta densità, terminale alluminio", glass: "-", desc: "Tapparella in alluminio coibentato ad elevata stabilità dimensionale e resistenza agli sbalzi termici." },
          { id: "mod_pinto_acc", name: "Acciaio Blindato", specs: "Lamiera di acciaio con anima in resina poliuretanica", glass: "-", desc: "Avvolgibile di sicurezza antieffrazione ad alta resistenza meccanica contro tentativi di scasso." }
        ]
      }
    ]
  },
  "Scuri": {
    suppliers: [
      {
        id: "supp_scuri_trad",
        name: "Scuri & Persiane Tradizionali",
        models: [
          { id: "mod_padovana", name: "Alla Padovana / Vicentina", specs: "Doghe verticali coibentate, bandelle e ferramenta nere", glass: "-", desc: "Oscurante tradizionale a pacchetto con ferramenta trattata per esterni ad alta resistenza corrosiva." }
        ]
      }
    ]
  },
  "Teli filtranti / oscuranti": {
    suppliers: [
      {
        id: "supp_tende_tec",
        name: "Schermature Tecniche",
        models: [
          { id: "mod_screen_filtro", name: "Telo Screen Microforato", specs: "Tessuto tecnico fibra di vetro e PVC ignifugo", glass: "-", desc: "Schermatura solare filtrante per la riduzione del carico termico estivo e protezione dal riflesso." }
        ]
      }
    ]
  },
  "Porte interne": {
    suppliers: [
      {
        id: "supp_porte_int",
        name: "Porte Interne Design",
        models: [
          { id: "mod_battente_cieca", name: "Battente Tamburata Microtek", specs: "Telaio e coprifili con guarnizione in gomma, cerniere a scomparsa", glass: "-", desc: "Porta interna moderna ad anta liscia con serratura magnetica e finiture antigraffio." },
          { id: "mod_scorrevole_scomp", name: "Scorrevole a Scomparsa", specs: "Anta coordinata, carrelli ammortizzati tipo scrigno", glass: "-", desc: "Soluzione salvaspazio a scomparsa nel controtelaio murario con chiusura rallentata." }
        ]
      }
    ]
  },
  "Portoni Garage": {
    suppliers: [
      {
        id: "supp_garage_sez",
        name: "Portoni Sezionali Coibentati",
        models: [
          { id: "mod_sez_40", name: "Pannello Sandwich 40/42 mm", specs: "Doppia lamiera d'acciaio zincato, poliuretano espanso, motore a soffitto", glass: "-", desc: "Portone da garage sezionale ad apertura verticale a soffitto con sistema paracadute molle e fotocellule." }
        ]
      }
    ]
  },
  "Monoblocchi Isolanti": {
    suppliers: [
      {
        id: "supp_monoblocchi_termo",
        name: "Monoblocco Termico",
        models: [
          { id: "mod_mono_4lati", name: "Sistema Termoisolante 4 Lati", specs: "Spalle in EPS grafitato con quarto lato sottodavanzale a taglio termico", glass: "-", desc: "Monoblocco prefabbricato ad alto isolamento conforme alla norma UNI 11673 per la corretta posa in opera del foro finestra." }
        ]
      }
    ]
  },
  "Porte a vetro": {
    suppliers: [
      {
        id: "supp_porte_vetro",
        name: "Cristalli d'Arredo",
        models: [
          { id: "mod_vetro_scorrevole", name: "Vetro Temperato 10 mm", specs: "Cristallo trasparente, satinato o fumé con pinze e maniglione inox", glass: "Temperato di sicurezza 10 mm", desc: "Porta per interni a tutto vetro scorrevole con binario a vista minimale in alluminio satinato." }
        ]
      }
    ]
  },
  "Altro": {
    suppliers: [
      {
        id: "supp_opere_varie",
        name: "Lavorazioni Speciali & Varie",
        models: [
          { id: "mod_opera_custom", name: "Opere Complementari", specs: "Secondo specifiche concordate", glass: "-", desc: "Fornitura ed opere complementari speciali eseguite su misura secondo gli accordi contrattuali." }
        ]
      }
    ]
  }
};

// ==========================================================================
// 2. GESTIONE STORAGE LOCALE
// ==========================================================================
let companySettings = loadCompanySettings();
let catalogSettings = loadCatalogSettings();

let openSettingsCategories = { "Serramenti": true };
let openSettingsSuppliers = {};

function loadCompanySettings() {
  const saved = localStorage.getItem('prev_company_settings');
  return saved ? JSON.parse(saved) : Object.assign({}, DEFAULT_COMPANY);
}

function loadCatalogSettings() {
  const saved = localStorage.getItem('prev_catalog_settings');
  return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_CATALOG));
}

function persistSettings() {
  localStorage.setItem('prev_company_settings', JSON.stringify(companySettings));
  localStorage.setItem('prev_catalog_settings', JSON.stringify(catalogSettings));
}

// ==========================================================================
// 3. STATO CENTRALE DEL PREVENTIVO
// ==========================================================================
let docState = {
  type: "PREVENTIVO", // PREVENTIVO | REVISIONE | CONTRATTO
  number: "",
  date: new Date().toISOString().split('T')[0],
  validity: "15 giorni",
  client: { name: "", residence: "", taxId: "", phone: "", email: "" },
  sameSite: true,
  siteAddress: "",
  categories: [],
  taxRate: 22,
  taxBonus: "Bonus Casa 50%",
  paymentTerms: "30% all'ordine come caparra confirmatoria, 40% a inizio posa, 30% a fine lavori collaudati.",
  deliveryTerms: "Circa 6-8 settimane lavorative dall'avvenuto rilievo misure definitive.",
  finalNotes: ""
};

// Suffissi Documento: Preventivo -> _P | Revisione -> _Rev. | Contratto -> _C
function getFormattedDocNumber() {
  const raw = (docState.number || "").trim();
  if (!raw) return "BOZZA";

  let suffix = "_P";
  if (docState.type === "REVISIONE" || docState.type.includes("REVISIONE")) {
    suffix = "_Rev.";
  } else if (docState.type === "CONTRATTO" || docState.type.includes("CONTRATTO")) {
    suffix = "_C";
  }

  const clean = raw.replace(/(_P|_Rev\.|_C)$/i, '');
  return `${clean}${suffix}`;
}

function updateDocNumberPreview() {
  const previewEl = document.getElementById('doc-number-preview');
  if (previewEl) {
    const formatted = getFormattedDocNumber();
    previewEl.textContent = (docState.number && docState.number.trim()) ? `(Codice: ${formatted})` : '';
  }
}

function formatItalianDate(isoDate) {
  if (!isoDate) return "";
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoDate;
}

// ==========================================================================
// 4. INIZIALIZZAZIONE & EVENTI
// ==========================================================================
function safeOn(id, event, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(event, handler);
}

function initApp() {
  setupEventListeners();
  loadDefaultState();
  initSettingsUI();
  populateCategorySelector();
  renderCategoriesUI();
  updateCalculations();
  updateDocNumberPreview();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function setupEventListeners() {
  safeOn('tab-editor-btn', 'click', () => switchView('editor'));
  safeOn('tab-settings-btn', 'click', () => switchView('settings'));

  safeOn('doc-type', 'change', (e) => { 
    docState.type = e.target.value; 
    updateDocNumberPreview();
  });

  safeOn('doc-number', 'input', (e) => { 
    docState.number = e.target.value; 
    updateDocNumberPreview();
  });

  safeOn('doc-date', 'change', (e) => { docState.date = e.target.value; });
  safeOn('doc-validity', 'input', (e) => { docState.validity = e.target.value; });

  safeOn('client-name', 'input', (e) => { docState.client.name = e.target.value; });
  safeOn('client-residence', 'input', (e) => { docState.client.residence = e.target.value; });
  safeOn('client-taxid', 'input', (e) => { docState.client.taxId = e.target.value; });
  safeOn('client-phone', 'input', (e) => { docState.client.phone = e.target.value; });
  safeOn('client-email', 'input', (e) => { docState.client.email = e.target.value; });

  safeOn('same-site', 'change', (e) => {
    docState.sameSite = e.target.checked;
    const siteGroupEl = document.getElementById('site-group');
    if (siteGroupEl) siteGroupEl.style.display = e.target.checked ? 'none' : 'block';
  });

  safeOn('site-address', 'input', (e) => { docState.siteAddress = e.target.value; });

  safeOn('tax-rate', 'change', (e) => {
    docState.taxRate = parseFloat(e.target.value) || 0;
    updateCalculations();
  });
  safeOn('tax-bonus', 'input', (e) => { docState.taxBonus = e.target.value; });
  safeOn('payment-terms', 'input', (e) => { docState.paymentTerms = e.target.value; });
  safeOn('delivery-terms', 'input', (e) => { docState.deliveryTerms = e.target.value; });
  safeOn('final-notes', 'input', (e) => { docState.finalNotes = e.target.value; });

  safeOn('btn-add-category', 'click', addCategoryFromSelector);
  safeOn('btn-print', 'click', prepareAndPrint);
  safeOn('btn-save', 'click', saveToFile);
  safeOn('btn-open', 'click', () => document.getElementById('file-input').click());
  safeOn('file-input', 'change', openFromFile);
  safeOn('btn-new', 'click', resetDocument);

  // Impostazioni, Logo e Macro-Categorie
  safeOn('btn-save-settings', 'click', saveSettingsFromUI);
  safeOn('btn-export-settings', 'click', exportSettingsJSON);
  safeOn('btn-import-settings', 'click', () => document.getElementById('settings-file-input').click());
  safeOn('settings-file-input', 'change', importSettingsJSON);

  safeOn('btn-upload-logo', 'click', () => document.getElementById('logo-file-input').click());
  safeOn('logo-file-input', 'change', handleLogoUpload);
  safeOn('btn-remove-logo', 'click', handleLogoRemove);

  safeOn('btn-add-macro-cat', 'click', handleAddMacroCategory);
  safeOn('new-macro-cat-input', 'keypress', (e) => {
    if (e.key === 'Enter') handleAddMacroCategory();
  });
}

function switchView(view) {
  const edView = document.getElementById('view-editor');
  const setView = document.getElementById('view-settings');
  const btnEd = document.getElementById('tab-editor-btn');
  const btnSet = document.getElementById('tab-settings-btn');

  if (view === 'editor') {
    edView.style.display = 'flex';
    setView.style.display = 'none';
    btnEd.classList.add('active');
    btnSet.classList.remove('active');
    populateCategorySelector();
    renderCategoriesUI();
    updateDocNumberPreview();
  } else {
    edView.style.display = 'none';
    setView.style.display = 'flex';
    btnEd.classList.remove('active');
    btnSet.classList.add('active');
    renderSettingsCategoriesList();
  }
}

function loadDefaultState() {
  const dateInput = document.getElementById('doc-date');
  if (dateInput) dateInput.value = docState.date;
}

function populateCategorySelector() {
  const sel = document.getElementById('select-category-type');
  if (!sel) return;

  const currentVal = sel.value;
  sel.innerHTML = "";

  const keys = Object.keys(catalogSettings);
  keys.forEach((catName, idx) => {
    const opt = document.createElement('option');
    opt.value = catName;
    opt.textContent = `${idx + 1}. ${catName}`;
    sel.appendChild(opt);
  });

  if (keys.includes(currentVal)) {
    sel.value = currentVal;
  } else if (keys.length > 0) {
    sel.value = keys[0];
  }
}

// ==========================================================================
// 5. GESTIONE IMPOSTAZIONI: LOGO & CATALOGO
// ==========================================================================
function initSettingsUI() {
  document.getElementById('set-company-name').value = companySettings.name || '';
  document.getElementById('set-company-address').value = companySettings.address || '';
  document.getElementById('set-company-taxid').value = companySettings.taxId || '';
  document.getElementById('set-company-contacts').value = companySettings.contacts || '';

  updateLogoPreviewUI();
  renderSettingsCategoriesList();
}

function updateLogoPreviewUI() {
  const previewImg = document.getElementById('logo-preview-img');
  const placeholder = document.getElementById('logo-placeholder-text');
  const btnRemove = document.getElementById('btn-remove-logo');

  if (companySettings.logo) {
    previewImg.src = companySettings.logo;
    previewImg.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
    if (btnRemove) btnRemove.style.display = 'inline-flex';
  } else {
    previewImg.src = '';
    previewImg.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
    if (btnRemove) btnRemove.style.display = 'none';
  }
}

function handleLogoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert("Per favore seleziona un file immagine valido (PNG, JPG, SVG, WebP).");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    companySettings.logo = event.target.result;
    persistSettings();
    updateLogoPreviewUI();
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function handleLogoRemove() {
  if (confirm("Vuoi rimuovere il logo aziendale?")) {
    companySettings.logo = "";
    persistSettings();
    updateLogoPreviewUI();
  }
}

function handleAddMacroCategory() {
  const input = document.getElementById('new-macro-cat-input');
  if (!input) return;

  const rawName = input.value.trim();
  if (!rawName) {
    alert("Inserisci un nome per la nuova macro-categoria.");
    return;
  }

  const exists = Object.keys(catalogSettings).some(k => k.toLowerCase() === rawName.toLowerCase());
  if (exists) {
    alert(`La macro-categoria "${rawName}" esiste già!`);
    return;
  }

  catalogSettings[rawName] = {
    suppliers: [
      {
        id: 'supp_' + Date.now(),
        name: "Fornitore Standard",
        models: [
          { id: 'mod_' + Date.now(), name: "Modello Base", specs: "", glass: "", desc: `Fornitura di ${rawName} realizzata a regola d'arte.` }
        ]
      }
    ]
  };

  openSettingsCategories[rawName] = true;
  input.value = "";
  persistSettings();
  renderSettingsCategoriesList();
  populateCategorySelector();
  alert(`Macro-categoria "${rawName}" aggiunta con successo!`);
}

window.deleteMacroCategory = function(catName) {
  if (confirm(`Vuoi davvero eliminare la macro-categoria "${catName}" e tutti i suoi fornitori e modelli?`)) {
    delete catalogSettings[catName];
    delete openSettingsCategories[catName];
    persistSettings();
    renderSettingsCategoriesList();
    populateCategorySelector();
  }
};

function renderSettingsCategoriesList() {
  const container = document.getElementById('settings-categories-list');
  if (!container) return;
  container.innerHTML = "";

  Object.keys(catalogSettings).forEach((catName, idx) => {
    const catData = catalogSettings[catName];
    const suppliers = catData.suppliers || [];
    const isCatOpen = !!openSettingsCategories[catName];

    const accordionItem = document.createElement('div');
    accordionItem.className = `settings-cat-accordion ${isCatOpen ? 'is-open' : ''}`;

    let suppliersHtml = "";
    if (isCatOpen) {
      if (suppliers.length === 0) {
        suppliersHtml = `
          <div style="padding: 14px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
            Nessun fornitore registrato per questa categoria.<br>
            <button type="button" class="btn btn-primary btn-sm" style="margin-top: 8px;" onclick="addSupplierToCategory('${escapeHtml(catName)}')">+ Aggiungi Primo Fornitore</button>
          </div>
        `;
      } else {
        suppliersHtml = suppliers.map((supp, sIdx) => {
          const suppKey = `${catName}_${sIdx}`;
          const isSuppOpen = openSettingsSuppliers[suppKey] !== false;
          const models = supp.models || [];

          let modelsHtml = models.map((mod, mIdx) => {
            return `
              <div class="settings-model-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent);">Modello #${mIdx + 1}: ${escapeHtml(mod.name || 'Nuovo')}</span>
                  <button type="button" class="btn-icon-del" onclick="deleteModel('${escapeHtml(catName)}', ${sIdx}, ${mIdx})" title="Elimina modello">&times;</button>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label>Nome Modello / Serie</label>
                    <input type="text" value="${escapeHtml(mod.name)}" placeholder="es. 7 Stars, Diamante 84" oninput="updateModelField('${escapeHtml(catName)}', ${sIdx}, ${mIdx}, 'name', this.value)">
                  </div>
                  <div class="form-group">
                    <label>Specifiche Sistema (spessore, camere, ecc.)</label>
                    <input type="text" value="${escapeHtml(mod.specs || '')}" placeholder="es. 85 mm - 7 camere - 3 guarnizioni" oninput="updateModelField('${escapeHtml(catName)}', ${sIdx}, ${mIdx}, 'specs', this.value)">
                  </div>
                  <div class="form-group">
                    <label>Vetraggio / Accessori Consigliati</label>
                    <input type="text" value="${escapeHtml(mod.glass || '')}" placeholder="es. Triplo vetro 44 mm selettivo B.E." oninput="updateModelField('${escapeHtml(catName)}', ${sIdx}, ${mIdx}, 'glass', this.value)">
                  </div>
                </div>
                <div class="form-group full" style="margin-top: 8px;">
                  <label>Descrizione Generale Precompilata (compare nel preventivo)</label>
                  <textarea placeholder="Descrizione tecnica e prestazionale del prodotto..." oninput="updateModelField('${escapeHtml(catName)}', ${sIdx}, ${mIdx}, 'desc', this.value)">${escapeHtml(mod.desc || '')}</textarea>
                </div>
              </div>
            `;
          }).join('');

          return `
            <div class="settings-supplier-box">
              <div class="settings-supplier-head" onclick="toggleSettingsSupplier('${escapeHtml(catName)}', ${sIdx})">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="accordion-arrow" style="font-size: 0.75rem;">${isSuppOpen ? '▼' : '▶'}</span>
                  <strong style="color: var(--primary); font-size: 0.95rem;">Fornitore: ${escapeHtml(supp.name)}</strong>
                  <span style="font-size: 0.75rem; background: #e0f2fe; color: var(--accent); padding: 2px 7px; border-radius: 10px; font-weight: 600;">
                    ${models.length} modello/i
                  </span>
                </div>
                <div style="display: flex; gap: 6px;" onclick="event.stopPropagation();">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="addModelToSupplier('${escapeHtml(catName)}', ${sIdx})">+ Aggiungi Modello</button>
                  <button type="button" class="btn btn-danger btn-sm" onclick="deleteSupplier('${escapeHtml(catName)}', ${sIdx})">Elimina</button>
                </div>
              </div>

              ${isSuppOpen ? `
                <div class="settings-supplier-body">
                  <div class="form-group" style="max-width: 320px; margin-bottom: 12px;">
                    <label>Rinomina Fornitore</label>
                    <input type="text" value="${escapeHtml(supp.name)}" oninput="updateSupplierName('${escapeHtml(catName)}', ${sIdx}, this.value)">
                  </div>
                  <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
                    Elenco Modelli di ${escapeHtml(supp.name)}:
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${modelsHtml || '<div style="font-size: 0.8rem; color: var(--text-muted); padding: 8px;">Nessun modello inserito. Clicca su "+ Aggiungi Modello" sopra.</div>'}
                  </div>
                </div>
              ` : ''}
            </div>
          `;
        }).join('');

        suppliersHtml += `
          <div style="margin-top: 10px; text-align: right;">
            <button type="button" class="btn btn-primary btn-sm" onclick="addSupplierToCategory('${escapeHtml(catName)}')">+ Aggiungi Altro Fornitore a ${escapeHtml(catName)}</button>
          </div>
        `;
      }
    }

    accordionItem.innerHTML = `
      <div class="settings-cat-header" onclick="toggleSettingsCategory('${escapeHtml(catName)}')">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="accordion-arrow">${isCatOpen ? '▼' : '▶'}</span>
          <span style="font-weight: 700; font-size: 1rem;">${idx + 1}. ${escapeHtml(catName)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;" onclick="event.stopPropagation();">
          <span class="cat-badge">${suppliers.length} fornitore/i</span>
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteMacroCategory('${escapeHtml(catName)}')">Elimina</button>
        </div>
      </div>
      ${isCatOpen ? `<div class="settings-cat-body">${suppliersHtml}</div>` : ''}
    `;

    container.appendChild(accordionItem);
  });
}

window.toggleSettingsCategory = function(catName) {
  openSettingsCategories[catName] = !openSettingsCategories[catName];
  renderSettingsCategoriesList();
};

window.toggleSettingsSupplier = function(catName, sIdx) {
  const key = `${catName}_${sIdx}`;
  openSettingsSuppliers[key] = !openSettingsSuppliers[key];
  renderSettingsCategoriesList();
};

window.addSupplierToCategory = function(catName) {
  if (!catalogSettings[catName]) catalogSettings[catName] = { suppliers: [] };
  const suppName = prompt("Inserisci il nome del nuovo fornitore:");
  if (!suppName || !suppName.trim()) return;

  const newSupp = {
    id: 'supp_' + Date.now(),
    name: suppName.trim(),
    models: [
      { id: 'mod_' + Date.now(), name: "Modello Base", specs: "", glass: "", desc: `Fornitura di ${catName} secondo specifiche di capitolato.` }
    ]
  };
  catalogSettings[catName].suppliers.push(newSupp);
  openSettingsCategories[catName] = true;
  persistSettings();
  renderSettingsCategoriesList();
};

window.updateSupplierName = function(catName, sIdx, val) {
  if (catalogSettings[catName] && catalogSettings[catName].suppliers[sIdx]) {
    catalogSettings[catName].suppliers[sIdx].name = val;
    persistSettings();
  }
};

window.deleteSupplier = function(catName, sIdx) {
  if (confirm("Vuoi davvero eliminare questo fornitore e tutti i suoi modelli associati?")) {
    catalogSettings[catName].suppliers.splice(sIdx, 1);
    persistSettings();
    renderSettingsCategoriesList();
  }
};

window.addModelToSupplier = function(catName, sIdx) {
  const supp = catalogSettings[catName].suppliers[sIdx];
  if (!supp) return;
  if (!supp.models) supp.models = [];
  supp.models.push({
    id: 'mod_' + Date.now(),
    name: "Nuovo Modello",
    specs: "",
    glass: "",
    desc: ""
  });
  openSettingsSuppliers[`${catName}_${sIdx}`] = true;
  persistSettings();
  renderSettingsCategoriesList();
};

window.updateModelField = function(catName, sIdx, mIdx, field, val) {
  const supp = catalogSettings[catName]?.suppliers[sIdx];
  if (supp && supp.models[mIdx]) {
    supp.models[mIdx][field] = val;
    persistSettings();
  }
};

window.deleteModel = function(catName, sIdx, mIdx) {
  if (confirm("Vuoi eliminare questo modello?")) {
    catalogSettings[catName].suppliers[sIdx].models.splice(mIdx, 1);
    persistSettings();
    renderSettingsCategoriesList();
  }
};

function saveSettingsFromUI() {
  companySettings.name = document.getElementById('set-company-name').value;
  companySettings.address = document.getElementById('set-company-address').value;
  companySettings.taxId = document.getElementById('set-company-taxid').value;
  companySettings.contacts = document.getElementById('set-company-contacts').value;

  persistSettings();
  alert("Tutte le impostazioni aziendali, logo e cataloghi sono stati salvati correttamente!");
}

function exportSettingsJSON() {
  const exportData = {
    company: companySettings,
    catalog: catalogSettings,
    exportedAt: new Date().toISOString()
  };
  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Impostazioni_Aziendali_Preventivi.json`;
  a.click();
}

function importSettingsJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data.company) companySettings = data.company;
      if (data.catalog) catalogSettings = data.catalog;
      persistSettings();
      initSettingsUI();
      populateCategorySelector();
      renderCategoriesUI();
      alert("Configurazione aziendale (incluso il logo) importata con successo!");
    } catch (err) {
      alert("File non valido: " + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ==========================================================================
// 6. GESTIONE SCHEDE PREVENTIVO: MISURE SDOPPIATE (L / H) & ARTICOLI GENERALI
// ==========================================================================
function addCategoryFromSelector() {
  const sel = document.getElementById('select-category-type');
  const catKey = sel ? sel.value : Object.keys(catalogSettings)[0];
  if (!catKey) return;

  const catDef = catalogSettings[catKey] || { suppliers: [{ name: "Standard", models: [{ name: "Standard", specs: "", desc: "" }] }] };
  const firstSupp = (catDef.suppliers && catDef.suppliers.length > 0) ? catDef.suppliers[0] : { name: "Standard", models: [{ name: "Standard", specs: "", desc: "" }] };
  const firstModel = (firstSupp.models && firstSupp.models.length > 0) ? firstSupp.models[0] : { name: "Standard", specs: "", desc: "" };

  const newCat = {
    id: 'cat_' + Date.now(),
    name: catKey,
    supplierName: firstSupp.name,
    modelName: firstModel.name,
    specs: firstModel.specs || "",
    color: "",
    glass: firstModel.glass || "",
    description: firstModel.desc || "",
    positions: [
      { id: 'pos_' + Date.now(), name: "Pos. 1", width: "", height: "", description: "", quantity: 1, unitPrice: 0 }
    ],
    installationPrice: 0
  };

  docState.categories.push(newCat);
  renderCategoriesUI();
  updateCalculations();
}

window.moveCategoryUp = function(index) {
  if (index <= 0) return;
  const temp = docState.categories[index];
  docState.categories[index] = docState.categories[index - 1];
  docState.categories[index - 1] = temp;
  renderCategoriesUI();
  updateCalculations();
};

window.moveCategoryDown = function(index) {
  if (index >= docState.categories.length - 1) return;
  const temp = docState.categories[index];
  docState.categories[index] = docState.categories[index + 1];
  docState.categories[index + 1] = temp;
  renderCategoriesUI();
  updateCalculations();
};

window.removeCategory = function(id) {
  if (confirm("Vuoi rimuovere questa categoria e la relativa pagina dal preventivo?")) {
    docState.categories = docState.categories.filter(c => c.id !== id);
    renderCategoriesUI();
    updateCalculations();
  }
};

function renderCategoriesUI() {
  const container = document.getElementById('categories-container');
  if (!container) return;
  container.innerHTML = "";

  if (docState.categories.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 24px; border: 2px dashed var(--border); border-radius: 8px;">
        Nessuna categoria inserita.<br>Scegli una voce dal menu e premi <strong>+ Aggiungi Pagina Categoria</strong>.
      </div>`;
    return;
  }

  docState.categories.forEach((cat, index) => {
    const card = document.createElement('div');
    card.className = "card category-card";

    const isFirst = index === 0;
    const isLast = index === docState.categories.length - 1;
    const pageNum = index + 2;

    const selectorBlock = renderCategoryOptionsBlock(cat);
    const positionsTable = renderPositionsTableHtml(cat);
    const totalsCat = calculateCategoryTotals(cat);

    card.innerHTML = `
      <div class="card-title">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span><strong>Pagina ${pageNum}:</strong> ${escapeHtml(cat.name)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <button type="button" class="btn-order" onclick="moveCategoryUp(${index})" ${isFirst ? 'disabled' : ''} title="Sposta prima">▲ Sposta Su</button>
          <button type="button" class="btn-order" onclick="moveCategoryDown(${index})" ${isLast ? 'disabled' : ''} title="Sposta dopo">▼ Sposta Giù</button>
          <button type="button" class="btn btn-danger" style="margin-left: 8px;" onclick="removeCategory('${cat.id}')">Rimuovi</button>
        </div>
      </div>

      ${selectorBlock}

      <div style="margin-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <label style="font-size: 0.85rem; font-weight: 700;">ELENCO VANI, MISURE E ARTICOLI</label>
          <button type="button" class="btn btn-secondary" style="font-size: 0.75rem; padding: 5px 10px;" onclick="addPosition('${cat.id}')">+ Aggiungi Riga / Vano</button>
        </div>
        ${positionsTable}
      </div>

      <div class="cat-summary-box">
        <div class="cat-summary-row">
          <span>Subtotale Fornitura:</span>
          <strong id="cat-fornitura-${cat.id}">${formatCurrency(totalsCat.fornitura)}</strong>
        </div>
        <div class="cat-summary-row" style="align-items: center;">
          <label style="margin: 0; text-transform: none; font-weight: 600;">Posa in Opera:</label>
          <div style="display: flex; align-items: center; gap: 6px;">
            <input type="number" step="0.01" min="0" value="${cat.installationPrice > 0 ? cat.installationPrice : ''}" placeholder="0.00" style="width: 130px; text-align: right; font-weight: bold;" oninput="updateCatInstallation('${cat.id}', this.value)">
            <span style="font-weight: 700; color: var(--text);">€</span>
          </div>
        </div>
        <div class="cat-summary-row cat-summary-total">
          <span>Totale ${escapeHtml(cat.name)}:</span>
          <span id="cat-total-${cat.id}">${formatCurrency(totalsCat.total)}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderCategoryOptionsBlock(cat) {
  const catDef = catalogSettings[cat.name] || { suppliers: [{ id: "gen", name: "Standard", models: [{ id: "m1", name: "Standard", specs: "-", desc: "" }] }] };
  const suppliers = catDef.suppliers || [];

  const suppOptions = suppliers.map(s => 
    `<option value="${escapeHtml(s.name)}" ${s.name === cat.supplierName ? 'selected' : ''}>${escapeHtml(s.name)}</option>`
  ).join('');

  const currentSupp = suppliers.find(s => s.name === cat.supplierName) || suppliers[0];
  const models = currentSupp ? (currentSupp.models || []) : [];

  const modelOptions = models.map(m => 
    `<option value="${escapeHtml(m.name)}" ${m.name === cat.modelName ? 'selected' : ''}>${escapeHtml(m.name)}</option>`
  ).join('');

  return `
    <div style="background: #f8fafc; border: 1px solid var(--border); padding: 12px; border-radius: 6px;">
      <div class="form-grid">
        <div class="form-group">
          <label style="color: var(--accent);">Fornitore</label>
          <select onchange="onCatSupplierChange('${cat.id}', this.value)">
            ${suppOptions || '<option value="">Nessun Fornitore</option>'}
          </select>
        </div>
        <div class="form-group">
          <label style="color: var(--accent);">Modello / Serie</label>
          <select onchange="onCatModelChange('${cat.id}', this.value)">
            ${modelOptions || '<option value="">Nessun Modello</option>'}
          </select>
        </div>
        <div class="form-group">
          <label>Finitura / Colore</label>
          <input type="text" value="${escapeHtml(cat.color)}" placeholder="es. Bianco 9010 / Noce" oninput="updateCatField('${cat.id}', 'color', this.value)">
        </div>
      </div>

      <div class="form-grid" style="margin-top: 10px;">
        <div class="form-group">
          <label>Specifiche Tecniche Sistema</label>
          <input type="text" value="${escapeHtml(cat.specs)}" placeholder="Spessore, guarnizioni, caratteristiche" oninput="updateCatField('${cat.id}', 'specs', this.value)">
        </div>
        <div class="form-group">
          <label>Vetraggio / Accessori</label>
          <input type="text" value="${escapeHtml(cat.glass)}" placeholder="Tipologia vetro o accessori" oninput="updateCatField('${cat.id}', 'glass', this.value)">
        </div>
      </div>

      <div class="form-group full" style="margin-top: 10px;">
        <label>Descrizione Generale del Manufatto (Precompilata, modificabile)</label>
        <textarea oninput="updateCatField('${cat.id}', 'description', this.value)">${escapeHtml(cat.description)}</textarea>
      </div>
    </div>
  `;
}

window.onCatSupplierChange = function(catId, suppName) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.supplierName = suppName;

  const catDef = catalogSettings[cat.name];
  if (catDef) {
    const supp = catDef.suppliers.find(s => s.name === suppName);
    if (supp && supp.models.length > 0) {
      cat.modelName = supp.models[0].name;
      cat.specs = supp.models[0].specs || "";
      cat.glass = supp.models[0].glass || "";
      cat.description = supp.models[0].desc || "";
    } else {
      cat.modelName = "";
      cat.specs = "";
      cat.glass = "";
      cat.description = "";
    }
  }
  renderCategoriesUI();
  updateCalculations();
};

window.onCatModelChange = function(catId, modelName) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.modelName = modelName;

  const catDef = catalogSettings[cat.name];
  if (catDef) {
    const supp = catDef.suppliers.find(s => s.name === cat.supplierName);
    if (supp) {
      const mod = supp.models.find(m => m.name === modelName);
      if (mod) {
        cat.specs = mod.specs || "";
        cat.glass = mod.glass || "";
        cat.description = mod.desc || "";
      }
    }
  }
  renderCategoriesUI();
  updateCalculations();
};

function renderPositionsTableHtml(cat) {
  if (cat.positions.length === 0) {
    return `<div style="color: var(--text-muted); font-size: 0.85rem; padding: 10px;">Nessuna riga inserita.</div>`;
  }

  const rows = cat.positions.map((pos) => {
    const rowTotal = (pos.quantity || 0) * (pos.unitPrice || 0);
    let w = pos.width !== undefined ? pos.width : "";
    let h = pos.height !== undefined ? pos.height : "";
    if (pos.measures && !w && !h) {
      const mParts = pos.measures.replace(/mm|cm/gi, '').split(/x/i);
      if (mParts.length === 2) {
        w = mParts[0].trim();
        h = mParts[1].trim();
        pos.width = w;
        pos.height = h;
      }
    }

    return `
      <tr>
        <td style="width: 18%;">
          <input type="text" value="${escapeHtml(pos.name)}" placeholder="es. Pos. 1 (vuoto x art. gen.)" oninput="updatePosField('${cat.id}', '${pos.id}', 'name', this.value)">
        </td>
        <td style="width: 20%;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 0.75rem; font-weight: bold; color: var(--text-muted);">L.</span>
            <input type="text" value="${escapeHtml(w)}" placeholder="mm" style="text-align: center; padding: 5px 4px;" oninput="updatePosField('${cat.id}', '${pos.id}', 'width', this.value)">
            <span style="font-size: 0.75rem; font-weight: bold; color: var(--text-muted);">X</span>
            <span style="font-size: 0.75rem; font-weight: bold; color: var(--text-muted);">H.</span>
            <input type="text" value="${escapeHtml(h)}" placeholder="mm" style="text-align: center; padding: 5px 4px;" oninput="updatePosField('${cat.id}', '${pos.id}', 'height', this.value)">
          </div>
        </td>
        <td style="width: 30%;">
          <input type="text" value="${escapeHtml(pos.description)}" placeholder="Descrizione o articolo libero" oninput="updatePosField('${cat.id}', '${pos.id}', 'description', this.value)">
        </td>
        <td style="width: 7%;">
          <input type="number" min="1" step="1" value="${pos.quantity || 1}" style="text-align: center;" oninput="updatePosField('${cat.id}', '${pos.id}', 'quantity', this.value)">
        </td>
        <td style="width: 12%;">
          <input type="number" step="any" min="0" value="${pos.unitPrice > 0 ? pos.unitPrice : ''}" placeholder="0.00" style="text-align: right;" oninput="updatePosField('${cat.id}', '${pos.id}', 'unitPrice', this.value)">
        </td>
        <td id="pos-total-${pos.id}" style="width: 9%; text-align: right; font-weight: bold; padding: 8px;">
          ${formatCurrency(rowTotal)}
        </td>
        <td style="width: 4%; text-align: center;">
          <button type="button" class="btn-icon-del" onclick="removePosition('${cat.id}', '${pos.id}')" title="Elimina riga">&times;</button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div style="overflow-x: auto;">
      <table class="editor-pos-table">
        <thead>
          <tr>
            <th>Posizione / Vano</th>
            <th style="text-align: center;">Misure (L x H)</th>
            <th>Descrizione Specifica</th>
            <th style="text-align: center;">Q.tà</th>
            <th style="text-align: right;">Prezzo Unit. (€)</th>
            <th style="text-align: right;">Totale (€)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

window.addPosition = function(catId) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  const nextNum = cat.positions.length + 1;
  cat.positions.push({
    id: 'pos_' + Date.now(),
    name: `Pos. ${nextNum}`,
    width: "",
    height: "",
    description: "",
    quantity: 1,
    unitPrice: 0
  });
  renderCategoriesUI();
  updateCalculations();
};

window.removePosition = function(catId, posId) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.positions = cat.positions.filter(p => p.id !== posId);
  renderCategoriesUI();
  updateCalculations();
};

window.updatePosField = function(catId, posId, field, val) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  const pos = cat.positions.find(p => p.id === posId);
  if (!pos) return;

  if (field === 'quantity') {
    pos.quantity = parseFloat(val) || 0;
  } else if (field === 'unitPrice') {
    pos.unitPrice = parseFloat(val) || 0;
  } else {
    pos[field] = val;
  }

  if (field === 'quantity' || field === 'unitPrice') {
    const rowTot = (pos.quantity || 0) * (pos.unitPrice || 0);
    const rowTotEl = document.getElementById(`pos-total-${pos.id}`);
    if (rowTotEl) {
      rowTotEl.textContent = formatCurrency(rowTot);
    }
    updateCatSummaryDOM(cat);
    updateCalculations();
  }
};

function updateCatSummaryDOM(cat) {
  const totalsCat = calculateCategoryTotals(cat);
  const fornituraEl = document.getElementById(`cat-fornitura-${cat.id}`);
  const totalEl = document.getElementById(`cat-total-${cat.id}`);
  if (fornituraEl) fornituraEl.textContent = formatCurrency(totalsCat.fornitura);
  if (totalEl) totalEl.textContent = formatCurrency(totalsCat.total);
}

window.updateCatInstallation = function(catId, val) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.installationPrice = parseFloat(val) || 0;
  updateCatSummaryDOM(cat);
  updateCalculations();
};

window.updateCatField = function(catId, field, val) {
  const cat = docState.categories.find(c => c.id === catId);
  if (cat) cat[field] = val;
};

function calculateCategoryTotals(cat) {
  const fornitura = (cat.positions || []).reduce((sum, p) => sum + ((p.quantity || 0) * (p.unitPrice || 0)), 0);
  const posa = cat.installationPrice || 0;
  return { fornitura, posa, total: fornitura + posa };
}

function updateCalculations() {
  let grandFornitura = 0;
  let grandPosa = 0;

  docState.categories.forEach(c => {
    const t = calculateCategoryTotals(c);
    grandFornitura += t.fornitura;
    grandPosa += t.posa;
  });

  const subtotal = grandFornitura + grandPosa;
  const tax = subtotal * (docState.taxRate / 100);
  const total = subtotal + tax;

  const subEl = document.getElementById('lbl-subtotal');
  const taxEl = document.getElementById('lbl-tax');
  const totEl = document.getElementById('lbl-total');

  if (subEl) subEl.textContent = `${formatCurrency(subtotal)} (Fornitura: ${formatCurrency(grandFornitura)} + Posa: ${formatCurrency(grandPosa)})`;
  if (taxEl) taxEl.textContent = `${formatCurrency(tax)} (${docState.taxRate}%)`;
  if (totEl) totEl.textContent = formatCurrency(total);
}

function formatCurrency(val) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(val || 0);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

// ==========================================================================
// 7. SALVATAGGIO & APERTURA PREVENTIVI (pCloud)
// ==========================================================================
async function saveToFile() {
  const jsonStr = JSON.stringify(docState, null, 2);
  const clientName = docState.client.name.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || "Cliente";
  const formattedNum = getFormattedDocNumber();
  const safeDocNum = formattedNum.replace(/\.+$/, '').replace(/[^a-zA-Z0-9_.-]/g, '_');
  const fileName = `${clientName}_${safeDocNum}.json`;

  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: 'File Preventivo JSON', accept: { 'application/json': ['.json'] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(jsonStr);
      await writable.close();
      alert("Preventivo salvato correttamente!");
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function openFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      docState = Object.assign(docState, data);

      if (docState.type === "CONFERMA D'ORDINE / CONTRATTO") docState.type = "CONTRATTO";
      if (docState.type === "REVISIONE PREVENTIVO") docState.type = "REVISIONE";

      document.getElementById('doc-type').value = docState.type || "PREVENTIVO";
      document.getElementById('doc-number').value = docState.number || '';
      document.getElementById('doc-date').value = docState.date || '';
      document.getElementById('doc-validity').value = docState.validity || '15 giorni';

      document.getElementById('client-name').value = docState.client?.name || '';
      document.getElementById('client-residence').value = docState.client?.residence || '';
      document.getElementById('client-taxid').value = docState.client?.taxId || '';
      document.getElementById('client-phone').value = docState.client?.phone || '';
      document.getElementById('client-email').value = docState.client?.email || '';

      const sameSiteEl = document.getElementById('same-site');
      if (sameSiteEl) sameSiteEl.checked = docState.sameSite;
      const siteGroupEl = document.getElementById('site-group');
      if (siteGroupEl) siteGroupEl.style.display = docState.sameSite ? 'none' : 'block';

      document.getElementById('site-address').value = docState.siteAddress || '';
      document.getElementById('tax-rate').value = docState.taxRate || 22;
      document.getElementById('tax-bonus').value = docState.taxBonus || '';
      document.getElementById('payment-terms').value = docState.paymentTerms || '';
      document.getElementById('delivery-terms').value = docState.deliveryTerms || '';
      document.getElementById('final-notes').value = docState.finalNotes || '';

      switchView('editor');
      renderCategoriesUI();
      updateCalculations();
      updateDocNumberPreview();
      alert("Preventivo caricato con successo!");
    } catch (err) {
      alert("Errore nel file: " + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function resetDocument() {
  if (!confirm("Vuoi iniziare un nuovo preventivo azzerando i dati correnti?")) return;
  docState.number = "";
  docState.client = { name: "", residence: "", taxId: "", phone: "", email: "" };
  docState.categories = [];
  docState.siteAddress = "";
  docState.sameSite = true;
  docState.finalNotes = "";

  document.getElementById('doc-number').value = "";
  document.getElementById('client-name').value = "";
  document.getElementById('client-residence').value = "";
  document.getElementById('client-taxid').value = "";
  document.getElementById('client-phone').value = "";
  document.getElementById('client-email').value = "";
  document.getElementById('site-address').value = "";
  document.getElementById('final-notes').value = "";

  renderCategoriesUI();
  updateCalculations();
  updateDocNumberPreview();
}

// ==========================================================================
// 8. GENERAZIONE STAMPA A4 E PDF
//    - Pagina 1: Data a sinistra e Numero a destra sotto la riga di divisione
//    - Validità offerta dinamica (nascosta se Contratto)
// ==========================================================================
function prepareAndPrint() {
  const printRoot = document.getElementById('print-root');
  if (!printRoot) return;
  printRoot.innerHTML = "";

  let grandFornitura = 0;
  let grandPosa = 0;
  docState.categories.forEach(c => {
    const t = calculateCategoryTotals(c);
    grandFornitura += t.fornitura;
    grandPosa += t.posa;
  });

  const subtotal = grandFornitura + grandPosa;
  const tax = subtotal * (docState.taxRate / 100);
  const total = subtotal + tax;
  const isContract = docState.type === "CONTRATTO" || docState.type.includes("CONTRATTO");
  const formattedDocNum = getFormattedDocNumber();
  const formattedDate = formatItalianDate(docState.date);

  const totalPages = docState.categories.length + 3;

  // Calcolo testo validità dinamico dal modulo
  let validityText = (docState.validity || "").trim();
  if (validityText && !validityText.toLowerCase().includes("validit")) {
    validityText = `validità offerta ${validityText}`;
  }

  // PAGINA 1
  const page1 = document.createElement('div');
  page1.className = "sheet p1-sheet";
  page1.innerHTML = `
    <!-- 1. SOPRA LA RIGA: Logo a larghezza intera a sinistra (oppure dati ditta se no logo) -->
    <div class="p1-header-top">
      ${companySettings.logo ? `
        <img src="${companySettings.logo}" class="p-page1-logo-full" alt="Logo Aziendale">
      ` : `
        <div class="p-company">
          <div class="p-company-title">${escapeHtml(companySettings.name)}</div>
          <div>${escapeHtml(companySettings.address)}</div>
          ${companySettings.taxId ? `<div>${escapeHtml(companySettings.taxId)}</div>` : ''}
          <div>${escapeHtml(companySettings.contacts)}</div>
        </div>
      `}
    </div>

    <!-- 2. SOTTO LA RIGA: Data a sinistra, Numero con contorno sottile a destra -->
    <div class="p1-sub-header">
      <div class="p1-doc-date"><strong>Data:</strong> ${escapeHtml(formattedDate)}</div>
      <div class="p1-doc-number-box">
        <strong>Numero:</strong> ${escapeHtml(formattedDocNum)}
      </div>
    </div>

    <!-- 3. DATI CLIENTE: CENTRATI A METÀ PAGINA SENZA BORDO -->
    <div class="p1-client-center">
      <div class="p1-client-name">Sig. ${escapeHtml(docState.client.name) || '____________________'}</div>
      <div class="p1-client-address">via ${escapeHtml(docState.client.residence) || '____________________'}</div>
      ${docState.client.taxId ? `<div class="p1-client-tax">C.F. / P.IVA: ${escapeHtml(docState.client.taxId)}</div>` : ''}
      ${docState.client.phone ? `<div class="p1-client-line"><strong>tel:</strong> ${escapeHtml(docState.client.phone)}</div>` : ''}
      ${docState.client.email ? `<div class="p1-client-line"><strong>e mail:</strong> ${escapeHtml(docState.client.email)}</div>` : ''}
      ${(!docState.sameSite && docState.siteAddress) ? `
        <div class="p1-site-info"><strong>Cantiere sito in:</strong> ${escapeHtml(docState.siteAddress)}</div>
      ` : ''}
    </div>

    <!-- 4. TITOLO A CIRCA 3/4 ALTEZZA (La validità appare solo se non è Contratto) -->
    <div class="p1-title-bottom">
      <div class="p1-main-title">${escapeHtml(docState.type)}</div>
      ${!isContract && validityText ? `
        <div class="p1-validity-text">${escapeHtml(validityText)}</div>
      ` : ''}
    </div>

    <!-- 5. PIÈ DI PAGINA: DATI DITTA A SINISTRA E PAGINA 1 DI X A DESTRA -->
    <div class="p1-footer">
      <div class="p1-footer-company">
        <div class="p1-footer-title">${escapeHtml(companySettings.name)}</div>
        <div>${escapeHtml(companySettings.address)}</div>
        <div>${escapeHtml(companySettings.contacts)}</div>
      </div>
      <div class="p1-footer-page">Pagina 1 di ${totalPages}</div>
    </div>
  `;
  printRoot.appendChild(page1);

  // PAGINE 2..N: SCHEDE CATEGORIA
  docState.categories.forEach((cat, idx) => {
    const pageCat = document.createElement('div');
    pageCat.className = "sheet";
    const currentPageNum = idx + 2;
    const catTotals = calculateCategoryTotals(cat);

    let posRows = (cat.positions || []).map(p => {
      const rowTot = (p.quantity || 0) * (p.unitPrice || 0);

      const hasName = (p.name || "").trim().length > 0;
      const wVal = (p.width || "").trim();
      const hVal = (p.height || "").trim();
      const oldMeasures = (p.measures || "").trim();
      const hasMeasures = wVal.length > 0 || hVal.length > 0 || oldMeasures.length > 0;

      if (!hasName && !hasMeasures) {
        return `
          <tr>
            <td colspan="3" style="font-size: 0.85rem; font-weight: 500; padding-left: 10px;">
              ${escapeHtml(p.description) || 'Articolo / Lavorazione specifica'}
            </td>
            <td style="text-align: center;">${p.quantity}</td>
            <td style="text-align: right;">${formatCurrency(p.unitPrice)}</td>
            <td style="text-align: right; font-weight: bold;">${formatCurrency(rowTot)}</td>
          </tr>
        `;
      }

      let measuresFormatted = "-";
      if (wVal && hVal) {
        measuresFormatted = `L. ${escapeHtml(wVal)} X H. ${escapeHtml(hVal)}`;
      } else if (wVal) {
        measuresFormatted = `L. ${escapeHtml(wVal)}`;
      } else if (hVal) {
        measuresFormatted = `H. ${escapeHtml(hVal)}`;
      } else if (oldMeasures) {
        measuresFormatted = escapeHtml(oldMeasures);
      }

      return `
        <tr>
          <td><strong>${escapeHtml(p.name || '')}</strong></td>
          <td style="white-space: nowrap; font-size: 0.82rem;">${measuresFormatted}</td>
          <td style="font-size: 0.85rem;">${escapeHtml(p.description)}</td>
          <td style="text-align: center;">${p.quantity}</td>
          <td style="text-align: right;">${formatCurrency(p.unitPrice)}</td>
          <td style="text-align: right; font-weight: bold;">${formatCurrency(rowTot)}</td>
        </tr>
      `;
    }).join('');

    pageCat.innerHTML = `
      <div>
        <div class="p-header">
          <div class="p-company">
            <div class="p-company-title">${escapeHtml(companySettings.name)}</div>
            <div style="font-size: 0.8rem;">Allegato Tecnico - Rif. Doc N° ${escapeHtml(formattedDocNum)}</div>
          </div>
          <div class="p-doc-details">
            <div style="font-size: 1.1rem; font-weight: bold;">SCHEDA TECNICA ${idx + 1}</div>
            <div style="font-size: 0.9rem;">Cliente: ${escapeHtml(docState.client.name)}</div>
          </div>
        </div>

        <div style="margin: 10px 0 15px 0;">
          <h2 style="font-size: 1.25rem; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 4px;">
            ${escapeHtml(cat.name)} — <span style="font-size: 1.05rem; font-weight: 800; color: #1e293b;">${escapeHtml(cat.supplierName)}</span> <span style="font-size: 0.95rem; font-weight: normal;">(${escapeHtml(cat.modelName)})</span>
          </h2>
        </div>

        ${cat.specs || cat.color || cat.glass ? `
          <div class="p-box" style="margin-bottom: 12px; padding: 8px 12px; background: #fafafa;">
            <div style="font-size: 0.85rem; line-height: 1.5;">
              ${cat.specs ? `<div><strong>Caratteristiche Sistema:</strong> ${escapeHtml(cat.specs)}</div>` : ''}
              ${cat.color ? `<div><strong>Finitura / Colore:</strong> ${escapeHtml(cat.color)}</div>` : ''}
              ${cat.glass ? `<div><strong>Vetraggio / Accessori:</strong> ${escapeHtml(cat.glass)}</div>` : ''}
            </div>
          </div>
        ` : ''}

        ${cat.description ? `
          <div style="font-size: 0.82rem; color: #333; margin-bottom: 12px; line-height: 1.45; text-align: justify;">
            ${escapeHtml(cat.description)}
          </div>
        ` : ''}

        <table class="p-table" style="margin-top: 10px;">
          <thead>
            <tr>
              <th style="width: 18%;">Vano / Posizione</th>
              <th style="width: 18%;">Misure (LxH)</th>
              <th style="width: 36%;">Descrizione Manufatto</th>
              <th style="width: 6%; text-align: center;">Q.tà</th>
              <th style="width: 11%; text-align: right;">P. Unit.</th>
              <th style="width: 11%; text-align: right;">Totale</th>
            </tr>
          </thead>
          <tbody>
            ${posRows || '<tr><td colspan="6">Nessun manufatto inserito</td></tr>'}
          </tbody>
        </table>

        <div style="margin-top: 15px; border: 1px solid #999; padding: 10px 14px; background: #fdfdfd;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px;">
            <span>Subtotale Fornitura:</span>
            <strong>${formatCurrency(catTotals.fornitura)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px dashed #ccc;">
            <span>Posa in Opera:</span>
            <strong>${formatCurrency(catTotals.posa)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800;">
            <span>Totale ${escapeHtml(cat.name)}:</span>
            <span>${formatCurrency(catTotals.total)}</span>
          </div>
        </div>
      </div>

      <div class="p-footer">
        <span>${escapeHtml(companySettings.name)}</span>
        <span>Pagina ${currentPageNum} di ${totalPages}</span>
      </div>
    `;
    printRoot.appendChild(pageCat);
  });

  // PAGINA TOTALI & FIRMA
  const pageTotalsNum = docState.categories.length + 2;
  const pageTotals = document.createElement('div');
  pageTotals.className = "sheet";
  
  let catSummaryRows = docState.categories.map((c, i) => {
    const t = calculateCategoryTotals(c);
    return `
      <tr>
        <td><strong>${escapeHtml(c.name)}</strong> - ${escapeHtml(c.supplierName)} (${escapeHtml(c.modelName)})</td>
        <td class="text-right">${formatCurrency(t.fornitura)}</td>
        <td class="text-right">${formatCurrency(t.posa)}</td>
        <td class="text-right"><strong>${formatCurrency(t.total)}</strong></td>
      </tr>
    `;
  }).join('');

  pageTotals.innerHTML = `
    <div>
      <div class="p-header">
        <div class="p-company">
          <div class="p-company-title">${escapeHtml(companySettings.name)}</div>
          <div>Quadro Economico Complessivo</div>
        </div>
        <div class="p-doc-details">
          <div class="p-doc-type">RIEPILOGO & FIRMA</div>
          <div class="p-doc-meta">Rif. Doc N°: ${escapeHtml(formattedDocNum)}</div>
        </div>
      </div>

      <table class="p-table">
        <thead>
          <tr>
            <th>Tipologia Merceologica & Fornitore</th>
            <th class="text-right" style="width: 120px;">Fornitura</th>
            <th class="text-right" style="width: 120px;">Posa in Opera</th>
            <th class="text-right" style="width: 130px;">Totale Netto</th>
          </tr>
        </thead>
        <tbody>
          ${catSummaryRows || '<tr><td colspan="4">Nessuna categoria inserita</td></tr>'}
          <tr style="background-color: #f9f9f9; font-size: 1rem;">
            <td><strong>TOTALE NETTO FORNITURA & POSA</strong></td>
            <td class="text-right"><strong>${formatCurrency(grandFornitura)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(grandPosa)}</strong></td>
            <td class="text-right" style="font-size: 1.1rem; color: #000;"><strong>${formatCurrency(subtotal)}</strong></td>
          </tr>
          <tr>
            <td colspan="3">IVA di legge (${docState.taxRate}%)</td>
            <td class="text-right">${formatCurrency(tax)}</td>
          </tr>
          <tr style="background-color: #eee; font-size: 1.25rem;">
            <td colspan="3"><strong>TOTALE COMPLESSIVO (IVA Inclusa)</strong></td>
            <td class="text-right"><strong>${formatCurrency(total)}</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="p-box" style="margin-top: 15px;">
        <div class="p-box-title">Condizioni di Fornitura e Pagamento</div>
        <div><strong>Detrazione Fiscale applicabile:</strong> ${escapeHtml(docState.taxBonus) || 'Nessuna'}</div>
        <div><strong>Termini di Pagamento:</strong> ${escapeHtml(docState.paymentTerms)}</div>
        <div><strong>Tempi indicativi consegna/posa:</strong> ${escapeHtml(docState.deliveryTerms)}</div>
        ${docState.finalNotes ? `<div style="margin-top: 6px;"><strong>Note:</strong> ${escapeHtml(docState.finalNotes)}</div>` : ''}
      </div>

      <div class="p-signature-area">
        <div class="p-sign-box">
          Timbro e Firma della Ditta<br><br><br>
          ________________________________________
        </div>
        <div class="p-sign-box">
          Firma per Accettazione del Committente<br><br><br>
          ________________________________________
        </div>
      </div>

      <div style="font-size: 0.75rem; color: #555; margin-top: 20px; text-align: center;">
        ${isContract 
          ? "La sottoscrizione costituisce formale stipula del contratto d'appalto/fornitura ai sensi dell'art. 1326 c.c." 
          : "Il presente preventivo ha mero valore di proposta economica ed è vincolato all'accettazione entro i termini di validità indicati."}
      </div>
    </div>

    <div class="p-footer">
      <span>${escapeHtml(companySettings.name)}</span>
      <span>Pagina ${pageTotalsNum} di ${totalPages}</span>
    </div>
  `;
  printRoot.appendChild(pageTotals);

  // ULTIMA PAGINA: NORMATIVA & PRIVACY
  const pageLegal = document.createElement('div');
  pageLegal.className = "sheet";
  pageLegal.innerHTML = `
    <div>
      <div class="p-header">
        <div class="p-company">
          <div class="p-company-title">${escapeHtml(companySettings.name)}</div>
          <div>Condizioni Contrattuali e Normativa Privacy</div>
        </div>
      </div>

      <div class="p-box">
        <div class="p-box-title">Condizioni Generali di Fornitura e Posa</div>
        <div class="legal-text">
          <strong>1. Misure ed Esecuzione:</strong> Tutte le misure indicate in fase di offerta si intendono indicative; le misure definitive verranno rilevate a cura del nostro personale tecnico solo ad avvenuta accettazione dell'ordine e con controtelai/opere murarie ultimate.<br>
          <strong>2. Tolleranze e Caratteristiche:</strong> I manufatti sono soggetti alle tolleranze dimensionali e cromatiche previste dalle vigenti norme UNI e dalle schede tecniche dei rispettivi produttori.<br>
          <strong>3. Opere Murarie ed Elettriche:</strong> Salvo diverso accordo scritto, sono escluse dalla fornitura tutte le opere murarie, di finitura intonaco, tinteggiatura, collegamenti elettrici per motorizzazioni e lo smaltimento di materiali nocivi preesistenti.<br>
          <strong>4. Consegna e Riservato Dominio:</strong> I manufatti forniti rimangono di esclusiva proprietà della ditta venditrice fino al completo e integrale saldo dell'importo pattuito ai sensi dell'art. 1523 c.c.<br>
          <strong>5. Foro Competente:</strong> Per ogni controversia derivante dall'interpretazione o esecuzione del presente accordo, il foro competente esclusivo sarà quello del luogo ove ha sede legale la ditta fornitrice.
        </div>
      </div>

      <div class="p-box" style="margin-top: 20px;">
        <div class="p-box-title">Informativa sul Trattamento dei Dati Personali (GDPR 2016/679)</div>
        <div class="legal-text">
          Ai sensi del Regolamento UE 2016/679, La informiamo che i Suoi dati personali anagrafici e fiscali vengono raccolti e trattati esclusivamente per finalità connesse alla gestione amministrativa, contabile, fiscale e operativa del presente preventivo/contratto di fornitura. Il conferimento dei dati è obbligatorio per l'adempimento degli obblighi legali e fiscali.
        </div>
      </div>

      <div class="p-signature-area" style="margin-top: 40px;">
        <div></div>
        <div class="p-sign-box">
          Firma per espressa approvazione clausole e Privacy<br><br><br>
          ________________________________________
        </div>
      </div>
    </div>

    <div class="p-footer">
      <span>${escapeHtml(companySettings.name)}</span>
      <span>Pagina ${totalPages} di ${totalPages}</span>
    </div>
  `;
  printRoot.appendChild(pageLegal);

  const originalTitle = document.title;
  document.title = "";
  
  window.print();

  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker Registrato'))
    .catch((err) => console.log('Errore SW:', err));
}
