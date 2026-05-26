import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriviaService } from '../../../../services/games/trivia/trivia-service';

@Component({
  selector: 'app-trivia-container-component',
  imports: [],
  templateUrl: './trivia-container-component.html',
  styleUrl: './trivia-container-component.scss',
})
export class TriviaContainerComponent {
  triviaService = inject(TriviaService);

  // Estado del juego
  currentIndex = signal<number>(0);
  score = signal<number>(0);
  isGameOver = signal<boolean>(false);

  // Guardamos la respuesta seleccionada para dar feedback visual antes de avanzar
  selectedAnswer = signal<string | null>(null);

  // Derivamos la pregunta actual automáticamente a partir del índice
  currentQuestion = computed(() => {
    const questions = this.triviaService.currentQuestions();
    return questions[this.currentIndex()] || null;
  });

  ngOnInit() {
    this.startGame();
  }

  async startGame() {
    // Reseteamos todo al empezar
    this.currentIndex.set(0);
    this.score.set(0);
    this.isGameOver.set(false);
    this.selectedAnswer.set(null);

    await this.triviaService.fetchQuestions(10);
  }

  selectAnswer(answer: string) {
    // Si ya eligió una respuesta, evitamos que siga haciendo clicks
    if (this.selectedAnswer() !== null) return;

    this.selectedAnswer.set(answer);

    const correct = this.currentQuestion()?.correct_answer;
    const isCorrect = answer === correct;

    if (isCorrect) {
      this.score.update((s) => s + 10);
    }

    // Esperamos 1.5 segundos para que vea el color rojo/verde y pasamos a la siguiente
    setTimeout(() => {
      const totalQuestions = this.triviaService.currentQuestions().length;

      if (this.currentIndex() < totalQuestions - 1) {
        this.currentIndex.update((i) => i + 1);
        this.selectedAnswer.set(null); // Limpiamos la selección para la nueva pregunta
      } else {
        this.isGameOver.set(true);
      }
    }, 1500);
  }

  // Método helper para aplicar clases CSS dinámicas a los botones
  getButtonClass(answer: string): string {
    if (this.selectedAnswer() === null) return 'btn-answer';

    const correct = this.currentQuestion()?.correct_answer;

    // Si es la respuesta correcta, siempre se pinta de verde
    if (answer === correct) return 'btn-answer correct';

    // Si eligió esta, y no es la correcta, se pinta de rojo
    if (answer === this.selectedAnswer() && answer !== correct) return 'btn-answer incorrect';

    // Las demás quedan opacadas
    return 'btn-answer disabled';
  }
}
