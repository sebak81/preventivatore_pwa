// ==========================================
// 1. ANAGRAFICA AZIENDALE DI DEFAULT
// ==========================================
const COMPANY = {
  name: "NOME AZIENDA / SERRAMENTI",
  address: "Via delle Industrie, 12 - 00100 Roma (RM)",
  taxId: "P.IVA / C.F.: 01234567890",
  contacts: "Tel: 06 1234567 | Cell: 340 0000000 | Email: info@azienda.it"
};

// ==========================================
// 2. CATALOGO BASE FORNITORI E MODELLI
// ==========================================
const DEFAULT_CATALOG = {
  suppliers: [
    {
      id: "qfort",
      name: "QFORT",
      categories: [
        {
          id: "pvc",
          name: "Serramenti in PVC",
          models: [
            {
              id: "4_stars",
              name: "4 Stars",
              profileDepth: "70 mm",
              chambers: "5 camere",
              gaskets: "2 guarnizioni di battuta",
              defaultGlass: "Vetrocamera 24 mm B.E. con gas Argon e Warm Edge",
              defaultDescription: "Profilo in PVC classe A da 70 mm a 5 camere con rinforzi in acciaio zincato. Sistema a 2 guarnizioni di battuta in EPDM. Ideale per ristrutturazioni e interventi di riqualificazione energetica."
            },
            {
              id: "5_stars",
              name: "5 Stars",
              profileDepth: "70 mm",
              chambers: "5 camere",
              gaskets: "2 guarnizioni di tenuta",
              defaultGlass: "Vetrocamera 24 mm o 30 mm B.E. con canalina calda",
              defaultDescription: "Design squadrato ed essenziale. Profilo in PVC da 70 mm a 5 camere, ferramenta perimetrale ad alta sicurezza con riscontri antieffrazione e dispositivo di microventilazione integrato."
            },
            {
              id: "7_stars",
              name: "7 Stars",
              profileDepth: "85 mm",
              chambers: "7 camere",
              gaskets: "3 guarnizioni (con guarnizione centrale a giunto aperto)",
              defaultGlass: "Triplo vetro 44 mm selettivo B.E. con gas Argon e canalina termica Warm Edge",
              defaultDescription: "Top di gamma a taglio termico passivo. Profilo in PVC classe A da 85 mm a 7 camere e sistema a 3 guarnizioni. Massime prestazioni di isolamento termico e acustico per case a basso consumo ed edifici nZEB."
            },
            {
              id: "stars_epiq",
              name: "Stars Epiq",
              profileDepth: "82 mm",
              chambers: "6 camere",
              gaskets: "3 guarnizioni perimetrali",
              defaultGlass: "Triplo vetro ad alte prestazioni termiche e acustiche",
              defaultDescription: "Sistema innovativo con estetica moderna e complanare/semi-complanare. Profili rinforzati per grandi aperture, eccellente stabilità statica e valore termico ai massimi livelli di mercato."
            }
          ]
        },
        {
          id: "alluminio",
          name: "Serramenti in Alluminio",
          models: [
            {
              id: "alluminio_tt",
              name: "Alluminio a Taglio Termico",
              profileDepth: "75 mm",
              chambers: "Barrette tubolari in poliammide",
              gaskets: "3 guarnizioni di tenuta",
              defaultGlass: "Vetrocamera 33.1/16/33.1 B.E. con Warm Edge",
              defaultDescription: "Profili estrusi in lega primaria di alluminio a taglio termico. Massima resistenza meccanica, indeformabilità, resistenza agli agenti atmosferici e linee sobrie ed essenziali."
            }
          ]
        }
      ]
    },
    {
      id: "generico",
      name: "Fornitore Personalizzato / Altro",
      categories: [
        {
          id: "libero",
          name: "Standard",
          models: [
            {
              id: "custom",
              name: "Su Misura / Standard",
              profileDepth: "-",
              chambers: "-",
              gaskets: "-",
              defaultGlass: "Secondo capitolato",
              defaultDescription: "Fornitura realizzata secondo le specifiche tecniche concordate per la singola commessa."
            }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// 3. STATO CENTRALE DELL'APPLICAZIONE
// ==========================================
let docState = {
  type: "PREVENTIVO",
  number: "",
  date: new Date().toISOString().split('T')[0],
  validity: "30 giorni",
  client: {
    name: "",
    residence: "",
    taxId: "",
    phone: "",
    email: ""
  },
  sameSite: true,
  siteAddress: "",
  categories: [],
  taxRate: 22,
  taxBonus: "Bonus Casa 50%",
  paymentTerms: "30% all'ordine come caparra confirmatoria, 40% a inizio posa, 30% a fine lavori collaudati.",
  deliveryTerms: "Circa 6-8 settimane lavorative dall'avvenuto rilievo misure definitive.",
  finalNotes: ""
};

// ==========================================
// 4. INIZIALIZZAZIONE E GESTIONE EVENTI
// ==========================================
function safeOn(id, event, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(event, handler);
}

function initApp() {
  setupEventListeners();
  loadDefaultState();
  renderCategoriesUI();
  updateCalculations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function setupEventListeners() {
  safeOn('doc-type', 'change', (e) => { docState.type = e.target.value; });
  safeOn('doc-number', 'input', (e) => { docState.number = e.target.value; });
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

  // Pulsanti Principali
  safeOn('btn-add-category', 'click', addCategoryFromSelector);
  safeOn('btn-print', 'click', prepareAndPrint);
  safeOn('btn-save', 'click', saveToFile);
  safeOn('btn-open', 'click', () => {
    const fi = document.getElementById('file-input');
    if (fi) fi.click();
  });
  safeOn('file-input', 'change', openFromFile);
  safeOn('btn-new', 'click', resetDocument);
}

function loadDefaultState() {
  const dateInput = document.getElementById('doc-date');
  if (dateInput) dateInput.value = docState.date;
}

// ==========================================
// 5. GESTIONE CATEGORIE E CATALOGO A CASCATA
// ==========================================
function addCategoryFromSelector() {
  const sel = document.getElementById('select-category-type');
  const catType = sel ? sel.value : "Serramenti";

  const isSerramenti = catType.toLowerCase().includes("serramenti");
  const defaultSupp = DEFAULT_CATALOG.suppliers[0];
  const defaultSubCat = defaultSupp.categories[0];
  const defaultModel = defaultSubCat.models[2] || defaultSubCat.models[0]; // 7 Stars se presente

  const newCat = {
    id: 'cat_' + Date.now(),
    name: catType,
    isSerramenti: isSerramenti,
    // Dati specifici di catalogo (per Serramenti)
    supplierId: isSerramenti ? defaultSupp.id : "generico",
    materialId: isSerramenti ? defaultSubCat.id : "libero",
    modelId: isSerramenti ? defaultModel.id : "custom",
    color: "",
    glass: isSerramenti ? defaultModel.defaultGlass : "",
    profileSpecs: isSerramenti ? `${defaultModel.profileDepth} - ${defaultModel.chambers} - ${defaultModel.gaskets}` : "",
    description: isSerramenti ? defaultModel.defaultDescription : "",
    // Righe Vani / Posizioni
    positions: [],
    // Posa in opera specifica della pagina
    installationPrice: 0
  };

  // Aggiunge una prima posizione vuota di default
  newCat.positions.push({
    id: 'pos_' + Date.now(),
    name: "Pos. 1",
    measures: "",
    description: "",
    quantity: 1,
    unitPrice: 0
  });

  docState.categories.push(newCat);
  renderCategoriesUI();
  updateCalculations();
}

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

    let catalogSectionHtml = "";
    if (cat.isSerramenti) {
      catalogSectionHtml = renderCatalogSelectorHtml(cat);
    }

    const positionsTableHtml = renderPositionsTableHtml(cat);
    const totalsCat = calculateCategoryTotals(cat);

    card.innerHTML = `
      <div class="card-title">
        <span><strong>Pagina ${index + 2}:</strong> ${escapeHtml(cat.name)}</span>
        <button type="button" class="btn btn-danger" onclick="removeCategory('${cat.id}')">Rimuovi Pagina</button>
      </div>

      ${catalogSectionHtml}

      <div style="margin-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <label style="font-size: 0.85rem; font-weight: 700;">ELENCO VANI, POSIZIONI E MISURE</label>
          <button type="button" class="btn btn-secondary" style="font-size: 0.75rem; padding: 5px 10px;" onclick="addPosition('${cat.id}')">+ Aggiungi Vano / Posizione</button>
        </div>
        ${positionsTableHtml}
      </div>

      <!-- RIEPILOGO ECONOMICO DELLA CATEGORIA -->
      <div class="cat-summary-box">
        <div class="cat-summary-row">
          <span>Subtotale Fornitura Manufatti:</span>
          <strong>${formatCurrency(totalsCat.fornitura)}</strong>
        </div>
        <div class="cat-summary-row" style="align-items: center;">
          <label style="margin: 0; text-transform: none; font-weight: 600;">Posa in Opera e Fissaggio (€ netto):</label>
          <input type="number" step="0.01" min="0" value="${cat.installationPrice > 0 ? cat.installationPrice : ''}" placeholder="0.00" style="width: 140px; text-align: right; font-weight: bold;" oninput="updateCatInstallation('${cat.id}', this.value)">
        </div>
        <div class="cat-summary-row cat-summary-total">
          <span>Totale Categoria (Fornitura + Posa):</span>
          <span>${formatCurrency(totalsCat.total)}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Genera i selettori a cascata per Serramenti
function renderCatalogSelectorHtml(cat) {
  const currentSupp = DEFAULT_CATALOG.suppliers.find(s => s.id === cat.supplierId) || DEFAULT_CATALOG.suppliers[0];
  const currentMaterial = currentSupp.categories.find(m => m.id === cat.materialId) || currentSupp.categories[0];

  const suppOptions = DEFAULT_CATALOG.suppliers.map(s => 
    `<option value="${s.id}" ${s.id === cat.supplierId ? 'selected' : ''}>${escapeHtml(s.name)}</option>`
  ).join('');

  const matOptions = currentSupp.categories.map(m => 
    `<option value="${m.id}" ${m.id === cat.materialId ? 'selected' : ''}>${escapeHtml(m.name)}</option>`
  ).join('');

  const modelOptions = currentMaterial.models.map(mod => 
    `<option value="${mod.id}" ${mod.id === cat.modelId ? 'selected' : ''}>${escapeHtml(mod.name)}</option>`
  ).join('');

  return `
    <div style="background: #f8fafc; border: 1px solid var(--border); padding: 14px; border-radius: 6px; margin-bottom: 15px;">
      <label style="color: var(--accent); margin-bottom: 8px; display: block;">Configurazione Fornitore & Modello</label>
      <div class="form-grid">
        <div class="form-group">
          <label>Fornitore</label>
          <select onchange="onSupplierChange('${cat.id}', this.value)">${suppOptions}</select>
        </div>
        <div class="form-group">
          <label>Materiale / Categoria</label>
          <select onchange="onMaterialChange('${cat.id}', this.value)">${matOptions}</select>
        </div>
        <div class="form-group">
          <label>Serie / Modello</label>
          <select onchange="onModelChange('${cat.id}', this.value)">${modelOptions}</select>
        </div>
      </div>

      <div class="form-grid" style="margin-top: 10px;">
        <div class="form-group">
          <label>Dati Tecnici Profilo</label>
          <input type="text" value="${escapeHtml(cat.profileSpecs)}" placeholder="Spessore, camere, guarnizioni" oninput="updateCatField('${cat.id}', 'profileSpecs', this.value)">
        </div>
        <div class="form-group">
          <label>Finitura / Colore Int. / Est.</label>
          <input type="text" value="${escapeHtml(cat.color)}" placeholder="es. Bianco Massa / Noce Ext." oninput="updateCatField('${cat.id}', 'color', this.value)">
        </div>
        <div class="form-group">
          <label>Vetraggio di Base</label>
          <input type="text" value="${escapeHtml(cat.glass)}" placeholder="es. 44.1/16/33.1 B.E. Warm Edge" oninput="updateCatField('${cat.id}', 'glass', this.value)">
        </div>
      </div>

      <div class="form-group full" style="margin-top: 10px;">
        <label>Descrizione Generale Manufatto (Precompilata, modificabile)</label>
        <textarea oninput="updateCatField('${cat.id}', 'description', this.value)">${escapeHtml(cat.description)}</textarea>
      </div>
    </div>
  `;
}

// Genera la tabella dei singoli vani per la scheda corrente
function renderPositionsTableHtml(cat) {
  if (cat.positions.length === 0) {
    return `<div style="color: var(--text-muted); font-size: 0.85rem; padding: 10px;">Nessuna posizione inserita.</div>`;
  }

  const rows = cat.positions.map((pos) => {
    const rowTotal = (pos.quantity || 0) * (pos.unitPrice || 0);
    return `
      <tr>
        <td style="width: 20%;">
          <input type="text" value="${escapeHtml(pos.name)}" placeholder="es. Pos. 1 - Cucina" oninput="updatePosField('${cat.id}', '${pos.id}', 'name', this.value)">
        </td>
        <td style="width: 18%;">
          <input type="text" value="${escapeHtml(pos.measures)}" placeholder="es. 1200 x 1400 mm" oninput="updatePosField('${cat.id}', '${pos.id}', 'measures', this.value)">
        </td>
        <td style="width: 32%;">
          <input type="text" value="${escapeHtml(pos.description)}" placeholder="es. Finestra 1 anta con ribalta" oninput="updatePosField('${cat.id}', '${pos.id}', 'description', this.value)">
        </td>
        <td style="width: 8%;">
          <input type="number" min="1" step="1" value="${pos.quantity || 1}" style="text-align: center;" oninput="updatePosField('${cat.id}', '${pos.id}', 'quantity', this.value)">
        </td>
        <td style="width: 12%;">
          <input type="number" step="0.01" min="0" value="${pos.unitPrice > 0 ? pos.unitPrice : ''}" placeholder="0.00" style="text-align: right;" oninput="updatePosField('${cat.id}', '${pos.id}', 'unitPrice', this.value)">
        </td>
        <td style="width: 10%; text-align: right; font-weight: bold; padding: 8px;">
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
            <th>Misure (LxH)</th>
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

// ==========================================
// 6. EVENTI A CASCATA (Fornitore -> Modello)
// ==========================================
window.onSupplierChange = function(catId, suppId) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.supplierId = suppId;
  const supp = DEFAULT_CATALOG.suppliers.find(s => s.id === suppId);
  cat.materialId = supp.categories[0].id;
  cat.modelId = supp.categories[0].models[0].id;
  applyModelSpecs(cat);
  renderCategoriesUI();
  updateCalculations();
};

window.onMaterialChange = function(catId, matId) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.materialId = matId;
  const supp = DEFAULT_CATALOG.suppliers.find(s => s.id === cat.supplierId);
  const mat = supp.categories.find(m => m.id === matId);
  cat.modelId = mat.models[0].id;
  applyModelSpecs(cat);
  renderCategoriesUI();
  updateCalculations();
};

window.onModelChange = function(catId, modelId) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.modelId = modelId;
  applyModelSpecs(cat);
  renderCategoriesUI();
  updateCalculations();
};

function applyModelSpecs(cat) {
  const supp = DEFAULT_CATALOG.suppliers.find(s => s.id === cat.supplierId);
  if (!supp) return;
  const mat = supp.categories.find(m => m.id === cat.materialId);
  if (!mat) return;
  const model = mat.models.find(mod => mod.id === cat.modelId);
  if (!model) return;

  cat.profileSpecs = `${model.profileDepth} - ${model.chambers} - ${model.gaskets}`;
  cat.glass = model.defaultGlass;
  cat.description = model.defaultDescription;
}

// ==========================================
// 7. GESTIONE POSIZIONI E TOTALI
// ==========================================
window.addPosition = function(catId) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  const nextNum = cat.positions.length + 1;
  cat.positions.push({
    id: 'pos_' + Date.now(),
    name: `Pos. ${nextNum}`,
    measures: "",
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
    pos.quantity = parseInt(val) || 1;
  } else if (field === 'unitPrice') {
    pos.unitPrice = parseFloat(val) || 0;
  } else {
    pos[field] = val;
  }

  // Se cambiano prezzi o quantità, aggiorniamo i totali a schermo
  if (field === 'quantity' || field === 'unitPrice') {
    renderCategoriesUI();
    updateCalculations();
  }
};

window.updateCatInstallation = function(catId, val) {
  const cat = docState.categories.find(c => c.id === catId);
  if (!cat) return;
  cat.installationPrice = parseFloat(val) || 0;
  updateCalculations();
  // Aggiorna la riga totale del blocco senza rifare l'intero render
  const totals = calculateCategoryTotals(cat);
  const container = document.getElementById('categories-container');
  // Refresh mirato
  renderCategoriesUI();
};

window.updateCatField = function(catId, field, val) {
  const cat = docState.categories.find(c => c.id === catId);
  if (cat) cat[field] = val;
};

window.removeCategory = function(id) {
  if (confirm("Vuoi rimuovere questa categoria e la relativa pagina?")) {
    docState.categories = docState.categories.filter(c => c.id !== id);
    renderCategoriesUI();
    updateCalculations();
  }
};

function calculateCategoryTotals(cat) {
  const fornitura = (cat.positions || []).reduce((sum, p) => sum + ((p.quantity || 0) * (p.unitPrice || 0)), 0);
  const posa = cat.installationPrice || 0;
  return {
    fornitura: fornitura,
    posa: posa,
    total: fornitura + posa
  };
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

// ==========================================
// 8. SALVATAGGIO E CARICAMENTO JSON (pCloud)
// ==========================================
async function saveToFile() {
  const jsonStr = JSON.stringify(docState, null, 2);
  const clientName = docState.client.name.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || "Cliente";
  const docNum = docState.number.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || "Bozza";
  const fileName = `${clientName}_${docNum}.json`;

  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: 'File Preventivo JSON',
          accept: { 'application/json': ['.json'] }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(jsonStr);
      await writable.close();
      alert("Preventivo salvato correttamente in pCloud / archivio!");
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

      document.getElementById('doc-type').value = docState.type || "PREVENTIVO";
      document.getElementById('doc-number').value = docState.number || '';
      document.getElementById('doc-date').value = docState.date || '';
      document.getElementById('doc-validity').value = docState.validity || '30 giorni';

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

      renderCategoriesUI();
      updateCalculations();
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
}

// ==========================================
// 9. GENERAZIONE STAMPA A4 E PDF
// ==========================================
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
  const isContract = docState.type.includes("CONTRATTO");

  // PAGINA 1: INTESTAZIONE E COMMITTENTE
  const page1 = document.createElement('div');
  page1.className = "sheet";
  page1.innerHTML = `
    <div>
      <div class="p-header">
        <div class="p-company">
          <div class="p-company-title">${escapeHtml(COMPANY.name)}</div>
          <div>${escapeHtml(COMPANY.address)}</div>
          <div>${escapeHtml(COMPANY.taxId)}</div>
          <div>${escapeHtml(COMPANY.contacts)}</div>
        </div>
        <div class="p-doc-details">
          <div class="p-doc-type">${escapeHtml(docState.type)}</div>
          <div class="p-doc-meta"><strong>Numero:</strong> ${escapeHtml(docState.number || 'BOZZA')}</div>
          <div class="p-doc-meta"><strong>Data:</strong> ${escapeHtml(docState.date)}</div>
          <div class="p-doc-meta"><strong>Validità:</strong> ${escapeHtml(docState.validity)}</div>
        </div>
      </div>

      <div class="p-box" style="margin-top: 25px;">
        <div class="p-box-title">Dati del Committente</div>
        <div style="font-size: 1.15rem; font-weight: bold; margin-bottom: 6px;">${escapeHtml(docState.client.name) || '---'}</div>
        <div><strong>Residenza:</strong> ${escapeHtml(docState.client.residence) || '---'}</div>
        <div><strong>C.F. / P.IVA:</strong> ${escapeHtml(docState.client.taxId) || '---'}</div>
        <div><strong>Recapiti:</strong> ${escapeHtml(docState.client.phone)} ${docState.client.email ? '| ' + escapeHtml(docState.client.email) : ''}</div>
      </div>

      <div class="p-box">
        <div class="p-box-title">Luogo di Posa / Cantiere</div>
        <div>${docState.sameSite ? 'Il cantiere coincide con l\'indirizzo di residenza sopra indicato.' : '<strong>Indirizzo Cantiere:</strong> ' + escapeHtml(docState.siteAddress)}</div>
      </div>

      <div class="p-box" style="margin-top: 25px;">
        <div class="p-box-title">Oggetto della Fornitura</div>
        <p style="font-size: 0.9rem; line-height: 1.5;">
          La presente proposta descrive la fornitura e posa in opera a regola d'arte dei manufatti dettagliati nelle schede tecniche successive.
          Ogni categoria merceologica è riportata su scheda autonoma con l'indicazione analitica delle singole posizioni, quote dimensionali e specifici costi di montaggio.
        </p>
      </div>
    </div>
    <div class="p-footer">
      <span>${escapeHtml(COMPANY.name)}</span>
      <span>Pagina 1 di intestazione</span>
    </div>
  `;
  printRoot.appendChild(page1);

  // PAGINE 2..N: SCHEDE CATEGORIA (Una distinta per ogni foglio A4)
  docState.categories.forEach((cat, idx) => {
    const pageCat = document.createElement('div');
    pageCat.className = "sheet";

    const catTotals = calculateCategoryTotals(cat);

    let posRows = (cat.positions || []).map(p => {
      const rowTot = (p.quantity || 0) * (p.unitPrice || 0);
      return `
        <tr>
          <td><strong>${escapeHtml(p.name)}</strong></td>
          <td>${escapeHtml(p.measures) || '-'}</td>
          <td style="font-size: 0.85rem;">${escapeHtml(p.description)}</td>
          <td style="text-align: center;">${p.quantity}</td>
          <td style="text-align: right;">${formatCurrency(p.unitPrice)}</td>
          <td style="text-align: right; font-weight: bold;">${formatCurrency(rowTot)}</td>
        </tr>
      `;
    }).join('');

    let headerSubtitle = "";
    if (cat.isSerramenti) {
      const supp = DEFAULT_CATALOG.suppliers.find(s => s.id === cat.supplierId);
      const mat = supp ? supp.categories.find(m => m.id === cat.materialId) : null;
      const mod = mat ? mat.models.find(m => m.id === cat.modelId) : null;
      headerSubtitle = `${supp ? supp.name : ''} - ${mod ? mod.name : ''}`;
    }

    pageCat.innerHTML = `
      <div>
        <div class="p-header">
          <div class="p-company">
            <div class="p-company-title">${escapeHtml(COMPANY.name)}</div>
            <div style="font-size: 0.8rem;">Allegato Tecnico - Rif. Doc N° ${escapeHtml(docState.number || 'BOZZA')}</div>
          </div>
          <div class="p-doc-details">
            <div style="font-size: 1.1rem; font-weight: bold;">SCHEDA TECNICA ${idx + 1}</div>
            <div style="font-size: 0.9rem;">Cliente: ${escapeHtml(docState.client.name)}</div>
          </div>
        </div>

        <div style="margin: 10px 0 15px 0;">
          <h2 style="font-size: 1.3rem; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 4px;">
            ${escapeHtml(cat.name)} ${headerSubtitle ? `— <span style="font-size: 1.1rem; font-weight: normal;">${escapeHtml(headerSubtitle)}</span>` : ''}
          </h2>
        </div>

        ${cat.profileSpecs || cat.color || cat.glass ? `
          <div class="p-box" style="margin-bottom: 12px; padding: 8px 12px; background: #fafafa;">
            <div style="font-size: 0.85rem; line-height: 1.5;">
              ${cat.profileSpecs ? `<div><strong>Caratteristiche Sistema:</strong> ${escapeHtml(cat.profileSpecs)}</div>` : ''}
              ${cat.color ? `<div><strong>Finitura / Colore:</strong> ${escapeHtml(cat.color)}</div>` : ''}
              ${cat.glass ? `<div><strong>Vetraggio Base:</strong> ${escapeHtml(cat.glass)}</div>` : ''}
            </div>
          </div>
        ` : ''}

        ${cat.description ? `
          <div style="font-size: 0.82rem; color: #333; margin-bottom: 12px; line-height: 1.45; text-align: justify;">
            ${escapeHtml(cat.description)}
          </div>
        ` : ''}

        <!-- TABELLA DELLE POSIZIONI A4 -->
        <table class="p-table" style="margin-top: 10px;">
          <thead>
            <tr>
              <th style="width: 18%;">Vano / Posizione</th>
              <th style="width: 16%;">Misure (LxH)</th>
              <th style="width: 38%;">Descrizione Manufatto</th>
              <th style="width: 6%; text-align: center;">Q.tà</th>
              <th style="width: 11%; text-align: right;">P. Unit.</th>
              <th style="width: 11%; text-align: right;">Totale</th>
            </tr>
          </thead>
          <tbody>
            ${posRows || '<tr><td colspan="6">Nessun manufatto inserito</td></tr>'}
          </tbody>
        </table>

        <!-- QUADRO ECONOMICO CATEGORIA -->
        <div style="margin-top: 15px; border: 1px solid #999; padding: 10px 14px; background: #fdfdfd;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px;">
            <span>Subtotale Fornitura Manufatti:</span>
            <strong>${formatCurrency(catTotals.fornitura)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px dashed #ccc;">
            <span>Posa in Opera ed Assistenza al Montaggio:</span>
            <strong>${formatCurrency(catTotals.posa)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800;">
            <span>TOTALE NETTO CATEGORIA:</span>
            <span>${formatCurrency(catTotals.total)}</span>
          </div>
        </div>
      </div>

      <div class="p-footer">
        <span>Scheda: ${escapeHtml(cat.name)}</span>
        <span>Pagina Tecnica ${idx + 2}</span>
      </div>
    `;
    printRoot.appendChild(pageCat);
  });

  // PAGINA TOTALI, DETRAZIONI E FIRMA
  const pageTotals = document.createElement('div');
  pageTotals.className = "sheet";
  
  let catSummaryRows = docState.categories.map(c => {
    const t = calculateCategoryTotals(c);
    return `
      <tr>
        <td><strong>${escapeHtml(c.name)}</strong></td>
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
          <div class="p-company-title">${escapeHtml(COMPANY.name)}</div>
          <div>Quadro Economico Complessivo</div>
        </div>
        <div class="p-doc-details">
          <div class="p-doc-type">RIEPILOGO & FIRMA</div>
          <div class="p-doc-meta">Rif. Doc N°: ${escapeHtml(docState.number || 'BOZZA')}</div>
        </div>
      </div>

      <table class="p-table">
        <thead>
          <tr>
            <th>Tipologia Merceologica</th>
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
      <span>Riepilogo Fiscale e Firma</span>
      <span>Pagina Totali</span>
    </div>
  `;
  printRoot.appendChild(pageTotals);

  // ULTIMA PAGINA: CONDIZIONI GENERALI E PRIVACY
  const pageLegal = document.createElement('div');
  pageLegal.className = "sheet";
  pageLegal.innerHTML = `
    <div>
      <div class="p-header">
        <div class="p-company">
          <div class="p-company-title">${escapeHtml(COMPANY.name)}</div>
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
      <span>Allegato Normativo</span>
      <span>Condizioni Generali & Privacy</span>
    </div>
  `;
  printRoot.appendChild(pageLegal);

  window.print();
}

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker Registrato'))
    .catch((err) => console.log('Errore SW:', err));
}
