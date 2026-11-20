// Mirrors src/styles.css for the style guide. Keep the two in step.
export const colours = [
  { name: 'page', hex: '#ffffff', use: 'Page background' },
  { name: 'paper', hex: '#faf8f2', use: 'Nav pill, raised surfaces' },
  { name: 'cream', hex: '#f7f2e4', use: 'Doodle cards' },
  { name: 'cream-deep', hex: '#ece4cc', use: 'Chips on cream, borders' },
  { name: 'line', hex: '#ebe7dc', use: 'Hairlines' },
  { name: 'line-strong', hex: '#d6cfbd', use: 'Field borders, underlines' },
  { name: 'ink', hex: '#141414', use: 'Script titles, primary button' },
  { name: 'body', hex: '#2b2f36', use: 'Running text' },
  { name: 'muted', hex: '#5d626c', use: 'Secondary text' },
  { name: 'blue', hex: '#2a30b5', use: 'Maker name, focus ring, my bubbles' },
  { name: 'blue-soft', hex: '#e8e9fb', use: 'Selected chips' },
  { name: 'tan', hex: '#c98a4b', use: 'Accents, fills' },
  { name: 'tan-text', hex: '#8a5220', use: 'Tan on white text' },
  { name: 'tan-soft', hex: '#f6e6d2', use: 'Highlights' },
  { name: 'red', hex: '#c73a2c', use: 'Badge, tomato' },
  { name: 'green', hex: '#2f5a3c', use: 'Stock, success marks' },
  { name: 'success', hex: '#1f6b45', use: 'Success text' },
  { name: 'danger', hex: '#b42318', use: 'Errors' },
]

export const typeScale = [
  { name: 'script-xl', className: 'font-script text-script-xl font-bold text-ink', sample: 'Stitch & tan', spec: 'Caveat 700, 112/0.86' },
  { name: 'script-lg', className: 'font-script text-script-lg font-bold text-ink', sample: 'The shop', spec: 'Caveat 700, 72/0.95' },
  { name: 'script-md', className: 'font-script text-script-md font-bold text-ink', sample: 'On the bench', spec: 'Caveat 700, 48/1' },
  { name: 'hand', className: 'font-hand text-[28px] tracking-[0.06em] text-ink', sample: 'Nadeem Mazhar', spec: 'Gochi Hand, 28' },
  { name: 'lead', className: 'text-lead text-body', sample: 'There were things I needed that nobody made.', spec: 'Hanken Grotesk 400, 21/1.6' },
  { name: 'body', className: 'text-[16px] text-body', sample: 'Hand saddle-stitched with waxed linen thread.', spec: 'Hanken Grotesk 400, 16/1.55' },
  { name: 'small', className: 'text-[14px] text-muted', sample: 'Made and posted within 5 working days', spec: 'Hanken Grotesk 400, 14' },
  { name: 'label', className: 'text-[14px] font-semibold text-ink', sample: 'Leather colour', spec: 'Hanken Grotesk 600, 14' },
]

export const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]

export const radii = [
  { name: 'field', value: '16px' },
  { name: 'bubble', value: '22px' },
  { name: 'card', value: '24px' },
  { name: 'panel', value: '32px' },
  { name: 'control', value: '999px' },
]

export const shadows = [
  { name: 'pill', className: 'shadow-pill' },
  { name: 'card', className: 'shadow-card' },
  { name: 'bubble', className: 'shadow-bubble' },
  { name: 'product', className: 'shadow-product' },
]

export const motionTokens = [
  { name: 'rise', className: 'animate-rise', spec: '0.7s ease-out, entrances' },
  { name: 'pop', className: 'animate-pop', spec: '0.45s spring, badges and bubbles' },
  { name: 'float', className: 'animate-float', spec: '6s loop, hero pieces' },
  { name: 'typing', className: 'animate-typing', spec: '1.2s loop, typing dots' },
]
