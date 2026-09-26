(() => {
  const rows = document.getElementById('teamRows');
  const issueDate = document.getElementById('issueDate');
  const visitDate = document.getElementById('visitDate');

  function renumber(){
    [...rows.querySelectorAll('tr')].forEach((tr, i) => tr.querySelector('.member-no').textContent = i + 1);
  }

  function addMember(){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="member-no"></td>
      <td><input type="text" placeholder="Employee name"></td>
      <td><input type="text" placeholder="ARC11-EMP-___"></td>
      <td><input type="text" placeholder="Designation"></td>
      <td><input type="text" placeholder="Assigned responsibility"></td>
      <td class="no-print"><button class="remove-row" type="button" title="Remove member">×</button></td>`;
    rows.appendChild(tr);
    tr.querySelector('.remove-row').addEventListener('click', () => {
      if (rows.children.length > 1) tr.remove();
      else tr.querySelectorAll('input').forEach(i => i.value = '');
      renumber();
    });
    renumber();
  }

  function resetForm(){
    if (!confirm('Clear all entered form data?')) return;
    document.querySelectorAll('#formSheet input, #formSheet textarea').forEach(el => {
      if (el.id === 'assignmentNo') return;
      if (el.type === 'checkbox') el.checked = false;
      else el.value = '';
    });
    document.querySelectorAll('#formSheet select').forEach(el => el.selectedIndex = 0);
    rows.innerHTML = '';
    for (let i=0;i<3;i++) addMember();
    const today = new Date().toISOString().slice(0,10);
    issueDate.value = today;
    visitDate.value = today;
  }

  document.getElementById('addMemberBtn').addEventListener('click', addMember);
  document.getElementById('addMemberInline').addEventListener('click', addMember);
  document.getElementById('printBtn').addEventListener('click', () => window.print());
  document.getElementById('resetBtn').addEventListener('click', resetForm);

  const today = new Date().toISOString().slice(0,10);
  issueDate.value = today;
  visitDate.value = today;
  for (let i=0;i<3;i++) addMember();
})();
