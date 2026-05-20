import { Component, input } from '@angular/core';
import { GameInfo } from '../../../model/Games/gamesList';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-cards-component',
  imports: [RouterLink],
  templateUrl: './game-cards-component.html',
  styleUrl: './game-cards-component.scss',
})
export class GameCardsComponent {
  game = input.required<GameInfo>();
}
