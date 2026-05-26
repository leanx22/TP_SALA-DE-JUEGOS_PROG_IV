export type GameInfo = {
  name: string;
  description: string;
  image: string;
  url: string;
  needLogin: boolean;
};

export const GameList: GameInfo[] = [
  {
    name: 'Ahorcado',
    description: 'Podés descubrir la palabra antes de que el loco se cuelgue?',
    image: 'assets/Games/heroImages/ahorcado_low.jpg',
    url: '/games/hangman',
    needLogin: true,
  },
  {
    name: 'Mayor o menor',
    description: 'Descubrí el número secreto.',
    image: 'assets/Games/heroImages/mom_low.jpg',
    url: '/games/greater-or-less',
    needLogin: true,
  },
  {
    name: 'Preguntados',
    description: 'Cuánto sabés?',
    image: 'assets/Games/heroImages/preguntados_low.jpg',
    url: '/games/trivia',
    needLogin: true,
  },
  {
    name: '7Dice',
    description: 'Apostá todo.',
    image: 'assets/Games/heroImages/dice.png',
    url: '/games/dice',
    needLogin: true,
  },
];
