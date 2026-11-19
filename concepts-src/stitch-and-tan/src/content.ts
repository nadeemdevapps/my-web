// Every string and all seed data for Stitch & Tan lives here.

/** One place for every image. Swap these paths for your own photography;
 *  cut-outs are shot on pure white and blended onto the page. */
export const photos = {
  flapPouch: `${import.meta.env.BASE_URL}images/flap-pouch.webp`,
  glassesCase: `${import.meta.env.BASE_URL}images/glasses-case.webp`,
  tagFob: `${import.meta.env.BASE_URL}images/tag-fob.webp`,
  cardWallet: `${import.meta.env.BASE_URL}images/card-wallet.webp`,
  keyboardSleeve: `${import.meta.env.BASE_URL}images/keyboard-sleeve.webp`,
  coinPouch: `${import.meta.env.BASE_URL}images/coin-pouch.webp`,
  penRoll: `${import.meta.env.BASE_URL}images/pen-roll.webp`,
  notebookCover: `${import.meta.env.BASE_URL}images/notebook-cover.webp`,
  cableWrap: `${import.meta.env.BASE_URL}images/cable-wrap.webp`,
  workshop: `${import.meta.env.BASE_URL}images/workshop.webp`,
  hands: `${import.meta.env.BASE_URL}images/hands.webp`,
} as const

export type PhotoKey = keyof typeof photos

export const brand = {
  name: 'Stitch & Tan',
  maker: 'Nadeem Mazhar',
  makerShort: 'Nadeem',
  tagline: 'Small leather things, stitched by hand',
  location: 'a spare-room studio in Rahim Yar Khan',
  email: 'hello@stitchandtan.example',
  currency: 'GBP',
}

export const nav = [
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom' },
  { to: '/story', label: 'Story' },
]

export type Category = 'pouches' | 'cases' | 'small' | 'desk'

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'pouches', label: 'Pouches' },
  { id: 'cases', label: 'Cases and sleeves' },
  { id: 'small', label: 'Little things' },
  { id: 'desk', label: 'Desk' },
]

export type Colour = { id: string; name: string; hex: string }

export const leathers: Colour[] = [
  { id: 'tan', name: 'Honey tan', hex: '#c98a4b' },
  { id: 'cream', name: 'Bone cream', hex: '#eadcc0' },
  { id: 'tomato', name: 'Tomato red', hex: '#c73a2c' },
  { id: 'bottle', name: 'Bottle green', hex: '#2f5a3c' },
  { id: 'mustard', name: 'Mustard', hex: '#e3a83c' },
  { id: 'oxblood', name: 'Oxblood', hex: '#6e1f24' },
  { id: 'charcoal', name: 'Charcoal', hex: '#34353a' },
  { id: 'chestnut', name: 'Chestnut', hex: '#8a4b25' },
]

export const threads: Colour[] = [
  { id: 'cream', name: 'Cream', hex: '#f1e7d0' },
  { id: 'tan', name: 'Tan', hex: '#b8834e' },
  { id: 'red', name: 'Red', hex: '#c73a2c' },
  { id: 'black', name: 'Black', hex: '#1b1b1b' },
]

export type Product = {
  slug: string
  name: string
  short: string
  price: number
  category: Category
  photo: PhotoKey
  colours: string[]
  leadDays: number
  stock: number
  monogram: boolean
  added: string
  story: string
  details: string[]
  size: string
}

export const products: Product[] = [
  {
    slug: 'flap-pouch',
    name: 'Little flap pouch',
    short: 'For earbuds, a lip balm and a spare key',
    price: 48,
    category: 'pouches',
    photo: 'flapPouch',
    colours: ['tan', 'cream', 'tomato'],
    leadDays: 5,
    stock: 4,
    monogram: true,
    added: '2026-11-02',
    story: 'The first one I made was for my own earbuds, because the case kept getting lost at the bottom of my bag. It has a cream flap, a suede sun on the front and a loop so it clips onto anything.',
    details: ['Vegetable-tanned leather, 1.6 mm', 'Hand saddle-stitched with waxed linen', 'Brass stud closure and pull loop', 'Suede patch, stitched by hand'],
    size: '6 × 8.5 × 3.5 cm',
  },
  {
    slug: 'glasses-case',
    name: 'One-piece glasses case',
    short: 'Cut from a single piece, no lining, no glue',
    price: 64,
    category: 'cases',
    photo: 'glassesCase',
    colours: ['bottle', 'chestnut', 'charcoal'],
    leadDays: 7,
    stock: 2,
    monogram: true,
    added: '2026-10-18',
    story: 'One pattern piece, folded and stitched along a single seam. It took eleven paper drafts to get the curve of the flap right, and it still makes me happy every time it closes.',
    details: ['Single piece of 2 mm leather', 'One continuous saddle-stitched seam', 'Brass snap', 'Fits most sunglasses and readers'],
    size: '17 × 7 × 4 cm',
  },
  {
    slug: 'tracker-fob',
    name: 'Round tracker fob',
    short: 'A snug home for a coin-sized tracker',
    price: 26,
    category: 'small',
    photo: 'tagFob',
    colours: ['oxblood', 'tan', 'bottle'],
    leadDays: 3,
    stock: 9,
    monogram: true,
    added: '2026-09-30',
    story: 'Two stitched discs with a loop between them. The tracker slips in through a slot at the back, and the front is plain so it can take initials.',
    details: ['Two layers of 1.4 mm leather', 'Cream waxed thread', 'Solid brass split ring', 'Fits coin-sized trackers up to 32 mm'],
    size: '4.5 cm across',
  },
  {
    slug: 'card-wallet',
    name: 'Three-pocket card wallet',
    short: 'Six cards and a folded note, nothing more',
    price: 42,
    category: 'small',
    photo: 'cardWallet',
    colours: ['tan', 'chestnut', 'charcoal'],
    leadDays: 4,
    stock: 6,
    monogram: true,
    added: '2026-08-12',
    story: 'The thinnest wallet I could make that still holds a week of receipts. The pockets are staggered so every card shows its top edge.',
    details: ['Vegetable-tanned leather, 1.2 mm', 'White waxed thread', 'Burnished edges', 'Holds 6 to 8 cards'],
    size: '10.5 × 7.5 cm',
  },
  {
    slug: 'keyboard-sleeve',
    name: 'Keyboard sleeve',
    short: 'Felt-lined, for a compact wireless keyboard',
    price: 88,
    category: 'desk',
    photo: 'keyboardSleeve',
    colours: ['charcoal', 'tan'],
    leadDays: 10,
    stock: 1,
    monogram: false,
    added: '2026-10-28',
    story: 'I needed something for my keyboard and could not find it, so I made one. A wool felt lining keeps the keys clean and the striped pull tab makes it easy to slide out.',
    details: ['Charcoal leather body, tan end cap', 'Wool felt lining', 'Brass rivet and striped pull tab', 'Made to fit compact keyboards'],
    size: '29 × 12 cm',
  },
  {
    slug: 'coin-pouch',
    name: 'Scallop coin pouch',
    short: 'Bright red, with a scalloped flap',
    price: 38,
    category: 'pouches',
    photo: 'coinPouch',
    colours: ['tomato', 'mustard', 'bottle'],
    leadDays: 5,
    stock: 0,
    monogram: false,
    added: '2026-11-08',
    story: 'This one started as a joke about a tomato and ended up as my favourite thing on the bench. The scallops are punched one at a time.',
    details: ['Tomato red leather, 1.4 mm', 'Hand-punched scallop edge', 'Green hanging loop', 'Brass button'],
    size: '8 × 7 × 3 cm',
  },
  {
    slug: 'pen-roll',
    name: 'Pencil roll',
    short: 'Three pencils and a cord to tie it',
    price: 54,
    category: 'desk',
    photo: 'penRoll',
    colours: ['chestnut', 'tan'],
    leadDays: 6,
    stock: 3,
    monogram: true,
    added: '2026-07-21',
    story: 'For sketching on trains. Three stitched slots, a flap to stop the points poking out and a long cord that wraps twice.',
    details: ['Soft chestnut leather', 'Three stitched slots', 'Leather tie cord', 'Pencils not included'],
    size: '20 × 18 cm open',
  },
  {
    slug: 'notebook-cover',
    name: 'Pocket notebook cover',
    short: 'Refillable, for a pocket-size notebook',
    price: 46,
    category: 'desk',
    photo: 'notebookCover',
    colours: ['mustard', 'tan', 'bottle'],
    leadDays: 5,
    stock: 5,
    monogram: true,
    added: '2026-09-05',
    story: 'A wrap-around cover that softens the longer you carry it. The elastic keeps it shut and the notebook swaps out when it is full.',
    details: ['Mustard leather, 1.6 mm', 'Elastic band closure', 'Includes one plain notebook', 'Fits 9 × 14 cm notebooks'],
    size: '10 × 14.5 cm',
  },
  {
    slug: 'cable-wraps',
    name: 'Cable wraps, set of three',
    short: 'Tan, sage and cream, with brass snaps',
    price: 22,
    category: 'small',
    photo: 'cableWrap',
    colours: ['tan'],
    leadDays: 2,
    stock: 12,
    monogram: false,
    added: '2026-06-14',
    story: 'Made from the offcuts of everything else, so no two sets are quite the same. They keep a charger cable tidy in a bag.',
    details: ['Offcut leather, three colours', 'Brass snaps', 'Set of three', 'Colours vary a little'],
    size: '10 × 2 cm each',
  },
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
export const findLeather = (id: string) => leathers.find((l) => l.id === id) ?? leathers[0]

export const home = {
  title: ['Stitch', '& tan'],
  intro: [
    { t: 'This started as a fix. There were things I needed that nobody made, so I learned to work with leather and made them myself. Like a ' },
    { t: 'keyboard sleeve', to: '/shop/keyboard-sleeve' },
    { t: ', a ' },
    { t: 'one-piece glasses case', to: '/shop/glasses-case' },
    { t: ', a ' },
    { t: 'tomato-red coin pouch', to: '/shop/coin-pouch' },
    { t: '.' },
  ],
  intro2: 'Then my friend Nadia saw them on my desk and texted me to ask about something custom-made for her.',
  chat: {
    date: '9 Nov 2026',
    friend: 'Nadia',
    messages: [
      { from: 'them', text: 'ok those little bags on your desk are SO cute' },
      { from: 'them', text: 'could you make one for my film camera? something that clips onto my bag' },
      { from: 'me', text: 'Yes! Send me its size and pick a colour. Tan, cream or tomato red?' },
      { from: 'them', text: 'tomato. obviously' },
      { from: 'me', text: 'Three weeks. I will send you photos as it comes together.' },
    ] as { from: 'me' | 'them'; text: string }[],
    cta: 'Want one of your own?',
    ctaButton: 'Ask for something custom',
  },
  benchTitle: 'On the bench',
  benchBody: 'Everything is cut, stitched and burnished by hand, a few pieces at a time.',
  benchLink: 'See everything',
}

export const shop = {
  title: 'The shop',
  body: 'Each piece is made to order or in tiny batches. When something sells out, it comes back when I have made more.',
  search: 'Search the shop',
  sort: [
    { id: 'new', label: 'Newest first' },
    { id: 'low', label: 'Price, low to high' },
    { id: 'high', label: 'Price, high to low' },
  ],
  inStock: 'Ready to ship only',
  emptyTitle: 'Nothing like that yet',
  emptyBody: 'I might be able to make it though.',
  emptyCta: 'Ask for a custom piece',
  clear: 'Clear filters',
  count: (n: number) => `${n} ${n === 1 ? 'piece' : 'pieces'}`,
}

export const productPage = {
  back: 'Back to the shop',
  leather: 'Leather',
  photoNote: (name: string) => `Photo shows ${name}. Every hide is a little different.`,
  monogram: 'Initials',
  monogramHint: 'Up to 3 letters, stamped on the front. Free.',
  monogramError: 'Use up to 3 letters, A to Z.',
  quantity: 'Quantity',
  add: 'Add to bag',
  adding: 'Adding',
  added: 'Added',
  soldOut: 'Sold out',
  soldOutBody: 'This one is between batches. I can make one for you.',
  soldOutCta: 'Ask for one',
  lead: (d: number) => `Made and posted within ${d} working days`,
  stockLow: (n: number) => `Only ${n} left on the shelf`,
  stockOk: 'On the shelf, ready to stitch your initials',
  tabs: { details: 'Details', care: 'Care', shipping: 'Shipping' },
  care: [
    'Leather darkens and softens with use. That is the good part.',
    'Wipe with a dry cloth. For a deeper clean, a little beeswax balm once a year.',
    'Keep it away from radiators and long soaks.',
  ],
  shipping: [
    'Post is free over £80, otherwise £3.50.',
    'Worldwide delivery from £9.',
    'Every order goes out in a cotton bag with a note.',
  ],
  related: 'You might also like',
  size: 'Size',
  notFoundTitle: 'That piece has wandered off',
  notFoundBody: 'It may have sold out for good. Have a look at what is on the shelf now.',
}

export const custom = {
  title: 'Something custom',
  body: 'Tell me what you need it to hold and roughly how big it is. I reply to every request within two days with a sketch and a price.',
  steps: ['Tell me about it', 'I sketch and quote', 'I make it, you get photos'],
  fields: {
    kind: 'What should I make?',
    kinds: ['Pouch', 'Case or sleeve', 'Wallet', 'Strap or loop', 'Something else'],
    holds: 'What will it hold?',
    holdsHint: 'A film camera, a fountain pen, a harmonica…',
    size: 'Rough size (optional)',
    sizeHint: 'Width × height × depth, in cm',
    leather: 'Leather colour',
    thread: 'Thread colour',
    budget: 'Budget',
    budgets: ['£40–80', '£80–150', '£150+'],
    deadline: 'Needed by (optional)',
    deadlineHint: 'Custom pieces take about three weeks.',
    name: 'Your name',
    email: 'Email',
    notes: 'Anything else?',
    notesHint: 'Photos you like, a story, initials…',
  },
  submit: 'Send request',
  sending: 'Sending',
  draftSaved: 'Draft saved in this browser',
  errorSummary: 'A few things need a look before I can read this.',
  networkError: 'That did not send. Check your connection and try again.',
  successTitle: 'Got it, thank you!',
  successBody: (name: string) => `I will reply to ${name} within two days with a sketch and a price.`,
  another: 'Send another request',
  history: 'Your requests from this browser',
}

export const cart = {
  title: 'Your bag',
  empty: 'Your bag is empty',
  emptyBody: 'Little things are waiting on the shelf.',
  emptyCta: 'Browse the shop',
  subtotal: 'Subtotal',
  shipping: 'Shipping',
  freeShip: 80,
  freeShipLeft: (amt: string) => `${amt} away from free shipping`,
  freeShipDone: 'Free shipping unlocked',
  remove: 'Remove',
  removed: (name: string) => `Removed ${name}`,
  undo: 'Undo',
  checkout: 'Place order request',
  checkingOut: 'Placing',
  note: 'No payment is taken. I will email you a payment link once I have checked the leather is in stock.',
  emailLabel: 'Email for the payment link',
  successTitle: 'Order request sent',
  successBody: (ref: string) => `Reference ${ref}. I will email a payment link within a day.`,
  keepShopping: 'Keep looking',
  error: 'That did not go through. Try again in a moment.',
}

export const story = {
  title: 'The story',
  lead: 'Hi, I am Nadeem. I build software with AI by day and stitch leather at night, at a desk by the window of a spare room in Rahim Yar Khan.',
  paragraphs: [
    'It started with a keyboard. I wanted a sleeve for it that did not look like a laptop bag, and there was nothing. So I bought a piece of tan leather, a pair of needles and a book with very small diagrams.',
    'The first sleeve was crooked. The fifth one was good enough to use. Somewhere around the twentieth, friends started asking for their own, and Stitch & Tan began.',
    'Everything is still made by one person, by hand. I cut each piece with a knife, punch the holes with a stitching chisel and sew two needles through each hole, the slow way, because it is the stitch that lasts.',
  ],
  processTitle: 'How a piece is made',
  process: [
    { title: 'Pattern', body: 'A paper pattern first, then a card one, until the folds are right.' },
    { title: 'Cut', body: 'Cut by hand from vegetable-tanned hides from a local tannery.' },
    { title: 'Stitch', body: 'Saddle-stitched with waxed linen, two needles through every hole.' },
    { title: 'Finish', body: 'Edges sanded, dyed and burnished with beeswax until they shine.' },
  ],
  stats: [
    { value: '2', label: 'needles through every hole' },
    { value: '6 h', label: 'for one flap pouch' },
    { value: '1', label: 'person, one bench' },
  ],
  ctaTitle: 'Have an idea?',
  ctaBody: 'The best things I have made started as someone else’s idea.',
  ctaButton: 'Ask for something custom',
  shopButton: 'Visit the shop',
}

export const footer = {
  note: 'Small leather things, stitched by hand in Rahim Yar Khan.',
  links: [
    { to: '/shop', label: 'Shop' },
    { to: '/custom', label: 'Custom orders' },
    { to: '/story', label: 'Story' },
    { to: '/styleguide', label: 'Style guide' },
  ],
  copyright: '© 2026 Stitch & Tan',
}

export const notFound = {
  title: 'Lost a stitch',
  body: 'This page came unpicked. The shop is still where you left it.',
  home: 'Back home',
  shop: 'Visit the shop',
}
