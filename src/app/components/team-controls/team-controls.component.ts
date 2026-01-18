import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmIconImports } from '@ui/icon';
import { HlmCardImports } from '@ui/card';
import { HlmSelectImports } from '@ui/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmCheckboxImports } from '@ui/checkbox';
import { HlmButtonImports } from '@ui/button';
import { HlmBadgeImports } from '@ui/badge';
import { BaseballTeams } from '../../utils/baseball-teams';
import { BallparkFeature, BaseballService } from '../../utils/services/baseball';
import { ScatterplotLayer } from '@deck.gl/layers';

export interface IconClickEvent {
  coordinates: [number, number];
  properties: BallparkFeature['properties'];
}

@Component({
  selector: 'bt-team-controls',
  templateUrl: './team-controls.component.html',
  imports: [
    NgIcon,
    HlmIconImports,
    HlmCardImports,
    HlmSelectImports,
    BrnSelectImports,
    HlmCheckboxImports,
    HlmButtonImports,
    HlmBadgeImports,
  ],
  providers: [provideIcons({ lucideChevronDown })],
})
export class BtTeamControls {
  private baseballService = inject(BaseballService);

  expanded = signal(false);
  teams = signal<{ name: string; division: string }[]>(BaseballTeams);
  alTeams = computed(() => this.teams().filter((team) => team.division === 'al'));
  nlTeams = computed(() => this.teams().filter((team) => team.division === 'nl'));

  selectedTeam = computed(() => this.baseballService.selectedTeam());

  mlbStadium = computed(() =>
    this.baseballService.stadiums().find((s) => s.properties.Class === 'MLB'),
  );
  minorLeagueStadiums = computed(() =>
    this.baseballService.stadiums().filter((s) => s.properties.Class !== 'MLB'),
  );

  layerCreated = output<ScatterplotLayer<BallparkFeature>>();
  iconClicked = output<IconClickEvent>();
  teamChanged = output<[number, number]>();

  constructor() {
    effect(() => {
      const stadiums = this.baseballService.stadiums();
      if (stadiums.length > 0) {
        const layer = this.createScatterplotLayer(stadiums);
        this.layerCreated.emit(layer);
      }
    });

    effect(() => {
      const mlbStadium = this.mlbStadium();
      if (mlbStadium) {
        this.teamChanged.emit(mlbStadium.geometry.coordinates);
      }
    });
  }

  onTeamChange(event: string | string[] | undefined) {
    if (event && typeof event === 'string') {
      this.baseballService.changeTeams(event);
      this.expanded.set(false);
    }
  }

  onStadiumClick(stadium: BallparkFeature) {
    this.iconClicked.emit({
      coordinates: stadium.geometry.coordinates,
      properties: stadium.properties,
    });
  }

  private createScatterplotLayer(data: BallparkFeature[]) {
    return new ScatterplotLayer<BallparkFeature>({
      id: 'ballparks',
      data,
      stroked: true,
      getPosition: (d) => d.geometry.coordinates,
      getRadius: (d) => 24,
      getFillColor: [0, 255, 0],
      getLineColor: [255, 255, 255],
      getLineWidth: 10,
      radiusScale: 12,
      pickable: true,
      onClick: (d) => {
        if (d.object) {
          this.iconClicked.emit({
            coordinates: d.object.geometry.coordinates,
            properties: d.object.properties,
          });
        }
      },
    });
  }
}
