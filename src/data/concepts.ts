// The 5 concept demos on the Products page — inspiration templates,
// cleaned and rebranded to Nadeem Dev Apps. Single source of truth;
// the page renders from this list. The filter pills do not touch them.

export interface Concept {
  glyph: string;
  name: string;
  tag: string;
  description: string;
  /** Internal path (no leading slash, no base) to the concept site. */
  href: string;
  label: string;
}

const conceptTag =
  'Concept demo — an inspiration template, cleaned and rebranded to Nadeem Dev Apps.';

export const concepts: Concept[] = [
  {
    glyph: 'Tb',
    name: 'Tally Bar',
    tag: conceptTag,
    description: 'A desk status display with an LED pixel screen and a focus timer.',
    href: 'concepts/tally-bar/',
    label: 'Open the concept site →',
  },
  {
    glyph: 'Lo',
    name: 'Look Out Below',
    tag: conceptTag,
    description:
      'A tiny hand-drawn game about being small, quick and directly underneath a very clumsy sky.',
    href: 'concepts/look-out-below/',
    label: 'Open the concept site →',
  },
  {
    glyph: 'St',
    name: 'Stitch & Tan',
    tag: conceptTag,
    description:
      'Handmade leather pouches, cases and little things from a one-person studio, plus custom orders.',
    href: 'concepts/stitch-and-tan/',
    label: 'Open the concept site →',
  },
  {
    glyph: 'Ps',
    name: 'ProductSite',
    tag: conceptTag,
    description: 'A product site for a calm team workspace — plan, build and ship from one place.',
    href: 'concepts/product-site/',
    label: 'Open the concept site →',
  },
  {
    glyph: 'Pf',
    name: 'Portfolio',
    tag: conceptTag,
    description: 'A portfolio concept — oversized name, selected-work grid and case-study pages.',
    href: 'concepts/portfolio-concept/',
    label: 'Open the concept site →',
  },
];
