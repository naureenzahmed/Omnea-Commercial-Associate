import { getData, commit } from '../store.js';
import { uid, escapeHtml } from '../utils.js';
import { notesBoxHtml } from '../notesBox.js';

const FIELDS = [
  { key: 'conference', label: 'Conference' },
  { key: 'contact', label: 'Contact' },
  { key: 'date', label: 'Date' },
  { key: 'notes', label: 'Notes / Follow-up' },
];

export function renderConferenceDiscussions(container) {
  const data = getData();
  const discussions = data.conferenceDiscussions;

  container.innerHTML = `
    ${notesBoxHtml('conferenceDiscussions')}
    <div class="toolbar">
      <div class="page-title" style="margin:0;">Conference Discussions</div>
      <button class="btn btn-primary" id="add-discussion-btn">+ Add discussion</button>
    </div>
    <div class="card">
      ${discussions.length ? `
        <div class="tracker-scroll">
          <table class="list-table doc-fields-table">
            <thead>
              <tr>
                ${FIELDS.map((f) => `<th>${escapeHtml(f.label)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${discussions.map((d) => `
                <tr>
                  ${FIELDS.map((f) => `
                    <td><input type="text" class="cell-input" data-row-id="${d.id}" data-field="${f.key}" value="${escapeHtml(d[f.key] || '')}" /></td>
                  `).join('')}
                  <td><button class="btn btn-ghost" data-remove-discussion="${d.id}" style="padding:3px 7px;">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<div class="empty-hint">No discussions yet.</div>'}
    </div>
  `;

  document.getElementById('add-discussion-btn').addEventListener('click', () => {
    const row = { id: uid('conf') };
    FIELDS.forEach((f) => { row[f.key] = ''; });
    discussions.push(row);
    commit();
    renderConferenceDiscussions(container);
  });

  document.querySelectorAll('.doc-fields-table .cell-input').forEach((input) => {
    input.addEventListener('input', () => {
      const discussion = discussions.find((d) => d.id === input.dataset.rowId);
      discussion[input.dataset.field] = input.value;
      commit();
    });
  });

  document.querySelectorAll('[data-remove-discussion]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = discussions.findIndex((d) => d.id === btn.dataset.removeDiscussion);
      if (idx >= 0) discussions.splice(idx, 1);
      commit();
      renderConferenceDiscussions(container);
    });
  });
}
