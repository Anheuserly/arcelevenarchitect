const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const money = (value) => new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(Number(value || 0));

function numberToWordsIndian(num) {
  num = Math.round(Number(num || 0));
  if (num === 0) return 'Zero Rupees Only';
  const one = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const ten = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = n => n < 20 ? one[n] : ten[Math.floor(n / 10)] + (n % 10 ? ' ' + one[n % 10] : '');
  const three = n => n < 100 ? two(n) : one[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + two(n % 100) : '');
  const out = [];
  const crore = Math.floor(num / 10000000); num %= 10000000;
  const lakh = Math.floor(num / 100000); num %= 100000;
  const thousand = Math.floor(num / 1000); num %= 1000;
  if (crore) out.push(three(crore) + ' Crore');
  if (lakh) out.push(two(lakh) + ' Lakh');
  if (thousand) out.push(two(thousand) + ' Thousand');
  if (num) out.push(three(num));
  return out.join(' ') + ' Rupees Only';
}

function setToday() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $$('.js-today').forEach(input => { if (!input.value) input.value = local; });
}

function getGstMode() {
  const applicable = $('#gstApplicable')?.value !== 'no';
  if (!applicable) return 'none';
  const supplierState = ($('#supplierState')?.value || 'Delhi');
  const placeOfSupply = $('#placeOfSupply')?.value || 'Delhi';
  return supplierState.trim().toLowerCase() === placeOfSupply.trim().toLowerCase() ? 'intra' : 'inter';
}

function applyGst(taxable) {
  const mode = getGstMode();
  let cgst = 0, sgst = 0, igst = 0;
  if (mode === 'intra') { cgst = taxable * 0.09; sgst = taxable * 0.09; }
  if (mode === 'inter') { igst = taxable * 0.18; }
  const total = cgst + sgst + igst;
  if ($('#cgst')) $('#cgst').textContent = money(cgst);
  if ($('#sgst')) $('#sgst').textContent = money(sgst);
  if ($('#igst')) $('#igst').textContent = money(igst);
  if ($('#gstTotal')) $('#gstTotal').textContent = money(total);
  const treatment = $('#gstTreatment');
  if (treatment) {
    treatment.textContent = mode === 'intra'
      ? 'Auto — Intra-State: CGST 9% + SGST 9%'
      : mode === 'inter'
        ? 'Auto — Inter-State: IGST 18%'
        : 'No GST / Exempt';
  }
  $('#cgstRow')?.classList.toggle('is-inactive', mode !== 'intra');
  $('#sgstRow')?.classList.toggle('is-inactive', mode !== 'intra');
  $('#igstRow')?.classList.toggle('is-inactive', mode !== 'inter');
  return total;
}

function setupItems({ rowHtml, calculate, initialRows = 3 }) {
  const body = $('#items');
  const addButton = $('#addRow');
  if (!body || !addButton) {
    console.error('ARC 11 document setup error: #items or #addRow not found.');
    return;
  }

  function renumber() {
    Array.from(body.rows).forEach((row, index) => {
      const cell = row.querySelector('.js-sno');
      if (cell) cell.textContent = index + 1;
    });
  }

  function addRow(data = {}) {
    const row = document.createElement('tr');
    row.innerHTML = rowHtml(data);
    body.appendChild(row);
    renumber();
    calculate();
    const first = row.querySelector('textarea, input, select');
    if (first && data.focus) first.focus();
  }

  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    addRow({ focus: true });
  });

  body.addEventListener('input', calculate);
  body.addEventListener('change', calculate);
  body.addEventListener('click', (event) => {
    const button = event.target.closest('.js-del');
    if (!button) return;
    event.preventDefault();
    const row = button.closest('tr');
    if (row) row.remove();
    if (!body.rows.length) addRow();
    renumber();
    calculate();
  });

  for (let i = 0; i < initialRows; i++) addRow();
  return { addRow };
}

window.printDoc = () => window.print();
window.resetDoc = () => { if (window.confirm('Clear all entered data?')) window.location.reload(); };

document.addEventListener('DOMContentLoaded', () => {
  setToday();
  const calculate = () => {
    let subtotal = 0;
    $$('#items tr').forEach(row => {
      const qty = Number(row.querySelector('.qty')?.value || 0);
      const rate = Number(row.querySelector('.rate')?.value || 0);
      const amount = qty * rate;
      const target = row.querySelector('.amt');
      if (target) target.textContent = money(amount);
      subtotal += amount;
    });
    const retentionPct = Math.min(100, Math.max(0, Number($('#retention')?.value || 0)));
    const retentionAmount = subtotal * retentionPct / 100;
    const taxable = Math.max(0, subtotal - retentionAmount);
    const gst = applyGst(taxable);
    const grand = taxable + gst;
    $('#subtotal').textContent = money(subtotal);
    $('#retentionAmount').textContent = money(retentionAmount);
    $('#taxable').textContent = money(taxable);
    $('#grand').textContent = money(grand);
    $('#amountWords').textContent = numberToWordsIndian(grand);
  };
  setupItems({ rowHtml: () => `<td class="center js-sno"></td><td><textarea placeholder="Work scope / technical specification"></textarea></td><td><input class="qty num" type="number" value="1" min="0" step="0.01"></td><td><input value="Job"></td><td><input class="rate num" type="number" value="0" min="0" step="0.01"></td><td class="num amt">0.00</td><td class="center"><button type="button" class="btn danger js-del" aria-label="Remove scope item">×</button></td>`, calculate });
  $('#retention')?.addEventListener('input', calculate);
  $('#gstApplicable')?.addEventListener('change', calculate);
  $('#placeOfSupply')?.addEventListener('change', calculate);
  $('#supplierState')?.addEventListener('change', calculate);
  calculate();
});
