import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupaAuthService } from '../../supabase/supa-auth-service';
import { SUPABASE_CLIENT } from '../../../../tokens/supabase-client.token';
import { TriviaMatch, TriviaMatchCreationPayload } from '../../../model/Games/trivia/Trivia';

@Injectable({
  providedIn: 'root',
})
export class TriviaPersistenceService {
  private supabase = inject(SUPABASE_CLIENT);
  private authService = inject(SupaAuthService);


  async saveMatchResult(correctAnswers: number, incorrectAnswers: number): Promise<boolean> {
    const currentUser = this.authService.currentUser();

    if (!currentUser) throw new Error("No se puede guardar la partida de un usuario no logueado.");

    const record: TriviaMatchCreationPayload = {
      user_id: currentUser.id,
      correct_answers: correctAnswers,
      incorrect_answers: incorrectAnswers
    };

    try {
      const { error } = await this.supabase
        .from('trivia_matches')
        .insert(record);

      if (error) {
        throw error;
      }

      console.log('Match successfully saved to Supabase!');
      return true;

    } catch (err) {
      console.error('Error saving match to Supabase:', err);
      return false;
    }
  }

  async getMatches(): Promise<TriviaMatch[]> {
    const { data, error } = await this.supabase
      .from('trivia_matches')
      .select('*');

    if (error) throw new Error("Error al obtener las partidas de trivia")

    return data as TriviaMatch[];
  }

  async getMatchesByUser(): Promise<TriviaMatch[]> {
    const currentUser = this.authService.currentUser();

    if (!currentUser) throw new Error("No se puede obtener las partidas de un usuario no logueado.");

    const { data, error } = await this.supabase
      .from('trivia_matches')
      .select('*')
      .eq('user_id', currentUser.id);

    if(error) throw new Error("Error al obtener las partidas de trivia");

    return data as TriviaMatch[];
  }
      

      
}
