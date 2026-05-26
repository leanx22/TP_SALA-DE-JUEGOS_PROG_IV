import { inject, Injectable, signal } from '@angular/core';
import { ChatMessage } from '../../model/Chat/ChatMessage';
import { RealtimeChannel } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../../tokens/supabase-client.token';

@Injectable({
  providedIn: 'root',
})
export class ChatRealtimeService {
  private messages = signal<ChatMessage[]>([]);
  private channel:RealtimeChannel|null = null;
  private supabase = inject(SUPABASE_CLIENT);

  public currentMessages = this.messages.asReadonly();

  async loadPrevMessages(): Promise<void>{
    const {data, error} = await this.supabase
    .from("chat_global")
    .select('*')
    .order("created_at", { ascending: true })
    .limit(20);

    if(error) throw new Error ("No se pudo obtener los mensajes anteriores.");
    this.messages.set((data ?? []) as ChatMessage[]);
  }

  connect(): void{
    if(this.channel) return;
    this.channel = this.supabase
    .channel('chat_global')
    .on(
      'postgres_changes',
      {
        event: 'INSERT', schema: 'public', table: 'chat_global'
      },
      (payload)=>{
        const newMessage = payload.new as ChatMessage;
        this.messages.update(currentMessages => [...currentMessages, newMessage]);
      }
    )
    .subscribe();
  }

  async sendMessage(userName: string, message: string){
    const { error } = await this.supabase
    .from("chat_global")
    .insert({
      username: userName,
      message: message
    });
    if(error) throw new Error("No se pudo enviar el mensaje.");
  }

  async disconnect(): Promise<void>{
    if(!this.channel) return;
    await this.supabase.removeChannel(this.channel);
    this.channel = null;
  }

}
