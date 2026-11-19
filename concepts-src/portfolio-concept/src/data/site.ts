// Everything about you lives here. The pages read from this file.

export const site = {
  name: 'Nadeem Mazhar',
  role: 'Solo developer',
  location: 'Rahim Yar Khan',
  timezone: 'Asia/Karachi',
  email: 'nadeem.devapps@gmail.com',
  available: true,
  intro: 'I plan first, then build with AI — phase by phase, tested. Solo developer, learning in public.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/nadeemdevapps' },
  ],
  marquee: ['Brand identity', 'Product design', 'Web design', 'Creative development', 'Art direction', 'Motion'],
}

export interface Project {
  slug: string
  title: string
  client: string
  category: string
  year: string
  cover: string
  tint: string
  summary: string
  role: string[]
  deliverables: string[]
  link?: string
  body: string[]
  size: 'large' | 'small'
}

export const projects: Project[] = [
  {
    slug: 'aurora',
    title: 'Aurora',
    client: 'Demo project',
    category: 'Brand and website',
    year: '2026',
    cover: `${import.meta.env.BASE_URL}images/aurora.jpg`,
    tint: '#efe4d8',
    summary: 'A brand and launch site concept built around a single soft form that changes with light — weather, not a dashboard.',
    role: ['Art direction', 'Identity', 'Website'],
    deliverables: ['Identity system', 'Motion language', 'Launch site', 'Pitch deck'],
    link: '#',
    body: [
      'The identity is built around a single soft form that changes with light, rendered in a palette borrowed from the sky at dawn. It moves slowly on the site and sits still on paper, and it never needs a leaf.',
      'The launch site carries the same form through every screen, with slow motion and generous space.',
    ],
    size: 'large',
  },
  {
    slug: 'meridian',
    title: 'Meridian',
    client: 'Demo project',
    category: 'Product design',
    year: '2026',
    cover: `${import.meta.env.BASE_URL}images/meridian.jpg`,
    tint: '#dbe0f5',
    summary: 'Redesigning a banking app around the one question people actually have: can I afford this?',
    role: ['Product design', 'Design system', 'Prototyping'],
    deliverables: ['iOS and Android app', 'Design system', 'Research synthesis'],
    body: [
      'The brief: a banking app with a feature for everything and a home screen nobody understood. Research kept hearing the same thing in different words: people open the app to decide whether to spend money, and the app made that harder.',
      'The new home screen answers that question first, in one number, then explains it. Everything else moved behind it. The design system was rebuilt in the process so the rest could ship without starting over.',
    ],
    size: 'small',
  },
  {
    slug: 'fold',
    title: 'Fold',
    client: 'Self-initiated',
    category: 'Typeface',
    year: '2025',
    cover: `${import.meta.env.BASE_URL}images/fold.jpg`,
    tint: '#e8e2d6',
    summary: 'A high-contrast serif drawn for editorial headlines, with a specimen printed by hand.',
    role: ['Type design', 'Print'],
    deliverables: ['Variable font, two axes', 'Letterpress specimen', 'Microsite'],
    link: '#',
    body: [
      'Fold started as a sketch of an S that would not sit still. Two years later it is a two-axis variable family with a display cut that leans into its own awkwardness.',
      'The specimen was printed on a Vandercook in an afternoon. The impression you can feel on the paper is the whole point.',
    ],
    size: 'small',
  },
  {
    slug: 'halcyon',
    title: 'Halcyon',
    client: 'Demo project',
    category: 'Website',
    year: '2025',
    cover: `${import.meta.env.BASE_URL}images/halcyon.jpg`,
    tint: '#ebe3d6',
    summary: 'A booking site concept for a small group of hotels that feels like checking in, not checking out.',
    role: ['Design', 'Development'],
    deliverables: ['Website', 'Booking flow', 'CMS'],
    body: [
      'The brief: four hotels in buildings that are each a hundred years old. Their old site was a template with a booking widget bolted on, and it looked like every other hotel.',
      'The new site is slower. Big photography, long scrolling pages that tell you about the neighbourhood before they tell you about the rooms, and a booking flow with three steps instead of nine.',
    ],
    size: 'large',
  },
  {
    slug: 'nocturne',
    title: 'Nocturne',
    client: 'Demo project',
    category: 'Art direction',
    year: '2024',
    cover: `${import.meta.env.BASE_URL}images/nocturne.jpg`,
    tint: '#d8d4e4',
    summary: 'A visual identity for a debut album that had to work as a vinyl sleeve, a stage and a four-second loop.',
    role: ['Art direction', 'Motion'],
    deliverables: ['Album artwork', 'Live visuals', 'Social system'],
    body: [
      'The record is dark, slow and strangely warm. The visuals are liquid captured at macro scale, lit so the colour only appears where it catches the light.',
      'The same footage runs behind the band on stage and loops in nine-by-sixteen on the socials. One idea, every surface.',
    ],
    size: 'small',
  },
  {
    slug: 'kite',
    title: 'Kite',
    client: 'Demo project',
    category: 'E-commerce',
    year: '2024',
    cover: `${import.meta.env.BASE_URL}images/kite.jpg`,
    tint: '#d9e6dc',
    summary: 'A storefront concept for an outdoor brand that sells fewer, better things, and wanted the site to say so.',
    role: ['Design', 'Development'],
    deliverables: ['Storefront', 'Campaign system', 'Email templates'],
    link: '#',
    body: [
      'The brief: eleven products. Most outdoor sites are built for eleven thousand. This store treats each product like a chapter, with campaign photography shot on seamless colour so the range reads as one family.',
      'Fewer pages, one idea on every surface.',
    ],
    size: 'small',
  },
]

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const services = [
  {
    title: 'Brand identity',
    body: 'Naming, identity systems, guidelines and the motion that makes them feel alive. Built to be used by your team, not just admired by mine.',
  },
  {
    title: 'Product design',
    body: 'Research, flows, interface and design systems for apps and software. I work inside the product team, in your tools, at your pace.',
  },
  {
    title: 'Websites',
    body: 'Marketing sites, storefronts and editorial platforms, designed and built. Fast, accessible, and easy to keep updated without me.',
  },
  {
    title: 'Creative development',
    body: 'The interactive and generative layer: WebGL, motion, shaders and the small details that make a site feel considered.',
  },
]
