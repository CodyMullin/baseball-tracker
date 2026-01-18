import { Injectable } from '@angular/core';
import maplibregl, {
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  LngLatLike,
  MapOptions,
} from 'maplibre-gl';

export interface MapConfig {
  container: string | HTMLElement;
  center?: LngLatLike;
  zoom?: number;
  style?: string;
  minZoom?: number;
  maxZoom?: number;
}

export interface MarkerConfig {
  lngLat: LngLatLike;
  color?: string;
  draggable?: boolean;
  popup?: string;
}

export interface MapControls {
  navigation?: boolean;
  scale?: boolean;
  geolocate?: boolean;
}

const DEFAULT_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

@Injectable({
  providedIn: 'root',
})
export class MapLibreService {
  createMap(config: MapConfig): Map {
    const options: MapOptions = {
      container: config.container,
      style: config.style ?? DEFAULT_STYLE,
      center: config.center ?? [0, 0],
      zoom: config.zoom ?? 2,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      attributionControl: false,
    };

    return new maplibregl.Map(options);
  }

  fitBounds(map: Map, bounds: [[number, number], [number, number]], padding = 50): void {
    map.fitBounds(bounds, { padding });
  }

  flyTo(map: Map, center: LngLatLike, zoom?: number): void {
    map.flyTo({ center, zoom });
  }
}
