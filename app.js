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
  paymentTerms: "30% all'ordine, 40% a inizio posa, saldo a fine lavori.",
  deliveryTerms: "6-8 settimane lavorative da rilievo misure definitive.",
  finalNotes: ""
};

// Inizializzazione
window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadDefaultState();
  renderCategoriesUI();
  updateCalculations();
});

// Setup degli eventi UI
function setupEventListeners() {
  document.getElementById('doc-type').addEventListener('change', (e) => { docState.type = e.target.value; });
  document.getElementById('doc-number').addEventListener('input', (e) => { docState.number = e.target.value; });
  document.getElementById('doc-date').addEventListener('change', (e) => { docState.date = e.target.value; });
  document.getElementById('doc-validity').addEventListener('input', (e) => { docState.validity = e.target.value; });

  document.getElementById('client-name').addEventListener('input', (e) => { docState.client.name = e.target.value; });
  document.getElementById('client-residence').addEventListener('input', (e) => { docState.client.residence = e.target.value; });
  document.getElementById('client-taxId' || 'client-taxid').addEventListener('input', (e) => { docState.client.taxId = e.target.value; });
  document.getElementById('client-phone').addEventListener('input', (e) => { docState.client.phone = e.target.value; });
  document.getElementById('client-email').addEventListener('input', (e) => { docState.client.email = e.target.value; });

  const sameSiteEl = document.getElementById('same-site');
  const siteGroupEl = document.getElementById('site-group');
  sameSiteEl.addEventListener('change', (e) => {
    docState.sameSite = e.target.checked;
    siteGroupEl.style.display = e.target.checked ? 'none' : 'block';
  });
  document.getElementById('site-address').addEventListener('input', (e) => { docState.siteAddress = e.target.value; });

  document.getElementById('tax-rate').addEventListener('change', (e) => {
    docState.taxRate = parseFloat(e.target.value);
    updateCalculations();
  });
  document.getElementById('tax-bonus').addEventListener('input', (e) => { docState.taxBonus = e.target.value; });
  document.getElementById('payment-terms').addEventListener('input', (e) => { docState.paymentTerms = e.target.value; });
  document.getElementById('delivery-terms').addEventListener('input', (e) => { docState.deliveryTerms = e.target.value; });
  document.getElementById('final-notes').addEventListener('input', (e) => { docState.finalNotes = e.target.value; });

  // Pulsanti Barra Strumenti
  document.getElementById('btn-add-category').addEventListener('click', addCategoryFromSelector);
  document.getElementById('btn-print').addEventListener('click', prepareAndPrint);
  document.getElementById('btn-save').addEventListener('click', saveToFile);
  document.getElementById('btn-open').addEventListener('click', () => document.getElementById('file-input').click());
  document.getElementById('file-input').addEventListener('change', openFromFile);
  document.getElementById('btn-new').addEventListener('click', resetDocument);
}

function loadDefaultState() {
  document.getElementById('doc-date').value = docState.date;
}

// Aggiunta dinamica di una categoria
function addCategoryFromSelector() {
  const sel = document.getElementById('select-category-type');
  const catName = sel.value;

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

// Render delle schede categoria nel form
function renderCategoriesUI() {
  const container = document.getElementById('categories-container');
  container.innerHTML = "";

  if (docState.categories.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">Nessuna categoria inserita. Seleziona una voce sopra e premi "Aggiungi".</div>`;
    return;
  }

  docState.categories.forEach((cat, index) => {
    const card = document.createElement('div');
    card.className = "card category-card";
    card.innerHTML = `
      <div class="card-title">
        <span>Pagina ${index + 2}: ${escapeHtml(cat.name)}</span>
        <button type="button" class="btn btn-danger" onclick="removeCategory('${cat.id}')">Rimuovi</button>
      </div>
      <div class="form-grid">
        <div class="form-group full">
          <label>Finiture / Specifiche Rapide (Profilo, Colore, Vetro, Rete, ecc.)</label>
          <input type="text" value="${escapeHtml(cat.options)}" placeholder="es. Serie Alluminio Termico - Colore Bianco 9010 - Vetro selettivo 44.1/16/33.1" oninput="updateCatField('${cat.id}', 'options', this.value)">
        </div>
        <div class="form-group full">
          <label>Elenco Posizioni e Descrizione Dettagliata</label>
          <textarea placeholder="es. Pos. 1: Finestra 2 ante 1200x1400 (Bagno)&#10;Pos. 2: Portafinestra 1 anta 900x2300 (Cucina)" oninput="updateCatField('${cat.id}', 'description', this.value)">${escapeHtml(cat.description)}</textarea>
        </div>
        <div class="form-group price-field">
          <label>Prezzo Imponibile Categoria (€)</label>
          <input type="number" step="0.01" min="0" value="${cat.price || ''}" placeholder="0.00" oninput="updateCatPrice('${cat.id}', this.value)">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateCatField(id, field, value) {
  const cat = docState.categories.find(c => c.id === id);
  if (cat) cat[field] = value;
}

function updateCatPrice(id, value) {
  const cat = docState.categories.find(c => c.id === id);
  if (cat) {
    cat.price = parseFloat(value) || 0;
    updateCalculations();
  }
}

function removeCategory(id) {
  docState.categories = docState.categories.filter(c => c.id !== id);
  renderCategoriesUI();
  updateCalculations();
}

// Calcolo totali e tasse
function updateCalculations() {
  const subtotal = docState.categories.reduce((sum, c) => sum + (c.price || 0), 0);
  const tax = subtotal * (docState.taxRate / 100);
  const total = subtotal + tax;

  document.getElementById('lbl-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('lbl-tax').textContent = `${formatCurrency(tax)} (${docState.taxRate}%)`;
  document.getElementById('lbl-total').textContent = formatCurrency(total);
}

function formatCurrency(val) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(val);
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

// Reset Preventivo
function resetDocument() {
  if (confirm("Vuoi iniziare un nuovo preventivo azzerando i campi?")) {
    docState.number = "";
    docState.client = { name: "", residence: "", taxId: "", phone: "", email: "" };
    docState.categories = [];
    docState.siteAddress = "";
    docState.sameSite = true;
    
    // Aggiorna UI
    document.getElementById('doc-number').value = "";
    document.getElementById('client-name').value = "";
    document.getElementById('client-residence').value = "";
    document.getElementById('client-taxid').value = "";
    document.getElementById('client-phone').value = "";
    document.getElementById('client-email').value = "";
    document.getElementById('same-site').checked = true;
    document.getElementById('site-group').style.display = 'none';
    document.getElementById('site-address').value = "";

    renderCategoriesUI();
    updateCalculations();
  }
}

// SALVATAGGIO / APERTURA JSON (Compatibile con pCloud Drive)
async function saveToFile() {
  const jsonStr = JSON.stringify(docState, null, 2);
  const safeName = (docState.client.name.replace(/[^a-zA-Z0-9]/g, '_') || "Documento") + "_" + (docState.number.replace(/[^a-zA-Z0-9]/g, '_') || "Bozza");
  const fileName = `${safeName}.json`;

  // Uso delle API native moderne se disponibili (apre il dialogo di selezione cartella, es. pCloud)
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
      alert("Salvato correttamente!");
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  // Fallback per browser che non supportano showSaveFilePicker (es. Safari/Mobile)
  const blob = new Blob([jsonStr], { type: "application/json" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
}

function openFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      docState = Object.assign(docState, data);

      // Aggiornamento campi form
      document.getElementById('doc-type').value = docState.type;
      document.getElementById('doc-number').value = docState.number || '';
      document.getElementById('doc-date').value = docState.date;
      document.getElementById('doc-validity').value = docState.validity || '30 giorni';

      document.getElementById('client-name').value = docState.client.name || '';
      document.getElementById('client-residence').value = docState.client.residence || '';
      document.getElementById('client-taxid').value = docState.client.taxId || '';
      document.getElementById('client-phone').value = docState.client.phone || '';
      document.getElementById('client-email').value = docState.client.email || '';

      document.getElementById('same-site').checked = docState.sameSite;
      document.getElementById('site-group').style.display = docState.sameSite ? 'none' : 'block';
      document.getElementById('site-address').value = docState.siteAddress || '';

      document.getElementById('tax-rate').value = docState.taxRate;
      document.getElementById('tax-bonus').value = docState.taxBonus || '';
      document.getElementById('payment-terms').value = docState.paymentTerms || '';
      document.getElementById('delivery-terms').value = docState.deliveryTerms || '';
      document.getElementById('final-notes').value = docState.finalNotes || '';

      renderCategoriesUI();
      updateCalculations();
      alert("Progetto caricato con successo!");
    } catch (err) {
      alert("Errore nella lettura del file JSON: " + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// GENERAZIONE FOGLI DI STAMPA A4 E APERTURA DIALOGO PDF
function prepareAndPrint() {
  const printRoot = document.getElementById('print-root');
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

      <div class="p-box" style="margin-top: 30px;">
        <div class="p-box-title">Dati del Committente</div>
        <div style="font-size: 1.05rem; font-weight: bold; margin-bottom: 6px;">${escapeHtml(docState.client.name) || '---'}</div>
        <div><strong>Residenza:</strong> ${escapeHtml(docState.client.residence) || '---'}</div>
        <div><strong>C.F. / P.IVA:</strong> ${escapeHtml(docState.client.taxId) || '---'}</div>
        <div><strong>Recapiti:</strong> ${escapeHtml(docState.client.phone)} ${docState.client.email ? '| ' + escapeHtml(docState.client.email) : ''}</div>
      </div>

      <div class="p-box">
        <div class="p-box-title">Luogo di Posa / Cantiere</div>
        <div>${docState.sameSite ? 'Il cantiere coincide con l\'indirizzo di residenza sopra indicato.' : '<strong>Indirizzo Cantiere:</strong> ' + escapeHtml(docState.siteAddress)}</div>
      </div>

      <div class="p-box" style="margin-top: 25px;">
        <div class="p-box-title">Premessa e Oggetto dell'Offerta</div>
        <p style="font-size: 0.9rem; line-height: 1.5;">
          La presente offerta descrive la fornitura e posa in opera dei manufatti specificati analiticamente nelle pagine successive.
          Ogni tipologia merceologica viene dettagliata nella propria scheda separata per trasparenza tecnica ed economica.
        </p>
      </div>
    </div>
    <div class="p-footer">
      <span>${escapeHtml(COMPANY.name)}</span>
      <span>Pagina 1 di intestazione</span>
    </div>
  `;
  printRoot.appendChild(page1);

  // PAGINE 2..N: CATEGORIE (Una per ogni foglio A4)
  docState.categories.forEach((cat, idx) => {
    const pageCat = document.createElement('div');
    pageCat.className = "sheet";
    pageCat.innerHTML = `
      <div>
        <div class="p-header">
          <div class="p-company">
            <div class="p-company-title">${escapeHtml(COMPANY.name)}</div>
            <div style="font-size: 0.8rem;">Allegato Tecnico - Preventivo N° ${escapeHtml(docState.number || 'BOZZA')}</div>
          </div>
          <div class="p-doc-details">
            <div style="font-size: 1.1rem; font-weight: bold;">SCHEDA TECNICA ${idx + 1}</div>
            <div style="font-size: 0.9rem;">Cliente: ${escapeHtml(docState.client.name)}</div>
          </div>
        </div>

        <div style="margin-top: 10px; margin-bottom: 20px;">
          <h2 style="font-size: 1.4rem; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 6px;">
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

        <div style="margin-top: 25px; text-align: right; background: #f4f4f4; padding: 12px 16px; border: 1px solid #ccc;">
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

  // Apertura finestra di stampa nativa
  window.print();
}

// Registrazione del Service Worker (PWA)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('PWA Service Worker Registrato'))
    .catch((err) => console.log('Errore SW:', err));
}
