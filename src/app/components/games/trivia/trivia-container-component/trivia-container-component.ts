import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { TriviaService } from '../../../../services/games/trivia/trivia-service';
import { FsSpinner } from "../../../shared/fs-spinner/fs-spinner";

@Component({
  selector: 'app-trivia-container-component',
  imports: [FsSpinner],
  templateUrl: './trivia-container-component.html',
  styleUrl: './trivia-container-component.scss',
})
export class TriviaContainerComponent {
  protected triviaService = inject(TriviaService);

  currentIndex = signal<number>(0);
  score = signal<number>(0);
  isGameOver = signal<boolean>(false);

  selectedAnswer = signal<string | null>(null);

  currentQuestion = computed(() => {
    const questions = this.triviaService.currentQuestions();
    return questions[this.currentIndex()] || null;
  });

  ngOnInit() {
    this.startGame();
  }

  async startGame() {
    //reset
    this.currentIndex.set(0);
    this.score.set(0);
    this.isGameOver.set(false);
    this.selectedAnswer.set(null);

    await this.triviaService.fetchQuestions(10);
  }

  selectAnswer(answer: string) {
    if (this.selectedAnswer() !== null) return;

    this.selectedAnswer.set(answer);

    const correct = this.currentQuestion()?.correct_answer;
    const isCorrect = answer === correct;

    if (isCorrect) {
      this.score.update((s) => s + 10);
    }

    // Espera para feedback
    setTimeout(() => {
      const totalQuestions = this.triviaService.currentQuestions().length;

      if (this.currentIndex() < totalQuestions - 1) {
        this.currentIndex.update((i) => i + 1);
        this.selectedAnswer.set(null);
      } else {
        this.isGameOver.set(true);
      }
    }, 1500);
  }

  // Coloreo los botones dependiendo del resultado
  getButtonClass(answer: string): string {
    if (this.selectedAnswer() === null) return 'btn-answer';

    const correct = this.currentQuestion()?.correct_answer;

    if (answer === correct) return 'btn-answer correct';

    if (answer === this.selectedAnswer() && answer !== correct) return 'btn-answer incorrect';

    return 'btn-answer disabled';
  }
}
