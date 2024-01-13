const DEFAULT_SETTINGS = {
  initCoords: [0, 0],
  initZoom: 13,
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

    this.#map = L.map(rootElement, mapOptions).setView(initCoords, initZoom)
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