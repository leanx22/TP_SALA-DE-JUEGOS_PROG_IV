import { Component, OnInit, inject } from '@angular/core';
import { HangmanGameService } from '../../../../services/games/Hangman/hangman-game-service';
import { HangmanPersistanceService } from '../../../../services/games/Hangman/hangman-persistance-service';
import { SupaAuthService } from '../../../../services/supabase/supa-auth-service';
import { HangmanDisplayComponent } from '../hangman-display/hangman-display';
import { AlphabetKeyboardComponent } from '../../../shared/alphabet-keyboard/alphabet-keyboard';
import { HangmanGameCreationPayload } from '../../../../model/Games/hangman/hangmanGameStats';

@Component({
  selector: 'app-hangman-container',
  standalone: true,
  imports: [HangmanDisplayComponent, AlphabetKeyboardComponent],
  templateUrl: './hangman-container.html',
  styleUrls: ['./hangman-container.scss']
})
export class HangmanContainerComponent implements OnInit {
  public gameService = inject(HangmanGameService);
  private persistanceService = inject(HangmanPersistanceService);
  private authService = inject(SupaAuthService);

  public gameEnded = false;
  public winStatus = false;

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.gameEnded = false;
    this.winStatus = false;
    this.gameService.startGame();
  }

  handleLetterClick(letter: string) {
    if (this.gameEnded) return;

    this.gameService.checkLetter(letter);
    this.checkGameStatus();
  }

  private async checkGameStatus() {
    const errores = this.gameService.incorrectLettersCount();
    const displayArray = this.gameService.display();
    
    if (errores >= this.gameService.maxErrors) {
      await this.finalizarPartida(false);
      return;
    }

    if (displayArray.length > 0 && !displayArray.includes('_')) {
      await this.finalizarPartida(true);
    }
  }

  private async finalizarPartida(win: boolean) {
    this.gameEnded = true;
    this.winStatus = win;

    try {
      const currentUser = this.authService.currentUser();
      
      if(!currentUser) throw new Error("El usuario no esta logueado");

      const payload:HangmanGameCreationPayload = {
        player: currentUser.id,
        win: win,
        correct_letters_count: this.gameService.correctLettersCount(),
        incorrect_letters_count: this.gameService.incorrectLettersCount(),
        game_time: this.gameService.getGameTime()
      };

      await this.persistanceService.sendResults(payload);
    } catch (error) {
      console.error("Error al guardar resultados del juego:", error);
    }
  }
}