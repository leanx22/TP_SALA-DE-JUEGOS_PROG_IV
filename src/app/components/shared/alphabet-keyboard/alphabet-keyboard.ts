import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alphabet-keyboard',
  standalone: true,
  templateUrl: './alphabet-keyboard.html',
  styleUrls: ['./alphabet-keyboard.scss']
})
export class AlphabetKeyboardComponent {
  usedLetters = input<string[]>([]);
  disabled = input<boolean>(false);
  
  onLetterSelected = output<string>();

  readonly alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  handleClick(letter: string) {
    if (!this.disabled() && !this.usedLetters().includes(letter)) {
      this.onLetterSelected.emit(letter);
    }
  }
}