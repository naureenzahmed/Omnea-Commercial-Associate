import { getData, commit } from '../store.js';
import { uid, escapeHtml } from '../utils.js';
import { notesBoxHtml } from '../notesBox.js';

const FIELDS = [
  { key: 'company', label: 'Company' },
  { key: 'employeeCount', label: 'Number of Employees' },
  { key: 'industry', label: 'Industry' },
  { key: 'relevantTeams', label: 'Relevant Teams for Omnea' },
  { key: 'proposedPositioning', label: 'Proposed Positioning to Target' },
  { key: 'status', label: 'Status with Company' },
];

export function renderProspectClientList(container) {
  const data = getData();
  const prospects = data.prospectClientList;

  container.innerHTML = `
    ${notesBoxHtml('prospectClientList')}
    <div class="toolbar">
      <div class="page-title" style="margin:0;">Prospect Client List</div>
      <button class="btn btn-primary" id="add-prospect-btn">+ Add prospect</button>
    </div>
    <div class="card">
      ${prospects.length ? `
        <div class="tracker-scroll">
          <table class="list-table doc-fields-table">
            <thead>
              <tr>
                ${FIELDS.map((f) => `<th>${escapeHtml(f.label)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${prospects.map((p) => `
                <tr>
                  ${FIELDS.map((f) => `
                    <td><input type="text" class="cell-input" data-row-id="${p.id}" data-field="${f.key}" value="${escapeHtml(p[f.key] || '')}" /></td>
                  `).join('')}
                  <td><button class="btn btn-ghost" data-remove-prospect="${p.id}" style="padding:3px 7px;">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<div class="empty-hint">No prospects yet.</div>'}
    </div>
  `;

  document.getElementById('add-prospect-btn').addEventListener('click', () => {
    const row = { id: uid('prospect') };
    FIELDS.forEach((f) => { row[f.key] = ''; });
    prospects.push(row);
    commit();
    renderProspectClientList(container);
  });

  document.querySelectorAll('.doc-fields-table .cell-input').forEach((input) => {
    input.addEventListener('input', () => {
      const prospect = prospects.find((p) => p.id === input.dataset.rowId);
      prospect[input.dataset.field] = input.value;
      commit();
    });
  });

  document.querySelectorAll('[data-remove-prospect]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = prospects.findIndex((p) => p.id === btn.dataset.removeProspect);
      if (idx >= 0) prospects.splice(idx, 1);
      commit();
      renderProspectClientList(container);
    });
  });
}
