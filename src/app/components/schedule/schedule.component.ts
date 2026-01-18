import { Component, ChangeDetectionStrategy, inject, computed, output } from '@angular/core';
import { HlmCardImports } from '@ui/card';
import { BaseballService, GameWithLocation } from '../../utils/services/baseball';

@Component({
  selector: 'bt-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  imports: [HlmCardImports],
})
export class BtScheduleComponent {
  private baseballService = inject(BaseballService);

  selectedTeam = this.baseballService.selectedTeam;
  games = this.baseballService.gamesWithLocations;
  gameClicked = output<GameWithLocation>();

  groupedGames = computed(() => {
    const games = this.games();
    const grouped = new Map<string, GameWithLocation[]>();

    for (const game of games) {
      const month = this.getMonthKey(game.date);
      if (!grouped.has(month)) {
        grouped.set(month, []);
      }
      grouped.get(month)!.push(game);
    }

    return Array.from(grouped.entries()).map(([month, games]) => ({
      month,
      games,
    }));
  });

  onGameClick(game: GameWithLocation) {
    this.gameClicked.emit(game);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  private getMonthKey(dateStr: string): string {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}
