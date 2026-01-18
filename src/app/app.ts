import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BtTeamSelectComponent } from './components/team-select/team-select.component';
import { FavoriteTeamService } from './utils/services/favorite-team';
import { BaseballService } from './utils/services/baseball';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BtTeamSelectComponent],
  templateUrl: './app.html',
})
export class App {
  private favoriteTeamService = inject(FavoriteTeamService);
  private baseballService = inject(BaseballService);

  showTeamSelect = !this.favoriteTeamService.hasSelectedTeam();

  onTeamSelected(teamName: string): void {
    this.baseballService.changeTeams(teamName);
    this.showTeamSelect = false;
  }
}
