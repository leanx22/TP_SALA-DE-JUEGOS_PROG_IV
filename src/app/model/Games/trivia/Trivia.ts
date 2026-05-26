export interface TriviaQuestion{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[];
}

export interface TriviaResponse{
    response_code: number;
    results: TriviaQuestion[];
}

export interface TriviaMatchCreationPayload{
    user_id: string,
    correct_answers: number,
    incorrect_answers: number
}

export interface TriviaMatch extends TriviaMatchCreationPayload{
    id: number,
    created_at: string
}