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
      
      this.addTileLayer(layer)

      baseLayers[label] = layer
    });

    L.control.layers(baseLayers).addTo(this.#map)
  }

  addTileLayer(tileLayer) {
    tileLayer?.addTo?.(this.#map)
  }
}