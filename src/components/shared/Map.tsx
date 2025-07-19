"use client";

import { ShotGlass } from "@prisma/client";
import L, { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import LoadingSpinner from "./LoadingSpinner";

import "leaflet/dist/leaflet.css";

type MapProps = {
  data: ShotGlass;
  city?: string;
  isError: boolean;
  isLoading: boolean;
  zoom: number;
  items?: ShotGlass[];
  customStyles: CustomStyles;
};

type CustomStyles = {
  width: number | string;
  height?: number | string;
  maxHeight?: number | string;
  borderRadius?: number | string;
  backgroundColor?: string;
  marginBottom?: number | string;
};

interface Cluster {
  getChildCount: () => number;
}

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
  if (isLoading || !data)
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  console.log("data", data);
  return (
    <MapContainer
      center={[Number(data?.latitude), Number(data?.longitude)]}
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
            <Marker
              key={item?.id}
              position={[Number(item?.latitude), Number(item?.longitude)]}
              icon={icon}
            >
              <Popup>{city}</Popup>
            </Marker>
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
