export interface HangmanGameCreationPayload {
  correct_letters_count: number;
  incorrect_letters_count: number;
  game_time: number;
}

export interface HangmanGameStats extends HangmanGameCreationPayload {
  id: string;
  player: string;
  created_at: string;
}
