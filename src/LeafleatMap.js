const DEFAULT_SETTINGS = {
  initCoords: [0, 0],
  initZoom: 13,
}

const DEFAULT_ZOOM_CONTROL_OPTIONS = {
  position: 'bottomleft',
  zoomInText: '+',
  zoomOutText: '-',
  zoomInTitle: 'Приблизить',
  zoomOutTitle: 'Отдалить',
}

export default class {
  #map;

  constructor({
    rootId,
    mapOptions,
    initCoords,
    initZoom,
  } = DEFAULT_SETTINGS) {
    const rootElement = document.getElementById(rootId)

    if (!rootElement) {
      throw new Error(`Root element with id ${rootId} not found`)
    }

    this.#map = L.map(rootElement, mapOptions)
    this.#map.setView(initCoords, initZoom)
  }

  removeLayer(layer) {
    this.#map?.removeLayer?.(layer)
  }

  moveMarkerTo(marker, coords) {
    marker?.setLatLng?.(coords)
  }

  addMarker(coords, options = {}) {
    const marker = L.marker(coords, options)
    
    marker.addTo(this.#map)
    
    return marker
  }

  addZoomControl(options = DEFAULT_ZOOM_CONTROL_OPTIONS) {
    const zoomControl = L.control.zoom(options)
    zoomControl.addTo(this.#map)
  }

  setZoomRange(min = 0, max = 25) {
    this.#map.setMinZoom(min)
    this.#map.setMaxZoom(max)
  }

  addTileLayers(tileLayersSettings) {
    const baseLayers = {}

    tileLayersSettings.forEach((settings = {}) => {
      const { label, url, options } = settings

      const layer = L.tileLayer(url, options)
      
      this.add(layer)

      baseLayers[label] = layer
    });

    L.control.layers(baseLayers).addTo(this.#map)
  }

  add(layer) {
    layer?.addTo?.(this.#map)
  }
}