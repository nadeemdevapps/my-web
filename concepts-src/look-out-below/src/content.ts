// Every string, image and piece of seed data on the site lives here.
// Swap the copy for your own game; the components only read from this file.

/** Every image is routed through this map. Replace the files in
 * public/images (or point these at your CDN) to use real key art. */
export const IMAGES = {
  heroPiano: `${import.meta.env.BASE_URL}images/hero-piano.webp`,
  keyArt: `${import.meta.env.BASE_URL}images/press-keyart.webp`,
  shotPlaza: `${import.meta.env.BASE_URL}images/press-shot-1.webp`,
  shotStreet: `${import.meta.env.BASE_URL}images/press-shot-2.webp`,
  devlogSketchbook: `${import.meta.env.BASE_URL}images/devlog-sketchbook.webp`,
  devlogDuck: `${import.meta.env.BASE_URL}images/devlog-duck.webp`,
  devlogCrowd: `${import.meta.env.BASE_URL}images/devlog-crowd.webp`,
} as const

export const brand = {
  name: 'Look Out Below',
  studio: 'Nadeem Dev Apps',
  tagline: 'You are very small, fairly quick, and standing directly underneath a clumsy sky.',
  short: 'A tiny hand-drawn game about dodging whatever falls next.',
  releaseLine: 'Out next spring on desktop and in your browser',
  footerCredit: 'Drawn by hand at Nadeem Dev Apps',
  footerFont: 'The title font is Londrina Solid',
}

export const nav = [
  { to: '/play', label: 'Play' },
  { to: '/tutorial', label: 'Tutorial' },
  { to: '/characters', label: 'Characters' },
  { to: '/devlog', label: 'Devlog' },
  { to: '/press', label: 'Press kit' },
] as const

export const footerLinks = [
  { to: '/play', label: 'Play the demo' },
  { to: '/tutorial', label: 'How to play' },
  { to: '/characters', label: 'Characters' },
  { to: '/devlog', label: 'Devlog' },
  { to: '/press', label: 'Press kit' },
  { to: '/styleguide', label: 'Style guide' },
] as const

/** Words the crowd mutters on the home screen. */
export const crowdChatter = ['uh oh', 'hm?', 'is it raining', 'duck!', 'not again', 'piano?']

export const home = {
  start: 'Start',
  tutorial: 'Tutorial',
  bestLabel: 'Your best',
  features: [
    {
      title: 'Watch the shadows',
      body: 'Everything that falls casts a shadow first. The bigger the shadow, the sooner it lands. Step out of it.',
    },
    {
      title: 'One finger, two arrows',
      body: 'Left and right. That is the whole control scheme. It still gets very busy around minute two.',
    },
    {
      title: 'Forty tiny people',
      body: 'Every run you meet someone new. Some carry umbrellas, one carries a ladder. Nobody knows why.',
    },
  ],
  galleryTitle: 'Meet the crowd',
  galleryBody: 'Survive longer to coax more of them out of the crowd. Each one has a hat, a habit and a strong opinion about pianos.',
  galleryCta: 'All characters',
  devlogTitle: 'From the devlog',
  devlogCta: 'Read the devlog',
  wishlistTitle: 'Keep an eye on the sky',
  wishlistBody: 'The full game has six neighbourhoods, a weather forecast that lies, and a pigeon. Until then, there is the demo.',
}

export type FallerKind = 'teacup' | 'pot' | 'anvil' | 'piano' | 'coin'

export const fallers: Array<{ kind: FallerKind; name: string; note: string; points: string }> = [
  { kind: 'teacup', name: 'Teacup', note: 'Small and quick. Usually comes in sets.', points: '+1 dodged' },
  { kind: 'pot', name: 'Flower pot', note: 'Medium shadow. Someone upstairs is very careless.', points: '+1 dodged' },
  { kind: 'anvil', name: 'Anvil', note: 'Drops fast. You will hear it before you see it.', points: '+2 dodged' },
  { kind: 'piano', name: 'Piano', note: 'Huge shadow, slow fall. Run sideways, not forwards.', points: '+3 dodged' },
  { kind: 'coin', name: 'Lucky button', note: 'Catch it. Buttons are currency down here.', points: '+10 caught' },
]

export const play = {
  title: 'Play',
  intro: 'Dodge what falls, catch the lucky buttons, keep all three hats on.',
  controlsKeys: 'Arrow keys or A and D to move. Space or P to pause.',
  controlsTouch: 'Drag on the square, or hold the arrow buttons.',
  ready: 'Ready when you are',
  readyBody: 'The sky is already wobbling.',
  start: 'Start run',
  resume: 'Resume',
  restart: 'Restart',
  paused: 'Paused',
  pausedBody: 'The sky is holding its breath.',
  over: 'Bonk.',
  overBody: (score: number, best: number, isBest: boolean) =>
    isBest ? `New best: ${score}. The crowd is quietly impressed.` : `You scored ${score}. Your best is ${best}.`,
  again: 'Play again',
  history: 'Recent runs',
  historyEmpty: 'No runs yet. Your scores stay in this browser.',
  clear: 'Clear scores',
  cleared: 'Scores cleared',
  playingAs: 'Playing as',
  change: 'Change',
  score: 'Score',
  best: 'Best',
  hats: 'Hats',
  left: 'Move left',
  right: 'Move right',
  pause: 'Pause',
}

export const tutorial = {
  title: 'How to play',
  intro: 'Four things to know before the sky starts dropping things on you.',
  steps: [
    {
      title: 'Find yourself',
      body: 'You are the one with the little arrow over your head. Everyone else is just passing through.',
      tip: 'Arrow keys, A and D, or drag on the square.',
      scene: 'you',
    },
    {
      title: 'Watch for shadows',
      body: 'A grey oval appears before anything lands. It grows as the thing gets closer. When it stops growing, it is too late.',
      tip: 'Bigger shadow, bigger thing.',
      scene: 'shadow',
    },
    {
      title: 'Catch lucky buttons',
      body: 'Buttons twinkle on the way down. Stand under one to catch it for ten points. They are worth the risk, mostly.',
      tip: 'Buttons never hurt.',
      scene: 'coin',
    },
    {
      title: 'Keep your hats',
      body: 'You start with three hats. Each bonk knocks one off. Lose all three and the run ends. Score more to unlock new characters.',
      tip: 'Your scores stay in this browser.',
      scene: 'hats',
    },
  ],
  next: 'Next',
  back: 'Back',
  finish: 'Try it now',
  stepLabel: (i: number, n: number) => `Step ${i} of ${n}`,
  whatFalls: 'What falls',
}

export type Hat = 'none' | 'beanie' | 'top' | 'cap' | 'bucket' | 'bow'
export type Accessory = 'none' | 'scarf' | 'umbrella' | 'bag' | 'glasses' | 'ladder'
export type Tint = 'paper' | 'ink' | 'smudge' | 'butter'

export type Character = {
  id: string
  name: string
  role: string
  bio: string
  habit: string
  says: string
  unlockAt: number
  hat: Hat
  accessory: Accessory
  tint: Tint
  speed: number
  group: 'starter' | 'regular' | 'rare'
}

export const characters: Character[] = [
  { id: 'pip', name: 'Pip', role: 'The new one', bio: 'Arrived this morning. Has not yet looked up. Will learn.', habit: 'Waves at falling objects.', says: 'hello?', unlockAt: 0, hat: 'none', accessory: 'none', tint: 'paper', speed: 3, group: 'starter' },
  { id: 'dot', name: 'Dot', role: 'Very punctual', bio: 'Always on time, which is unfortunate when the piano is also on time.', habit: 'Checks a watch that is not there.', says: 'right on cue', unlockAt: 0, hat: 'beanie', accessory: 'scarf', tint: 'smudge', speed: 3, group: 'starter' },
  { id: 'mo', name: 'Mo', role: 'Umbrella optimist', bio: 'Believes an umbrella stops anything. It does not stop anvils.', habit: 'Opens the umbrella indoors.', says: 'I came prepared', unlockAt: 15, hat: 'none', accessory: 'umbrella', tint: 'paper', speed: 2, group: 'regular' },
  { id: 'bea', name: 'Bea', role: 'Bucket collector', bio: 'Carries a bucket for catching buttons. Has caught one teacup by mistake.', habit: 'Counts buttons out loud.', says: 'forty-one', unlockAt: 30, hat: 'bucket', accessory: 'bag', tint: 'smudge', speed: 3, group: 'regular' },
  { id: 'otto', name: 'Otto', role: 'Retired piano mover', bio: 'Moved pianos for thirty years. Now they move toward him.', habit: 'Hums scales while dodging.', says: 'mind the lid', unlockAt: 50, hat: 'cap', accessory: 'none', tint: 'ink', speed: 2, group: 'regular' },
  { id: 'juno', name: 'Juno', role: 'Fashionably late', bio: 'Shows up exactly one second after everything lands. A survival strategy.', habit: 'Never runs. Strolls.', says: 'did I miss it', unlockAt: 80, hat: 'top', accessory: 'glasses', tint: 'paper', speed: 4, group: 'rare' },
  { id: 'fig', name: 'Fig', role: 'Ladder enthusiast', bio: 'Nobody knows where the ladder came from or where Fig is taking it.', habit: 'Apologises to the ladder.', says: 'coming through', unlockAt: 120, hat: 'beanie', accessory: 'ladder', tint: 'smudge', speed: 2, group: 'rare' },
  { id: 'sunny', name: 'Sunny', role: 'The lucky one', bio: 'Has never been bonked. Probably. Wears yellow so the sky can see them.', habit: 'Smiles at shadows.', says: 'lovely weather', unlockAt: 200, hat: 'bow', accessory: 'none', tint: 'butter', speed: 4, group: 'rare' },
]

export const charactersPage = {
  title: 'Characters',
  intro: 'Eight small people, one big sky. New characters step out of the crowd as your best score climbs.',
  filters: [
    { id: 'all', label: 'Everyone' },
    { id: 'unlocked', label: 'Unlocked' },
    { id: 'locked', label: 'Still shy' },
  ],
  empty: 'Nobody here yet. Play a run to coax someone out of the crowd.',
  emptyCta: 'Play a run',
  lockedLabel: (n: number) => `Best score ${n} to unlock`,
  select: 'Play as this character',
  selected: 'Selected',
  habit: 'Habit',
  speed: 'Speed',
  unlocked: 'Unlocked',
}

export type DevlogPost = {
  slug: string
  title: string
  date: string
  tag: 'Art' | 'Design' | 'Tech' | 'News'
  image: keyof typeof IMAGES
  excerpt: string
  body: Array<{ h?: string; p?: string; list?: string[] }>
}

export const devlog: { title: string; intro: string; all: string; empty: string; back: string; readMore: string; posts: DevlogPost[] } = {
  title: 'Devlog',
  intro: 'Notes from a very small studio making a very small game about very large falling things.',
  all: 'All posts',
  empty: 'No posts with that tag yet.',
  back: 'All posts',
  readMore: 'Read post',
  posts: [
    {
      slug: 'shadows-first',
      title: 'Why everything casts a shadow first',
      date: '2026-10-28',
      tag: 'Design',
      image: 'devlogDuck',
      excerpt: 'Our first playtest had no warning at all. Nine out of ten players called it unfair.',
      body: [
        { p: 'The very first build of Look Out Below dropped objects straight onto the street. You could see them coming if you watched the top of the screen, but nobody watches the top of the screen. Players watch their feet.' },
        { h: 'Shadows are the warning' },
        { p: 'So the warning moved to where people were already looking. Every object now casts a grey oval on the ground a little under a second before it lands. The oval grows as the object falls, so the size tells you two things at once: how big it is and how soon it arrives.' },
        { list: ['Teacups get a small, quick shadow.', 'Pianos get a huge, slow one that you can walk out of if you go sideways.', 'Anvils cheat: their shadow appears late and grows fast.'] },
        { p: 'Complaints about fairness went from nine in ten to roughly zero. Complaints about anvils went up. That feels right.' },
      ],
    },
    {
      slug: 'drawing-forty-people',
      title: 'Drawing forty tiny people by hand',
      date: '2026-10-09',
      tag: 'Art',
      image: 'devlogSketchbook',
      excerpt: 'Every character starts as a circle and a bean. The trick is the hats.',
      body: [
        { p: 'Characters in Look Out Below are about twenty pixels tall on a laptop. At that size a face is a waste of ink, so the personality lives in silhouettes: a hat, a bag, a ladder, a lean.' },
        { h: 'The boil' },
        { p: 'Line art redraws itself three times a second with a slightly different wobble. Animators call this boiling. It makes a still crowd feel alive without anyone moving. If your system asks for reduced motion, the boil switches off and the lines hold still.' },
        { p: 'We kept the palette to paper, ink and two greys, plus one yellow person in every crowd. Find them.' },
      ],
    },
    {
      slug: 'browser-demo',
      title: 'The demo now runs in your browser',
      date: '2026-09-17',
      tag: 'News',
      image: 'devlogCrowd',
      excerpt: 'No download, no account. Scores stay on your device.',
      body: [
        { p: 'The demo on this site is the real game loop, trimmed to one street. It runs on a single canvas, works with a keyboard or a thumb, and keeps your best score in your browser so you can come back to it.' },
        { h: 'What is in it' },
        { list: ['One street and five falling things.', 'Eight characters to unlock.', 'Pause any time with Space, P or Escape.'] },
        { p: 'Tell us what you think. Especially if you beat 200.' },
      ],
    },
    {
      slug: 'sixty-frames-of-panic',
      title: 'Sixty frames of panic',
      date: '2026-08-30',
      tag: 'Tech',
      image: 'shotPlaza',
      excerpt: 'How a canvas, a fixed timestep and a lot of grey ovals keep the game fair on slow laptops.',
      body: [
        { p: 'Fairness in a dodging game depends on time, not frames. A slow laptop should get the same warning as a fast one. So the game updates in fixed steps and only draws as often as the screen allows.' },
        { h: 'Small numbers' },
        { p: 'The whole game state is a list of objects with a position, a speed and a shadow. When a tab is hidden the loop pauses itself, so you never come back to a run that ended without you.' },
      ],
    },
  ],
}

export const press = {
  title: 'Press kit',
  intro: 'Everything you need to write about Look Out Below. Use any of it, no need to ask.',
  factsTitle: 'Fact sheet',
  facts: [
    { k: 'Developer', v: 'Nadeem Dev Apps' },
    { k: 'Based in', v: 'A flat with a very low ceiling' },
    { k: 'Release', v: 'Next spring' },
    { k: 'Platforms', v: 'Windows, macOS, browser' },
    { k: 'Price', v: 'To be announced' },
    { k: 'Players', v: 'Single player' },
  ],
  descriptionTitle: 'Description',
  description: [
    'Look Out Below is a small, hand-drawn game about standing in a town square while the sky drops things on you. Teacups, flower pots, anvils, the occasional piano. Every object casts a shadow before it lands; your job is to not be inside it.',
    'Runs last a minute or two. Scores climb, the sky gets clumsier, and forty tiny people with strong opinions slowly come out of the crowd to join you.',
  ],
  featuresTitle: 'Features',
  features: [
    'Two-button controls that work on a keyboard or a phone',
    'Shadows that warn you how big and how soon',
    'Eight characters to unlock, each with a hat and a habit',
    'Hand-drawn line art that gently redraws itself',
    'Scores that stay on your device, no account needed',
  ],
  mediaTitle: 'Images',
  mediaNote: 'Sketch-style key art and screenshots. Right-click to save, or use the download link.',
  media: [
    { image: 'keyArt' as const, title: 'Key art', alt: 'Tiny doodle people in a town square looking up at a teacup, an anvil and a flower pot falling from the sky.' },
    { image: 'shotPlaza' as const, title: 'The plaza', alt: 'Doodle people scattering across a plaza as a piano falls toward a big grey shadow.' },
    { image: 'shotStreet' as const, title: 'Rainy street', alt: 'A pencil-drawn street where tiny people hold umbrellas under falling teacups.' },
  ],
  download: 'Download',
  logoTitle: 'Logo',
  logoNote: 'The wordmark on paper and on ink. Leave the eyes looking up.',
  quotesTitle: 'Quotes',
  quotesNote: 'Add press quotes here once coverage lands. These are placeholders.',
  quotes: [
    { quote: 'Your first pull quote goes here.', source: 'Outlet name' },
    { quote: 'A second, shorter one goes here.', source: 'Another outlet' },
  ],
  requestTitle: 'Request a key',
  requestBody: 'Writers, streamers and festivals can get an early build. We answer every request by hand.',
  form: {
    name: 'Your name',
    email: 'Email',
    outlet: 'Outlet or channel',
    outletHint: 'A site, a channel or a festival name.',
    kind: 'You are',
    kinds: [
      { id: 'press', label: 'Press' },
      { id: 'creator', label: 'Creator' },
      { id: 'festival', label: 'Festival' },
      { id: 'other', label: 'Other' },
    ],
    message: 'Anything else (optional)',
    submit: 'Send request',
    sending: 'Sending',
    success: (ref: string) => `Request sent. Your reference is ${ref}. We will write back within a week.`,
    another: 'Send another',
    networkError: 'Could not reach the server. Check your connection and try again.',
  },
  contactTitle: 'Contact',
  contact: [
    { k: 'Press', v: 'press@example.com' },
    { k: 'Business', v: 'hello@example.com' },
  ],
}

export const notFound = {
  title: 'Nothing landed here',
  body: 'This page fell somewhere else. Probably on a pigeon.',
  home: 'Back to the square',
  play: 'Play instead',
}
