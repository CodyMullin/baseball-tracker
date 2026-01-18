import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BaseballTeams } from '../baseball-teams';
import { FavoriteTeamService } from './favorite-team';

export interface BallparkFeature {
  type: 'Feature';
  properties: {
    Team: string;
    League: string;
    Division: string;
    Stadium: string;
    Class: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

interface BallparkCollection {
  features: BallparkFeature[];
}

export interface ScheduleGame {
  date: string;
  opponent: string;
  home_away: 'home' | 'away' | 'neutral';
}

export interface Schedule {
  team: string;
  season: number;
  regular_season: ScheduleGame[];
}

type SchedulesData = Record<string, Schedule>;

export interface GameWithLocation extends ScheduleGame {
  coordinates: [number, number];
  stadium: string;
}

@Injectable({
  providedIn: 'root',
})
export class BaseballService {
  private _http = inject(HttpClient);
  private _favoriteTeam = inject(FavoriteTeamService);
  private _allBallparks = signal<BallparkFeature[]>([]);
  private _allSchedules = signal<SchedulesData>({});

  selectedTeam = signal<string>(this._favoriteTeam.favoriteTeam() ?? 'Atlanta Braves');
  stadiums = signal<BallparkFeature[]>([]);
  schedule = signal<ScheduleGame[]>([]);

  gamesWithLocations = computed<GameWithLocation[]>(() => {
    const games = this.schedule();
    const ballparks = this._allBallparks();
    const team = this.selectedTeam();

    if (games.length === 0 || ballparks.length === 0) return [];

    const homeStadium = ballparks.find(
      (b) => b.properties.Team === team && b.properties.Class === 'MLB',
    );

    return games.map((game) => {
      if (game.home_away === 'home') {
        return {
          ...game,
          coordinates: homeStadium?.geometry.coordinates ?? [0, 0],
          stadium: homeStadium?.properties.Stadium ?? '',
        };
      }
      const opponentStadium = ballparks.find(
        (b) => b.properties.Team === game.opponent && b.properties.Class === 'MLB',
      );
      return {
        ...game,
        coordinates: opponentStadium?.geometry.coordinates ?? [0, 0],
        stadium: opponentStadium?.properties.Stadium ?? '',
      };
    });
  });

  travelPath = computed<{ coordinates: [number, number]; homeAway: 'home' | 'away' | 'neutral' }[]>(() => {
    return this.gamesWithLocations().map((g) => ({
      coordinates: g.coordinates,
      homeAway: g.home_away,
    }));
  });

  changeTeams(value: string) {
    this.selectedTeam.set(value);
    this._favoriteTeam.setFavoriteTeam(value);
    this._updateStadiums();
    this._updateSchedule();
  }

  loadInitialData() {
    forkJoin({
      ballparks: this._http.get<BallparkCollection>('/assets/ballparks.json'),
      schedules: this._http.get<SchedulesData>('/assets/schedules.json'),
    }).subscribe(({ ballparks, schedules }) => {
      this._allBallparks.set(ballparks.features);
      this._allSchedules.set(schedules);
      this._updateStadiums();
      this._updateSchedule();
    });
  }

  private _updateStadiums() {
    const team = this.selectedTeam();
    const teamData = BaseballTeams.find((t) => t.name === team);
    const affiliateNames = teamData?.affiliates.map((a) => a.name) ?? [];
    const allTeamNames = [team, ...affiliateNames];

    const ballparks = this._allBallparks();
    if (ballparks.length > 0) {
      this.stadiums.set(ballparks.filter((b) => allTeamNames.includes(b.properties.Team)));
    }
  }

  private _updateSchedule() {
    const team = this.selectedTeam();
    const schedules = this._allSchedules();
    const teamSchedule = schedules[team];
    this.schedule.set(teamSchedule?.regular_season ?? []);
  }
}
