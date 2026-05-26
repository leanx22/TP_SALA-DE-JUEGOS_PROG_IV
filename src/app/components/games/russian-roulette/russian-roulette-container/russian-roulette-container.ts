import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RussianRouletteGameService } from '../../../../services/games/russianRoulette/russian-roulette-game.service';
import { RussianRoulettePersistanceService } from '../../../../services/games/russianRoulette/russian-roulette-persistance.service';
import { SupaAuthService } from '../../../../services/supabase/supa-auth-service';
import { RussianRouletteGameCreationPayload } from '../../../../model/Games/russianRoulette/russianRouletteStats';

@Component({
  selector: 'app-russian-roulette-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './russian-roulette-container.html',
  styleUrls: ['./russian-roulette-container.scss']
})
export class RussianRouletteContainerComponent implements OnInit {
  public gameService = inject(RussianRouletteGameService);
  private persistanceService = inject(RussianRoulettePersistanceService);
  private authService = inject(SupaAuthService);

  public message = '';
  public isShooting = false;
  // 'left' apunta al jugador, 'right' apunta a la IA
  public gunPointing: 'left' | 'right' = 'up' as any;

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.message = '¡Tu turno! Elige a quién disparar.';
    this.gunPointing = 'up' as any;
    this.gameService.startGame();
  }

  async onShootEnemy() {
    if (this.isShooting || this.gameService.currentTurn() !== 'player') return;
    this.isShooting = true;
    this.gunPointing = 'right'; // Apuntar a IA
    
    this.message = 'Apuntando al enemigo...';
    await this.delay(600);
    
    const result = this.gameService.shootOpponent();
    if (result.died) {
      this.message = '¡PUM! Le diste a la máquina. ¡Has ganado!';
      await this.finalizarPartida();
    } else {
      this.message = '*Click* Fallaste. ¡Ahora debes dispararte a ti mismo!';
    }
    this.isShooting = false;
  }

  async onShootSelf() {
    if (this.isShooting || this.gameService.currentTurn() !== 'player') return;
    this.isShooting = true;
    this.gunPointing = 'left'; // Apuntarse a sí mismo
    
    this.message = 'Apuntando a ti mismo...';
    await this.delay(600);
    
    const result = this.gameService.shootSelf();
    if (result.died) {
      this.message = '¡PUM! Has muerto. Gana la máquina.';
      await this.finalizarPartida();
    } else {
      if (this.gameService.currentTurn() === 'ai') {
        this.message = '*Click* Te salvaste de milagro. Turno de la máquina.';
        this.startAITurn();
      } else {
        this.message = '*Click* Te salvaste. Puedes volver a elegir.';
      }
    }
    this.isShooting = false;
  }

  private async startAITurn() {
    while (this.gameService.currentTurn() === 'ai' && !this.gameService.currentWinner()) {
      await this.delay(1500); // IA "pensando"
      
      if (this.gameService.isForcedSelf()) {
        await this.aiShootSelf();
      } else {
        // La IA elige al azar 50/50
        if (Math.random() < 0.5) {
          await this.aiShootSelf();
        } else {
          await this.aiShootEnemy();
        }
      }
    }
  }

  private async aiShootSelf() {
    this.isShooting = true;
    this.gunPointing = 'right'; // IA está a la derecha, se apunta a sí misma
    this.message = 'La máquina se apunta a sí misma...';
    await this.delay(600);
    
    const result = this.gameService.shootSelf();
    if (result.died) {
      this.message = '¡PUM! La máquina se disparó. ¡Tú ganas!';
      await this.finalizarPartida();
    } else {
      if (this.gameService.currentTurn() === 'player') {
        this.message = '*Click* La máquina sobrevivió. Es tu turno.';
      } else {
        this.message = '*Click* La máquina sobrevivió. Juega de nuevo.';
      }
    }
    this.isShooting = false;
  }

  private async aiShootEnemy() {
    this.isShooting = true;
    this.gunPointing = 'left'; // IA te apunta a ti (jugador a la izquierda)
    this.message = 'La máquina te apunta a ti...';
    await this.delay(600);
    
    const result = this.gameService.shootOpponent();
    if (result.died) {
      this.message = '¡PUM! La máquina te disparó. Has muerto.';
      await this.finalizarPartida();
    } else {
      this.message = '*Click* La máquina falló. Ahora debe dispararse.';
    }
    this.isShooting = false;
  }

  private async finalizarPartida() {
    try {
      const currentUser = this.authService.currentUser();
      if (!currentUser) return;

      const payload: RussianRouletteGameCreationPayload = {
        player: currentUser.id,
        score: this.gameService.getScore(),
        game_time: this.gameService.getGameTime()
      };

      await this.persistanceService.sendResults(payload);
    } catch (error) {
      console.error("Error al guardar resultados del juego:", error);
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
