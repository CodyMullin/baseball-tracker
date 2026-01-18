import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'baseball-tracker-favorite-team';

@Injectable({
  providedIn: 'root',
})
export class FavoriteTeamService {
  private _favoriteTeam = signal<string | null>(this._loadFromStorage());

  favoriteTeam = this._favoriteTeam.asReadonly();

  hasSelectedTeam(): boolean {
    return this._favoriteTeam() !== null;
  }

  setFavoriteTeam(teamName: string): void {
    this._favoriteTeam.set(teamName);
    localStorage.setItem(STORAGE_KEY, teamName);
  }

  private _loadFromStorage(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEY);
  }
}
