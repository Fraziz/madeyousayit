import type { GameCard, CardType } from '../types';

export interface CardTypeInfo {
  name: string;
  count: number;
  sampleCount: number;
  totalPoints: number;
  color: string;
  accent: string;
  tagline: string;
  rule: string;
  officialCardImage?: string;
}

export const SIGNATURE_BLUE = '#5170FF';

/**
 * OFFICIAL DECK STATS
 * 80 Physical Cards · 160 Total Points across 6 Card Types
 * Authentic Assets from: src/assets/MADE YOU SAY IT CARDS v3
 */
export const TOTAL_DECK_CARDS = 80;
export const TOTAL_DECK_POINTS = 160;
export const SAMPLE_CARDS_PER_TYPE = 3;
export const TOTAL_SAMPLE_CARDS = 18; // 6 card types * 3 sample cards

export const CARD_TYPES_INFO: Record<CardType, CardTypeInfo> = {
  GUESS: {
    name: 'GUESS',
    count: 10,
    sampleCount: 3,
    totalPoints: 10,
    color: '#5170FF',
    accent: '#5170FF',
    tagline: 'READ THE ROOM AND GUESS OUT LOUD.',
    rule: "Everyone guesses. The player who played the card scores the printed points. The fun comes from hearing everyone's guesses.",
    officialCardImage: '/cards/guess  1point hero.png',
  },
  CREATE: {
    name: 'CREATE',
    count: 15,
    sampleCount: 3,
    totalPoints: 31,
    color: '#5170FF',
    accent: '#5170FF',
    tagline: 'BE SILLY AND MAKE SOMETHING UP ON THE SPOT.',
    rule: 'Do what the card asks. Complete it to earn your points.',
    officialCardImage: '/cards/create 1 point hero.png',
  },
  BATTLE: {
    name: 'BATTLE',
    count: 15,
    sampleCount: 3,
    totalPoints: 31,
    color: '#5170FF',
    accent: '#5170FF',
    tagline: '1-ON-1 SHOWDOWN WITH A FRIEND.',
    rule: "Choose an opponent and compete. The other players decide who wins. The winner takes the BATTLE card and places it in their Score Pile. If it is a tie, the card goes to the Discard Pile. If you play multiple BATTLE cards, choose a different opponent each time. Once you have challenged every other player, you may choose any opponent again.",
    officialCardImage: '/cards/battle 2 points hero.png',
  },
  CHAOS: {
    name: 'CHAOS',
    count: 15,
    sampleCount: 3,
    totalPoints: 34,
    color: '#5170FF',
    accent: '#5170FF',
    tagline: 'WILD PARTY TWISTS AND SURPRISES.',
    rule: 'Follow the crazy challenge. Complete it to earn your points.',
    officialCardImage: '/cards/chaos 2 point hero.png',
  },
  CONNECT: {
    name: 'CONNECT',
    count: 15,
    sampleCount: 3,
    totalPoints: 32,
    color: '#5170FF',
    accent: '#5170FF',
    tagline: 'REAL STORIES AND REAL HONESTY.',
    rule: 'Answer the question honestly. Complete it to earn your points.',
    officialCardImage: '/cards/connect 3 point hero.png',
  },
  LOVE: {
    name: 'LOVE',
    count: 10,
    sampleCount: 3,
    totalPoints: 22,
    color: '#5170FF',
    accent: '#5170FF',
    tagline: 'SHARE SWEET WORDS AND APPRECIATION.',
    rule: 'Say something kind or sweet. Complete it to earn your points.',
    officialCardImage: '/cards/love 2  point hero.png',
  },
};

/**
 * FULL 80-CARD AUTHENTIC DECK (v3)
 * Complete catalog of all 80 printed physical cards following the exact filenames in:
 * src/assets/MADE YOU SAY IT CARDS v3
 */
export const OFFICIAL_DECK: GameCard[] = [
  {
    "id": "guess-1",
    "cardType": "GUESS",
    "challenge": "WHO IS MOST LIKELY TO LAUGH BEFORE THEY UNDERSTAND THE JOKE?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (2).png"
  },
  {
    "id": "guess-2",
    "cardType": "GUESS",
    "challenge": "WHO DO YOU THINK HAS FALLEN ASLEEP IN CLASS AND PRETENDED TO BE LISTENING?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (3).png"
  },
  {
    "id": "guess-3",
    "cardType": "GUESS",
    "challenge": "WHO IS MOST LIKELY TO BUY SOMETHING SILLY AND SAY, \"I NEEDED THIS\"?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (4).png"
  },
  {
    "id": "guess-4",
    "cardType": "GUESS",
    "challenge": "WHO IS MOST LIKELY TO WALK INTO THE WRONG ROOM AND ACT LIKE THEY BELONG THERE?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (5).png"
  },
  {
    "id": "guess-5",
    "cardType": "GUESS",
    "challenge": "WHO HERE WOULD WAVE BACK AT SOMEONE WHO WAS WAVING AT THE PERSON BEHIND THEM?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (6).png"
  },
  {
    "id": "guess-6",
    "cardType": "GUESS",
    "challenge": "WHO HERE WOULD TURN A SIMPLE GAME INTO A SERIOUS COMPETITION?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (7).png"
  },
  {
    "id": "guess-7",
    "cardType": "GUESS",
    "challenge": "WHO HERE WOULD SING THE WRONG LYRICS WITH COMPLETE CONFIDENCE?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (8).png"
  },
  {
    "id": "guess-8",
    "cardType": "GUESS",
    "challenge": "WHO IS MOST LIKELY TO BECOME FAMOUS ON REALITY TV FOR STARTING UNNECESSARY DRAMA?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point (9).png"
  },
  {
    "id": "guess-hero",
    "cardType": "GUESS",
    "challenge": "WHO DO YOU THINK HAS POOPED IN HIGH SCHOOL AND PRAYED NOBODY NOTICED?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point hero.png"
  },
  {
    "id": "guess-9",
    "cardType": "GUESS",
    "challenge": "WHO IS MOST LIKELY TO LOOK FOR THEIR PHONE WHILE HOLDING IT?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/guess  1point.png"
  },
  {
    "id": "create-1",
    "cardType": "CREATE",
    "challenge": "CREATE A FUNNY REACTION TO RECEIVING A $20 BILL IN THE MAIL.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 1 point (2).png"
  },
  {
    "id": "create-2",
    "cardType": "CREATE",
    "challenge": "INVENT A HAND SIGNAL THAT MEANS 'HELP ME LEAVE THIS CONVERSATION.' SHOW IT AND EXPLAIN IT.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 1 point (3).png"
  },
  {
    "id": "create-hero",
    "cardType": "CREATE",
    "challenge": "INVENT A POSE AND GIVE IT A NAME. SHOW IT TO THE GROUP.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 1 point hero.png"
  },
  {
    "id": "create-3",
    "cardType": "CREATE",
    "challenge": "INVENT A SILLY SUPERHERO NAME AND STRIKE ONE SEATED POSE.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 1 point.png"
  },
  {
    "id": "create-4",
    "cardType": "CREATE",
    "challenge": "INVENT A GREETING TO REPLACE 'HELLO.' ADD ONE GESTURE AND SHOW BOTH TO THE GROUP.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 2 point (2).png"
  },
  {
    "id": "create-5",
    "cardType": "CREATE",
    "challenge": "YOU ARE A GHOST WHO IS SCARED OF HUMANS. EXPLAIN WHY AND ASK FOR A DIFFERENT JOB.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 2 point (3).png"
  },
  {
    "id": "create-6",
    "cardType": "CREATE",
    "challenge": "INVENT A DANCE MOVE USING ONLY YOUR ARMS. NAME IT AND SHOW IT FOR 10 SECONDS.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 2 point (4).png"
  },
  {
    "id": "create-7",
    "cardType": "CREATE",
    "challenge": "CREATE A 30-SECOND ACTION SCENE USING ONLY THE SOUNDS OF YOUR MOUTH. NO REAL WORDS ALLOWED.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 2 point (5).png"
  },
  {
    "id": "create-8",
    "cardType": "CREATE",
    "challenge": "PERFORM FOR 30 SECONDS AND CONVINCE EVERYONE YOU'RE SECRETLY FAMOUS.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 2 point (6).png"
  },
  {
    "id": "create-9",
    "cardType": "CREATE",
    "challenge": "INVENT THREE WORDS FOR THINGS IN THE ROOM. SAY EACH WORD AND POINT TO WHAT IT MEANS.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 2 point.png"
  },
  {
    "id": "create-10",
    "cardType": "CREATE",
    "challenge": "INVENT A HOLIDAY. GIVE IT A NAME, EXPLAIN ONE SILLY RULE, AND SHOW HOW PEOPLE CELEBRATE.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 3 point (2).png"
  },
  {
    "id": "create-11",
    "cardType": "CREATE",
    "challenge": "INVENT A SILLY SPORT. NAME IT, EXPLAIN HOW TO WIN, AND ACT OUT ONE MOVE.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 3 point (3).png"
  },
  {
    "id": "create-12",
    "cardType": "CREATE",
    "challenge": "CHOOSE A FOOD AND GIVE IT A 20-SECOND WEDDING SPEECH. MAKE SILLY PROMISES AND END BY ASKING IT TO MARRY YOU.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 3 point (4).png"
  },
  {
    "id": "create-13",
    "cardType": "CREATE",
    "challenge": "INVENT A STORY ABOUT HOW A CARTOON CHARACTER GOT THEIR LAUGH. SHOW THE LAUGH AS A BABY, A TEEN, AND AN ADULT.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 3 point (5).png"
  },
  {
    "id": "create-14",
    "cardType": "CREATE",
    "challenge": "CHOOSE AN OBJECT IN THE ROOM. INVENT A MOVIE TITLE, A PROBLEM, AND A DRAMATIC FINAL LINE. PERFORM THE TRAILER IN 20 SECONDS.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/create 3 point.png"
  },
  {
    "id": "battle-1",
    "cardType": "BATTLE",
    "challenge": "GIVE YOUR OPPONENT THE MOST RIDICULOUS NICKNAME YOU CAN THINK OF. THE GROUP CHOOSES THE WINNER.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 1  points (2).png"
  },
  {
    "id": "battle-2",
    "cardType": "BATTLE",
    "challenge": "PLAY ROCK-PAPER-SCISSORS. FIRST TO WIN TWO ROUNDS WINS. REPLAY TIED ROUNDS.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 1  points.png"
  },
  {
    "id": "battle-3",
    "cardType": "BATTLE",
    "challenge": "THE OTHER PLAYERS ASK ONE SILLY QUESTION. EACH OF YOU GIVES ONE ANSWER. THEY CHOOSE THE FUNNIER ANSWER.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (2).png"
  },
  {
    "id": "battle-4",
    "cardType": "BATTLE",
    "challenge": "CHOOSE THE SAME PERSON, CHARACTER, OR ANIMAL AND PERFORM YOUR BEST IMPRESSION. THE GROUP CHOOSES THE WINNER.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (3).png"
  },
  {
    "id": "battle-5",
    "cardType": "BATTLE",
    "challenge": "CHOOSE ONE OBJECT IN THE ROOM. EACH OF YOU GETS 15 SECONDS TO EXPLAIN WHY IT COULD SAVE THE WORLD. THE OTHER PLAYERS CHOOSE THE FUNNIER IDEA.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (4).png"
  },
  {
    "id": "battle-6",
    "cardType": "BATTLE",
    "challenge": "EACH BALANCE A SMALL, SOFT ITEM ON YOUR HEAD FOR UP TO 20 SECONDS. TRY TO MAKE EACH OTHER LAUGH. NO TOUCHING. FIRST ITEM TO FALL LOSES. IF BOTH STAY UP, TIE.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (5).png"
  },
  {
    "id": "battle-7",
    "cardType": "BATTLE",
    "challenge": "EACH MAKE A 10-SECOND ENTRANCE AS IF YOU ARE THE MOST FAMOUS PERSON IN THE ROOM. THE OTHER PLAYERS CHOOSE THE FUNNIER ENTRANCE. YOU MAY STAY SEATED.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (6).png"
  },
  {
    "id": "battle-8",
    "cardType": "BATTLE",
    "challenge": "EACH GIVE A SILLY EXCUSE FOR BEING LATE, USING ONE OBJECT YOU CAN SEE. TAKE UP TO 15 SECONDS EACH. THE OTHER PLAYERS CHOOSE THE FUNNIER EXCUSE.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (7).png"
  },
  {
    "id": "battle-9",
    "cardType": "BATTLE",
    "challenge": "THE OTHER PLAYERS NAME A SMALL EVERYDAY PROBLEM. EACH GIVE ONE SILLY, HARMLESS SOLUTION. THEY CHOOSE THE FUNNIER IDEA.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (8).png"
  },
  {
    "id": "battle-10",
    "cardType": "BATTLE",
    "challenge": "TAKE TURNS MAKING ANIMAL SOUNDS. THE GROUP DECIDES WHICH PLAYER WAS THE MOST CONVINCING.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points (9).png"
  },
  {
    "id": "battle-hero",
    "cardType": "BATTLE",
    "challenge": "FOR 30 SECONDS, TRY TO MAKE EACH OTHER LAUGH. NO TOUCHING. FIRST TO LAUGH LOSES. IF NEITHER LAUGHS, IT IS A TIE.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points hero.png"
  },
  {
    "id": "battle-11",
    "cardType": "BATTLE",
    "challenge": "TAKE TURNS GIVING EACH OTHER A COMPLIMENT IN AN ANGRY MOVIE-VILLAIN VOICE. NO SHOUTING. FIRST TO LAUGH LOSES. AFTER THREE COMPLIMENTS EACH, TIE.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 2 points.png"
  },
  {
    "id": "battle-12",
    "cardType": "BATTLE",
    "challenge": "EACH GETS 20 SECONDS TO EXPLAIN WHY YOU ARE THE WORLD'S WORST SPY. DESCRIBE TWO SILLY MISTAKES FROM ONE MISSION. THE OTHER PLAYERS CHOOSE THE FUNNIER STORY.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 3 points (2).png"
  },
  {
    "id": "battle-13",
    "cardType": "BATTLE",
    "challenge": "THE OTHER PLAYERS CHOOSE TWO EVERYDAY THINGS. TAKE ONE EACH. YOU EACH GET 20 SECONDS TO ARGUE WHY YOURS SHOULD RULE THE WORLD. THEY CHOOSE THE FUNNIER ARGUMENT.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 3 points (3).png"
  },
  {
    "id": "battle-14",
    "cardType": "BATTLE",
    "challenge": "EACH GETS 20 SECONDS TO INTRODUCE A USELESS SUPERHERO. GIVE A NAME, EXPLAIN THE POWER, AND SHOW THE HERO'S POSE. THE OTHER PLAYERS CHOOSE THE FUNNIER HERO.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/battle 3 points.png"
  },
  {
    "id": "chaos-1",
    "cardType": "CHAOS",
    "challenge": "CHOOSE AN OBJECT IN THE ROOM. GIVE IT A SAD 15-SECOND GOODBYE AS IF YOU WILL NEVER SEE IT AGAIN.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 1 point.png"
  },
  {
    "id": "chaos-2",
    "cardType": "CHAOS",
    "challenge": "PRETEND YOU'RE ON A SECRET MISSION, BUT EVERYTHING YOU DO KEEPS ACCIDENTALLY EXPOSING YOU.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point (2).png"
  },
  {
    "id": "chaos-3",
    "cardType": "CHAOS",
    "challenge": "PRETEND YOU WALKED INTO THE WRONG ROOM. SAY WHY YOU ARE THERE, THEN ACT AS IF NOTHING IS WRONG FOR 10 SECONDS.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point (3).png"
  },
  {
    "id": "chaos-4",
    "cardType": "CHAOS",
    "challenge": "PRETEND YOU ARE FROM THE FUTURE. CHOOSE AN OBJECT IN THE ROOM AND EXPLAIN WHY PEOPLE NO LONGER USE IT. ACT SHOCKED FOR 15 SECONDS.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point (4).png"
  },
  {
    "id": "chaos-5",
    "cardType": "CHAOS",
    "challenge": "PRETEND YOU MEET YOUR CHILDHOOD HERO. ACT EXCITED, THEN TRY TO LOOK CALM. KEEP GOING FOR 15 SECONDS.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point (5).png"
  },
  {
    "id": "chaos-6",
    "cardType": "CHAOS",
    "challenge": "AN INVISIBLE ANIMAL REFUSES TO LEAVE YOUR HOUSE. STAY POLITE AT FIRST, THEN SLOWLY LOSE YOUR PATIENCE WITHOUT GETTING MAD. ARGUE WITH IT.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point (6).png"
  },
  {
    "id": "chaos-7",
    "cardType": "CHAOS",
    "challenge": "PRETEND YOUR VOICE HAS BATTERY. GIVE A 15-SECOND MESSAGE AS YOUR VOICE GETS SLOWER. FREEZE WHEN THE BATTERY RUNS OUT.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point (7).png"
  },
  {
    "id": "chaos-8",
    "cardType": "CHAOS",
    "challenge": "GIVE A SERIOUS 15-SECOND SPEECH WHILE PRETENDING A FLY KEEPS LANDING ON YOU. KEEP TRYING TO CONTINUE YOUR SPEECH.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point (8).png"
  },
  {
    "id": "chaos-hero",
    "cardType": "CHAOS",
    "challenge": "YOUR SHOELACES ARE MYSTERIOUSLY TIED TOGETHER. WALK NORMALLY WHILE DESPERATELY TRYING TO CONVINCE EVERYONE NOTHING IS WRONG.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point hero.png"
  },
  {
    "id": "chaos-9",
    "cardType": "CHAOS",
    "challenge": "PRETEND YOU JUST WOKE UP AFTER 20 YEARS. POINT AT TWO THINGS IN THE ROOM AND REACT AS IF YOU HAVE NEVER SEEN THEM.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 2 point.png"
  },
  {
    "id": "chaos-10",
    "cardType": "CHAOS",
    "challenge": "ACT AS BOTH YOU AND YOUR REFLECTION. HAVE A 20-SECOND ARGUMENT ABOUT WHO IS COPYING WHOM. END BY APOLOGIZING TO THE MIRROR.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 3 point (2).png"
  },
  {
    "id": "chaos-11",
    "cardType": "CHAOS",
    "challenge": "SHOW A USELESS TALENT FOR 10 SECONDS AS IF YOU ARE A WORLD CHAMPION. FINISH WITH A PROUD BOW.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 3 point (3).png"
  },
  {
    "id": "chaos-12",
    "cardType": "CHAOS",
    "challenge": "START AS A STATUE. COME TO LIFE, NOTICE THE VISITORS, AND PRETEND YOU WERE NEVER A STATUE. ACT OUT ALL THREE PARTS IN 20 SECONDS.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 3 point (4).png"
  },
  {
    "id": "chaos-13",
    "cardType": "CHAOS",
    "challenge": "ACT AS A MOVIE VILLAIN FOR 20 SECONDS. EXPLAIN HOW A TINY PROBLEM RUINED YOUR DAY AND MADE YOU WANT TO TAKE OVER THE WORLD.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 3 point (5).png"
  },
  {
    "id": "chaos-14",
    "cardType": "CHAOS",
    "challenge": "STAY IN YOUR SEAT. ACT AS A BIRD WHO FORGOT HOW TO FLY. SHOW THREE SILLY ATTEMPTS, GETTING MORE CONFIDENT EACH TIME.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/chaos 3 point.png"
  },
  {
    "id": "connect-1",
    "cardType": "CONNECT",
    "challenge": "WHAT LESSON TOOK YOU THE LONGEST TO UNLEARN?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 1 point (2).png"
  },
  {
    "id": "connect-2",
    "cardType": "CONNECT",
    "challenge": "WHO MAKES YOU FEEL FREE TO BE YOURSELF?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 1 point (3).png"
  },
  {
    "id": "connect-3",
    "cardType": "CONNECT",
    "challenge": "WHAT WOULD YOUR YOUNGER SELF BE RELIEVED ABOUT?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 1 point (4).png"
  },
  {
    "id": "connect-4",
    "cardType": "CONNECT",
    "challenge": "NAME A SMALL HABIT YOU HAVE THAT MAKES YOU LAUGH.",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 1 point.png"
  },
  {
    "id": "connect-5",
    "cardType": "CONNECT",
    "challenge": "WHAT DO YOU PRETEND TO DISLIKE BUT ACTUALLY ENJOY?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 2 point (2).png"
  },
  {
    "id": "connect-6",
    "cardType": "CONNECT",
    "challenge": "WHAT IS SOMETHING PEOPLE OFTEN MISUNDERSTAND ABOUT YOU?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 2 point (3).png"
  },
  {
    "id": "connect-7",
    "cardType": "CONNECT",
    "challenge": "NAME A PLACE YOU ENJOY VISITING. TELL US WHAT YOU LIKE ABOUT IT.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 2 point (4).png"
  },
  {
    "id": "connect-8",
    "cardType": "CONNECT",
    "challenge": "WHAT DO YOU STILL WANT TO SHOW YOURSELF YOU CAN DO?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 2 point (5).png"
  },
  {
    "id": "connect-9",
    "cardType": "CONNECT",
    "challenge": "WHAT DID YOU BELIEVE AS A KID THAT TURNED OUT TO BE COMPLETELY WRONG?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 2 point.png"
  },
  {
    "id": "connect-10",
    "cardType": "CONNECT",
    "challenge": "WHAT'S ONE THING ABOUT YOURSELF YOU'D LIKE TO KEEP JUST THE WAY IT IS?",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 3 point (2).png"
  },
  {
    "id": "connect-11",
    "cardType": "CONNECT",
    "challenge": "DESCRIBE WHAT BEING A GOOD FRIEND MEANS TO YOU. SHARE A MOMENT WHEN SOMEONE WAS THAT KIND OF FRIEND.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 3 point (3).png"
  },
  {
    "id": "connect-12",
    "cardType": "CONNECT",
    "challenge": "WHAT'S GOING WELL IN YOUR LIFE? WHAT'S BEEN HARD FOR YOU LATELY?",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 3 point (4).png"
  },
  {
    "id": "connect-13",
    "cardType": "CONNECT",
    "challenge": "WHAT WAS YOUR CHILDHOOD LIKE, AND WHAT DO YOU REMEMBER MOST?",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 3 point (5).png"
  },
  {
    "id": "connect-hero",
    "cardType": "CONNECT",
    "challenge": "DO YOU THINK OTHERS SEE YOU THE SAME WAY YOU SEE YOURSELF?",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 3 point hero.png"
  },
  {
    "id": "connect-14",
    "cardType": "CONNECT",
    "challenge": "TELL US ONE WAY YOU HAVE CHANGED SINCE YOU WERE YOUNGER AND ONE WAY YOU ARE STILL THE SAME.",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/connect 3 point.png"
  },
  {
    "id": "love-1",
    "cardType": "LOVE",
    "challenge": "WHAT SMALL THING MAKES YOU FEEL LOVED?",
    "difficulty": "EASY",
    "stars": 1,
    "points": 1,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 1 point.png"
  },
  {
    "id": "love-2",
    "cardType": "LOVE",
    "challenge": "WHAT ROMANTIC GESTURE DO YOU CALL CHEESY BUT SECRETLY WANT?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 2  point (2).png"
  },
  {
    "id": "love-3",
    "cardType": "LOVE",
    "challenge": "NAME SOMETHING A DATE COULD DO FOR YOU THAT COSTS NO MONEY. TELL US WHY YOU WOULD LIKE IT.",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 2  point (3).png"
  },
  {
    "id": "love-4",
    "cardType": "LOVE",
    "challenge": "WHAT WOULD YOUR FRIENDS SAY YOU DO DIFFERENTLY WHEN YOU LIKE SOMEONE?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 2  point (4).png"
  },
  {
    "id": "love-5",
    "cardType": "LOVE",
    "challenge": "WHAT'S THE CUTEST THING SOMEONE COULD DO THAT WOULD SECRETLY MELT YOU?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 2  point (5).png"
  },
  {
    "id": "love-hero",
    "cardType": "LOVE",
    "challenge": "WHAT FOOD WOULD BE HARDEST FOR YOU TO SHARE EVEN WITH YOUR CRUSH?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 2  point hero.png"
  },
  {
    "id": "love-6",
    "cardType": "LOVE",
    "challenge": "WHAT MAKES YOU FEEL COMFORTABLE BEING YOURSELF AROUND SOMEONE?",
    "difficulty": "FUN",
    "stars": 2,
    "points": 2,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 2  point.png"
  },
  {
    "id": "love-7",
    "cardType": "LOVE",
    "challenge": "WHAT MAKES YOU START LIKING SOMEONE MORE THAN YOU EXPECTED?",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 3  point (2).png"
  },
  {
    "id": "love-8",
    "cardType": "LOVE",
    "challenge": "WHAT'S SOMETHING YOU FIND ATTRACTIVE THAT HAS NOTHING TO DO WITH LOOKS?",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 3  point (3).png"
  },
  {
    "id": "love-9",
    "cardType": "LOVE",
    "challenge": "CAN YOU MEET THE RIGHT PERSON AT THE WRONG TIME? OR WHY NOT?",
    "difficulty": "WILD",
    "stars": 3,
    "points": 3,
    "themeColor": "#5170FF",
    "accentColor": "#5170FF",
    "imageUrl": "/cards/love 3  point.png"
  }
];

/**
 * 18 CURATED SAMPLE CARDS (EXACTLY 3 CARDS PER CARD TYPE)
 * Hand-picked flagship cards showcasing Easy, Fun, and Wild difficulties.
 */
export const SAMPLE_CARD_IDS = new Set([
  // GUESS (10 cards: all 1pt EASY)
  'guess-hero', 'guess-1', 'guess-2',
  // CREATE (1pt, 2pt, 3pt)
  'create-hero', 'create-4', 'create-10',
  // BATTLE (1pt, 2pt, 3pt)
  'battle-1', 'battle-hero', 'battle-12',
  // CHAOS (1pt, 2pt, 3pt)
  'chaos-1', 'chaos-hero', 'chaos-10',
  // CONNECT (1pt, 2pt, 3pt)
  'connect-1', 'connect-4', 'connect-hero',
  // LOVE (1pt, 2pt, 3pt)
  'love-1', 'love-hero', 'love-7',
]);

export const CURATED_SAMPLE_CARDS: GameCard[] = OFFICIAL_DECK.filter((c) =>
  SAMPLE_CARD_IDS.has(c.id)
);

export const PLAYTEST_SAMPLER_CARDS: GameCard[] = CURATED_SAMPLE_CARDS;
export const SAMPLE_PREVIEW_DECK: GameCard[] = CURATED_SAMPLE_CARDS;
