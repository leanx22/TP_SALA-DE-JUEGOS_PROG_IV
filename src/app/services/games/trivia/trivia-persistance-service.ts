import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupaAuthService } from '../../supabase/supa-auth-service';
import { SUPABASE_CLIENT } from '../../../../tokens/supabase-client.token';

export interface TriviaMatchRecord {
  user_id: string;
  correct_answers: number;
  incorrect_answers: number;
  // Supabase normalmente maneja el created_at por su cuenta, así que no lo mandamos
}

@Injectable({
  providedIn: 'root',
})
export class TriviaPersistenceService {
  private supabase = inject(SUPABASE_CLIENT);
  private authService = inject(SupaAuthService);


  async saveMatchResult(correctAnswers: number, incorrectAnswers: number): Promise<boolean> {
    const currentUser = await this.authService.getUser();

    if (!currentUser) throw new Error("No se puede guardar la partida de un usuario no logueado.");

    const record: TriviaMatchRecord = {
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
}
