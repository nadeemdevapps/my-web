import type { Accessory, FallerKind, Hat } from '../content'

/*
  Line drawings shared by the SVG components and the canvas game. Each shape
  is a list of path strings; `fill` paths get a paper or ink fill and an ink
  outline, `stroke` paths are outline only. The canvas turns the same strings
  into Path2D objects, so the game and the site draw identical doodles.
*/
export type Shape = { fill?: string[]; ink?: string[]; stroke?: string[] }

/** Person in a 40 × 60 box; feet at y = 56, centre x = 20. */
export const PERSON = {
  head: 'M30.2 16a10.2 10.2 0 1 1-20.4 0a10.2 10.2 0 1 1 20.4 0Z',
  body: 'M12.6 32c0-5.5 3.2-7.8 7.4-7.8s7.4 2.3 7.4 7.8v10.5c0 3-3.2 5-7.4 5s-7.4-2-7.4-5Z',
  legs: 'M17 46.5v8.5M23 46.5v8.5',
  arms: 'M13.2 32l-4.6 8M26.8 32l4.6 8',
  eyes: 'M17.6 12.6a1.4 1.4 0 1 1-2.8 0a1.4 1.4 0 1 1 2.8 0ZM25.2 12.6a1.4 1.4 0 1 1-2.8 0a1.4 1.4 0 1 1 2.8 0Z',
}

export const HATS: Record<Hat, Shape> = {
  none: {},
  beanie: { ink: ['M10.4 11c0-6.5 4.4-9.4 9.6-9.4s9.6 2.9 9.6 9.4Z', 'M22.4 1.2a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0Z'] },
  top: { ink: ['M14.2 1.5h11.6v10.5h-11.6Z', 'M9.5 11.5h21v3h-21Z'] },
  cap: { ink: ['M10.6 10.6c0-5.5 4.2-8.4 9.4-8.4s9.4 2.9 9.4 8.4Z', 'M26.5 8.4h8.5v2.8h-8.5Z'] },
  bucket: { fill: ['M13.2 11.5l2.2-6.6h9.2l2.2 6.6Z', 'M9 11.2h22v3h-22Z'] },
  bow: { ink: ['M20 7.5l-6.5-4.5v9Z', 'M20 7.5l6.5-4.5v9Z', 'M21.6 7.5a1.6 1.6 0 1 1-3.2 0a1.6 1.6 0 1 1 3.2 0Z'] },
}

export const ACCESSORIES: Record<Accessory, Shape> = {
  none: {},
  scarf: { ink: ['M12.6 23.2h14.8v4.2h-14.8Z', 'M21.6 27h4.2v8h-4.2Z'] },
  umbrella: { fill: ['M23 13.5a11.5 8.5 0 0 1 23 0Z'], stroke: ['M34.5 13.5v26c0 2-2.5 2-2.5 0', 'M26.5 39.5h5'] },
  bag: { fill: ['M27.5 32.5h8v8.5h-8Z'], stroke: ['M14.5 24.5l16.5 8'] },
  glasses: { stroke: ['M18.8 12.8a2.6 2.6 0 1 1-5.2 0a2.6 2.6 0 1 1 5.2 0Z', 'M26.4 12.8a2.6 2.6 0 1 1-5.2 0a2.6 2.6 0 1 1 5.2 0Z', 'M18.8 12.6h2.4'] },
  ladder: { stroke: ['M2 52L32 0', 'M9 56L39 4', 'M7 43.5l7 4', 'M12 35l7 4', 'M17 26.3l7 4', 'M22 17.6l7 4', 'M27 9l7 4'] },
}

/** Falling things in a 100 × 100 box centred on 0,0; the bottom sits at y = 40. */
export const FALLERS: Record<FallerKind, Shape> = {
  teacup: {
    fill: ['M-30 -12h50c0 26-11 40-25 40s-25-14-25-40Z'],
    stroke: ['M20 -4c13 0 13 18 0 18', 'M-40 34h70', 'M-14 -26c-4-6 4-10 0-16', 'M0 -24c-4-6 4-10 0-16'],
  },
  pot: {
    fill: ['M-27 -4h54l-9 44h-36Z', 'M-32 -14h64v11h-64Z'],
    stroke: ['M0 -14c0-14-10-22-20-26', 'M0 -14c0-12 8-20 20-24', 'M-20 -40c6 2 8 6 6 10', 'M20 -38c-5 3-6 7-4 10'],
  },
  anvil: {
    ink: ['M-46 -26h74c0 12-10 18-22 18v12h14v16h-58v-16h14v-12c-12 0-22-6-22-18Z', 'M28 -26h18l-18 10Z'],
    stroke: ['M-40 40h74'],
  },
  piano: {
    fill: ['M-44 -40h88v72h-88Z', 'M-50 -4h100v14h-100Z'],
    stroke: ['M-40 -4v14M-30 -4v14M-20 -4v14M-10 -4v14M0 -4v14M10 -4v14M20 -4v14M30 -4v14M40 -4v14', 'M-40 32v8M40 32v8', 'M-32 -30h64v18h-64Z'],
    ink: ['M-36 -4h5v8h-5ZM-26 -4h5v8h-5ZM-6 -4h5v8h-5ZM4 -4h5v8h-5ZM14 -4h5v8h-5ZM34 -4h5v8h-5Z'],
  },
  coin: {
    fill: ['M22 0a22 22 0 1 1-44 0a22 22 0 1 1 44 0Z'],
    ink: ['M-4 -6a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0ZM11 -6a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0ZM-4 7a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0ZM11 7a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0Z'],
    stroke: ['M15 0a15 15 0 1 1-30 0a15 15 0 1 1 30 0Z'],
  },
}

export const TINTS = {
  paper: { body: '#ffffff', head: '#ffffff' },
  ink: { body: '#1b1b1b', head: '#ffffff' },
  smudge: { body: '#bdbab3', head: '#ffffff' },
  butter: { body: '#efe29a', head: '#fbf6d8' },
} as const
