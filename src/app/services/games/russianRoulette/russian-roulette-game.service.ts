import { Injectable, signal } from '@angular/core';

export type Turn = 'player' | 'ai';
export type Winner = Turn | null;

@Injectable({
  providedIn: 'root'
})
export class RussianRouletteGameService {
  private cylinder = signal<boolean[]>([]);
  private currentChamberIndex = signal<number>(0);
  
  private turn = signal<Turn>('player');
  private mustShootSelf = signal<boolean>(false);
  private winner = signal<Winner>(null);
  private startTime: number | null = null;

  public readonly currentTurn = this.turn.asReadonly();
  public readonly isForcedSelf = this.mustShootSelf.asReadonly();
  public readonly currentWinner = this.winner.asReadonly();

  public startGame() {
    this.winner.set(null);
    this.turn.set('player');
    this.mustShootSelf.set(false);
    this.startTime = Date.now();
    this.reloadGun();
  }

  private reloadGun() {
    const chambers = [false, false, false, false, false, false];
    const bulletIndex = Math.floor(Math.random() * 6);
    chambers[bulletIndex] = true;
    this.cylinder.set(chambers);
    this.currentChamberIndex.set(0);
  }

  private pullTrigger(): boolean {
    const chambers = this.cylinder();
    const index = this.currentChamberIndex();
    const hasBullet = chambers[index];
    
    if (index < 5) {
      this.currentChamberIndex.update(i => i + 1);
    } else {
      this.reloadGun();
    }
    
    return hasBullet;
  }

  public shootSelf(): { died: boolean } {
    if (this.winner()) return { died: false };

    const died = this.pullTrigger();
    if (died) {
      this.winner.set(this.turn() === 'player' ? 'ai' : 'player');
    } else {
      if (this.mustShootSelf()) {
        // Survived forced shot, turn ends
        this.mustShootSelf.set(false);
        this.turn.set(this.turn() === 'player' ? 'ai' : 'player');
      } else {
        // Survived voluntary shot, gets to choose again (turn remains)
      }
    }
    return { died };
  }

  public shootOpponent(): { died: boolean } {
    if (this.winner() || this.mustShootSelf()) return { died: false };

    const died = this.pullTrigger();
    if (died) {
      this.winner.set(this.turn() === 'player' ? 'player' : 'ai');
    } else {
      // Missed opponent, must shoot self
      this.mustShootSelf.set(true);
    }
    return { died };
  }

  public getScore(): number {
    return this.winner() === 'player' ? 1 : 0;
  }

  public getGameTime(): number {
    if (!this.startTime) return 0;
    return Date.now() - this.startTime;
  }
}
