import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SupaAuthService } from '../../../services/supabase/supa-auth-service';
import { ChatRealtimeService } from '../../../services/chat/chat-realtime-service';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.scss',
})
export class ChatComponent {
  private chatService = inject(ChatRealtimeService);
  private authService = inject(SupaAuthService);

  readonly messages = this.chatService.currentMessages;
 
  username = signal<string>('Sin nombre');
  messageText = signal<string>('');
  isSending = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
 
  private messagesEnd = viewChild<ElementRef<HTMLDivElement>>('messagesEnd');
 
  constructor() {
    // Auto-scroll al recibir mensajes nuevos
    effect(() => {
      this.messages();
      setTimeout(() => this.scrollToBottom(), 50);
    });
  }
 
  async ngOnInit(): Promise<void> {
    const metadata = await this.authService.getUserMetadata();
    if(!metadata || !metadata.name){
      this.username.set("USUARIO");
      return;
    }
    this.username.set(metadata.name);
  }
 

  async sendMessage(): Promise<void> {
    const text = this.messageText().trim();
    const username = this.username();
    
    if (!text || !username || this.isSending()) return;
 
    this.isSending.set(true);
    this.errorMessage.set(null);
 
    try {      
      await this.chatService.sendMessage(username, text);
      this.messageText.set('');
    } catch {
      this.errorMessage.set('No se pudo enviar el mensaje. Reintentá.');
    } finally {
      this.isSending.set(false);
    }
  }
 
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
 
  private scrollToBottom(): void {
    this.messagesEnd()?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }
 
  formatTime(isoString: string): string {
    return new Date(isoString).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
 
  avatarColor(username: string): string {
    const colors = [
      'var(--clr-primary-a0)',
      'var(--clr-accent-a0)',
      'var(--clr-info-a0)',
      'var(--clr-warning-a0)',
      'var(--clr-success-a0)',
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }
 
  avatarInitial(username: string): string {
    return username.charAt(0).toUpperCase();
  }
}
