export interface MorLGameStatCreationPayload{
    player: string,
    points: number,
    win: boolean
}

export interface MorLGamesStats extends MorLGameStatCreationPayload {
    id: string,
    created_at: string
}

