"use client"

import { useShotGlassData } from "@/hooks/useShotGlassData"
import { ShotGlass } from "@prisma/client"
import L, { Icon } from "leaflet"
import { useLocale } from "next-intl"
import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useLoadingBar } from "react-top-loading-bar"

type MapProps = {
  id: string
  zoom: number
  items?: ShotGlass[]
}

interface Cluster {
  getChildCount: () => number
}

const icon = new Icon({
  iconUrl: "../../../public/assets/icons/pin.png",
  iconSize: [20, 20],
  iconAnchor: [12, 20],
})

const bounds: L.LatLngBoundsExpression = [
  [-85, -180],
  [85, 180],
]

const createCustomClusterIcon = (cluster: any): L.DivIcon => {
  return L.divIcon({
    html: `
      <div class="
        w-[30px] h-[30px] rounded-full bg-red-600 border border-gray-800 
        flex items-center justify-center font-black
      ">
        <span class="text-white">${cluster.getChildCount()}</span>
      </div>
    `,
    className: "",
    iconSize: L.point(30, 30),
  })
}

const Map = ({ id, zoom, items }: MapProps) => {
  const { data, isLoading, isError } = useShotGlassData(id)
  const loadingBar = useLoadingBar()
  const locale = useLocale()

  // const city = locale === "uk" ? data.cityUkr : data.cityEng

  useEffect(() => {
    isLoading ? loadingBar.start() : loadingBar.complete()
  }, [isLoading])

  if (isError) return <div>Something went wrong</div>

  console.log("data", data)
  return (
    <MapContainer
      center={[Number(data.latitude), Number(data.longitude)]}
      zoom={zoom}
      minZoom={2}
      maxZoom={18}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {items && items.length > 0 ? (
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
              {/* <Popup>{city}</Popup> */}
            </Marker>
          ))}
        </MarkerClusterGroup>
      ) : (
        <Marker
          position={[Number(data.latitude), Number(data.longitude)]}
          icon={icon}
        >
          <Popup>
            {/* <h2>{city}</h2> */}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
export default Map
