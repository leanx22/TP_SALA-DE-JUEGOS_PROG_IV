import { inject, Injectable } from '@angular/core';
import { SUPABASE_CLIENT } from '../../../../tokens/supabase-client.token';
import { HangmanGameCreationPayload } from '../../../model/Games/hangman/hangmanGameStats';

@Injectable({
  providedIn: 'root',
})
export class HangmanPersistanceService {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly table = 'hangman_matches';

  public async sendResults(payload: HangmanGameCreationPayload) {
    const result = await this.supabase.from(this.table).insert(payload).select().single();
    if (result.error)
      throw new Error('Ocurrió un error al guardar los resultados en la base de datos.');
    return result.data;
  }

  public async getAllGames() {
    const result = await this.supabase.from(this.table).select();
    if (result.error)
      throw new Error('Ocurrió un error al obtener los resultados de la base de datos.');
    return result.data;
  }

  public async getPlayerGames(plyerUID: string) {
    const result = await this.supabase.from(this.table).select().eq('player', plyerUID);
    if (result.error) throw new Error('Ocurrió un error al obtener los resultados del jugador.');
    return result.data;
  }
}
