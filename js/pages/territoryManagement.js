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

const SCREENING_STATUS_OPTIONS = ['', 'Pending', 'In Review', 'Cleared', 'Flagged'];

const SCREENING_FIELDS = [
  { key: 'supplier', label: 'Supplier', type: 'text' },
  { key: 'territory', label: 'Territory', type: 'text' },
  { key: 'status', label: 'Screening Status', type: 'select', options: SCREENING_STATUS_OPTIONS },
  { key: 'dateScreened', label: 'Date Screened', type: 'date' },
  { key: 'findings', label: 'Findings / Notes', type: 'text' },
];

export function renderTerritoryManagement(container) {
  const data = getData();
  const territories = data.territories;
  const screenings = data.supplierScreenings;

  container.innerHTML = `
    ${notesBoxHtml('territoryManagement')}
    <div class="toolbar">
      <div class="page-title" style="margin:0;">Territory Management</div>
      <button class="btn btn-primary" id="add-territory-btn">+ Add territory</button>
    </div>
    <div class="card" style="margin-bottom:24px;">
      ${territories.length ? `
        <div class="tracker-scroll">
          <table class="list-table doc-fields-table" id="territories-table">
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

    <div class="toolbar">
      <div class="section-label" style="margin:0;">Dow Jones Supplier Screening</div>
      <button class="btn btn-ghost" id="add-screening-btn" style="padding:4px 8px;">+ Add screening</button>
    </div>
    <div class="section-desc">Sanctions and adverse-media screening results for suppliers in each territory.</div>
    <div class="card">
      ${screenings.length ? `
        <div class="tracker-scroll">
          <table class="list-table doc-fields-table">
            <thead>
              <tr>
                ${SCREENING_FIELDS.map((f) => `<th>${escapeHtml(f.label)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${screenings.map((s) => `
                <tr>
                  ${SCREENING_FIELDS.map((f) => `<td>${renderScreeningCell(s, f)}</td>`).join('')}
                  <td><button class="btn btn-ghost" data-remove-screening="${s.id}" style="padding:3px 7px;">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<div class="empty-hint">No screenings yet.</div>'}
    </div>
  `;

  document.getElementById('add-territory-btn').addEventListener('click', () => {
    const row = { id: uid('territory') };
    FIELDS.forEach((f) => { row[f.key] = ''; });
    territories.push(row);
    commit();
    renderTerritoryManagement(container);
  });

  document.querySelectorAll('#territories-table .cell-input').forEach((input) => {
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

  document.getElementById('add-screening-btn').addEventListener('click', () => {
    const row = { id: uid('screening') };
    SCREENING_FIELDS.forEach((f) => { row[f.key] = ''; });
    screenings.push(row);
    commit();
    renderTerritoryManagement(container);
  });

  document.querySelectorAll('.screening-cell').forEach((input) => {
    const evt = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(evt, () => {
      const screening = screenings.find((s) => s.id === input.dataset.rowId);
      screening[input.dataset.field] = input.value;
      commit();
    });
  });

  document.querySelectorAll('[data-remove-screening]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = screenings.findIndex((s) => s.id === btn.dataset.removeScreening);
      if (idx >= 0) screenings.splice(idx, 1);
      commit();
      renderTerritoryManagement(container);
    });
  });
}

function renderScreeningCell(row, col) {
  const value = row[col.key] || '';
  if (col.type === 'select') {
    return `<select class="cell-input screening-cell" data-row-id="${row.id}" data-field="${col.key}">
      ${col.options.map((o) => `<option value="${escapeHtml(o)}" ${o === value ? 'selected' : ''}>${o ? escapeHtml(o) : '—'}</option>`).join('')}
    </select>`;
  }
  if (col.type === 'date') {
    return `<input type="date" class="cell-input screening-cell" data-row-id="${row.id}" data-field="${col.key}" value="${escapeHtml(value)}" />`;
  }
  return `<input type="text" class="cell-input screening-cell" data-row-id="${row.id}" data-field="${col.key}" value="${escapeHtml(value)}" />`;
}
