import { Component, inject } from '@angular/core';
import { GithubService } from '../../../services/GitHub/github-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-personal-card',
  imports: [],
  templateUrl: './personal-card.html',
  styleUrl: './personal-card.scss',
})
export class PersonalCard {
  private github = inject(GithubService);
  readonly fullName = "Leandro Emanuel Guia"
  userData = toSignal(this.github.getUserData('leanx22'));
}
