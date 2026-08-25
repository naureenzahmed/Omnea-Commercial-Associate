import { addDays, todayISO, uid } from './utils.js';

export const TEAMS = [
  { id: 'team-a', name: 'Team A', color: '#6c8cff' },
  { id: 'team-b', name: 'Team B', color: '#ef6f6c' },
  { id: 'team-c', name: 'Team C', color: '#57c785' },
];

export const PEOPLE = [
  { id: 'p1', name: 'Alex', role: 'Engineer', teamId: 'team-a' },
  { id: 'p2', name: 'Sam', role: 'Engineer', teamId: 'team-a' },
  { id: 'p3', name: 'Taylor', role: 'Engineer', teamId: 'team-a' },
  { id: 'p4', name: 'Jordan', role: 'Product Manager', teamId: 'team-a' },
  { id: 'p5', name: 'Riley', role: 'Designer', teamId: 'team-a' },
  { id: 'p6', name: 'Casey', role: 'Product Manager', teamId: 'team-b' },
  { id: 'p7', name: 'Morgan', role: 'Designer', teamId: 'team-b' },
  { id: 'p8', name: 'Drew', role: 'Engineer', teamId: 'team-b' },
  { id: 'p9', name: 'Blake', role: 'Engineer', teamId: 'team-b' },
  { id: 'p10', name: 'Quinn', role: 'Product Manager', teamId: 'team-c' },
  { id: 'p11', name: 'Sage', role: 'Designer', teamId: 'team-c' },
  { id: 'p12', name: 'Reese', role: 'Engineer', teamId: 'team-c' },
];

export const INITIATIVES = [
  { id: 'init-1', name: 'Initiative 1', teamId: 'team-a', goalLabel: 'Reach target', current: 0, target: 100, unit: '%' },
  { id: 'init-2', name: 'Initiative 2', teamId: 'team-b', goalLabel: 'Reach target', current: 0, target: 100, unit: '%' },
  { id: 'init-3', name: 'Initiative 3', teamId: 'team-c', goalLabel: 'Reach target', current: 0, target: 100, unit: '%' },
];

const TASK_STATUSES = ['Backlog', 'Ready', 'In progress', 'In design', 'Committed', 'Done'];

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function seedTasks() {
  const tasks = [];
  INITIATIVES.forEach((init) => {
    const teamPeople = PEOPLE.filter((p) => p.teamId === init.teamId);
    const count = randomInt(2, 4);
    for (let i = 1; i <= count; i++) {
      const startOffset = randomInt(-21, 45);
      const duration = randomInt(3, 12);
      const assignee = teamPeople.length ? teamPeople[randomInt(0, teamPeople.length - 1)] : null;
      tasks.push({
        id: uid('task'),
        title: `Task ${i}`,
        description: 'Example task description — replace with the real scope of work.',
        impact: 'Example impact statement.',
        status: TASK_STATUSES[randomInt(0, TASK_STATUSES.length - 1)],
        assigneeId: assignee ? assignee.id : null,
        startDate: addDays(todayISO(), startOffset),
        endDate: addDays(todayISO(), startOffset + duration),
        designDeadline: '',
        sectionId: init.id,
        teamId: init.teamId,
        client: '',
        createdBy: 'You',
        blockedBy: [],
        subtasks: [],
        comments: [],
      });
    }
  });
  return tasks;
}

function seedMilestones() {
  return [
    { id: 'ms1', date: addDays(todayISO(), -30), title: 'Milestone 1', teamId: 'team-a' },
    { id: 'ms2', date: addDays(todayISO(), -10), title: 'Milestone 2', teamId: 'team-b' },
    { id: 'ms3', date: addDays(todayISO(), 20), title: 'Milestone 3', teamId: 'team-c' },
    { id: 'ms4', date: addDays(todayISO(), 60), title: 'Milestone 4', teamId: 'team-a' },
  ];
}

function seedMonths() {
  const now = new Date();
  const months = [];
  for (let offset = -3; offset <= 4; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString('en-US', { month: 'short' }),
      isCurrent: offset === 0,
      isProjection: offset > 0,
    });
  }
  return months;
}

function seedWeeks() {
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  const weeks = [];
  for (let i = -2; i < 6; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i * 7);
    weeks.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isCurrent: i === 0,
    });
  }
  return weeks;
}

function seedMetrics() {
  return [
    { id: 'metric-a', name: 'Metric A', teamId: 'team-a', target: 'Target', values: {} },
    { id: 'metric-b', name: 'Metric B', teamId: 'team-b', target: 'Target', values: {} },
    { id: 'metric-c', name: 'Metric C', teamId: 'team-c', target: 'Target', values: {} },
  ];
}

function seedOkrs() {
  return [
    {
      id: 'okr-company', objective: 'Sector Objective 1', teamId: null,
      keyResults: [
        { id: 'kr-co-1', title: 'Key result 1', current: 0, target: 100, deadline: addDays(todayISO(), 90), assigneeIds: [] },
        { id: 'kr-co-2', title: 'Key result 2', current: 0, target: 100, deadline: addDays(todayISO(), 60), assigneeIds: [] },
      ],
    },
    {
      id: 'okr-1', objective: 'Objective 1', teamId: 'team-a',
      keyResults: [
        { id: 'kr-1-1', title: 'Key result 1', current: 0, target: 100, deadline: addDays(todayISO(), 30), assigneeIds: ['p1', 'p4'] },
        { id: 'kr-1-2', title: 'Key result 2', current: 0, target: 100, deadline: addDays(todayISO(), 45), assigneeIds: ['p2'] },
      ],
    },
    {
      id: 'okr-2', objective: 'Objective 2', teamId: 'team-b',
      keyResults: [{ id: 'kr-2-1', title: 'Key result 1', current: 0, target: 100, deadline: addDays(todayISO(), 30), assigneeIds: ['p6', 'p8'] }],
    },
    {
      id: 'okr-3', objective: 'Objective 3', teamId: 'team-c',
      keyResults: [{ id: 'kr-3-1', title: 'Key result 1', current: 0, target: 100, deadline: addDays(todayISO(), 30), assigneeIds: ['p10', 'p12'] }],
    },
  ];
}

function seedPaidConversions() {
  return [
    {
      id: 'pc-email',
      title: 'Email Outbound',
      metrics: [
        { id: 'm1', label: 'Number of leads', note: 'This would act as an easy way to book the call and would act as a mechanism to reinforce our credibility with case studies.', target: 100, values: {} },
        { id: 'm2', label: 'Number of emails', target: 80, values: {} },
        { id: 'm3', label: 'Number of replies', target: 16, values: {} },
        { id: 'm4', label: '# Meeting Booked', target: 4, values: {} },
      ],
    },
    {
      id: 'pc-linkedin',
      title: 'Ads - LinkedIn',
      metrics: [
        { id: 'm1', label: 'Spend', target: 100, values: {} },
        { id: 'm1b', label: 'Lead List Number', target: null, values: {} },
        { id: 'm2', label: 'CTR creative 1', target: 100, values: {} },
        { id: 'm3', label: 'CTR creative 2', target: 100, values: {} },
        { id: 'm4', label: 'CTR creative 3', target: 100, values: {} },
        { id: 'm5', label: 'CTR creative 4', target: 100, values: {} },
        { id: 'm6', label: 'CTR creative 5', target: 100, values: {} },
        { id: 'm7', label: 'Cost per Meeting', target: 'Under $4', values: {} },
        { id: 'm8', label: '# Meeting Booked', target: 10, values: {} },
      ],
    },
    {
      id: 'pc-google',
      title: 'Ads - Google',
      metrics: [
        { id: 'm1', label: 'Spend', target: 100, values: {} },
        { id: 'm2', label: 'CTR ad group 1', target: 100, values: {} },
        { id: 'm3', label: 'CTR ad group 2', target: 100, values: {} },
        { id: 'm4', label: 'CTR ad group 3', target: 100, values: {} },
        { id: 'm5', label: 'CTR ad group 4', target: 100, values: {} },
        { id: 'm6', label: 'CTR ad group 5', target: 100, values: {} },
        { id: 'm7', label: 'Cost per Meeting', target: 'Under $4', values: {} },
        { id: 'm8', label: '# Meeting Booked', target: 15, values: {} },
      ],
    },
    {
      id: 'pc-meta',
      title: 'Ads - Meta',
      metrics: [
        { id: 'm1', label: 'Spend', target: 100, values: {} },
        { id: 'm2', label: 'CTR ad group 1', target: 100, values: {} },
        { id: 'm3', label: 'CTR ad group 2', target: 100, values: {} },
        { id: 'm4', label: 'CTR ad group 3', target: 100, values: {} },
        { id: 'm5', label: 'CTR ad group 4', target: 100, values: {} },
        { id: 'm6', label: 'CTR ad group 5', target: 100, values: {} },
        { id: 'm7', label: 'Cost per Meeting', target: 'Under $4', values: {} },
        { id: 'm8', label: '# Meeting Booked', target: 15, values: {} },
      ],
    },
    {
      id: 'pc-chatgpt',
      title: 'Ads - ChatGPT',
      metrics: [
        { id: 'm1', label: 'Spend', target: 100, values: {} },
        { id: 'm2', label: 'CTR ad group 1', target: 100, values: {} },
        { id: 'm3', label: 'CTR ad group 2', target: 100, values: {} },
        { id: 'm4', label: 'CTR ad group 3', target: 100, values: {} },
        { id: 'm5', label: 'CTR ad group 4', target: 100, values: {} },
        { id: 'm6', label: 'CTR ad group 5', target: 100, values: {} },
        { id: 'm7', label: 'Cost per Meeting', target: 'Under $4', values: {} },
        { id: 'm8', label: '# Meeting Booked', target: 15, values: {} },
      ],
    },
    {
      id: 'pc-seo',
      title: 'SEO/AEO',
      metrics: [
        { id: 'm1', label: '# of Blogs Posted', note: 'Having many blogs helps with AEO, since that’s what AI pulls from.', target: 150, values: {} },
        { id: 'm2', label: 'CTR', note: 'Since this is the metric we pay most based on, we want this as low as possible while keeping CVR as high as possible.', target: null, values: {} },
        { id: 'm3', label: 'CVR', note: 'We want every CTR to convert — highest-performing posts get reused, lowest-performing get changed.', target: null, values: {} },
        { id: 'm4', label: 'Impressions', target: 400, values: {} },
        { id: 'm5', label: 'Clicks', target: 40, values: {} },
        { id: 'm6', label: '# Meeting Booked', target: 15, values: {} },
        { id: 'm7', label: '% Meeting Booked', target: '37.50%', values: {} },
      ],
    },
    {
      id: 'pc-claude-skill',
      title: 'Claude Skill for Posting (LinkedIn and X)',
      metrics: [
        { id: 'm1', label: 'Profiles Connected', target: 5, values: {} },
        { id: 'm2', label: 'Number of Posts', target: 5, values: {} },
        { id: 'm3', label: 'Post Type', note: 'Announcement, Statistic, Change in the Market, Company Culture...', target: null, values: {} },
        { id: 'm4', label: 'Likes', target: 400, values: {} },
        { id: 'm5', label: 'Comments', target: 50, values: {} },
        { id: 'm6', label: 'CTR', target: '20%', values: {} },
      ],
    },
    {
      id: 'pc-reddit',
      title: 'Reddit',
      metrics: [
        { id: 'm1', label: 'Number of Posts', target: '50-100', values: {} },
        { id: 'm2', label: '# Likes', target: 20, values: {} },
        { id: 'm3', label: '# Comments', target: 10, values: {} },
        { id: 'm4', label: '# Replies', target: 5, values: {} },
        { id: 'm5', label: '# Meeting Booked', target: 3, values: {} },
      ],
    },
    {
      id: 'pc-newsletter',
      title: 'Features',
      columns: [
        { key: 'g2-leader-procurement', label: 'G2 Spring 2026 Leader in Procurement Orchestration' },
        { key: 'g2-supplier-relationship', label: 'Supplier Relationship Management' },
        { key: 'g2-best-relationship', label: 'Best Relationship' },
        { key: 'g2-best-support-easiest', label: 'Best Support and Easiest to Use' },
        { key: 'gartner-peer-insights', label: 'Gartner Peer Insights' },
      ],
      metrics: [
        { id: 'm1', label: 'Number of Posts', target: 1, values: {} },
        { id: 'm2', label: 'Audience demographic', target: 'Engineer Lead, Head of Product, Product Managers, Engineers, Developers...', values: {} },
        { id: 'm3', label: 'Number of views', target: 200, values: {} },
        { id: 'm4', label: '# Replies', target: 50, values: {} },
        { id: 'm5', label: '# Meeting Booked', target: 10, values: {} },
        { id: 'm6', label: 'Date of Issue', target: null, values: {} },
      ],
    },
    {
      id: 'pc-daily-summary',
      title: 'Daily Summary',
      metrics: [
        { id: 'm1', label: 'Spend', target: 'Under $100', values: {} },
        { id: 'm2', label: '# Meeting Booked', target: 53, values: {} },
      ],
    },
    {
      id: 'pc-gifts',
      title: 'Gifts',
      metrics: [
        { id: 'm1', label: 'Gift Type', target: null, values: {} },
        { id: 'm2', label: 'Spend per Unit', target: null, values: {} },
        { id: 'm3', label: 'Meeting Booked', target: null, values: {} },
        { id: 'm4', label: 'Conversion Rate', target: null, values: {} },
      ],
    },
    {
      id: 'pc-review-sites',
      title: 'Review Sites & Channels',
      metrics: [
        { id: 'm1', label: 'G2 Reviews', target: null, values: {} },
        { id: 'm2', label: 'Capterra Reviews', target: null, values: {} },
        { id: 'm3', label: 'TrustRadius Reviews', target: null, values: {} },
        { id: 'm4', label: 'Gartner Peer Insights Reviews', target: null, values: {} },
        { id: 'm5', label: 'Average Rating', target: null, values: {} },
        { id: 'm6', label: '# Meeting Booked', target: null, values: {} },
      ],
    },
    {
      id: 'pc-funnel',
      title: 'Demo, Pricing & Sales',
      metrics: [
        { id: 'm1', label: 'Demo Calls Booked', target: null, values: {} },
        { id: 'm2', label: 'Pricing Negotiations', target: null, values: {} },
        { id: 'm3', label: 'Sales', target: null, values: {} },
      ],
    },
  ];
}

function seedDocs() {
  return [
    {
      id: 'docs-logins', title: 'Software Login',
      fields: [
        { key: 'name', label: 'Software Name' },
        { key: 'loginProcess', label: 'Login Process' },
        { key: 'adminAccess', label: 'Admin Access' },
        { key: 'useCases', label: 'Use Cases' },
      ],
      entries: [],
    },
    {
      id: 'docs-tofu', title: 'Top-of-Funnel',
      entries: [
        { id: 'tofu-1', title: 'Setting up HubSpot sequences', url: '', notes: '' },
        { id: 'tofu-2', title: 'Setting up HeyReach sequences', url: '', notes: '' },
        { id: 'tofu-3', title: 'Setting up Google Ads', url: '', notes: '' },
        { id: 'tofu-4', title: 'Setting up LinkedIn ads', url: '', notes: '' },
        { id: 'tofu-5', title: 'Setting up Meta ads', url: '', notes: '' },
      ],
    },
    {
      id: 'docs-bofu', title: 'Bottom-of-Funnel',
      fields: [
        { key: 'pricingDoc', label: 'Pricing Doc' },
        { key: 'title', label: 'Title' },
        { key: 'implementationStrategy', label: 'Implementation Strategy' },
      ],
      entries: [],
    },
    {
      id: 'docs-sales-pitch', title: 'Sales & Pitch Documents',
      entries: [
        { id: 'sales-doc-1', title: 'Sales Document', url: '', notes: '' },
        { id: 'pitch-doc-1', title: 'Pitch Document', url: '', notes: '' },
      ],
    },
    {
      id: 'docs-internal-ops', title: 'Internal Team Ops Documentation',
      entries: [
        { id: 'ops-doc-1', title: 'Insurance login process', url: '', notes: '' },
        { id: 'ops-doc-2', title: 'Expense login process', url: '', notes: '' },
        { id: 'ops-doc-3', title: 'Onboarding checklist', url: '', notes: '' },
      ],
    },
    { id: 'docs-eng', title: 'Eng Processes and Documentation', entries: [] },
  ];
}

function seedGtmExperiments() {
  const eventFields = [
    { key: 'event', label: 'Event' },
    { key: 'date', label: 'Date' },
    { key: 'goalOfEvent', label: 'Goal of the Event' },
    { key: 'expectedLeadsCreated', label: 'Expected Leads Created' },
    { key: 'leadTargetListLink', label: 'Lead Target List Link' },
    { key: 'notes', label: 'Notes' },
  ];
  return [
    { id: 'gtm-events-attended', title: 'Events Attended', fields: eventFields, entries: [] },
    {
      id: 'gtm-events-created', title: 'Events Created',
      fields: [
        { key: 'event', label: 'Event' },
        { key: 'date', label: 'Date' },
        { key: 'location', label: 'Event Location' },
        { key: 'targetDemographic', label: 'Target Demographic' },
        { key: 'goalOfEvent', label: 'Goal of the Event' },
        { key: 'numberOfAttendees', label: 'Number of Attendees' },
        { key: 'leadsCreated', label: 'Number of Leads Created' },
        { key: 'expectedLeadsCreated', label: 'Expected Leads Created' },
        { key: 'leadCreated', label: 'Lead Created' },
        { key: 'notes', label: 'Notes' },
      ],
      entries: [
        { id: uid('gtmrow'), event: 'Operator Panels', date: '', location: '', targetDemographic: '', goalOfEvent: '', numberOfAttendees: '', leadsCreated: '', expectedLeadsCreated: '', leadCreated: '', notes: 'No product pitch on stage' },
        { id: uid('gtmrow'), event: 'Dinner', date: '', location: '', targetDemographic: '', goalOfEvent: '', numberOfAttendees: '', leadsCreated: '', expectedLeadsCreated: '', leadCreated: '', notes: '' },
        { id: uid('gtmrow'), event: 'Cocktail', date: '', location: '', targetDemographic: '', goalOfEvent: '', numberOfAttendees: '', leadsCreated: '', expectedLeadsCreated: '', leadCreated: '', notes: '' },
        { id: uid('gtmrow'), event: 'CFO Series', date: '', location: '', targetDemographic: '', goalOfEvent: '', numberOfAttendees: '', leadsCreated: '', expectedLeadsCreated: '', leadCreated: '', notes: '' },
      ],
      formats: ['Operator Panels (no product pitch on stage)', 'Roundtables', 'Dinner', 'Cocktail', 'CFO Leadership Series'],
    },
    {
      id: 'gtm-feedback-calls', title: 'Feedback Calls',
      fields: [
        { key: 'topic', label: 'Topic' },
        { key: 'participants', label: 'Participants' },
        { key: 'date', label: 'Date' },
        { key: 'intentToBuy', label: 'Intent to Buy' },
        { key: 'notes', label: 'Notes' },
      ],
      entries: [],
    },
    {
      id: 'gtm-co-hosts', title: 'Co-hosts',
      note: 'People we need to build relationship to add credibility to Omnea in this industry',
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'organization', label: 'Organization' },
        { key: 'dateOfEvent', label: 'Date of Event' },
        { key: 'pointOfContact', label: 'Point of Contact' },
        { key: 'locationOfEvent', label: 'Location of Event' },
        { key: 'targetDemographic', label: 'Target Demographic' },
        { key: 'expectedLeadsCreated', label: 'Expected Leads Created' },
        { key: 'linkToAudienceList', label: 'Link to Audience List' },
        { key: 'notes', label: 'Notes' },
      ],
      entries: [],
    },
    {
      id: 'gtm-partnerships', title: 'Partnerships',
      fields: [
        { key: 'partneringOrganization', label: 'Partnering Organization' },
        { key: 'goalOfPartnership', label: 'Goal of Partnership for Omnea' },
        { key: 'partnershipContingencies', label: 'Partnership Contingencies' },
        { key: 'linkToPartnershipAgreement', label: 'Link to Partnership Agreement' },
        { key: 'expectedLeadsCreated', label: 'Expected Leads Created' },
      ],
      entries: [],
    },
    {
      id: 'gtm-integrations', title: 'Integrations',
      columns: [
        { key: 'dow-jones', label: 'Dow Jones' },
        { key: 'amazon-business', label: 'Amazon Business' },
        { key: 'shopify', label: 'Shopify' },
        { key: 'chatgpt', label: 'ChatGPT' },
        { key: 'claude', label: 'Claude' },
        { key: 'copilot', label: 'Copilot' },
      ],
      metrics: [
        { id: 'row1', label: 'Status', values: {} },
        { id: 'row2', label: 'Notes', values: {} },
        { id: 'row3', label: 'Goal of Integration', values: {} },
        { id: 'row4', label: 'Expected Leads Created', values: {} },
      ],
    },
  ];
}

function seedTerritoryManagement() {
  return [
    {
      id: 'territory-prospect-companies', title: 'Prospect Companies',
      fields: [
        { key: 'company', label: 'Company' },
        { key: 'employeeCount', label: 'Number of Employees' },
        { key: 'industry', label: 'Industry' },
        { key: 'relevantTeams', label: 'Relevant Teams for Omnea' },
        { key: 'status', label: 'Status with Company' },
      ],
      entries: [],
    },
    {
      id: 'territory-conferences-icp', title: 'Conferences with ICP',
      fields: [
        { key: 'conference', label: 'Conference' },
        { key: 'date', label: 'Date' },
        { key: 'icpOverlap', label: 'ICP Overlap' },
        { key: 'notes', label: 'Notes' },
      ],
      entries: [],
    },
    {
      id: 'territory-content-consumed-icp', title: 'Content Consumed by ICP',
      fields: [
        { key: 'contentType', label: 'Content Type' },
        { key: 'title', label: 'Title / Topic' },
        { key: 'source', label: 'Source' },
        { key: 'notes', label: 'Notes' },
      ],
      entries: [],
    },
    {
      id: 'territory-feature-focuses-icp', title: 'Feature Focuses for ICP',
      fields: [
        { key: 'feature', label: 'Feature' },
        { key: 'whyItMatters', label: 'Why It Matters to ICP' },
        { key: 'priority', label: 'Priority' },
        { key: 'notes', label: 'Notes' },
      ],
      entries: [],
    },
    {
      id: 'territory-feedback-calls-icp', title: 'Feedback Calls from ICP',
      fields: [
        { key: 'contact', label: 'Contact' },
        { key: 'company', label: 'Company' },
        { key: 'date', label: 'Date' },
        { key: 'keyTakeaways', label: 'Key Takeaways' },
      ],
      entries: [],
    },
  ];
}

function seedInboundLeads() {
  return {
    rows: [],
    notes: 'This page holds all of the leads so they can be consolidated like a CRM, grouped by source. It will be automated with calendars, flags, and emails. This can also connect to HubSpot, which tracks all emails, calendar events, and other communication with each lead.',
  };
}

export function seedData() {
  const year = new Date().getFullYear();
  return {
    companyGoal: { title: 'EoY target', current: 0, target: 100, unit: '%', targetDate: `${year}-12-31` },
    teams: TEAMS,
    people: PEOPLE,
    initiatives: INITIATIVES,
    milestones: seedMilestones(),
    months: seedMonths(),
    weeks: seedWeeks(),
    metrics: seedMetrics(),
    okrs: seedOkrs(),
    paidConversions: seedPaidConversions(),
    docs: seedDocs(),
    territoryManagement: seedTerritoryManagement(),
    inboundLeads: seedInboundLeads(),
    gtmExperiments: seedGtmExperiments(),
    slackWebhookUrl: '',
    pageNotes: {
      documentation: 'All documentation, processes, SOPs, and links will live here. This allows for easy access for all team members and will reduce any dependencies on individuals. Additionally, this will facilitate future onboarding, as new hires can go through all of these documents. Access to particular documents can be adjusted as needed. Anytime a new process or system is created, we will have Claude and Whisper Flow document the process to capture the exact steps.',
      territoryManagement: 'This section is to track my ICP’s behavior and where they congregate. This supports territory mapping, as I will be able to better target my highest-potential leads and meet them where they are.',
      gtmExperiments: 'Tracks go-to-market experiments — the hypothesis behind each one, its status, and what was learned.',
      roadmap: 'Roadmap section: This allows the team to visualize timelines and deadlines for projects and tasks. It will also help coordinate timelines for multi-team projects. Each task in the roadmap can house information. The dependent and depending tasks in the roadmap will be set to flag conflicts.\n\nOKRs section: This will help keep vision on the end goals as a team. This will also make sure that the team is aligned and can be used as a reference throughout projects.\n\nCalendar section: This will allow the team to view the major dates to consider, such as launches, conferences, and testing. It will also notify the team of upcoming dates as relevant.\n\nTracked Goals section: This houses all of the metrics each team assigns itself, all visible in one view. This keeps everyone focused on the goal, or target, they need to hit, and how they are progressing toward it.',
      paidConversions: 'All channels are designed to lead to a booked meeting, and then go more granular into demo, pricing negotiation, and sales.\n\nEmail Outbound: This is a campaign to reach out to targets, tracking the funnel from leads and emails sent, to number of replies, to meetings booked. From there, we go more granular into demos, pricing negotiations, and sales.\n\nAds - LinkedIn: These are campaigns on LinkedIn Ads run against specific audience lists, to see whether we are presenting the ad to the right people and whether they are present on LinkedIn. If this channel does not bring a positive CAC, it will be deemed unsuccessful.\n\nAds - Google: These are Google Search ads to make sure we are optimizing for what our ICP is looking for and hitting the right messaging. It needs to produce a positive CAC to be considered successful.\n\nSEO/AEO: This is to support organic growth within the company through search engine and AI engine optimization. It can be further enhanced by LinkedIn posting, as well as Reddit and the newsletter, since AEO pulls from those.\n\nClaude Skill for Posting (LinkedIn and X): This is a set of ten standardized post templates for LinkedIn and X, so branding takes off while requiring less of the team’s time to continuously post on social media to build the brand.\n\nReddit: We have a screen on Reddit that flags any posts related to the value we add or the problems we solve for. That way, someone on the team can reply and guide the conversation toward a demo call. Replies need to be from a real person, as Reddit has very strong defenses against bots.\n\nNewsletter Features: This is to support our AEO by bringing visibility across platforms and many different websites that are not necessarily linked to the main Omnea page, which increases the chances of our name being pulled into AI search results.\n\nDaily Summary: The idea is that all booked meetings, regardless of type, should convert at roughly the same rate. This summary tracks that conversion rate from meeting booked to the next stage.\n\nFor lead generation, there are so few high-quality targets in Canada given the sheer size of our market. I would rather have a list of accounts and reach out to each individual through email, LinkedIn, conference meeting, and targeted ad, one by one, ensuring that each is covered on all four fronts.',
    },
    tasks: seedTasks(),
  };
}
