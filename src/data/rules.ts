export const GAME_SPECS = {
  title: 'MADE YOU SAY IT',
  tagline: 'PLAY A CARD. MAKE A MEMORY.',
  edition: 'OFFICIAL RULEBOOK',
  players: '3–8 PLAYERS',
  duration: '20–30 MIN',
  ages: 'AGES 13+',
  categories: '7 CATEGORIES',
  cardsCount: '75 CARDS',
};

export interface RuleStep {
  step: string;
  name: string;
  action: string;
}

export interface CardTypeRule {
  categories: string;
  rule: string;
  tag: string;
  badgeColor?: string;
}

export interface PileRule {
  name: string;
  desc: string;
  badge: string;
}

export const RULEBOOK_DATA = {
  specs: {
    title: 'MADE YOU SAY IT',
    tagline: 'PLAY A CARD. MAKE A MEMORY.',
    players: '3–8 PLAYERS',
    ages: 'AGES 13+',
    duration: '20–30 MIN',
  },
  setup: {
    number: '1',
    title: 'SETUP',
    fullText:
      'Shuffle the cards and place them face-down as the Draw Pile. Deal 3 cards to each player. Choose a starting player. Play proceeds clockwise. Everyone starts with 0 points.',
    bullets: [
      { label: 'DRAW PILE', text: 'Shuffle the cards and place them face-down as the Draw Pile.' },
      { label: 'STARTING HAND', text: 'Deal 3 cards to each player.' },
      { label: 'TURN ORDER', text: 'Choose a starting player. Play proceeds clockwise.' },
      { label: 'SCORE AT START', text: 'Everyone starts with 0 points.' },
    ],
  },
  yourTurn: {
    number: '2',
    title: 'YOUR TURN',
    flow: ['DRAW', 'CHOOSE', 'PLAY OR PASS', 'DO IT', 'SCORE', 'NEXT'],
    steps: [
      { step: '01', name: 'DRAW', action: 'Draw 1 card.' },
      { step: '02', name: 'CHOOSE', action: 'Choose 1 card from your hand.' },
      { step: '03', name: 'PLAY OR PASS', action: 'Read the chosen card aloud, or discard it to pass.' },
      { step: '04', name: 'DO IT', action: "Follow the card’s instructions." },
      { step: '05', name: 'SCORE', action: 'Complete it → earn its printed points → place in your Score Pile.' },
      { step: '06', name: 'NEXT', action: 'Your turn ends. The next player goes.' },
    ],
  },
  cardTypes: {
    number: '3',
    title: 'CARD TYPES',
    types: [
      {
        categories: 'CHAOS • CREATE • LOVE • CONNECT',
        rule: 'Do what the card says. Complete it → points → Score Pile.',
        tag: 'SOLO / ACTION',
      },
      {
        categories: 'GUESS',
        rule: 'Everyone guesses. The player who played the card automatically scores its printed points → Score Pile.',
        tag: 'GROUP GUESS',
      },
      {
        categories: 'BATTLE',
        rule: 'Choose an opponent and compete. The other players judge who wins. The winner keeps the card and its Points. The loser gets 0 Points.',
        tag: '1-ON-1 SHOWDOWN',
      },
      {
        categories: 'TOGETHER',
        rule: 'Everyone participates. All complete it → Team Pile. Anyone refuses or fails → Discard Pile. Every player adds the Team Pile total to their score at the end.',
        tag: 'TEAM CHALLENGE',
      },
    ],
  },
  points: {
    number: '4',
    title: 'POINTS',
    note: 'Points are printed on each card.',
    tiers: [
      { name: 'EASY', points: 1, label: '1 POINT' },
      { name: 'FUN', points: 2, label: '2 POINTS' },
      { name: 'WILD', points: 3, label: '3 POINTS' },
    ],
  },
  passOrFail: {
    number: '5',
    title: 'PASS OR FAIL',
    goldenCallout: 'You can always pass.',
    rules: [
      {
        type: 'PASS',
        desc: "Don't want to do the card? Place it in the Discard Pile, score 0 Points, and end your turn.",
      },
      {
        type: 'FAIL',
        desc: "If you try but fail the card's challenge, put it in the Discard Pile and score 0 Points. Your turn ends.",
      },
    ],
  },
  thePiles: {
    number: '6',
    title: 'THE PILES',
    piles: [
      {
        name: 'Draw Pile',
        desc: 'Cards waiting to be drawn.',
        badge: 'CENTER',
      },
      {
        name: 'Score Pile',
        desc: 'Your completed cards. Their points count toward your score.',
        badge: 'PERSONAL',
      },
      {
        name: 'Discard Pile',
        desc: 'Passed or failed cards.',
        badge: 'CENTER',
      },
      {
        name: 'Team Pile',
        desc: 'Successfully completed Together cards. Every player adds this total to their final score.',
        badge: 'SHARED',
      },
    ],
  },
  endOfGame: {
    number: '7',
    title: 'END OF GAME',
    condition:
      'When the Draw Pile runs out, finish the current round. Count the points in your Score Pile, then add the Team Pile points.',
    formula: 'Score Pile + Team Pile = Final Score',
    winner: 'The player with the most points wins.',
  },
  goldenRule: {
    number: '8',
    title: 'GOLDEN RULE',
    text: 'Everyone should have fun. You can always pass. Never pressure anyone to reveal a real crush, private information, touch another person, or do anything dangerous, sexual, humiliating, or genuinely uncomfortable.',
    tagline: 'MADE YOU SAY IT • PLAY A CARD. MAKE A MEMORY.',
  },
};

// Legacy compatibility exports if referenced elsewhere
export const PLAYTEST_RULES = RULEBOOK_DATA.yourTurn.steps;
