import { inject, Injectable } from '@angular/core';
import { SUPABASE_CLIENT } from '../../../../tokens/supabase-client.token';
import { RussianRouletteGameCreationPayload } from '../../../model/Games/russianRoulette/russianRouletteStats';

@Injectable({
  providedIn: 'root',
})
export class RussianRoulettePersistanceService {
  private readonly supabase = inject(SUPABASE_CLIENT);
  private readonly table = 'russian_roulette_matches';

  public async sendResults(payload: RussianRouletteGameCreationPayload) {
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

  public async getPlayerGames(playerUID: string) {
    const result = await this.supabase.from(this.table).select().eq('player', playerUID);
    if (result.error) throw new Error('Ocurrió un error al obtener los resultados del jugador.');
    return result.data;
  }
}
