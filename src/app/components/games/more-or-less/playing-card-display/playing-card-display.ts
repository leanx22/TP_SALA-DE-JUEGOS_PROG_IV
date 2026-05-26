import { Component, Input } from '@angular/core';
import { PlayingCard } from '../../../../model/Games/moreOrLess/playing-card';

@Component({
  selector: 'app-playing-card-display',
  standalone: true,
  templateUrl: './playing-card-display.html',
  styleUrls: ['./playing-card-display.scss']
})
export class PlayingCardDisplayComponent {
  @Input({required: true}) card!: PlayingCard | null;

  get emoji(): string {
    if (!this.card) return '';
    switch(this.card.palo) {
      case 'copa': return '🍷';
      case 'oro': return '🪙';
      case 'espada': return '⚔️';
      case 'basto': return '🪵';
    }
  }

  get valorDisplay(): string {
    return this.card?.valor.toString() || '';
  }
}
