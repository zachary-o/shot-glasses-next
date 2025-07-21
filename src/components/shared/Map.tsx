"use client";

import { useLocaleCityName } from "@/hooks/useLocaleCityName";
import { Cluster, MapProps } from "@/types";
import { ShotGlass } from "@prisma/client";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import LoadingSpinner from "./LoadingSpinner";

const icon = new Icon({
  iconUrl: "/assets/icons/pin.png",
  iconSize: [20, 20],
  iconAnchor: [12, 20],
});

const bounds: L.LatLngBoundsExpression = [
  [-85, -180],
  [85, 180],
];

const createCustomClusterIcon = (cluster: Cluster): L.DivIcon => {
  return L.divIcon({
    html: `
      <div style="
        width: 30px; 
        height: 30px; 
        border-radius: 50%; 
        background-color: #dc2626; 
        border: 1px solid #1f2937;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
      ">
        <span style="color: white;">${cluster.getChildCount()}</span>
      </div>
    `,
    className: "",
    iconSize: L.point(30, 30),
  });
};

const MapMarker = ({ item }: { item: ShotGlass }) => {
  const cityName = useLocaleCityName(item.cityEng, item.cityUkr);

  return (
    <Marker
      position={[Number(item?.latitude), Number(item?.longitude)]}
      icon={icon}
    >
      <Popup>{cityName}</Popup>
    </Marker>
  );
};

const Map = ({
  data,
  city,
  isLoading,
  isError,
  zoom,
  items,
  customStyles,
}: MapProps) => {
  if (isError) return <div>Something went wrong</div>;
  if (isLoading || (!items && !data))
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  const defaultCenter: [number, number] = [20, 0];

  const mapCenter: [number, number] = data
    ? [Number(data.latitude), Number(data.longitude)]
    : items && items.length > 0
    ? [Number(items[0].latitude), Number(items[0].longitude)]
    : defaultCenter;

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={customStyles}
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
            <MapMarker key={item?.id} item={item} />
          ))}
        </MarkerClusterGroup>
      ) : (
        <Marker
          position={[Number(data?.latitude), Number(data?.longitude)]}
          icon={icon}
        >
          <Popup>
            <h2>{city}</h2>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
