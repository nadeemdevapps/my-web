// All copy lives here so the page can be re-themed for a product without
// touching layout. Sections read from this file; remove a section by deleting
// it from App.tsx.

export const brand = {
  name: 'Nadeem Dev Apps',
  tagline: 'The calm workspace for teams that ship',
}

export const nav = {
  links: [
    { label: 'Product', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
  ],
  signIn: { label: 'Sign in', href: '#' },
  cta: { label: 'Get started', href: '#cta' },
}

export const hero = {
  badge: 'Now in public beta',
  title: ['Plan, build and ship', 'from one calm place'],
  highlight: 'calm',
  description:
    'Bring roadmaps, work and conversations together. Fewer tabs, fewer meetings, and a team that always knows what matters this week.',
  primary: { label: 'Start for free', href: '#cta' },
  secondary: { label: 'See how it works', href: '#how' },
  footnote: 'Free for up to 10 people. No card required.',
}

export const features = {
  eyebrow: 'Everything in one place',
  title: 'Built for the way modern teams work',
  description: 'Each part is simple on its own. Together they replace a stack of tools.',
  items: [
    {
      key: 'collab',
      title: 'Work together in real time',
      description: 'Presence, cursors and comments on every document and board.',
      span: 2,
    },
    {
      key: 'automation',
      title: 'Automate the busywork',
      description: 'Route, assign and notify with rules you write in plain language.',
      span: 1,
    },
    {
      key: 'analytics',
      title: 'See progress at a glance',
      description: 'Live dashboards that update as the work moves.',
      span: 1,
    },
    {
      key: 'integrations',
      title: 'Connects to your stack',
      description: 'Your favourite tools, ready in a click.',
      span: 2,
    },
  ],
}

export const steps = {
  eyebrow: 'How it works',
  title: 'Up and running before lunch',
  items: [
    {
      title: 'Import what you have',
      description: 'Bring projects from a spreadsheet or another tool. We keep the history.',
    },
    {
      title: 'Shape the week',
      description: 'Turn goals into a short, visible plan everyone can see and own.',
    },
    {
      title: 'Ship and learn',
      description: 'Updates write themselves from the work. Review, adjust, repeat.',
    },
  ],
}

export const showcase = {
  eyebrow: 'One workspace, many views',
  title: 'The same work, seen your way',
  tabs: [
    {
      key: 'inbox',
      title: 'Inbox',
      description: 'A single stream of what needs you, ordered by what matters.',
    },
    {
      key: 'board',
      title: 'Board',
      description: 'Drag work across stages. Limits and owners stay visible.',
    },
    {
      key: 'report',
      title: 'Reports',
      description: 'Velocity, cycle time and risk without building a spreadsheet.',
    },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  title: 'Simple pricing that grows with you',
  description: 'Start free. Upgrade when the team does.',
  yearlyNote: 'Two months free',
  tiers: [
    {
      name: 'Starter',
      monthly: 0,
      yearly: 0,
      description: 'For small teams getting organised.',
      cta: 'Start for free',
      features: ['Up to 10 people', 'Unlimited projects', 'Boards and docs', 'Community support'],
    },
    {
      name: 'Team',
      monthly: 12,
      yearly: 10,
      description: 'For teams that need automation and reporting.',
      cta: 'Start a 14 day trial',
      popular: true,
      features: [
        'Everything in Starter',
        'Automations and rules',
        'Live reports and goals',
        'Guests and client access',
        'Priority support',
      ],
    },
    {
      name: 'Business',
      monthly: 24,
      yearly: 20,
      description: 'For organisations with security needs.',
      cta: 'Talk to sales',
      features: ['Everything in Team', 'SSO and SCIM', 'Audit log and data residency', 'Custom roles', 'Dedicated success manager'],
    },
  ],
}

export const faq = {
  title: 'Questions, answered',
  items: [
    {
      q: 'Can I import from the tools we already use?',
      a: 'Yes. One-click importers cover the tools you already use, and CSV import covers everything else. Comments, attachments and history come along.',
    },
    {
      q: 'Is there a free plan?',
      a: 'The Starter plan is free for up to 10 people with unlimited projects. It is not a trial and it does not expire.',
    },
    {
      q: 'How does billing work for guests?',
      a: 'Guests and clients are free on Team and Business plans. You only pay for members who can edit.',
    },
    {
      q: 'Where is my data stored?',
      a: 'In the region you choose at signup, encrypted at rest and in transit. Business plans can pin data to the EU or US.',
    },
    {
      q: 'Can I cancel at any time?',
      a: 'Yes. Downgrade or cancel from your billing settings and your workspace stays readable forever.',
    },
    {
      q: 'Do you offer discounts for startups or nonprofits?',
      a: 'We do. Eligible startups get the Team plan free for a year, and nonprofits get 50% off every plan.',
    },
  ],
}

export const cta = {
  title: 'Give your team a calmer week',
  description: 'Join thousands of teams planning and shipping from one place.',
  placeholder: 'you@example.com',
  button: 'Get early access',
  success: 'Demo complete. No subscription was saved.',
}

export const footer = {
  blurb: 'A calm workspace for teams that ship.',
  columns: [
    { title: 'Product', links: ['Features', 'Integrations', 'Changelog', 'Pricing', 'Security'] },
    { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press', 'Contact'] },
    { title: 'Resources', links: ['Docs', 'Guides', 'Templates', 'Community', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Licenses'] },
  ],
  legal: `© ${new Date().getFullYear()} Nadeem Dev Apps`,
}
