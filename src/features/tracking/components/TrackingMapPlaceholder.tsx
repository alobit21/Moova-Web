import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet"
import L from "leaflet"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

// Vite doesn't resolve Leaflet's default marker asset paths automatically.
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const pickupIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:#10b981;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></span>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

const dropoffIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:#6366f1;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></span>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

type LatLng = [number, number]

export function TrackingMap({
  pickup,
  dropoff,
  pickupLabel,
  dropoffLabel,
}: {
  pickup: LatLng
  dropoff: LatLng
  pickupLabel: string
  dropoffLabel: string
}) {
  const bounds = L.latLngBounds([pickup, dropoff])

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [40, 40] }}
      className="h-full w-full"
      scrollWheelZoom={false}
    >
      <MapReady bounds={bounds} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={[pickup, dropoff]} pathOptions={{ color: "#4f46e5", weight: 4 }} />
      <Marker position={pickup} icon={pickupIcon}>
        <Popup>{pickupLabel}</Popup>
      </Marker>
      <Marker position={dropoff} icon={dropoffIcon}>
        <Popup>{dropoffLabel}</Popup>
      </Marker>
    </MapContainer>
  )
}

// Leaflet needs an explicit size recalculation once its container has real dimensions
// (it initializes before the flex/grid layout settles otherwise).
function MapReady({ bounds }: { bounds: L.LatLngBounds }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 0)
    return () => clearTimeout(timer)
  }, [bounds])
  return null
}