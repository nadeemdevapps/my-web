// Every string, link and piece of seed data on the site. Prices and product
// options live in src/shared/catalog.ts because the Worker reprices orders.

import type { BodyColourId } from './shared/catalog'

export const SITE = {
  name: 'Tally Bar',
  company: 'Nadeem Dev Apps',
  tagline: 'A desk status display with an LED pixel screen and a focus timer',
  email: 'help@nadeemdevapps.example',
  cloud: { title: 'Nadeem Cloud', body: 'Sign in to Nadeem Cloud to control your display over HTTP and MQTT' },
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/apps', label: 'Apps' },
  { to: '/specs', label: 'Specs' },
  { to: '/support', label: 'Support' },
] as const

export const STORAGE_KEYS = {
  cart: 'tally.cart.v1',
  orders: 'tally.orders.v1',
  apps: 'tally.apps.v1',
  device: 'tally.device.v1',
  draft: 'tally.configurator.v1',
}

export const HERO = {
  lead: 'Tally Bar',
  body: ' is a focus tool for your desk with an LED pixel screen. Shows the room your status. Built-in focus timer and apps. Open firmware, an open API and no account needed.',
  cta: 'Buy',
  hint: 'Press the top button to start a focus session. Turn the dial for a longer one.',
  defaultMessage: 'FOCUS',
}

export const FEATURES = [
  { icon: 'timer', title: 'Focus tool', body: 'Focus timer, a status message the room can read, and session stats' },
  { icon: 'apps', title: 'Apps and integrations', body: 'An app library, calendar busy status and call detection' },
  { icon: 'gears', title: 'Built for tinkerers', body: 'Local HTTP API, MQTT, open firmware and SDKs for Python, Go and JavaScript' },
] as const

export const HOME = {
  message: {
    eyebrow: 'Your words, in light',
    title: 'Say it once. The room reads it all day.',
    body: 'Type a message and pick an LED colour. Long messages scroll; short ones sit still and stay readable from across the room.',
    placeholder: 'Type a message',
    cta: 'Order with this message',
    presets: ['ON A CALL', 'DEEP WORK', 'BACK IN 5', 'ASK ME!', 'RECORDING'],
  },
  timer: {
    eyebrow: 'Focus timer',
    title: 'A timer you press, not a tab you lose.',
    body: 'Press the plate to start. Turn the dial to set the length. When the session ends the display softly pulses and your status flips back to free.',
    presets: [15, 25, 50],
    steps: [
      { title: 'Press', body: 'The top plate starts and pauses a session.' },
      { title: 'Turn', body: 'The dial sets 5 to 90 minutes in five-minute clicks.' },
      { title: 'Flip', body: 'The side switch toggles between status and timer.' },
    ],
  },
  apps: { eyebrow: 'App library', title: 'More than a sign', body: 'Install apps from your phone or the local web panel. Each one runs on the device, so it works without our cloud.', cta: 'Browse all apps' },
  dev: {
    eyebrow: 'For developers',
    title: 'One HTTP call away.',
    body: 'Every Tally Bar serves a documented API on your local network and speaks MQTT. Script it from a build server, a shell alias or a smart-home hub.',
    cta: 'See the API',
  },
  specs: { eyebrow: 'Hardware', title: 'Small, solid and quiet', cta: 'Full specifications' },
}

export const CODE_SAMPLE = `curl -X POST http://tally.local/api/display \\
  -H "Content-Type: application/json" \\
  -d '{"text": "ON A CALL", "color": "#ff3b30"}'`

export const MQTT_SAMPLE = `mosquitto_pub -h tally.local \\
  -t tally/display/text -m "DEPLOYING"`

export const KEY_SPECS = [
  { label: 'Display', value: '72 × 16 RGB LEDs' },
  { label: 'Size', value: '196 × 58 × 44 mm' },
  { label: 'Weight', value: '310 g' },
  { label: 'Connection', value: 'Wi-Fi 6, Ethernet, USB-C' },
]

export const SPEC_GROUPS = [
  {
    title: 'Display',
    rows: [
      ['Matrix', '72 × 16 individually addressable RGB LEDs'],
      ['Pitch', '2.5 mm, behind a smoked anti-glare window'],
      ['Brightness', '0 to 800 nits, ambient light sensor'],
      ['Refresh', '240 Hz, no flicker on camera'],
      ['Fonts', 'Pixel 5 × 7 and 3 × 5 built in, custom bitmaps over the API'],
    ],
  },
  {
    title: 'Controls',
    rows: [
      ['Top plate', 'Full-width push button, start and pause'],
      ['Dial', 'Knurled aluminium encoder with 24 detents and push'],
      ['Side switch', 'Status, timer and apps'],
      ['Accent button', 'Programmable, defaults to "do not disturb"'],
    ],
  },
  {
    title: 'Connectivity',
    rows: [
      ['Wireless', 'Wi-Fi 6 (2.4 and 5 GHz), Bluetooth LE 5.3'],
      ['Wired', '10/100 Ethernet, USB-C for power and data'],
      ['Protocols', 'Local HTTP API, MQTT 5, WebSocket events'],
      ['Updates', 'Signed over-the-air firmware, rollback on failure'],
    ],
  },
  {
    title: 'Physical',
    rows: [
      ['Dimensions', '196 × 58 × 44 mm'],
      ['Weight', '310 g'],
      ['Body', 'Recycled polycarbonate, aluminium dial'],
      ['Power', '5 V 1 A over USB-C, about 1.2 W typical'],
      ['In the box', 'Tally Bar, 1.5 m braided USB-C cable, quick start card'],
    ],
  },
  {
    title: 'Software',
    rows: [
      ['Firmware', 'Open source, MIT licence'],
      ['SDKs', 'Python, Go and JavaScript'],
      ['Setup', 'From any browser at tally.local, no account required'],
      ['Privacy', 'No microphone, no camera, no analytics by default'],
    ],
  },
] as const

export const SPEC_CALLOUTS = [
  { title: 'Readable across the room', body: 'Letters are 35 mm tall on the default font, sharp at six metres.' },
  { title: 'Silent', body: 'No fan, no speaker hiss. The timer chime is optional and soft.' },
  { title: 'Repairable', body: 'Four screws open the body. Every part is sold separately.' },
]

export type AppCategory = 'Focus' | 'Status' | 'Calendar' | 'Data' | 'Fun' | 'Developer'

export type AppItem = {
  id: string
  name: string
  category: AppCategory
  description: string
  preview: string
  author: string
  installs: number
  needsCloud?: boolean
}

export const APP_CATEGORIES: AppCategory[] = ['Focus', 'Status', 'Calendar', 'Data', 'Fun', 'Developer']

export const APPS: AppItem[] = [
  { id: 'focus', name: 'Focus timer', category: 'Focus', description: 'Interval timer with breaks, daily goals and a gentle end pulse.', preview: '25:00', author: 'Nadeem Dev Apps', installs: 48210 },
  { id: 'status', name: 'Status message', category: 'Status', description: 'Your message on the display, scrolling when it is long.', preview: 'FOCUS', author: 'Nadeem Dev Apps', installs: 51034 },
  { id: 'calendar', name: 'Calendar busy', category: 'Calendar', description: 'Reads an iCal link and shows BUSY during events, with the end time.', preview: 'BUSY', author: 'Nadeem Dev Apps', installs: 30112, needsCloud: true },
  { id: 'calls', name: 'Call detect', category: 'Status', description: 'A small desktop helper turns the display red while your camera or microphone is on.', preview: 'ON AIR', author: 'Nadeem Dev Apps', installs: 27645 },
  { id: 'clock', name: 'Pixel clock', category: 'Data', description: 'Time and date in four pixel faces, 12 or 24 hour.', preview: '09:41', author: 'Nadeem Dev Apps', installs: 22410 },
  { id: 'weather', name: 'Weather', category: 'Data', description: 'Temperature and a tiny animated icon for your city.', preview: '18C', author: 'Nadeem Dev Apps', installs: 15228, needsCloud: true },
  { id: 'build', name: 'Build status', category: 'Developer', description: 'Green or red from any CI webhook, with the branch name.', preview: 'PASS', author: 'Nadeem Dev Apps', installs: 9310 },
  { id: 'counter', name: 'Counter', category: 'Data', description: 'Count anything with the dial: cups, reps, sales or days since.', preview: '128', author: 'Nadeem Dev Apps', installs: 7120 },
  { id: 'queue', name: 'Office queue', category: 'Status', description: 'Shows the next number for a desk or a help queue.', preview: 'NEXT 12', author: 'Nadeem Dev Apps', installs: 3880 },
  { id: 'life', name: 'Game of life', category: 'Fun', description: 'Conway on 1152 pixels. Turn the dial to reseed.', preview: 'LIFE', author: 'Nadeem Dev Apps', installs: 11904 },
  { id: 'snake', name: 'Snake', category: 'Fun', description: 'The classic, steered with the dial and the top plate.', preview: 'SNAKE', author: 'Nadeem Dev Apps', installs: 13440 },
  { id: 'stocks', name: 'Ticker', category: 'Data', description: 'Your own list of numbers from a JSON URL, scrolled.', preview: '+2.4%', author: 'Nadeem Dev Apps', installs: 6120 },
  { id: 'deploy', name: 'Deploy light', category: 'Developer', description: 'Flashes during deploys from an MQTT topic you choose.', preview: 'DEPLOY', author: 'Nadeem Dev Apps', installs: 4210 },
  { id: 'standup', name: 'Standup timer', category: 'Calendar', description: 'Two minutes per person, with a nudge when time is up.', preview: '2:00', author: 'Nadeem Dev Apps', installs: 5532 },
]

export const DEFAULT_INSTALLED = ['focus', 'status', 'clock']

export const API_ENDPOINTS = [
  { method: 'POST', path: '/api/display', body: 'Show text or a bitmap, with colour and scroll speed' },
  { method: 'GET', path: '/api/state', body: 'Current app, message, timer and brightness' },
  { method: 'POST', path: '/api/timer', body: 'Start, pause or reset the focus timer' },
  { method: 'PUT', path: '/api/apps/:id', body: 'Install, configure or remove an app' },
  { method: 'WS', path: '/api/events', body: 'Button presses, dial turns and timer events' },
] as const

export type FaqItem = { q: string; a: string }
export const FAQ_GROUPS: { title: string; items: FaqItem[] }[] = [
  {
    title: 'Setup',
    items: [
      { q: 'How do I set up a new Tally Bar?', a: 'Plug it in with the USB-C cable. It shows a short code and opens a setup network; join it from your phone or laptop and pick your Wi-Fi. After that, open tally.local in any browser on the same network.' },
      { q: 'Do I need an account?', a: 'No. Everything works on your local network without an account. A free Nadeem Cloud account only adds remote control from outside your network and the two apps that need an internet service (Calendar busy and Weather).' },
      { q: 'Does it work on office Wi-Fi with a captive portal?', a: 'Captive portals cannot be completed from the device. Use the Ethernet port, a guest network without a portal, or ask your IT team to add the device by its MAC address, which is printed on the base.' },
    ],
  },
  {
    title: 'Using it',
    items: [
      { q: 'How bright is the display at night?', a: 'An ambient light sensor dims it automatically down to a faint glow. You can also set quiet hours, when the display turns off unless a session is running.' },
      { q: 'Can I set the timer length?', a: 'Turn the dial while the timer is stopped: each click is five minutes, from 5 to 90. Push the dial to switch between work and break lengths.' },
      { q: 'Which characters can the display show?', a: 'The built-in font has capital letters, digits and common punctuation. Lowercase letters are shown as capitals. Custom bitmaps and fonts can be sent over the API.' },
    ],
  },
  {
    title: 'Orders and shipping',
    items: [
      { q: 'When will my order ship?', a: 'Orders placed before 2 pm ship the same working day. Standard delivery takes 4 to 6 working days and is free over $199; Express takes 1 to 2.' },
      { q: 'Can I return it?', a: 'Yes, within 30 days in any condition, for a full refund. We email a prepaid label; custom engraved messages do not affect returns.' },
      { q: 'What does the warranty cover?', a: 'Two years against defects in materials and workmanship. The optional care plan extends this to three years and adds one accidental damage repair.' },
    ],
  },
  {
    title: 'Developers',
    items: [
      { q: 'Is the firmware really open source?', a: 'Yes, under the MIT licence, including the bootloader. Signed builds are what we ship, and you can flash your own; a long press of the dial at power-on restores the stock firmware.' },
      { q: 'How do I reach the API?', a: 'The device serves HTTP on port 80 at tally.local, and MQTT on port 1883. An optional API token can be required from the local web panel.' },
    ],
  },
]

export const SUPPORT = {
  title: 'Support',
  intro: 'Answers to common questions, and a form that reaches a person.',
  searchPlaceholder: 'Search questions',
  contact: { title: 'Still stuck?', body: 'Send us a note. A person on the team replies within one working day.' },
  channels: [
    { title: 'Setup guide', body: 'Wi-Fi, Ethernet and first steps, in five minutes.', to: '/support#setup' },
    { title: 'Developer API', body: 'Endpoints, MQTT topics and code samples.', to: '/apps#developers' },
    { title: 'Order status', body: 'Your recent orders on this device.', to: '/cart' },
  ],
}

export const FOOTER = {
  blurb: 'Nadeem Dev Apps makes small, open hardware for calmer desks.',
  columns: [
    { title: 'Product', links: [{ to: '/shop', label: 'Shop' }, { to: '/specs', label: 'Specs' }, { to: '/apps', label: 'Apps' }] },
    { title: 'Help', links: [{ to: '/support', label: 'Support' }, { to: '/apps#developers', label: 'Developer API' }, { to: '/cart', label: 'Cart' }] },
    { title: 'Company', links: [{ to: '/styleguide', label: 'Style guide' }, { to: '/support#contact', label: 'Contact' }] },
  ],
  legal: '© 2026 Nadeem Dev Apps. Demo store: no payment is taken.',
}

/** Where the LED screen sits in each photo, in percent of the image box. */
export type ScreenRect = { left: number; top: number; width: number; height: number }
export type Photo = { src: string; alt: string; screen?: ScreenRect; width: number; height: number }

/**
 * Every image on the site. Swap `src` for your own photography; if the new
 * shot shows the display, update `screen` so the live LED text lines up
 * (or delete it to show the photo as is).
 */
export const PHOTOS = {
  hero: { src: `${import.meta.env.BASE_URL}images/hero.webp`, alt: 'Tally Bar on a pale desk beside a keyboard and a pair of glasses', width: 1536, height: 1024, screen: { left: 24.15, top: 28.32, width: 51.89, height: 15.33 } },
  desk: { src: `${import.meta.env.BASE_URL}images/desk.webp`, alt: 'Tally Bar on a wooden desk under a monitor, beside a mug of coffee', width: 1536, height: 1024, screen: { left: 26.24, top: 45.21, width: 47.4, height: 14.36 } },
  dial: { src: `${import.meta.env.BASE_URL}images/dial.webp`, alt: 'Close-up of the knurled aluminium dial with its orange ring', width: 1024, height: 1024 },
  back: { src: `${import.meta.env.BASE_URL}images/back.webp`, alt: 'The back of Tally Bar with USB-C, Ethernet and a reset hole', width: 1536, height: 1024 },
  front: {
    chalk: { src: `${import.meta.env.BASE_URL}images/front-white.webp`, alt: 'Tally Bar in Chalk, front view', width: 1536, height: 1024, screen: { left: 6.84, top: 38.38, width: 86.26, height: 28.32 } },
    graphite: { src: `${import.meta.env.BASE_URL}images/front-graphite.webp`, alt: 'Tally Bar in Graphite, front view', width: 1536, height: 1024, screen: { left: 9.9, top: 35.35, width: 80.27, height: 31.15 } },
    sage: { src: `${import.meta.env.BASE_URL}images/front-sage.webp`, alt: 'Tally Bar in Sage, front view', width: 1536, height: 1024, screen: { left: 8.66, top: 37.89, width: 82.62, height: 28.42 } },
  } satisfies Record<BodyColourId, Photo>,
} satisfies Record<string, Photo | Record<string, Photo>>

/** Hotspots on the hero photo for the device's own controls, in percent. */
export const HERO_CONTROLS = {
  plate: { left: 38, top: 15, width: 23, height: 11.5 },
  dial: { left: 64.2, top: 16.2, width: 7.4, height: 10.4 },
  accent: { left: 72.2, top: 23.8, width: 3.4, height: 4.4 },
}

export const NOT_FOUND = { title: 'Nothing on this screen', body: 'That page does not exist, or it moved. The display is still yours to play with.' }
