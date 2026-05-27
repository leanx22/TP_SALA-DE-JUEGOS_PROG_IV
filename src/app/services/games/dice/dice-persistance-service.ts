import { inject, Injectable } from '@angular/core';
import { SUPABASE_CLIENT } from '../../../../tokens/supabase-client.token';
import { DiceGameCreationPayload, DiceGameMatch } from '../../../model/Games/Dice/dice';

@Injectable({
  providedIn: 'root',
})
export class DicePersistanceService {
  private supabase = inject(SUPABASE_CLIENT);

  public async saveMatchResults(payload: DiceGameCreationPayload){
    const { data, error } = await this.supabase
    .from('dice_matches')
    .insert(payload)
    .select()
    .single()

    if(error) throw new Error("No se pudo guardar el resultado de la partida")

    return data as DiceGameMatch
  }

  public async getMatchHistory(): Promise<DiceGameMatch[]>{
    const {data, error} = await this.supabase
    .from('dice_matches')
    .select()

    if(error){
      throw new Error("No se pudo obtener el historial de partidas")
    }

    return data as DiceGameMatch[]
  }

  public async getUserMatches(user_id: string){
    const {data, error} = await this.supabase
    .from('dice_matches')
    .select()
    .eq('user_id', user_id) 

    if(error) throw new Error("No se pudo obtener el historial de partidas del usuario")
    return data as DiceGameMatch[]
  }

}
