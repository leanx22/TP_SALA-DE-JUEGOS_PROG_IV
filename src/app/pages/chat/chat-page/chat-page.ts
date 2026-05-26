import { Component, inject } from '@angular/core';
import { ChatRealtimeService } from '../../../services/chat/chat-realtime-service';
import { ChatComponent } from '../../../components/chat/chat-component/chat-component';

@Component({
  selector: 'app-chat-page',
  imports: [ChatComponent],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {
  private chatService = inject(ChatRealtimeService);

  async ngOnInit(): Promise<void>{
    await this.chatService.loadPrevMessages();
    this.chatService.connect();
  }

  async ngOnDestroy(): Promise<void>{
    await this.chatService.disconnect();
  }
  
}
