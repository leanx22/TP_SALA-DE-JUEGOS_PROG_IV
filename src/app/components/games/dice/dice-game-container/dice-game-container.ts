import { Component, inject } from '@angular/core';
import { DiceGameService } from '../../../../services/games/dice/dice-game-service';
import { DicePersistanceService } from '../../../../services/games/dice/dice-persistance-service';
import { SupaAuthService } from '../../../../services/supabase/supa-auth-service';

@Component({
  selector: 'app-dice-game-container',
  imports: [],
  templateUrl: './dice-game-container.html',
  styleUrl: './dice-game-container.scss',
})
export class DiceGameContainer {
  public gameService = inject(DiceGameService);
  private persistanceService = inject(DicePersistanceService);
  private authService = inject(SupaAuthService);

  public message = '';

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.message = 'Tirá los dados para sumar puntos. Si sale 7 perdés todo.';
    this.gameService.startGame();
  }

  async onRoll() {
    const result = this.gameService.rollDice();

    if (result.bust) {
      this.message = `Salió 7! Perdiste todo. Puntos totales: 0.`;
      await this.guardarResultado();
    } else {
      this.message = `Sacaste un ${result.sum}. Llevás acumulados ${this.gameService.getCurrentPot()} puntos.`;
    }
  }

  async onBank() {
    this.gameService.bankPoints();
    this.message = `PLANTADO: Aseguraste ${this.gameService.getScore()} puntos.`;
    await this.guardarResultado();
  }

  private async guardarResultado() {
    try {
      const currentUser = this.authService.currentUser();
      if (!currentUser) return;

      const payload = {
        user_id: currentUser.id,
        total_points: this.gameService.getScore(),
        game_time: this.gameService.getGameTime()
      };

      await this.persistanceService.saveMatchResults(payload);
    } catch (error) {
      console.error(error);
    }
  }
}
