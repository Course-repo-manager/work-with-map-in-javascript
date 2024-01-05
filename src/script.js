const MAP_ID = 'map'
const INIT_VIEW_COORDS = [55.751244, 37.618423]
const INIT_VIEW_ZOOM = 13

L.mapbox.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'

const map = L.mapbox.map(MAP_ID)
  .setView(INIT_VIEW_COORDS, INIT_VIEW_ZOOM)
  .addLayer(L.mapbox.tileLayer('mapbox/streets'))