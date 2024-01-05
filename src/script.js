const MAP_ID = 'map'
const INIT_VIEW_COORDS = [55.751244, 37.618423]
const INIT_VIEW_ZOOM = 13

const OSM_TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_TILE_LAYER_OPTIONS = {
  attribution: '@ OpenStreetMap contributors'
}

const map = L.map(MAP_ID).setView(INIT_VIEW_COORDS, INIT_VIEW_ZOOM)

const layer = L.tileLayer(OSM_TILE_LAYER_URL, OSM_TILE_LAYER_OPTIONS)

layer.addTo(map)