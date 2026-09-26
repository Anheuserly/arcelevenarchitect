(() => {
  const rows = document.getElementById('expenseRows');
  const totalEl = document.getElementById('totalAmount');
  const claimEl = document.getElementById('summaryClaim');
  const advanceInput = document.getElementById('advanceAmount');
  const advanceEl = document.getElementById('summaryAdvance');
  const netEl = document.getElementById('netAmount');
  const formDate = document.getElementById('formDate');

  const categories = ['Travel / Conveyance','Site Expense','Client Meeting','Printing / Stationery','Material Sample','Food / Refreshment','Courier / Delivery','Office Purchase','Other'];
  const paymentModes = ['Cash','UPI','Card','Bank Transfer','Company Advance','Other'];

  const money = n => Number(n || 0).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2});

  function updateTotals(){
    const total = [...document.querySelectorAll('.amount-input')].reduce((sum, el) => sum + (parseFloat(el.value) || 0), 0);
    const advance = parseFloat(advanceInput.value) || 0;
    totalEl.textContent = money(total);
    claimEl.textContent = money(total);
    advanceEl.textContent = money(advance);
    netEl.textContent = money(total - advance);
  }

  function renumber(){
    [...rows.querySelectorAll('tr')].forEach((tr, i) => tr.querySelector('.row-no').textContent = i + 1);
  }

  function selectOptions(items){ return items.map(v => `<option>${v}</option>`).join(''); }

  function addRow(data = {}){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="row-no"></td>
      <td><input type="date" value="${data.date || ''}"></td>
      <td><input type="text" placeholder="Expense purpose / details" value="${data.description || ''}"></td>
      <td><select>${selectOptions(categories)}</select></td>
      <td><select>${selectOptions(paymentModes)}</select></td>
      <td><input type="text" placeholder="Bill no." value="${data.bill || ''}"></td>
      <td><input class="amount-input" type="number" min="0" step="0.01" placeholder="0.00" value="${data.amount || ''}"></td>
      <td class="no-print"><button class="remove-row" type="button" title="Remove row">×</button></td>`;
    rows.appendChild(tr);
    tr.querySelector('.amount-input').addEventListener('input', updateTotals);
    tr.querySelector('.remove-row').addEventListener('click', () => {
      if (rows.children.length > 1) tr.remove();
      else tr.querySelectorAll('input').forEach(i => i.value = '');
      renumber(); updateTotals();
    });
    renumber(); updateTotals();
  }

  function resetForm(){
    if (!confirm('Clear all entered form data?')) return;
    document.querySelectorAll('#formSheet input, #formSheet textarea').forEach(el => {
      if (el.id === 'formNo') return;
      el.value = el.type === 'number' ? '0' : '';
    });
    rows.innerHTML = '';
    for (let i=0;i<4;i++) addRow();
    formDate.value = new Date().toISOString().slice(0,10);
    updateTotals();
  }

  document.getElementById('addRowBtn').addEventListener('click', () => addRow());
  document.getElementById('addRowInline').addEventListener('click', () => addRow());
  document.getElementById('printBtn').addEventListener('click', () => window.print());
  document.getElementById('resetBtn').addEventListener('click', resetForm);
  advanceInput.addEventListener('input', updateTotals);

  formDate.value = new Date().toISOString().slice(0,10);
  for (let i=0;i<4;i++) addRow();
})();
