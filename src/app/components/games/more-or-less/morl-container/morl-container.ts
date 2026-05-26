import { Component, OnInit, inject, effect } from '@angular/core';
import { MorlGameService } from '../../../../services/games/MoreOrLess/morl-game-service';
import { MorlPersistanceService } from '../../../../services/games/MoreOrLess/morl-persistance-service';
import { SupaAuthService } from '../../../../services/supabase/supa-auth-service';
import { PlayingCardDisplayComponent } from '../playing-card-display/playing-card-display';
import { MorLGameStatCreationPayload } from '../../../../model/Games/moreOrLess/MorlGamestats';

@Component({
  selector: 'app-morl-container',
  standalone: true,
  imports: [PlayingCardDisplayComponent],
  templateUrl: './morl-container.html',
  styleUrls: ['./morl-container.scss']
})
export class MorlContainerComponent implements OnInit {
  public gameService = inject(MorlGameService);
  private persistanceService = inject(MorlPersistanceService);
  private authService = inject(SupaAuthService);

  constructor() {
    effect(() => {
      if (this.gameService.isGameOver()) {
        this.finalizarPartida();
      }
    });
  }

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.gameService.startGame();
  }

  handleGuess(choice: 'mayor' | 'menor') {
    this.gameService.guess(choice);
  }

  private async finalizarPartida() {
    try {
      const currentUser = this.authService.currentUser();
      
      if(!currentUser) throw new Error("El usuario no esta logueado");
      
      const won = this.gameService.message() === '¡Ganaste, adivinaste todo el mazo!';

      const payload: MorLGameStatCreationPayload = {
        player: currentUser.id,
        points: this.gameService.score(),
        win: won
      };

      await this.persistanceService.sendResults(payload);
    } catch (error) {
      console.error("Error al guardar resultados del juego:", error);
    }
  }
}
