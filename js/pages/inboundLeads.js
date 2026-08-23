import { getData, commit } from '../store.js';
import { uid, escapeHtml } from '../utils.js';

const SOURCE_TYPES = ['Email', 'LinkedIn Ads', 'Google Ads', 'SEO/AEO', 'Reddit', 'Newsletter', 'Referral', 'Website', 'Conference Discussion', 'Other'];
const STAGE_OPTIONS = ['', 'New', 'Contacted', 'Demo Booked', 'Demo Completed', 'Negotiation', 'Won', 'Lost'];
const YES_NO_OPTIONS = ['', 'Yes', 'No'];
const PRIORITY_OPTIONS = ['', 'High', 'Medium', 'Low'];
const SIGNAL_OPTIONS = [
  '',
  'Newly hired CPO or Head of Procurement',
  'Coupa/Ariba renewal window',
  'Funding round or acquisition that spikes supplier count',
  'New regulatory pressure (DORA, third-party risk rules) on regulated buyers',
];

const COLUMNS = [
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'userName', label: 'User Name', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'teamsInDiscussion', label: 'Teams in Discussion With', type: 'text' },
  { key: 'internalChampion', label: 'Internal Champion Contact', type: 'text' },
  { key: 'messagingPriority', label: 'Messaging Priority', type: 'select', options: PRIORITY_OPTIONS },
  { key: 'buyingSignal', label: 'Signals', type: 'select', options: SIGNAL_OPTIONS },
  { key: 'stage', label: 'Stage', type: 'select', options: STAGE_OPTIONS },
  { key: 'positiveAnswer', label: 'Positive Answer', type: 'select', options: YES_NO_OPTIONS },
  { key: 'demoBookedDate', label: 'Demo Booked Date', type: 'date' },
  { key: 'demoHappenedDate', label: 'Demo Happened Date', type: 'date' },
  { key: 'lostLead', label: 'Lost Lead', type: 'select', options: YES_NO_OPTIONS },
  { key: 'meetingWithAeDate', label: 'Meeting with AE date', type: 'date' },
  { key: 'estimatedQuantity', label: 'Estimated Quantity', type: 'text' },
  { key: 'estimatedRevenue', label: 'Estimated Revenue', type: 'text' },
  { key: 'note', label: 'Note', type: 'text' },
];

export function renderInboundLeads(container) {
  const data = getData();
  const tracker = data.inboundLeads;

  const known = new Set(SOURCE_TYPES);
  const hasUnassigned = tracker.rows.some((r) => !known.has(r.source));
  const sections = hasUnassigned ? [...SOURCE_TYPES, 'Unassigned'] : SOURCE_TYPES;

  container.innerHTML = `
    <div class="page-notes-wrap">
      <div class="section-label">Notes</div>
      <textarea id="leads-notes" class="notes-box" readonly placeholder="No notes yet.">${escapeHtml(tracker.notes || '')}</textarea>
    </div>
    <div class="page-title">Leads Management</div>
    <div id="leads-sections" class="stack-16"></div>
  `;

  document.getElementById('leads-sections').innerHTML = sections.map((source) => renderSourceSection(tracker, source, known)).join('');

  wireEvents(tracker, container);
}

function renderSourceSection(tracker, source, known) {
  const rows = source === 'Unassigned'
    ? tracker.rows.filter((r) => !known.has(r.source))
    : tracker.rows.filter((r) => r.source === source);

  return `
    <div class="card">
      <div class="toolbar" style="margin-bottom:6px;">
        <h4 style="margin:0;">${escapeHtml(source)}</h4>
        <button class="btn btn-ghost" data-add-lead="${escapeHtml(source)}" style="padding:4px 8px;">+ Add lead</button>
      </div>
      ${rows.length ? `
        <div class="tracker-scroll">
          <table class="list-table leads-table">
            <thead>
              <tr>
                ${COLUMNS.map((c) => `<th>${escapeHtml(c.label)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((row) => `
                <tr>
                  ${COLUMNS.map((c) => `<td>${renderCell(row, c)}</td>`).join('')}
                  <td><button class="btn btn-ghost" data-remove-lead="${row.id}" style="padding:3px 7px;">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<div class="empty-hint">No leads yet.</div>'}
    </div>
  `;
}

function emptyRow(source) {
  const row = { id: uid('lead'), source };
  COLUMNS.forEach((c) => { row[c.key] = ''; });
  return row;
}

function wireEvents(tracker, container) {
  document.querySelectorAll('[data-add-lead]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const source = btn.dataset.addLead === 'Unassigned' ? '' : btn.dataset.addLead;
      tracker.rows.push(emptyRow(source));
      commit();
      renderInboundLeads(container);
    });
  });

  document.querySelectorAll('[data-field]').forEach((input) => {
    const evt = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(evt, () => {
      const row = tracker.rows.find((r) => r.id === input.dataset.rowId);
      row[input.dataset.field] = input.value;
      commit();
    });
  });

  document.querySelectorAll('[data-remove-lead]').forEach((btn) => {
    btn.addEventListener('click', () => {
      tracker.rows = tracker.rows.filter((r) => r.id !== btn.dataset.removeLead);
      commit();
      renderInboundLeads(container);
    });
  });
}

function renderCell(row, col) {
  const value = row[col.key] || '';
  if (col.type === 'select') {
    return `<select class="cell-input" data-row-id="${row.id}" data-field="${col.key}">
      ${col.options.map((o) => `<option value="${escapeHtml(o)}" ${o === value ? 'selected' : ''}>${o ? escapeHtml(o) : '—'}</option>`).join('')}
    </select>`;
  }
  if (col.type === 'date') {
    return `<input type="date" class="cell-input" data-row-id="${row.id}" data-field="${col.key}" value="${escapeHtml(value)}" />`;
  }
  return `<input type="text" class="cell-input" data-row-id="${row.id}" data-field="${col.key}" value="${escapeHtml(value)}" />`;
}
