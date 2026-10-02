export const GAME_SPECS = {
  title: 'MADE YOU SAY IT',
  tagline: 'PLAY A CARD. MAKE A MEMORY.',
  edition: 'RULEBOOK',
  players: '3–8 PLAYERS',
  ages: 'AGES 13+',
  duration: '15–45 MIN',
  cardsCount: '80 CARDS',
  points: '160 POINTS',
};

export interface CardTypePreview {
  name: string;
  image: string;
  color: string;
}

export type RuleLanguage = 'en' | 'tl' | 'war';

export interface LanguageOption {
  code: RuleLanguage;
  label: string;
}

export const RULE_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'war', label: 'Waray-Waray' },
];

export interface SetupStep {
  number: number;
  title: string;
  action: string;
  image: string;
  alt: string;
}

export interface TurnStep {
  number: number;
  name: string;
  action: string;
  image: string;
  alt: string;
  reminder: string;
}

export interface CardSubType {
  name: string;
  image: string;
  color: string;
  textColor: string;
}

export interface CardTypeItem {
  id: string;
  title: string;
  name?: string;
  rule: string;
  tag: string;
  color?: string;
  textColor?: string;
  subTypes?: CardSubType[];
  samples?: string[];
}

export interface PileItem {
  name: string;
  desc: string;
  color: string;
  tag: string;
}

export interface PassFailItem {
  label: string;
  desc: string;
}

export interface RulebookContent {
  subtitle: string;
  quickNoteLabel: string;
  quickNote: string;
  specs: {
    title: string;
    tagline: string;
    badgeLine: string;
    players: string;
    ages: string;
    duration: string;
  };
  setup: {
    number: string;
    title: string;
    note: string;
    steps: SetupStep[];
  };
  yourTurn: {
    number: string;
    title: string;
    flow: string[];
    steps: TurnStep[];
  };
  points: {
    number: string;
    title: string;
    text: string;
  };
  cardTypes: {
    number: string;
    title: string;
    types: CardTypeItem[];
  };
  passOrFail: {
    number: string;
    title: string;
    items: PassFailItem[];
    callout: string;
  };
  thePiles: {
    number: string;
    title: string;
    image: string;
    alt: string;
    piles: PileItem[];
  };
  endOfGame: {
    number: string;
    title: string;
    condition: string;
    formula: string;
    winner: string;
  };
  goldenRule: {
    number: string;
    title: string;
    text: string;
  };
  footer: {
    brand: string;
    tagline: string;
  };
}

export const RULEBOOK_TRANSLATIONS: Record<RuleLanguage, RulebookContent> = {
  // ── ENGLISH ──────────────────────────────────────────
  en: {
    subtitle: 'Everything you need to know to start playing in 2 minutes.',
    quickNoteLabel: 'Quick note:',
    quickNote: 'For now, I use AI anime images to help explain the rules. This is a test version, so some prints and cuts may be uneven.',
    specs: {
      title: 'MADE YOU SAY IT',
      tagline: 'PLAY A CARD. MAKE A MEMORY.',
      badgeLine: 'RULEBOOK • 3–8 PLAYERS • AGES 13+ • 15–45 MIN',
      players: '3–8 PLAYERS',
      ages: 'AGES 13+',
      duration: '15–45 MIN',
    },
    setup: {
      number: '1',
      title: '1. SETUP',
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
          reminder: "Follow the card's instructions.",
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
  },

  // ── TAGALOG ──────────────────────────────────────────
  tl: {
    subtitle: 'Lahat ng kailangan mong malaman para makapaglaro sa loob ng 2 minuto.',
    quickNoteLabel: 'Paalala:',
    quickNote: 'Sa ngayon, gumagamit ako ng AI anime images para ipaliwanag ang rules. Isa itong test version, kaya may ilang print at gupit na maaaring hindi pa pantay.',
    specs: {
      title: 'MADE YOU SAY IT',
      tagline: 'MAGLARO NG CARD. GUMAWA NG ALAALA.',
      badgeLine: 'RULEBOOK • 3–8 PLAYERS • EDAD 13+ • 15–45 MIN',
      players: '3–8 PLAYERS',
      ages: 'EDAD 13+',
      duration: '15–45 MIN',
    },
    setup: {
      number: '1',
      title: '1. SETUP (PAGHAHANDA)',
      note: 'Lahat ay magsisimula sa 0 points.',
      steps: [
        {
          number: 1,
          title: 'I-shuffle ang Cards',
          action: 'Balasahin o i-shuffle ang mga baraha.',
          image: '/set up/1.png',
          alt: 'Balasahin ang mga baraha',
        },
        {
          number: 2,
          title: 'Mamigay ng Tig-3 Cards',
          action: 'Mamigay ng 1 card sa bawat manlalaro, ulitin hanggang makatig-3 cards ang lahat.',
          image: '/set up/2.png',
          alt: 'Mamigay ng tig-3 cards sa bawat player',
        },
        {
          number: 3,
          title: 'Ilagay ang Draw Pile',
          action: 'Ilagay ang natitirang cards nang nakataob sa gitna bilang Draw Pile.',
          image: '/set up/3.png',
          alt: 'Ilagay ang Draw Pile sa gitna ng mesa',
        },
        {
          number: 4,
          title: 'Pumili ng Mauuna',
          action: 'Pumili ang grupo kung sino ang unang maglalaro.',
          image: '/set up/4.png',
          alt: 'Pumili kung sino ang unang player',
        },
        {
          number: 5,
          title: 'Pausadin ng Pakanan',
          action: 'Tuloy-tuloy ang laro pakanan (clockwise). Lahat ay magsisimula sa 0 points.',
          image: '/set up/5.png',
          alt: 'Maglaro paikot pakanan (clockwise)',
        },
      ],
    },
    yourTurn: {
      number: '2',
      title: '2. YOUR TURN (IYONG TIRA)',
      flow: ['DRAW', 'CHOOSE', 'PLAY OR PASS', 'DO IT', 'SCORE', 'NEXT'],
      steps: [
        {
          number: 1,
          name: 'DRAW',
          action: 'Bumunot ng 1 card mula sa Draw Pile.',
          image: '/your turn/1.png',
          alt: 'Bumunot ng 1 card',
          reminder: 'Bumunot ng 1 card.',
        },
        {
          number: 2,
          name: 'CHOOSE',
          action: 'Pumili ng 1 card mula sa iyong hawak na baraha.',
          image: '/your turn/2.png',
          alt: 'Pumili ng 1 card sa hawak mo',
          reminder: 'Pumili ng 1 card mula sa hawak mo.',
        },
        {
          number: 3,
          name: 'PLAY OR PASS',
          action: 'Basahin nang malakas ang napiling card, o i-discard ito para mag-pass.',
          image: '/your turn/3.png',
          alt: 'Basahin nang malakas ang napiling card o mag-pass',
          reminder: 'Basahin nang malakas ang card, o i-discard para mag-pass.',
        },
        {
          number: 4,
          name: 'DO IT',
          action: 'Sundin ang nakasulat na tagubilin sa card.',
          image: '/your turn/4.png',
          alt: 'Sundin ang utos ng card',
          reminder: 'Sundin ang utos ng card.',
        },
        {
          number: 5,
          name: 'SCORE',
          action: 'Magawa ang hamon → makuha ang nakasulat na points → ilagay sa iyong Score Pile.',
          image: '/your turn/5.png',
          alt: 'Gawin ang hamon at ilagay sa Score Pile',
          reminder: 'Gawin ang card → kunin ang points → ilagay sa Score Pile.',
        },
        {
          number: 6,
          name: 'NEXT',
          action: 'Tapos na ang iyong tira. Sunod na player naman.',
          image: '/your turn/6.png',
          alt: 'Tapos na ang tira, sunod na player naman',
          reminder: 'Tapos na ang iyong tira. Sunod na player naman.',
        },
      ],
    },
    points: {
      number: '3',
      title: '3. POINTS',
      text: 'Ang numerong nakaimprinta sa card ang nagsasabi kung ilang points ang halaga nito.',
    },
    cardTypes: {
      number: '4',
      title: '4. CARD TYPES',
      types: [
        {
          id: 'solo',
          title: 'CHAOS, CREATE, LOVE, CONNECT',
          rule: 'Sundin ang utos ng card. Magawa ito → makuha ang nakasulat na points → ilagay sa iyong Score Pile.',
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
          rule: "Lahat ay huhula. Ang naglaro ng card ang makakakuha ng nakasulat na points. Ang saya ay nanggagaling sa mga hula ng bawat isa.",
          tag: 'GROUP',
          color: '#5170FF',
          textColor: '#ffffff',
          samples: ['/cards/guess  1point hero.png', '/cards/guess  1point.png', '/cards/guess  1point (2).png'],
        },
        {
          id: 'battle',
          title: 'BATTLE',
          name: 'BATTLE',
          rule: 'Pumili ng makakalaban at magpaligsahan. Ang ibang manlalaro ang magpapasya kung sino ang panalo. Ang panalo ang kukuha ng BATTLE card at maglalagay nito sa kanilang Score Pile. Kung tabla (tie), mapupunta ang card sa Discard Pile.\n\nKung maglalaro ka ng higit sa isang BATTLE card, pumili ng ibang kalaban bawat beses. Kapag nakalaban mo na ang lahat ng player, pwede ka nang pumili ulit ng kahit sino.',
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
          desc: 'Ayaw mong gawin ang card? I-discard ito, 0 points, at tapos na ang iyong tira.',
        },
        {
          label: 'FAIL',
          desc: 'Sinubukan pero hindi nagawa? I-discard ito at 0 points.',
        },
      ],
      callout: 'Pwede kang mag-pass kahit kailan.',
    },
    thePiles: {
      number: '6',
      title: '6. THE PILES (MGA TUMBOK NG BARAHA)',
      image: '/rules/the-piles-table.jpg',
      alt: 'Ayos ng mesa na nagpapakita ng Draw Pile, Score Pile, at Discard Pile',
      piles: [
        {
          name: 'Draw Pile',
          desc: 'Mga barahang nakataob na naghihintay bunutin.',
          color: '#004AAD',
          tag: 'CENTER',
        },
        {
          name: 'Score Pile',
          desc: 'Mga barahang napanalunan mo. Ang points nito ay bibilangin sa iyong score.',
          color: '#5E17EB',
          tag: 'YOUR AREA',
        },
        {
          name: 'Discard Pile',
          desc: 'Mga barahang na-pass, na-fail, o nag-tabla (tie).',
          color: '#E02424',
          tag: 'CENTER',
        },
      ],
    },
    endOfGame: {
      number: '7',
      title: '7. END OF GAME (PAGTATAPOS NG LARO)',
      condition: 'Kapag nabunot na ang huling card, tapusin ang kasalukuyang round. Ang mga player na hindi na makakabunot ay maglalaro na lang ng 1 card mula sa kanilang hawak. Bilangin ang points sa iyong Score Pile.',
      formula: 'Score Pile = Final Score',
      winner: 'Ang player na may pinakamaraming points ang panalo.',
    },
    goldenRule: {
      number: '8',
      title: '8. GOLDEN RULE (GINTONG PATAKARAN)',
      text: 'Ang pinakamahalaga ay mag-enjoy ang lahat. Pwede kang mag-pass kahit kailan. Huwag kailanman pilitin ang sinuman na umamin ng totoong crush, magbunyag ng pribadong impormasyon, humawak sa ibang tao, o gumawa ng anumang mapanganib, sexual, nakakahiya, o labag sa kanilang kalooban.',
    },
    footer: {
      brand: 'MADE YOU SAY IT',
      tagline: 'MAGLARO NG CARD. GUMAWA NG ALAALA.',
    },
  },

  // ── WARAY-WARAY ──────────────────────────────────────
  war: {
    subtitle: 'Ngatanan nga kinahanglan mo hibaroan basi makauyag ha sulod hin 2 ka minutos.',
    quickNoteLabel: 'Pahibaro:',
    quickNote: 'Ha pagkayana, nagamit anay ako hin AI anime images para ipasabot an rules. Test version pa ini, salit may mga print ngan utod nga bangin diri pa pantay.',
    specs: {
      title: 'MADE YOU SAY IT',
      tagline: 'PAG-UYAG HIN CARD. PAGHIMO HIN HANDUMANAN.',
      badgeLine: 'RULEBOOK • 3–8 NGA PLAYERS • EDAD 13+ • 15–45 MIN',
      players: '3–8 NGA PLAYERS',
      ages: 'EDAD 13+',
      duration: '15–45 MIN',
    },
    setup: {
      number: '1',
      title: '1. SETUP (PAG-ANDAM)',
      note: 'Nagtitirok an ngatanan ha 0 points.',
      steps: [
        {
          number: 1,
          title: 'Kutawa an Cards',
          action: 'Kutawa o i-shuffle an mga baraha.',
          image: '/set up/1.png',
          alt: 'Kutawa an mga baraha',
        },
        {
          number: 2,
          title: 'Tig-3 nga Cards an Ipanhatag',
          action: 'Tagi hin tag-1 nga card an kada player, baliki tubtob nga makatig-3 nga cards an ngatanan.',
          image: '/set up/2.png',
          alt: 'Tag-3 nga cards kada usa',
        },
        {
          number: 3,
          title: 'Ibutang an Draw Pile',
          action: 'Ibutang an salin nga mga baraha nga nakahapa ha butnga komo Draw Pile.',
          image: '/set up/3.png',
          alt: 'Ibutang an Draw Pile ha butnga han lamesa',
        },
        {
          number: 4,
          title: 'Pili hin Mag-uuna',
          action: 'Pili-a han grupo kon hin-o an una nga matira.',
          image: '/set up/4.png',
          alt: 'Pili kon hin-o an una nga player',
        },
        {
          number: 5,
          title: 'Pasunoda Pa-Clockwise',
          action: 'Pasunod an uyag patoo (clockwise). Nagtitirok an ngatanan ha 0 points.',
          image: '/set up/5.png',
          alt: 'Pasunod an uyag patoo',
        },
      ],
    },
    yourTurn: {
      number: '2',
      title: '2. YOUR TURN (IMO TIRA)',
      flow: ['DRAW', 'CHOOSE', 'PLAY OR PASS', 'DO IT', 'SCORE', 'NEXT'],
      steps: [
        {
          number: 1,
          name: 'DRAW',
          action: 'Burot hin 1 nga card tikang ha Draw Pile.',
          image: '/your turn/1.png',
          alt: 'Burot hin 1 nga card',
          reminder: 'Burot hin 1 nga card.',
        },
        {
          number: 2,
          name: 'CHOOSE',
          action: 'Pili hin 1 nga card tikang ha imo kapot nga baraha.',
          image: '/your turn/2.png',
          alt: 'Pili hin 1 nga card ha imo kapot',
          reminder: 'Pili hin 1 nga card tikang ha imo kapot.',
        },
        {
          number: 3,
          name: 'PLAY OR PASS',
          action: 'Basaha hin mabaskog an napili nga card, o i-discard kun ma-pass.',
          image: '/your turn/3.png',
          alt: 'Basaha hin mabaskog an card o mag-pass',
          reminder: 'Basaha hin mabaskog an card, o i-discard kun ma-pass.',
        },
        {
          number: 4,
          name: 'DO IT',
          action: 'Sunda an nakasurat nga tugon ha card.',
          image: '/your turn/4.png',
          alt: 'Sunda an tugon han card',
          reminder: 'Sunda an tugon han card.',
        },
        {
          number: 5,
          name: 'SCORE',
          action: 'Matuman an nakasurat → kuhaa an points → ibutang ha imo Score Pile.',
          image: '/your turn/5.png',
          alt: 'Matuman an card ngan ibutang ha Score Pile',
          reminder: 'Matuman an card → kuhaa an points → ibutang ha Score Pile.',
        },
        {
          number: 6,
          name: 'NEXT',
          action: 'Tapos na an imo tira. Sunod naman nga player.',
          image: '/your turn/6.png',
          alt: 'Tapos na an tira, sunod naman nga player',
          reminder: 'Tapos na an imo tira. Sunod naman nga player.',
        },
      ],
    },
    points: {
      number: '3',
      title: '3. POINTS',
      text: 'An numero nga nakaimprinta ha card amo an nagpapakita kon pira ka points an iya bili.',
    },
    cardTypes: {
      number: '4',
      title: '4. CARD TYPES',
      types: [
        {
          id: 'solo',
          title: 'CHAOS, CREATE, LOVE, CONNECT',
          rule: 'Sunda an tugon han card. Matuman ini → kuhaa an nakasurat nga points → ibutang ha imo Score Pile.',
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
          rule: "Matag-an an ngatanan. An player nga nagtira han card an makakakuha han points. An kalipay aadi ha mga tirag-an han kada tagsa.",
          tag: 'GROUP',
          color: '#5170FF',
          textColor: '#ffffff',
          samples: ['/cards/guess  1point hero.png', '/cards/guess  1point.png', '/cards/guess  1point (2).png'],
        },
        {
          id: 'battle',
          title: 'BATTLE',
          name: 'BATTLE',
          rule: 'Pili hin makakakompetensya ngan pag-away kamo. An iba nga players an maghuhukom kon hin-o an daug. An daug an makuha han BATTLE card ngan ibubutang ha iya Score Pile. Kon patas (tabla/tie), makadto an card ha Discard Pile.\n\nKon magtitira ka hin damo nga BATTLE cards, iba-iba nga kalaban an pilia kada tira. Kon nakontra mo na an ngatanan nga players, pwede ka na pumili utro hin bisan hin-o.',
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
          desc: 'Diri mo karuyag himoon an card? I-discard ini, 0 points, ngan tapos na an imo tira.',
        },
        {
          label: 'FAIL',
          desc: 'Ginsarihan pero waray matuman? I-discard ini ngan 0 points.',
        },
      ],
      callout: 'Puyde ka gud pirme mag-pass.',
    },
    thePiles: {
      number: '6',
      title: '6. THE PILES (MGA TUMPIK HIN BARAHA)',
      image: '/rules/the-piles-table.jpg',
      alt: 'Hitsura han lamesa nga nagpapakita han Draw Pile, Score Pile, ngan Discard Pile',
      piles: [
        {
          name: 'Draw Pile',
          desc: 'Mga baraha nga nakahapa nga naghuhulat burotan.',
          color: '#004AAD',
          tag: 'CENTER',
        },
        {
          name: 'Score Pile',
          desc: 'Mga baraha nga imo nadaog. An points hini an ihapon para ha imo score.',
          color: '#5E17EB',
          tag: 'YOUR AREA',
        },
        {
          name: 'Discard Pile',
          desc: 'Mga baraha nga na-pass, na-fail, o nag-tabla (tie).',
          color: '#E02424',
          tag: 'CENTER',
        },
      ],
    },
    endOfGame: {
      number: '7',
      title: '7. END OF GAME (PAGTATAPOS HAN UYAG)',
      condition: 'Kon mabuot na an katapusan nga card, tapusa an round. An mga player nga diri na makakaburot matira nala hin 1 nga card tikang ha ira kapot. Ihapa an points ha imo Score Pile.',
      formula: 'Score Pile = Final Score',
      winner: 'An player nga may gidadamoi nga points an daug.',
    },
    goldenRule: {
      number: '8',
      title: '8. GOLDEN RULE (BULAWANON NGA SURUNDON)',
      text: 'An pinaka-importante maglipay an ngatanan. Puyde ka gud pirme mag-pass. Ayaw piriton an bisan hin-o nga magsumat han tinuod nga crush, magpagawas hin pribado nga impormasyon, kumapot ha iba, o maghimo hin peligroso, sexual, nakakaarawod, o diri gud komportable ha iya.',
    },
    footer: {
      brand: 'MADE YOU SAY IT',
      tagline: 'PAG-UYAG HIN CARD. PAGHIMO HIN HANDUMANAN.',
    },
  },
};

// Default export for backward compatibility
export const RULEBOOK_DATA = RULEBOOK_TRANSLATIONS.en;
