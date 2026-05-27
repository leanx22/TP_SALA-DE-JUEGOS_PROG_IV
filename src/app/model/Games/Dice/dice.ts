export interface DiceGameCreationPayload{
    user_id: string,
    total_points: number,
    game_time: number,
}

export interface DiceGameMatch extends DiceGameCreationPayload{
    id: string,
    created_at: string
}