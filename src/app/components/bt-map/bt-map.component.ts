import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  inject,
  signal,
  OnDestroy,
  ElementRef,
  viewChild,
  effect,
  AfterViewInit,
} from '@angular/core';
import { Map, Marker, LngLatLike, MapMouseEvent } from 'maplibre-gl';
import { MapLibreService } from '../../utils/services/maplibre';

export interface MapClickEvent {
  lngLat: { lng: number; lat: number };
  point: { x: number; y: number };
}

export interface MapMoveEvent {
  center: { lng: number; lat: number };
  zoom: number;
}

@Component({
  selector: 'bt-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .map-container {
      width: 100%;
      height: 100%;
    }
  `,
  templateUrl: 'bt-map.component.html',
})
export class BtMapComponent implements AfterViewInit, OnDestroy {
  private readonly mapService = inject(MapLibreService);

  private mapContainer = viewChild.required<ElementRef<HTMLElement>>('mapContainer');

  center = input<LngLatLike>([0, 0]);
  zoom = input<number>(2);
  style = input<string>();
  minZoom = input<number>();
  maxZoom = input<number>();

  mapClick = output<MapClickEvent>();
  mapMove = output<MapMoveEvent>();
  mapLoad = output<Map>();

  private map = signal<Map | null>(null);

  constructor() {
    effect(() => {
      const map = this.map();
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initializeMap(): void {
    const container = this.mapContainer().nativeElement;

    const map = this.mapService.createMap({
      container,
      center: this.center(),
      zoom: this.zoom(),
      style: this.style(),
      minZoom: this.minZoom(),
      maxZoom: this.maxZoom(),
    });

    map.on('load', () => {
      this.mapLoad.emit(map);
    });

    map.on('click', (e: MapMouseEvent) => {
      this.mapClick.emit({
        lngLat: { lng: e.lngLat.lng, lat: e.lngLat.lat },
        point: { x: e.point.x, y: e.point.y },
      });
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.mapMove.emit({
        center: { lng: center.lng, lat: center.lat },
        zoom: map.getZoom(),
      });
    });

    this.map.set(map);
  }

  private cleanup(): void {
    this.map()?.remove();
  }

  getMap(): Map | null {
    return this.map();
  }

  flyTo(center: LngLatLike, zoom?: number): void {
    const map = this.map();
    if (map) {
      this.mapService.flyTo(map, center, zoom);
    }
  }

  fitBounds(bounds: [[number, number], [number, number]], padding?: number): void {
    const map = this.map();
    if (map) {
      this.mapService.fitBounds(map, bounds, padding);
    }
  }
}
