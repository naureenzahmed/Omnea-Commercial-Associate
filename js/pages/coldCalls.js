import { getData, commit } from '../store.js';
import { uid, escapeHtml } from '../utils.js';
import { notesBoxHtml } from '../notesBox.js';

const FIELDS = [
  { key: 'company', label: 'Company' },
  { key: 'contact', label: 'Contact' },
  { key: 'date', label: 'Date' },
  { key: 'outcome', label: 'Outcome / Notes' },
];

export function renderColdCalls(container) {
  const data = getData();
  const calls = data.coldCalls;

  container.innerHTML = `
    ${notesBoxHtml('coldCalls')}
    <div class="toolbar">
      <div class="page-title" style="margin:0;">Cold Calls</div>
      <button class="btn btn-primary" id="add-call-btn">+ Add call</button>
    </div>
    <div class="card">
      ${calls.length ? `
        <div class="tracker-scroll">
          <table class="list-table doc-fields-table">
            <thead>
              <tr>
                ${FIELDS.map((f) => `<th>${escapeHtml(f.label)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${calls.map((c) => `
                <tr>
                  ${FIELDS.map((f) => `
                    <td><input type="text" class="cell-input" data-row-id="${c.id}" data-field="${f.key}" value="${escapeHtml(c[f.key] || '')}" /></td>
                  `).join('')}
                  <td><button class="btn btn-ghost" data-remove-call="${c.id}" style="padding:3px 7px;">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<div class="empty-hint">No calls yet.</div>'}
    </div>
  `;

  document.getElementById('add-call-btn').addEventListener('click', () => {
    const row = { id: uid('call') };
    FIELDS.forEach((f) => { row[f.key] = ''; });
    calls.push(row);
    commit();
    renderColdCalls(container);
  });

  document.querySelectorAll('.doc-fields-table .cell-input').forEach((input) => {
    input.addEventListener('input', () => {
      const call = calls.find((c) => c.id === input.dataset.rowId);
      call[input.dataset.field] = input.value;
      commit();
    });
  });

  document.querySelectorAll('[data-remove-call]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = calls.findIndex((c) => c.id === btn.dataset.removeCall);
      if (idx >= 0) calls.splice(idx, 1);
      commit();
      renderColdCalls(container);
    });
  });
}
