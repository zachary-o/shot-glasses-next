import L, { Icon } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

const Map = ({ id, zoom }: { id: string; zoom: number }) => {
  const icon = new Icon({
    iconUrl: "../../../public/assets/icons/pin.png",
    iconSize: [20, 20],
    iconAnchor: [12, 20],
  })

  const bounds: L.LatLngBoundsExpression = [
    [-85, -180],
    [85, 180],
  ]
  console.log("id", id)
  return (
    <MapContainer
      // center={[Number(latitude), Number(longitude)]}
      zoom={zoom}
      minZoom={2}
      maxZoom={18}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* {items && items.length > 0 ? (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {items.map((item) => (
              <Marker
                key={item.id}
                position={[Number(item.latitude), Number(item.longitude)]}
                icon={icon}
              >
                <Popup>
                  {i18n.language === "uk" ? item.cityUkr : item.cityEng}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          <Marker position={[Number(latitude), Number(longitude)]} icon={icon}>
            <Popup>
              <h2>{city}</h2>
            </Popup>
          </Marker>
        )} */}
    </MapContainer>
  )
}
export default Map
