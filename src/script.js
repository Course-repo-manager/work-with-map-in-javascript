import LeafleatMap from "./LeafleatMap.js"
import { TILE_LAYERS_SETTING } from "./TileLayersConfig.js"

const MAP_ID = 'map'
const INIT_VIEW_COORDS = [55.751244, 37.618423]
const INIT_VIEW_ZOOM = 13
const MIN_ZOOM = 7
const MAX_ZOOM = 18

const map = new LeafleatMap({
  rootId: MAP_ID,
  mapOptions: {
    zoomControl: false,
  },
  initCoords: INIT_VIEW_COORDS,
  initZoom: INIT_VIEW_ZOOM
})

map.addTileLayers(TILE_LAYERS_SETTING)

map.setZoomRange(MIN_ZOOM, MAX_ZOOM)

map.addZoomControl()


const marker = map.addMarker(INIT_VIEW_COORDS, {
  title: 'Мой первый маркер'
})

const ZOO_MARKER_COORDS = [55.776244, 37.635423]
const ZOO_MARKER_ICON = L.icon({
  iconUrl: 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-map-pet-care-icongeek26-linear-colour-icongeek26.png',
  iconSize: [48, 48],
});

const zooMarker = map.addMarker(ZOO_MARKER_COORDS, {
  icon: ZOO_MARKER_ICON,
  title: 'Зоомагазин'
})


const HARDWARE_STORE_MARKER_COORDS = [55.788244, 37.635423]
const HARDWARE_STORE_MARKER_ICON = L.icon({
  iconUrl: "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-map-engineering-icongeek26-linear-colour-icongeek26.png",
  iconSize: [48, 48],
});

const hardwareStoreMarker = map.addMarker(HARDWARE_STORE_MARKER_COORDS, {
  icon: HARDWARE_STORE_MARKER_ICON,
  title: 'Строительный магазин'
})

const RESTAURANT_MARKER_COORDS = [55.787244, 37.615423]
const RESTAURANT_MARKER_ICON = L.icon({
  iconUrl: 'https://img.icons8.com/external-icongeek26-flat-icongeek26/64/external-map-bar-and-restaurant-icongeek26-flat-icongeek26.png',
  iconSize: [48, 48],
});

const restaurantMarker = map.addMarker(RESTAURANT_MARKER_COORDS, {
  icon: RESTAURANT_MARKER_ICON,
  title: 'Ресторан'
})

function getRandomInteger(min, max) {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


const offset = 0.005
marker.on('mouseover', (e) => {
  const {lat, lng} = e.latlng

  const latOffset = offset * getRandomInteger(-1,1)
  const lngOffset = offset * getRandomInteger(-1,1)

  map.moveMarkerTo(marker, [lat + latOffset, lng + lngOffset])
})