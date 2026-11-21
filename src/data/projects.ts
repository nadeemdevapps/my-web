// The 6 products shown on Home ("Selected work") and the Products page.
// Single source of truth — both pages render from this list via
// ProjectCard.astro. The Products page adds data-category (for the
// filter); Home renders without it.

export type ProjectCategory = 'mobile' | 'web' | 'desktop';

export interface ProjectLink {
  /** Internal path (no leading slash, no base) or a full external URL. */
  href: string;
  label: string;
  external?: boolean;
}

export interface Project {
  /** Card theme class: tsumly, kaizenly, msgloop, cv, nydrex, brew. */
  theme: string;
  glyph: string;
  /** Real product mark (path relative to the site base), rendered instead of the glyph. */
  icon?: string;
  name: string;
  tag: string;
  /** One-line live/status note, shown muted under the tag. */
  status?: string;
  /** Stack, shown as plain muted text under the status line. */
  stack?: string;
  description: string;
  bullets?: string[];
  link?: ProjectLink;
  /** Text shown instead of a link (e.g. Nydrex: desktop app, no URL). */
  nolink?: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    theme: 'tsumly',
    glyph: 'Ts',
    icon: 'icons/tsumly.svg',
    name: 'Tsumly',
    tag: 'Android · Finance',
    status: 'Live · Free · Android',
    stack: 'Flutter · Dart',
    description:
      'A local-first expense tracker with a smart multi-loan repayment split — the finance app I needed, built for myself.',
    bullets: ['Local-first, no cloud needed', 'Smart multi-loan repayment split', 'Optional Drive backup'],
    link: { href: 'products/tsumly/', label: "Open Tsumly's site →" },
    category: 'mobile',
  },
  {
    theme: 'kaizenly',
    glyph: 'K',
    icon: 'icons/kaizenly.svg',
    name: 'Kaizenly',
    tag: 'Android · Focus',
    status: 'Live · Free · Android',
    stack: 'Kotlin · Android',
    description:
      'A free phone blocker that helps you stay off distracting apps — every feature free, no premium tier.',
    bullets: ['Parachute streaks', 'Routines', 'Free, no premium'],
    link: { href: 'products/kaizenly/', label: "Open Kaizenly's site →" },
    category: 'mobile',
  },
  {
    theme: 'msgloop',
    glyph: 'M↻',
    icon: 'icons/msgloop.svg',
    name: 'MsgLoop',
    tag: 'Android · Messaging',
    status: 'Live · Free · Android',
    stack: 'Kotlin · Android',
    description:
      'A WhatsApp scheduled multi-message loop — send a set of messages to one number, up to 2,000 sends, on schedule.',
    bullets: ['Multi-message loop to one number', 'Scheduled tasks', 'Resume from Recents'],
    link: { href: 'products/msgloop/', label: "Open MsgLoop's site →" },
    category: 'mobile',
  },
  {
    theme: 'cv',
    glyph: 'CV',
    icon: 'icons/cv-creator-pro.svg',
    name: 'CV Creator Pro',
    tag: 'Web · Tool',
    status: 'Live on Cloudflare Workers · Free',
    stack: 'TanStack Start · React',
    description:
      'A one-page CV maker that runs entirely in the browser — fill it in, pick a look, download a clean A4 PDF.',
    bullets: ['Pick theme and template', 'One-page A4 PDF download', 'Runs fully in the browser'],
    link: { href: 'products/cv-creator-pro/', label: "Open CV Creator Pro's site →" },
    category: 'web',
  },
  {
    theme: 'nydrex',
    glyph: 'Nx',
    icon: 'icons/nydrex-suite.svg',
    name: 'Nydrex Suite',
    tag: 'Desktop · Retail',
    status: 'Windows desktop app · v2.2.0',
    stack: 'Electron · React · SQLite',
    description:
      'An Electron desktop suite for retail — point of sale and inventory, with customer and supplier ledgers and reporting.',
    bullets: ['Checkout and inventory', 'Customer and supplier ledgers', 'Reporting and encrypted backup'],
    link: { href: 'products/nydrex-suite/', label: 'Open the product page →' },
    category: 'desktop',
  },
  {
    theme: 'brew',
    glyph: 'B&B',
    icon: 'icons/brew-and-bean.svg',
    name: 'Brew & Bean Cafe',
    tag: 'Web · Assignment project — fully working end to end',
    status: 'Live on Cloudflare Workers · Assignment project',
    stack: 'TanStack Start · React',
    description:
      'An animated cafe site with a menu and cart — your order is sent straight to the cafe as a WhatsApp message.',
    bullets: ['Menu and cart', 'Order sent as a WhatsApp message', 'Fully animated'],
    link: { href: 'products/brew-and-bean/', label: "Open Brew & Bean's site →" },
    category: 'web',
  },
];
