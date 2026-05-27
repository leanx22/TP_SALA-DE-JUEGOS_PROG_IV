import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiceGameService {
  private dice1 = signal<number>(1);
  private dice2 = signal<number>(1);
  private currentPot = signal<number>(0);
  private score = signal<number>(0);
  private gameOver = signal<boolean>(false);
  private startTime: number | null = null;

  public readonly getDice1 = this.dice1.asReadonly();
  public readonly getDice2 = this.dice2.asReadonly();
  public readonly getCurrentPot = this.currentPot.asReadonly();
  public readonly getScore = this.score.asReadonly();
  public readonly isGameOver = this.gameOver.asReadonly();

  public startGame() {
    this.score.set(0);
    this.currentPot.set(0);
    this.gameOver.set(false);
    this.dice1.set(1);
    this.dice2.set(1);
    this.startTime = Date.now();
  }

  public rollDice(): { bust: boolean; sum: number } {
    if (this.gameOver()) return { bust: false, sum: 0 };

    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;

    this.dice1.set(roll1);
    this.dice2.set(roll2);

    const sum = roll1 + roll2;

    if (sum === 7) {
      this.currentPot.set(0);
      this.score.set(0);
      this.gameOver.set(true);
      return { bust: true, sum };
    }

    this.currentPot.update(p => p + sum);
    return { bust: false, sum };
  }

  public bankPoints() {
    if (this.gameOver()) return;
    this.score.set(this.currentPot());
    this.gameOver.set(true);
  }

  public getGameTime(): number {
    if (!this.startTime) return 0;
    return Date.now() - this.startTime;
  }
}
