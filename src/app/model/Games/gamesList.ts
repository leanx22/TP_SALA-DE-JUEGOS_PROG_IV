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
    url: '/games/morl',
    needLogin: true,
  },
  {
    name: 'Preguntados',
    description: 'Cuánto sabés?',
    image: 'assets/Games/heroImages/preguntados_low.jpg',
    url: '/games/quizz',
    needLogin: true,
  },
  {
    name: 'Ruletita',
    description: 'Una ruleta rusa diferente.',
    image: 'assets/Games/heroImages/Ruletita_low.jpg',
    url: '/games/roulette',
    needLogin: true,
  },
];
