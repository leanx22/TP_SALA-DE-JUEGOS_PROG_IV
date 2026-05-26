import { Injectable, signal, WritableSignal } from '@angular/core';
import { Palos, PlayingCard } from '../../../model/Games/moreOrLess/playing-card';

@Injectable({
  providedIn: 'root',
})
export class MorlGameService {
  private remainingDeck: WritableSignal<PlayingCard[]> = signal([]);
  
  public currentCard: WritableSignal<PlayingCard | null> = signal(null);
  public score: WritableSignal<number> = signal(0);
  public isGameOver: WritableSignal<boolean> = signal(false);
  public message: WritableSignal<string> = signal('');


  public startGame(): void {
    this.score.set(0);
    this.isGameOver.set(false);
    this.message.set('Indicá si la siguiente carta aleatoria será mayor o menor.');
    
    const freshDeck = this.generateDeck();
    const shuffled = this.shuffleDeck(freshDeck);
    
    const firstCard = shuffled.pop() || null;
    
    this.remainingDeck.set(shuffled);
    this.currentCard.set(firstCard);
  }

  public guess(choice: 'mayor' | 'menor'): void {
    const current = this.currentCard();
    const deck = this.remainingDeck();

    if (this.isGameOver() || !current || deck.length === 0) {
      return;
    }

    const updatedDeck = [...deck];
    const nextCard = updatedDeck.pop() || null;
    
    this.remainingDeck.set(updatedDeck);
    this.currentCard.set(nextCard);

    if (!nextCard) {
      this.isGameOver.set(true);
      this.message.set('No hay más cartas! Fin del juego.');
      return;
    }

    const esMayor = nextCard.valor > current.valor;
    const esMenor = nextCard.valor < current.valor;
    const esIgual = nextCard.valor === current.valor;

    if ((choice === 'mayor' && esMayor) || (choice === 'menor' && esMenor)) {
      this.score.update((prev) => prev + 1);
      this.message.set('Correcto!');
    } else if (esIgual) {
      this.message.set('Cartas iguales! Se continúa.');
    } else {
      this.isGameOver.set(true);
      this.message.set('Incorrecto! Perdiste.');
    }

    if (!this.isGameOver() && updatedDeck.length === 0) {
      this.isGameOver.set(true);
      this.message.set('Ganaste. Adivinaste todo el mazo!');
    }
  }

  private generateDeck(): PlayingCard[] {
    const deck: PlayingCard[] = [];
    const palos: Palos[] = ['copa', 'oro', 'espada', 'basto'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const palo of palos) {
      for (const value of values) {
        deck.push({ palo: palo, valor: value });
      }
    }

    return deck;
  }

  private shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
    const shuffled = [...deck];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }
}
