import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  standalone: true,
  templateUrl: './hangman-display.html',
  styleUrls: ['./hangman-display.scss']
})
export class HangmanDisplayComponent {
  displayWord = input<string[]>([]);
  errors = input<number>(0);
  maxErrors = input<number>(6);
}