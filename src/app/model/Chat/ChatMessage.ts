export interface ChatMessageCreationPayload {
    username: string,
    message: string
}

export interface ChatMessage extends ChatMessageCreationPayload{
    id: string,
    created_at: string
}