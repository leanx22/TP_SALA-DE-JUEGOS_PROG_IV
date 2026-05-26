import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TriviaQuestion, TriviaResponse } from '../../../model/Games/trivia/Trivia';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private readonly API_URL = 'https://opentdb.com/api.php?amount=';
  private http = inject(HttpClient);

  public currentQuestions = signal<TriviaQuestion[]>([]);
  public isLoading = signal<boolean>(false);


  async fetchQuestions(amount: number = 10): Promise<void>{
    this.isLoading.set(true);

    try {
      const url = `${this.API_URL}${amount}&type=multiple`;
      const response = await firstValueFrom(this.http.get<TriviaResponse>(url));
      const formattedQuestions = response.results.map(question =>{
        return{
          ...question,
          all_answers: this.shuffleArray([question.correct_answer, ...question.incorrect_answers])
        }
      });
      this.currentQuestions.set(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private shuffleArray(array: string[]): string[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

}
