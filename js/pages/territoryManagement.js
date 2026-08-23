import { getData, commit } from '../store.js';
import { uid, escapeHtml } from '../utils.js';
import { notesBoxHtml } from '../notesBox.js';

const FIELDS = [
  { key: 'name', label: 'Territory' },
  { key: 'region', label: 'Region' },
  { key: 'owner', label: 'Owner' },
  { key: 'targetAccounts', label: 'Target Accounts' },
  { key: 'notes', label: 'Notes' },
];

export function renderTerritoryManagement(container) {
  const data = getData();
  const territories = data.territories;

  container.innerHTML = `
    ${notesBoxHtml('territoryManagement')}
    <div class="toolbar">
      <div class="page-title" style="margin:0;">Territory Management</div>
      <button class="btn btn-primary" id="add-territory-btn">+ Add territory</button>
    </div>
    <div class="card">
      ${territories.length ? `
        <div class="tracker-scroll">
          <table class="list-table doc-fields-table">
            <thead>
              <tr>
                ${FIELDS.map((f) => `<th>${escapeHtml(f.label)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${territories.map((t) => `
                <tr>
                  ${FIELDS.map((f) => `
                    <td><input type="text" class="cell-input" data-row-id="${t.id}" data-field="${f.key}" value="${escapeHtml(t[f.key] || '')}" /></td>
                  `).join('')}
                  <td><button class="btn btn-ghost" data-remove-territory="${t.id}" style="padding:3px 7px;">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<div class="empty-hint">No territories yet.</div>'}
    </div>
  `;

  document.getElementById('add-territory-btn').addEventListener('click', () => {
    const row = { id: uid('territory') };
    FIELDS.forEach((f) => { row[f.key] = ''; });
    territories.push(row);
    commit();
    renderTerritoryManagement(container);
  });

  document.querySelectorAll('.doc-fields-table .cell-input').forEach((input) => {
    input.addEventListener('input', () => {
      const territory = territories.find((t) => t.id === input.dataset.rowId);
      territory[input.dataset.field] = input.value;
      commit();
    });
  });

  document.querySelectorAll('[data-remove-territory]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = territories.findIndex((t) => t.id === btn.dataset.removeTerritory);
      if (idx >= 0) territories.splice(idx, 1);
      commit();
      renderTerritoryManagement(container);
    });
  });
}
