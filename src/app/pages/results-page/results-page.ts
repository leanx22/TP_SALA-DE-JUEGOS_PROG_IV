import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupaAuthService } from '../../services/supabase/supa-auth-service';
import { HangmanPersistanceService } from '../../services/games/Hangman/hangman-persistance-service';
import { TriviaPersistenceService } from '../../services/games/trivia/trivia-persistance-service';
import { MorlPersistanceService } from '../../services/games/MoreOrLess/morl-persistance-service';
import { DicePersistanceService } from '../../services/games/dice/dice-persistance-service';
import { HangmanGameStats } from '../../model/Games/hangman/hangmanGameStats';
import { TriviaMatch } from '../../model/Games/trivia/Trivia';
import { MorLGamesStats } from '../../model/Games/moreOrLess/MorlGamestats';
import { DiceGameMatch } from '../../model/Games/Dice/dice';
import { FsSpinner } from "../../components/shared/fs-spinner/fs-spinner";

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [CommonModule, FsSpinner],
  templateUrl: './results-page.html',
  styleUrls: ['./results-page.scss'],
})
export class ResultsPage implements OnInit {
  private authService = inject(SupaAuthService);
  private hangmanService = inject(HangmanPersistanceService);
  private triviaService = inject(TriviaPersistenceService);
  private morlService = inject(MorlPersistanceService);
  private diceService = inject(DicePersistanceService);

  public hangmanResults = signal<HangmanGameStats[]>([]);
  public triviaResults = signal<TriviaMatch[]>([]);
  public morlResults = signal<MorLGamesStats[]>([]);
  public diceResults = signal<DiceGameMatch[]>([]);
  public isLoading = signal<boolean>(true);

  async ngOnInit() {
    await this.loadResults();
  }

  private async loadResults() {
    this.isLoading.set(true);
    try {
      const currentUser = this.authService.currentUser();
      if (!currentUser) {
        this.isLoading.set(false);
        return;
      }
      
      const userId = currentUser.id;

      const [hangman, trivia, morl, dice] = await Promise.all([
        this.hangmanService.getPlayerGames(userId),
        this.triviaService.getMatchesByUser(),
        this.morlService.getPlayerGames(userId),
        this.diceService.getUserMatches(userId)
      ]);

      this.hangmanResults.set(this.sortHangman(hangman as HangmanGameStats[]));
      this.triviaResults.set(this.sortTrivia(trivia));
      this.morlResults.set(this.sortMorl(morl as MorLGamesStats[]));
      this.diceResults.set(this.sortDice(dice));

    } catch (error) {
      console.error('Error fetching results', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private sortHangman(results: HangmanGameStats[]): HangmanGameStats[] {
    return results.sort((a, b) => {
      if (a.win !== b.win) return a.win ? -1 : 1;
      if (a.correct_letters_count !== b.correct_letters_count) {
        return b.correct_letters_count - a.correct_letters_count;
      }
      return a.incorrect_letters_count - b.incorrect_letters_count;
    });
  }

  private sortTrivia(results: TriviaMatch[]): TriviaMatch[] {
    return results.sort((a, b) => {
      if (a.correct_answers !== b.correct_answers) {
        return b.correct_answers - a.correct_answers;
      }
      return a.incorrect_answers - b.incorrect_answers;
    });
  }

  private sortMorl(results: MorLGamesStats[]): MorLGamesStats[] {
    return results.sort((a, b) => b.points - a.points);
  }

  private sortDice(results: DiceGameMatch[]): DiceGameMatch[] {
    return results.sort((a, b) => {
      if (a.total_points !== b.total_points) {
        return b.total_points - a.total_points;
      }
      return a.game_time - b.game_time;
    });
  }
}
