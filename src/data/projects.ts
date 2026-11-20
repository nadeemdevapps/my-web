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
    description:
      'A free phone blocker that helps you stay off distracting apps — every feature free, no premium tier.',
    bullets: ['Parachute streaks', 'Routines', 'Free, no premium'],
    link: { href: 'products/kaizenly/', label: "Open Kaizenly's site →" },
    category: 'mobile',
  },
  {
    theme: 'msgloop',
    glyph: 'M↻',
    name: 'MsgLoop',
    tag: 'Android · Messaging',
    description:
      'A WhatsApp scheduled multi-message loop — send a set of messages to one number, up to 2,000 sends, on schedule.',
    bullets: ['Multi-message loop to one number', 'Scheduled tasks', 'Resume from Recents'],
    link: { href: 'products/msgloop/', label: "Open MsgLoop's site →" },
    category: 'mobile',
  },
  {
    theme: 'cv',
    glyph: 'CV',
    name: 'CV Creator Pro',
    tag: 'Web · Tool',
    description:
      'A one-page CV maker that runs entirely in the browser — fill it in, pick a look, download a clean A4 PDF.',
    bullets: ['Pick theme and template', 'One-page A4 PDF download', 'Runs fully in the browser'],
    link: { href: 'products/cv-creator-pro/', label: "Open CV Creator Pro's site →" },
    category: 'web',
  },
  {
    theme: 'nydrex',
    glyph: 'Nx',
    name: 'Nydrex Suite',
    tag: 'Desktop · Retail',
    description:
      'An Electron desktop suite for retail — point of sale and inventory, with customer and supplier ledgers and reporting.',
    bullets: ['Checkout and inventory', 'Customer and supplier ledgers', 'Reporting and encrypted backup'],
    nolink: 'Windows desktop app',
    category: 'desktop',
  },
  {
    theme: 'brew',
    glyph: 'B&B',
    name: 'Brew & Bean Cafe',
    tag: 'Web · Assignment project — fully working end to end',
    description:
      'An animated cafe site with a menu and cart — your order is sent straight to the cafe as a WhatsApp message.',
    bullets: ['Menu and cart', 'Order sent as a WhatsApp message', 'Fully animated'],
    link: { href: 'products/brew-and-bean/', label: "Open Brew & Bean's site →" },
    category: 'web',
  },
];
