import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fs-spinner',
  imports: [NgbProgressbarModule, CommonModule],
  templateUrl: './fs-spinner.html',
  styleUrl: './fs-spinner.scss',
})
export class FsSpinner implements OnInit {

  private readonly gifs: string[] = [
    'assets/spinners/shaco.gif',
    'assets/spinners/sett.gif',
    'assets/spinners/spongebob-dancing.gif',
    'assets/spinners/spongebob-meme.gif',
    'assets/spinners/spongebob-ping-pong.gif',
    'assets/spinners/spongebob-sad.gif',
    'assets/spinners/club-penguin-club.gif'
  ];

  selectedGif: string = '';

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.gifs.length);
    this.selectedGif = this.gifs[randomIndex];
  }
}
