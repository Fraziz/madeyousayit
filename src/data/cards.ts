import type { GameCard, CardCategory } from '../types';

export interface CategoryInfo {
  name: string;
  count: number;
  color: string;
  accent: string;
  tagline: string;
  rule: string;
  officialCardImage?: string;
}

export const SIGNATURE_BLUE = '#5170FF';

export const CARD_CATEGORIES_INFO: Record<CardCategory, CategoryInfo> = {
  GUESS: {
    name: 'GUESS',
    count: 2,
    color: '#006826',
    accent: '#fde047',
    tagline: 'READ THE ROOM AND GUESS OUT LOUD.',
    rule: 'Everyone guesses your answer. Complete it to earn your points.',
    officialCardImage: '/cards/2.png',
  },
  CREATE: {
    name: 'CREATE',
    count: 2,
    color: '#5ce1e6',
    accent: '#fde047',
    tagline: 'BE SILLY AND MAKE SOMETHING UP ON THE SPOT.',
    rule: 'Do what the card asks. Complete it to earn your points.',
    officialCardImage: '/cards/65.png',
  },
  BATTLE: {
    name: 'BATTLE',
    count: 2,
    color: '#ff3131',
    accent: '#fde047',
    tagline: '1-ON-1 SHOWDOWN WITH A FRIEND.',
    rule: 'Pick one player to battle. The group picks the winner.',
    officialCardImage: '/cards/28.png',
  },
  CHAOS: {
    name: 'CHAOS',
    count: 2,
    color: '#5e17eb',
    accent: '#fde047',
    tagline: 'WILD PARTY TWISTS AND SURPRISES.',
    rule: 'Follow the crazy challenge. Complete it to earn your points.',
    officialCardImage: '/cards/52.png',
  },
  TOGETHER: {
    name: 'TOGETHER',
    count: 2,
    color: '#ff751f',
    accent: '#fde047',
    tagline: 'CHALLENGES FOR EVERYONE AT THE TABLE.',
    rule: 'Everyone plays together. If you all do it, points go to the Team Pile!',
    officialCardImage: '/cards/17.png',
  },
  CONNECT: {
    name: 'CONNECT',
    count: 2,
    color: '#004aad',
    accent: '#fde047',
    tagline: 'REAL STORIES AND REAL HONESTY.',
    rule: 'Answer the question honestly. Complete it to earn your points.',
    officialCardImage: '/cards/21.png',
  },
  LOVE: {
    name: 'LOVE',
    count: 2,
    color: '#ff66c4',
    accent: '#fde047',
    tagline: 'SHARE SWEET WORDS AND APPRECIATION.',
    rule: 'Say something kind or sweet. Complete it to earn your points.',
    officialCardImage: '/cards/59.png',
  },
};

/**
 * CURATED PLAYTEST SAMPLER (14 CARDS ONLY)
 * Protects game IP by only including a controlled sample (2 per category).
 * The full 75-card deck is kept private.
 */
const PLAYTEST_SAMPLER_CARDS: GameCard[] = [
  // GUESS (2 Sample Cards)
  {
    id: 'guess-1',
    category: 'GUESS',
    challenge: 'WHO DO YOU THINK HAS LAUGHED AT A JOKE THEY DID NOT UNDERSTAND?',
    difficulty: 'EASY',
    stars: 1,
    points: 1,
    themeColor: '#006826',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/2.png',
  },
  {
    id: 'guess-2',
    category: 'GUESS',
    challenge: 'WHO DO YOU THINK HAS POOPED IN HIGH SCHOOL AND PRAYED NOBODY NOTICED?',
    difficulty: 'FUN',
    stars: 2,
    points: 2,
    themeColor: '#006826',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/1.png',
  },

  // CREATE (2 Sample Cards)
  {
    id: 'create-1',
    category: 'CREATE',
    challenge: 'SPEAK IN RHYMES ONLY UNTIL YOUR NEXT TURN. IF YOU BREAK IT, EVERYONE GETS A POINT.',
    difficulty: 'FUN',
    stars: 2,
    points: 2,
    themeColor: '#5ce1e6',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/65.png',
  },
  {
    id: 'create-2',
    category: 'CREATE',
    challenge: 'INVENT A FAKE SLANG WORD RIGHT NOW AND USE IT IN A CONVINCING CASUAL SENTENCE.',
    difficulty: 'EASY',
    stars: 1,
    points: 1,
    themeColor: '#5ce1e6',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/61.png',
  },

  // BATTLE (2 Sample Cards)
  {
    id: 'battle-1',
    category: 'BATTLE',
    challenge: 'EYE CONTACT SHOWDOWN: PICK AN OPPONENT. FIRST TO BLINK OR LAUGH LOSES.',
    difficulty: 'FUN',
    stars: 2,
    points: 2,
    themeColor: '#ff3131',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/28.png',
  },
  {
    id: 'battle-2',
    category: 'BATTLE',
    challenge: 'THUMB WRESTLE OR ROCK-PAPER-SCISSORS SHOWDOWN. BEST 2 OUT OF 3.',
    difficulty: 'EASY',
    stars: 1,
    points: 1,
    themeColor: '#ff3131',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/23.png',
  },

  // CHAOS (2 Sample Cards)
  {
    id: 'chaos-1',
    category: 'CHAOS',
    challenge: 'TRADE PHONES WITH THE PERSON ON YOUR RIGHT UNTIL YOUR NEXT TURN.',
    difficulty: 'WILD',
    stars: 3,
    points: 3,
    themeColor: '#5e17eb',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/52.png',
  },
  {
    id: 'chaos-2',
    category: 'CHAOS',
    challenge: 'SPEAK ONLY IN QUESTIONS UNTIL YOUR NEXT TURN STARTS.',
    difficulty: 'FUN',
    stars: 2,
    points: 2,
    themeColor: '#5e17eb',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/41.png',
  },

  // TOGETHER (2 Sample Cards)
  {
    id: 'together-1',
    category: 'TOGETHER',
    challenge: 'COUNTDOWN: EVERYONE SAYS A NUMBER TOGETHER WITHOUT TALKING FIRST. REACH 10.',
    difficulty: 'FUN',
    stars: 2,
    points: 2,
    themeColor: '#ff751f',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/17.png',
  },
  {
    id: 'together-2',
    category: 'TOGETHER',
    challenge: 'GROUP HIGH FIVE: EVERYONE IN THE ROOM MUST HIGH FIVE SIMULTANEOUSLY.',
    difficulty: 'EASY',
    stars: 1,
    points: 1,
    themeColor: '#ff751f',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/16.png',
  },

  // CONNECT (2 Sample Cards)
  {
    id: 'connect-1',
    category: 'CONNECT',
    challenge: 'WHAT IS A SILLY CHILDHOOD LIE YOU BELIEVED WAY TOO LONG?',
    difficulty: 'EASY',
    stars: 1,
    points: 1,
    themeColor: '#004aad',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/21.png',
  },
  {
    id: 'connect-2',
    category: 'CONNECT',
    challenge: 'WHAT IS A COMPLIMENT SOMEONE GAVE YOU THAT YOU NEVER FORGOT?',
    difficulty: 'FUN',
    stars: 2,
    points: 2,
    themeColor: '#004aad',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/18.png',
  },

  // LOVE (2 Sample Cards)
  {
    id: 'love-1',
    category: 'LOVE',
    challenge: 'COMPLIMENT THE PERSON OPPOSITE YOU SINCERELY WITHOUT LAUGHING.',
    difficulty: 'EASY',
    stars: 1,
    points: 1,
    themeColor: '#ff66c4',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/59.png',
  },
  {
    id: 'love-2',
    category: 'LOVE',
    challenge: 'TELL THE GROUP ONE HABIT ABOUT SOMEONE HERE THAT SECRETLY WARMS YOUR HEART.',
    difficulty: 'FUN',
    stars: 2,
    points: 2,
    themeColor: '#ff66c4',
    accentColor: '#fde047',
    isLocked: false,
    imageUrl: '/cards/56.png',
  },
];

export const OFFICIAL_DECK: GameCard[] = PLAYTEST_SAMPLER_CARDS;
export const SAMPLE_PREVIEW_DECK: GameCard[] = OFFICIAL_DECK;
