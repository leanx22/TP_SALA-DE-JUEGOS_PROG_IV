import { Injectable, signal, computed } from '@angular/core';
import { wordList } from '../../../model/Games/hangman/wordList';

@Injectable({
  providedIn: 'root',
})
export class HangmanGameService {
  private readonly wordList = wordList;
  private word = signal<string | null>(null);
  private hint = signal<string | null>(null);
  private usedLetters = signal<string[]>([]);

  public readonly display = computed<string[]>(() => {
    const exploded = this.explodedWord();
    const usedLetters = this.usedLetters();
    let display: string[] = [];

    exploded.map((letter) => {
      if (usedLetters.includes(letter)) display.push(letter);
      display.push('_');
    });

    return display;
  });

  public readonly explodedWord = computed<string[]>(() => {
    const currentWord = this.word();
    if (!currentWord) return [];
    return currentWord.split('');
  });

  public currentWord = this.word.asReadonly();
  public currentHint = this.hint.asReadonly();
  public currentUsedLetters = this.usedLetters.asReadonly();

  private generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.wordList.length);
    const selectedItem = this.wordList[randomIndex];

    this.word.set(selectedItem.word);
    this.hint.set(selectedItem.hint);
  }

  /**
   * Busca si la palabra actual contiene la letra especificada por parametro.
   * @param letter Letra a verificar
   * @returns Retorna un objeto indicando si la letra está o no (success) y el/los índices (index)
   * donde se encuentra la letra en caso de éxito.
   */
  public checkLetter(letter: string): { success: boolean; indexes: number[] | null } {
    const currentWord = this.word();
    const currentWordExploded = this.explodedWord();

    if (!currentWord || !currentWordExploded) throw new Error('Aún no hay una palabra definida!');

    this.addUsedLetter(letter);

    const upperLetter = letter.toUpperCase();
    if (!currentWordExploded.includes(upperLetter)) return { success: false, indexes: null };

    let indexes: number[] = [];
    for (let i = 0; i < currentWordExploded.length; i++) {
      if (currentWordExploded[i] === upperLetter) indexes.push(i);
    }

    return { success: true, indexes: indexes };
  }

  /**
   * Agrega una letra a la lista de ya utilizadas.
   * @param letter Letra a agregar.
   * @returns Nada.
   */
  private addUsedLetter(letter: string) {
    const currentUsedLetters = this.usedLetters();
    if (currentUsedLetters.includes(letter)) return;
    this.usedLetters.update((prev) => [...prev, letter]);
  }
}
