import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { HlmCardImports } from '@ui/card';
import { HlmButtonImports } from '@ui/button';
import { BaseballTeams } from '../../utils/baseball-teams';

@Component({
  selector: 'bt-team-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmCardImports, HlmButtonImports],
  templateUrl: './team-select.component.html',
})
export class BtTeamSelectComponent {
  teams = signal(BaseballTeams);
  alTeams = computed(() => this.teams().filter((t) => t.division === 'al'));
  nlTeams = computed(() => this.teams().filter((t) => t.division === 'nl'));

  selectedTeam = signal<string | null>(null);

  teamSelected = output<string>();

  selectTeam(teamName: string): void {
    this.selectedTeam.set(teamName);
  }

  confirmSelection(): void {
    const team = this.selectedTeam();
    if (team) {
      this.teamSelected.emit(team);
    }
  }
}
