import { Injectable, signal, computed } from '@angular/core';
import { MapboxOverlay } from '@deck.gl/mapbox';
import type { Layer, PickingInfo } from '@deck.gl/core';
import type { Map as MapLibreMap } from 'maplibre-gl';

export interface DeckLayerConfig {
  id: string;
  layer: Layer;
}

export interface DeckOverlayConfig {
  interleaved?: boolean;
  onClick?: (info: PickingInfo) => void;
  onHover?: (info: PickingInfo) => void;
}

type LayerMap = globalThis.Map<string, Layer>;

@Injectable({
  providedIn: 'root',
})
export class DeckGLService {
  private overlay: MapboxOverlay | null = null;
  private layerMap = signal<LayerMap>(new globalThis.Map());

  readonly layers = computed(() => Array.from(this.layerMap().values()));
  readonly layerIds = computed(() => Array.from(this.layerMap().keys()));

  createOverlay(map: MapLibreMap, config: DeckOverlayConfig = {}): MapboxOverlay {
    this.overlay = new MapboxOverlay({
      interleaved: config.interleaved ?? true,
      onClick: config.onClick,
      onHover: config.onHover,
    });

    map.addControl(this.overlay);
    return this.overlay;
  }

  getOverlay(): MapboxOverlay | null {
    return this.overlay;
  }

  addLayer(layer: Layer): void {
    if (!this.overlay) {
      return;
    }

    const id = layer.id;
    this.layerMap.update((map) => {
      const newMap = new globalThis.Map(map);
      newMap.set(id, layer);
      return newMap;
    });

    this.updateOverlayLayers();
  }

  updateLayer(layerId: string, layer: Layer): void {
    if (!this.layerMap().has(layerId)) {
      return;
    }

    this.layerMap.update((map) => {
      const newMap = new globalThis.Map(map);
      newMap.set(layerId, layer);
      return newMap;
    });

    this.updateOverlayLayers();
  }

  clearLayers(): void {
    this.layerMap.set(new globalThis.Map());
    this.updateOverlayLayers();
  }

  setLayers(layers: Layer[]): void {
    const newMap: LayerMap = new globalThis.Map();
    layers.forEach((layer) => newMap.set(layer.id, layer));
    this.layerMap.set(newMap);
    this.updateOverlayLayers();
  }

  private updateOverlayLayers(): void {
    if (this.overlay) {
      this.overlay.setProps({ layers: this.layers() });
    }
  }

  destroy(): void {
    this.clearLayers();
    this.overlay = null;
  }
}
