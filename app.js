// Dati aziendali predefiniti per la stampa
const COMPANY = {
  name: "NOME AZIENDA / SERRAMENTI",
  address: "Via delle Industrie, 12 - 00100 Roma (RM)",
  taxId: "P.IVA / C.F.: 01234567890",
  contacts: "Tel: 06 1234567 | Cell: 340 0000000 | Email: info@azienda.it"
};

// Stato centrale dell'applicazione
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

// Funzione helper sicura: collega l'evento solo se l'elemento esiste
function safeOn(id, event, handler) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener(event, handler);
  } else {
    console.warn(`Elemento #${id} non trovato nel DOM.`);
  }
}

// Inizializzazione sicura
function initApp() {
  setupEventListeners();
  loadDefaultState();
  renderCategoriesUI();
  updateCalculations();
  console.log("Preventivatore PWA inizializzato con successo!");
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Setup Event Listeners
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
    if (siteGroupEl) {
      siteGroupEl.style.display = e.target.checked ? 'none' : 'block';
    }
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

// Aggiunta dinamica di una categoria
function addCategoryFromSelector() {
  const sel = document.getElementById('select-category-type');
  const catName = sel ? sel.value : "Nuova Categoria";

  const newCat = {
    id: 'cat_' + Date.now(),
    name: catName,
    options: "",
    description: "",
    price: 0
  };

  docState.categories.push(newCat);
  renderCategoriesUI();
  updateCalculations();
}

// Render delle schede categoria a schermo
function renderCategoriesUI() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = "";

  if (docState.categories.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 24px; border: 2px dashed var(--border); border-radius: 8px;">
        Nessuna categoria inserita.<br>Scegli una voce dal menu sopra e premi <strong>+ Aggiungi Pagina Categoria</strong>.
      </div>`;
    return;
  }

  docState.categories.forEach((cat, index) => {
    const card = document.createElement('div');
    card.className = "card category-card";
    card.innerHTML = `
      <div class="card-title">
        <span><strong>Pagina ${index + 2}:</strong> ${escapeHtml(cat.name)}</span>
        <button type="button" class="btn btn-danger" onclick="removeCategory('${cat.id}')">Rimuovi Pagina</button>
      </div>
      <div class="form-grid">
        <div class="form-group full">
          <label>Finiture / Specifiche Rapide (Profilo, Colore, Vetro, Rete, ecc.)</label>
          <input type="text" value="${escapeHtml(cat.options)}" placeholder="es. Alluminio Taglio Termico - Vetrocamera Basso Emissivo 44.1/16/33.1 - Colore Bianco 9010" oninput="updateCatField('${cat.id}', 'options', this.value)">
        </div>
        <div class="form-group full">
          <label>Elenco Posizioni e Descrizione Dettagliata</label>
          <textarea placeholder="es. Pos. 1: Finestra 2 ante 1200x1400 (Bagno)&#10;Pos. 2: Portafinestra 1 anta 900x2300 (Cucina)" oninput="updateCatField('${cat.id}', 'description', this.value)">${escapeHtml(cat.description)}</textarea>
        </div>
        <div class="form-group price-field">
          <label>Prezzo Imponibile Categoria (€)</label>
          <input type="number" step="0.01" min="0" value="${cat.price > 0 ? cat.price : ''}" placeholder="0.00" oninput="updateCatPrice('${cat.id}', this.value)">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Funzioni esposte a window per gli attributi inline (onclick / oninput)
window.updateCatField = function(id, field, value) {
  const cat = docState.categories.find(c => c.id === id);
  if (cat) cat[field] = value;
};

window.updateCatPrice = function(id, value) {
  const cat = docState.categories.find(c => c.id === id);
  if (cat) {
    cat.price = parseFloat(value) || 0;
    updateCalculations();
  }
};

window.removeCategory = function(id) {
  if (confirm("Vuoi rimuovere questa categoria e la relativa pagina?")) {
    docState.categories = docState.categories.filter(c => c.id !== id);
    renderCategoriesUI();
    updateCalculations();
  }
};

// Calcolo totali e imposte
function updateCalculations() {
  const subtotal = docState.categories.reduce((sum, c) => sum + (c.price || 0), 0);
  const tax = subtotal * (docState.taxRate / 100);
  const total = subtotal + tax;

  const subEl = document.getElementById('lbl-subtotal');
  const taxEl = document.getElementById('lbl-tax');
  const totEl = document.getElementById('lbl-total');

  if (subEl) subEl.textContent = formatCurrency(subtotal);
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

// Reset Preventivo (Nuovo)
function resetDocument() {
  if (!confirm("Vuoi iniziare un nuovo preventivo azzerando i campi?")) return;

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
  
  const sameSiteEl = document.getElementById('same-site');
  if (sameSiteEl) sameSiteEl.checked = true;
  const siteGroupEl = document.getElementById('site-group');
  if (siteGroupEl) siteGroupEl.style.display = 'none';
  
  document.getElementById('site-address').value = "";
  document.getElementById('final-notes').value = "";

  renderCategoriesUI();
  updateCalculations();
}

// SALVATAGGIO JSON (Compatibile pCloud Drive)
async function saveToFile() {
  const jsonStr = JSON.stringify(docState, null, 2);
  const clientName = docState.client.name.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || "Cliente";
  const docNum = docState.number.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || "Bozza";
  const fileName = `${clientName}_${docNum}.json`;

  // Se supportato dal browser (Chrome / Edge su PC): dialogo nativo di Windows/Linux per scegliere la cartella pCloud
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
      alert("File salvato correttamente!");
      return;
    } catch (err) {
      if (err.name === 'AbortError') return; // L'utente ha premuto "Annulla"
      console.warn("showSaveFilePicker non riuscito, uso download classico:", err);
    }
  }

  // Fallback universale (scarica direttamente il file)
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

// APERTURA JSON
function openFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      docState = Object.assign(docState, data);

      // Ripristino Campi Form
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
      alert("Errore nel caricamento del file JSON: " + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // Permette di ricaricare lo stesso file se necessario
}

// GENERAZIONE PAGINE A4 E STAMPA / PDF
function prepareAndPrint() {
  const printRoot = document.getElementById('print-root');
  if (!printRoot) return;
  printRoot.innerHTML = "";

  const subtotal = docState.categories.reduce((sum, c) => sum + (c.price || 0), 0);
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
        <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 6px;">${escapeHtml(docState.client.name) || '---'}</div>
        <div><strong>Residenza:</strong> ${escapeHtml(docState.client.residence) || '---'}</div>
        <div><strong>C.F. / P.IVA:</strong> ${escapeHtml(docState.client.taxId) || '---'}</div>
        <div><strong>Recapiti:</strong> ${escapeHtml(docState.client.phone)} ${docState.client.email ? '| ' + escapeHtml(docState.client.email) : ''}</div>
      </div>

      <div class="p-box">
        <div class="p-box-title">Luogo di Posa / Cantiere</div>
        <div>${docState.sameSite ? 'Il cantiere coincide con l\'indirizzo di residenza sopra indicato.' : '<strong>Indirizzo Cantiere:</strong> ' + escapeHtml(docState.siteAddress)}</div>
      </div>

      <div class="p-box" style="margin-top: 20px;">
        <div class="p-box-title">Premessa e Oggetto dell'Offerta</div>
        <p style="font-size: 0.9rem; line-height: 1.5;">
          La presente offerta descrive la fornitura e posa in opera dei manufatti specificati analiticamente nelle pagine successive.
          Ogni tipologia merceologica viene dettagliata nella propria scheda separata per la massima trasparenza tecnica ed economica.
        </p>
      </div>
    </div>
    <div class="p-footer">
      <span>${escapeHtml(COMPANY.name)}</span>
      <span>Pagina 1 di intestazione</span>
    </div>
  `;
  printRoot.appendChild(page1);

  // PAGINE 2..N: CATEGORIE (Una distinta per ogni foglio A4)
  docState.categories.forEach((cat, idx) => {
    const pageCat = document.createElement('div');
    pageCat.className = "sheet";
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

        <div style="margin: 15px 0 20px 0;">
          <h2 style="font-size: 1.35rem; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 6px;">
            ${escapeHtml(cat.name)}
          </h2>
        </div>

        ${cat.options ? `
          <div class="p-box">
            <div class="p-box-title">Specifiche Tecniche e Finiture</div>
            <div style="font-size: 0.95rem; font-weight: 500;">${escapeHtml(cat.options)}</div>
          </div>
        ` : ''}

        <div class="p-box" style="min-height: 380px;">
          <div class="p-box-title">Descrizione Manufatti e Posizioni</div>
          <div style="white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6;">${escapeHtml(cat.description) || 'Nessuna specifica aggiuntiva.'}</div>
        </div>

        <div style="margin-top: 20px; text-align: right; background: #f4f4f4; padding: 12px 16px; border: 1px solid #ccc;">
          <span style="font-size: 1.1rem; font-weight: bold; margin-right: 15px;">Totale Imponibile Categoria:</span>
          <span style="font-size: 1.3rem; font-weight: 900;">${formatCurrency(cat.price)}</span>
        </div>
      </div>

      <div class="p-footer">
        <span>Scheda Categoria: ${escapeHtml(cat.name)}</span>
        <span>Pagina Tecnica ${idx + 2}</span>
      </div>
    `;
    printRoot.appendChild(pageCat);
  });

  // PAGINA TOTALI, DETRAZIONI E FIRMA
  const pageTotals = document.createElement('div');
  pageTotals.className = "sheet";
  
  let catRows = docState.categories.map(c => `
    <tr>
      <td>${escapeHtml(c.name)}</td>
      <td class="text-right"><strong>${formatCurrency(c.price)}</strong></td>
    </tr>
  `).join('');

  pageTotals.innerHTML = `
    <div>
      <div class="p-header">
        <div class="p-company">
          <div class="p-company-title">${escapeHtml(COMPANY.name)}</div>
          <div>Quadro Economico Finale</div>
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
            <th class="text-right" style="width: 160px;">Importo Netto</th>
          </tr>
        </thead>
        <tbody>
          ${catRows || '<tr><td colspan="2">Nessuna categoria inserita</td></tr>'}
          <tr style="background-color: #f9f9f9; font-size: 1.05rem;">
            <td><strong>TOTALE IMPONIBILE</strong></td>
            <td class="text-right"><strong>${formatCurrency(subtotal)}</strong></td>
          </tr>
          <tr>
            <td>IVA di legge (${docState.taxRate}%)</td>
            <td class="text-right">${formatCurrency(tax)}</td>
          </tr>
          <tr style="background-color: #eee; font-size: 1.25rem;">
            <td><strong>TOTALE FORNITURA (IVA Inclusa)</strong></td>
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
          <strong>4. Consegna e Riservato Dominio:</strong> I manufatti forniti rimangono di esclusiva proprietà della ditta venditrice fino al completo e integrale saldo dell'importo pattuito ai sensi dell'art. 1523 c.c. Eventuali ritardi indipendenti dalla nostra volontà (ritardi fornitori materie prime, cause di forza maggiore) non daranno diritto a risarcimento o recesso.<br>
          <strong>5. Foro Competente:</strong> Per ogni controversia derivante dall'interpretazione o esecuzione del presente accordo, il foro competente esclusivo sarà quello del luogo ove ha sede legale la ditta fornitrice.
        </div>
      </div>

      <div class="p-box" style="margin-top: 20px;">
        <div class="p-box-title">Informativa sul Trattamento dei Dati Personali (GDPR 2016/679)</div>
        <div class="legal-text">
          Ai sensi del Regolamento UE 2016/679, La informiamo che i Suoi dati personali anagrafici e fiscali vengono raccolti e trattati esclusivamente per finalità connesse alla gestione amministrativa, contabile, fiscale e operativa del presente preventivo/contratto di fornitura. Il conferimento dei dati è obbligatorio per l'adempimento degli obblighi legali e fiscali. I dati non saranno comunicati a terzi non autorizzati né diffusi, se non a professionisti incaricati per la gestione contabile o enti preposti all'erogazione delle detrazioni fiscali richieste dal cliente.
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

  // Avvia la finestra di stampa / salvataggio PDF nativa del browser
  window.print();
}

// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker Registrato'))
    .catch((err) => console.log('Errore SW:', err));
}
