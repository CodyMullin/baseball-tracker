import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ApplicationRef,
  createComponent,
  ComponentRef,
  effect,
} from '@angular/core';
import { BtMapComponent } from '../components/bt-map/bt-map.component';
import { Map as MapLibre, LngLatLike, Popup } from 'maplibre-gl';
import {
  BtTeamControls,
  IconClickEvent,
} from '../components/team-controls/team-controls.component';
import { BtScheduleComponent } from '../components/schedule/schedule.component';
import { DeckGLService } from '../utils/services/deckgl';
import { BaseballService, GameWithLocation } from '../utils/services/baseball';
import { BtMapPopup } from '../components/map-popup/map-popup.component';
import { PathLayer } from '@deck.gl/layers';
import type { Layer } from '@deck.gl/core';

@Component({
  selector: 'bt-main-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
  templateUrl: './main-view.html',
  imports: [BtMapComponent, BtTeamControls, BtScheduleComponent],
})
export class BtMainView {
  private deckgl = inject(DeckGLService);
  private baseball = inject(BaseballService);
  private appRef = inject(ApplicationRef);
  private map: MapLibre | null = null;
  private popup: Popup | null = null;
  private popupComponentRef: ComponentRef<BtMapPopup> | null = null;
  private ballparksLayer: Layer | null = null;

  center: LngLatLike = [-95.7, 37.0];

  constructor() {
    effect(() => {
      const travelPath = this.baseball.travelPath();
      if (travelPath.length > 0 && this.ballparksLayer) {
        this.updateLayers(travelPath);
      }
    });
  }

  private updateLayers(
    travelPath: { coordinates: [number, number]; homeAway: 'home' | 'away' | 'neutral' }[],
  ) {
    const segments = travelPath.slice(1).map((point, i) => ({
      path: [travelPath[i].coordinates, point.coordinates],
      homeAway: point.homeAway,
    }));

    const pathLayer = new PathLayer({
      id: 'travel-path',
      data: segments,
      getPath: (d) => d.path,
      getColor: (d) => (d.homeAway === 'home' ? [0, 255, 0, 50] : [0, 0, 255, 50]),
      getWidth: 3,
      widthMinPixels: 2,
      widthMaxPixels: 6,
      capRounded: true,
      jointRounded: true,
    });

    const layers = this.ballparksLayer ? [pathLayer, this.ballparksLayer] : [pathLayer];
    this.deckgl.setLayers(layers);
  }

  onMapLoad(map: MapLibre): void {
    this.map = map;
    this.deckgl.createOverlay(map, { interleaved: true });
    this.baseball.loadInitialData();
  }

  onLayerCreated(layer: Layer): void {
    this.ballparksLayer = layer;
    const travelPath = this.baseball.travelPath();
    if (travelPath.length > 0) {
      this.updateLayers(travelPath);
    } else {
      this.deckgl.setLayers([layer]);
    }
  }

  onGameClicked(game: GameWithLocation): void {
    if (!this.map) return;
    this.cleanupPopup();
    this.map.flyTo({
      center: game.coordinates,
      zoom: 10,
    });
  }

  onTeamChanged(coordinates: [number, number]): void {
    if (!this.map) return;
    this.cleanupPopup();
    this.map.flyTo({
      center: coordinates,
      zoom: 10,
    });
  }

  onIconClicked(event: IconClickEvent): void {
    if (!this.map) return;

    this.cleanupPopup();

    this.map.flyTo({
      center: event.coordinates,
      zoom: 10,
    });

    const { Stadium, Team, Class } = event.properties;

    this.popupComponentRef = createComponent(BtMapPopup, {
      environmentInjector: this.appRef.injector,
    });

    this.popupComponentRef.setInput('stadium', Stadium);
    this.popupComponentRef.setInput('team', Team);
    this.popupComponentRef.setInput('ballparkClass', Class);

    this.appRef.attachView(this.popupComponentRef.hostView);

    const popupElement = this.popupComponentRef.location.nativeElement;

    this.popup = new Popup({ closeButton: true, closeOnClick: false, offset: 20 })
      .setLngLat(event.coordinates)
      .setDOMContent(popupElement)
      .addTo(this.map);

    this.popup.on('close', () => this.cleanupPopup());
  }

  private cleanupPopup(): void {
    if (this.popupComponentRef) {
      this.appRef.detachView(this.popupComponentRef.hostView);
      this.popupComponentRef.destroy();
      this.popupComponentRef = null;
    }
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
  }
}
