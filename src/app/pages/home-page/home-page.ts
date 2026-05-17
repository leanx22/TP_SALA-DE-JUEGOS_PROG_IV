import { Component, inject } from '@angular/core';
import { GameCardsComponent } from '../../components/home/game-cards-component/game-cards-component';
import { GameList } from '../../model/Games/gamesList';
import { SupaAuthService } from '../../services/supabase/supa-auth-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-home-page',
  imports: [GameCardsComponent, RouterLinkActive, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  readonly gameList = GameList;
  private readonly supabaseAuth = inject(SupaAuthService);
  currentUser = this.supabaseAuth.currentUser;
}
