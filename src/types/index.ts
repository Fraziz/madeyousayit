export type CardType =
  | 'CONNECT'
  | 'GUESS'
  | 'BATTLE'
  | 'CHAOS'
  | 'CREATE'
  | 'LOVE';

export type CardDifficulty = 'EASY' | 'FUN' | 'WILD';

export interface GameCard {
  id: string;
  cardType: CardType;
  challenge: string;
  difficulty: CardDifficulty;
  stars: number;
  points: number;
  themeColor: string;
  accentColor: string;
  subtext?: string;
  isLocked?: boolean;
  imageUrl?: string;
}

export interface RuleSection {
  number: number;
  title: string;
  summary: string;
  details: string[];
  callout?: string;
  steps?: { label: string; action: string }[];
}

export interface CartItem {
  id: string;
  name: string;
  edition?: string;
  subtitle?: string;
  price: number;
  quantity: number;
  badge?: string;
  description?: string;
  imageUrl?: string;
}
