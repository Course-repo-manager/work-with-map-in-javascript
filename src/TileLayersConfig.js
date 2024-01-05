
const OSM_TILE_LAYER = {
  label: 'OpenStreetMap',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  options: {
    attribution: '@ OpenStreetMap contributors'
  }
}

const MAP_BOX_TILE_LAYER = {
  label: 'MapBox',
  url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  options: {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">MapBox</a> contributors',
    id: 'mapbox/streets-v11',
    accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN'
  }
}

export const TILE_LAYERS_SETTING = [
  OSM_TILE_LAYER,
  MAP_BOX_TILE_LAYER,
]