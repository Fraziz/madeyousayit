export const GAME_SPECS = {
  title: 'MADE YOU SAY IT',
  tagline: 'PLAY A CARD. MAKE A MEMORY.',
  edition: 'RULEBOOK',
  players: '3–8 PLAYERS',
  ages: 'AGES 13+',
  duration: '20–30 MIN',
  cardsCount: '80 CARDS',
  points: '160 POINTS',
};

export interface CardTypePreview {
  name: string;
  image: string;
  color: string;
}

export const RULEBOOK_DATA = {
  specs: {
    title: 'MADE YOU SAY IT',
    tagline: 'PLAY A CARD. MAKE A MEMORY.',
    badgeLine: 'RULEBOOK • 3–8 PLAYERS • AGES 13+ • 20–30 MIN',
    players: '3–8 PLAYERS',
    ages: 'AGES 13+',
    duration: '20–30 MIN',
  },
  setup: {
    number: '1',
    title: '1. SETUP',
    text: '',
    note: 'Everyone starts with 0 points.',
    steps: [
      {
        number: 1,
        title: 'Shuffle Cards',
        action: 'Shuffle the cards.',
        image: '/set up/1.png',
        alt: 'Shuffle the cards',
      },
      {
        number: 2,
        title: 'Deal 3 Cards Each',
        action: 'Deal 1 card to each player, then repeat until everyone has 3 cards.',
        image: '/set up/2.png',
        alt: 'Deal 1 card to each player, then repeat until everyone has 3 cards',
      },
      {
        number: 3,
        title: 'Place Draw Pile',
        action: 'Place the remaining cards face-down as the Draw Pile.',
        image: '/set up/3.png',
        alt: 'Place the remaining cards face-down as the Draw Pile',
      },
      {
        number: 4,
        title: 'Pick Starting Player',
        action: 'The group picks a starting player.',
        image: '/set up/4.png',
        alt: 'The group picks a starting player',
      },
      {
        number: 5,
        title: 'Play Clockwise',
        action: 'Play continues clockwise. Everyone starts with 0 points.',
        image: '/set up/5.png',
        alt: 'Play continues clockwise. Everyone starts with 0 points',
      },
    ],
  },
  yourTurn: {
    number: '2',
    title: '2. YOUR TURN',
    flow: ['DRAW', 'CHOOSE', 'PLAY OR PASS', 'DO IT', 'SCORE', 'NEXT'],
    steps: [
      {
        number: 1,
        name: 'DRAW',
        action: 'Draw 1 card.',
        image: '/your turn/1.png',
        alt: 'Draw 1 card from the deck',
        reminder: 'Draw 1 card.',
      },
      {
        number: 2,
        name: 'CHOOSE',
        action: 'Choose 1 card from your hand.',
        image: '/your turn/2.png',
        alt: 'Choose 1 card from your hand',
        reminder: 'Choose 1 card from your hand.',
      },
      {
        number: 3,
        name: 'PLAY OR PASS',
        action: 'Read the chosen card aloud, or discard it to pass.',
        image: '/your turn/3.png',
        alt: 'Read the chosen card aloud, or discard it to pass',
        reminder: 'Read the chosen card aloud, or discard it to pass.',
      },
      {
        number: 4,
        name: 'DO IT',
        action: "Follow the card's instructions.",
        image: '/your turn/4.png',
        alt: "Follow the card's instructions",
        reminder: "Follow the card's instructions."
      },
      {
        number: 5,
        name: 'SCORE',
        action: 'Complete the card → earn its printed points → place it in your Score Pile.',
        image: '/your turn/5.png',
        alt: 'Complete the card → earn its printed points → place it in your Score Pile',
        reminder: 'Complete the card → earn its printed points → place it in your Score Pile.',
      },
      {
        number: 6,
        name: 'NEXT',
        action: 'Your turn ends. The next player goes.',
        image: '/your turn/6.png',
        alt: 'Your turn ends. The next player goes',
        reminder: 'Your turn ends. The next player goes.',
      },
    ],
  },
  points: {
    number: '3',
    title: '3. POINTS',
    text: 'The number printed on a card shows how many points it is worth.',
    fullLine: '3. POINTS — The number printed on a card shows how many points it is worth.',
  },
  cardTypes: {
    number: '4',
    title: '4. CARD TYPES',
    types: [
      {
        id: 'solo',
        title: 'CHAOS, CREATE, LOVE, CONNECT',
        rule: "Follow the card's instructions. Complete it → earn the printed points → place it in your Score Pile.",
        tag: 'ACTION',
        subTypes: [
          { name: 'CHAOS', image: '/cards/chaos 2 point hero.png', color: '#5170FF', textColor: '#ffffff' },
          { name: 'CREATE', image: '/cards/create 1 point hero.png', color: '#5170FF', textColor: '#ffffff' },
          { name: 'LOVE', image: '/cards/love 2  point hero.png', color: '#5170FF', textColor: '#ffffff' },
          { name: 'CONNECT', image: '/cards/connect 3 point hero.png', color: '#5170FF', textColor: '#ffffff' },
        ],
      },
      {
        id: 'guess',
        title: 'GUESS',
        name: 'GUESS',
        rule: "Everyone guesses. The player who played the card scores the printed points. The fun comes from hearing everyone's guesses.",
        tag: 'GROUP',
        color: '#5170FF',
        textColor: '#ffffff',
        samples: ['/cards/guess  1point hero.png', '/cards/guess  1point.png', '/cards/guess  1point (2).png'],
      },
      {
        id: 'battle',
        title: 'BATTLE',
        name: 'BATTLE',
        rule: 'Choose an opponent and compete. The other players decide who wins. The winner takes the BATTLE card and places it in their Score Pile. If it is a tie, the card goes to the Discard Pile.\n\nIf you play multiple BATTLE cards, choose a different opponent each time. Once you have challenged every other player, you may choose any opponent again.',
        tag: '1-ON-1',
        color: '#5170FF',
        textColor: '#ffffff',
        samples: ['/cards/battle 2 points hero.png', '/cards/battle 1  points.png', '/cards/battle 3 points.png'],
      },
    ],
  },
  passOrFail: {
    number: '5',
    title: '5. PASS OR FAIL',
    items: [
      {
        label: 'PASS',
        desc: "Don't want to do the card? Discard it, score 0 points, and end your turn.",
      },
      {
        label: 'FAIL',
        desc: 'Tried but could not complete the card? Discard it and score 0 points.',
      },
    ],
    callout: 'You can always pass.',
  },
  thePiles: {
    number: '6',
    title: '6. THE PILES',
    image: '/rules/the-piles-table.jpg',
    alt: 'Table layout showing Draw Pile, Score Pile, and Discard Pile',
    piles: [
      {
        name: 'Draw Pile',
        desc: 'Cards waiting to be drawn.',
        color: '#004AAD',
        tag: 'CENTER',
      },
      {
        name: 'Score Pile',
        desc: 'Cards you earned. Their points count toward your score.',
        color: '#5E17EB',
        tag: 'YOUR AREA',
      },
      {
        name: 'Discard Pile',
        desc: 'Passed, failed, or tied cards.',
        color: '#E02424',
        tag: 'CENTER',
      },
    ],
  },
  endOfGame: {
    number: '7',
    title: '7. END OF GAME',
    condition: 'When the last card is drawn, finish the current round. Players who cannot draw simply play 1 card from their hand. Count the points in your Score Pile.',
    formula: 'Score Pile = Final Score',
    winner: 'The player with the most points wins.',
  },
  goldenRule: {
    number: '8',
    title: '8. GOLDEN RULE',
    text: 'Everyone should have fun. You can always pass. Never pressure anyone to reveal a real crush, private information, touch another person, or do anything dangerous, sexual, humiliating, or genuinely uncomfortable.',
  },
  footer: {
    brand: 'MADE YOU SAY IT',
    tagline: 'PLAY A CARD. MAKE A MEMORY.',
  },
};
