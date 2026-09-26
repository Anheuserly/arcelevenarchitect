const tbody=document.querySelector('#taskTable tbody');
const totalTasks=document.getElementById('totalTasks');
const completedTasks=document.getElementById('completedTasks');
const pendingTasks=document.getElementById('pendingTasks');
const avgCompletion=document.getElementById('avgCompletion');

function rowTemplate(i){return `<tr>
<td class="num">${i}</td>
<td><input type="text" placeholder="Describe assigned task"/></td>
<td><select><option>Normal</option><option>High</option><option>Urgent</option></select></td>
<td><input type="text" placeholder="Name"/></td>
<td><input type="time"/></td><td><input type="time"/></td>
<td><select class="status"><option>Pending</option><option>In Progress</option><option>Completed</option><option>Hold</option></select></td>
<td><input class="pct" type="number" min="0" max="100" value="0"/></td>
<td><button type="button" class="remove" title="Remove">×</button></td>
</tr>`}
function renumber(){[...tbody.rows].forEach((r,i)=>r.querySelector('.num').textContent=i+1)}
function recalc(){const rows=[...tbody.rows]; totalTasks.textContent=rows.length; let c=0,sum=0; rows.forEach(r=>{const s=r.querySelector('.status').value; const p=Math.max(0,Math.min(100,Number(r.querySelector('.pct').value)||0)); if(s==='Completed'){c++; if(p<100) r.querySelector('.pct').value=100;} sum+=Math.max(0,Math.min(100,Number(r.querySelector('.pct').value)||0));}); completedTasks.textContent=c; pendingTasks.textContent=Math.max(0,rows.length-c); avgCompletion.textContent=rows.length?`${Math.round(sum/rows.length)}%`:'0%';}
function addRow(){tbody.insertAdjacentHTML('beforeend',rowTemplate(tbody.rows.length+1));recalc()}
document.getElementById('addTask').addEventListener('click',addRow);
tbody.addEventListener('click',e=>{if(e.target.classList.contains('remove')){e.target.closest('tr').remove();renumber();recalc();}});
tbody.addEventListener('input',recalc);tbody.addEventListener('change',recalc);
document.getElementById('printBtn').addEventListener('click',()=>window.print());
document.getElementById('resetBtn').addEventListener('click',()=>{if(confirm('Reset this report?')){document.querySelectorAll('input,textarea').forEach(el=>el.value='');tbody.innerHTML='';addRow();}});
document.getElementById('reportDate').valueAsDate=new Date();
addRow();addRow();addRow();
