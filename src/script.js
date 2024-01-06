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

const coordsNode = document.getElementById('map__coords')

map.value.on('click', (e) => {
  const { lat, lng } = e.latlng
  const { latDMS, lonDMS } = map.convertDegrees(lat, lng)
  coordsNode.innerHTML = `Широта: ${latDMS} <br> Долгота: ${lonDMS}.`
  coordsNode.style.display = 'block'
})

map.value.on('move', (e) => {
  const bounds = e.target.getBounds();

  const latLeftTop = bounds.getSouth();
  const lngLeftTop = bounds.getWest()
  
  const latRightBottom = bounds.getNorth()
  const lngRightBottom = bounds.getEast()
  
  const leftTop = map.convertDegrees(latLeftTop, lngLeftTop)
  const rightBottom = map.convertDegrees(latRightBottom, lngRightBottom)

  coordsNode.innerHTML = (`
    Левый верхний угол:  ${leftTop.lat}, ${leftTop.lat};<br> 
    Нижний правый угол: ${rightBottom.lat}, ${rightBottom.lat};
  `);
  coordsNode.style.display = 'block'
})