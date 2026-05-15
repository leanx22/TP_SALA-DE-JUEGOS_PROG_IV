import { Component } from '@angular/core';
import { PersonalCard } from '../../components/about/personal-card/personal-card';
import { CustomGameInfo } from '../../components/about/custom-game-info/custom-game-info'
@Component({
  selector: 'app-about-page',
  imports: [PersonalCard, CustomGameInfo],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage {}
