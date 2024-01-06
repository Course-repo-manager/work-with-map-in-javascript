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

  get value () {
    return this.#map
  }

  set value (val) {
    throw new Error('Map value is readonly')
  }

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
  
  convertDegrees(lat = '', lon = '') {
    if (lat.toString().length !== 7 || lon.toString().length !== 7) {
      lat = Number(lat).toFixed(6);
      lon = Number(lon).toFixed(6);
    }

    return {
      // ГГ.гггггг / DD.dddddd
      lat: lat.toString(),
      lon: lon.toString(),

      // ГГ°MM.ммм' / DD°MM.mmm'
      latDM: this.convertdTo_dm(lat),
      lonDM: this.convertdTo_dm(lon),

      // ГГ°MM'СС.с" / DD°MM'SS.s"
      latDMS: this.convertdTo_dms(lat),
      lonDMS: this.convertdTo_dms(lon),
    };
  }


  convertdTo_dm(degrees) {
    let mydegrees, myminutes, remaining;

    if (degrees == '') {
      mydegrees = '';
      myminutes = '';
    } else {
      mydegrees = parseInt(degrees + '');
      remaining = Number(degrees) - mydegrees * 1.0;
      myminutes = remaining * 60.0;
      myminutes = Math.round(myminutes * 1000.0) / 1000.0;
    }

    return `${mydegrees}&deg;${myminutes}`;
  }

  convertdTo_dms(degrees) {
    let mydegrees, myminutes, myseconds, remaining;
    if (degrees == '') {
      mydegrees = '';
      myminutes = '';
      myseconds = '';
    } else {
      mydegrees = parseInt(degrees + '');
      remaining = Number(degrees) - mydegrees * 1.0;
      const minutes = remaining * 60.0;
      myminutes = parseInt(minutes + '');
      remaining = minutes - myminutes * 1.0;
      myseconds = remaining * 60.0;
      myseconds = Math.round(myseconds * 10.0) / 10.0;
    }
    return `${mydegrees}&deg;${myminutes}&rsquo;${myseconds}&quot;`;
  }
}