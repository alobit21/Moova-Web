import { useEffect, useState, useMemo } from "react"
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api"

type LatLng = [number, number]

export function TrackingMap({
  pickup,
  dropoff,
  pickupLabel,
  dropoffLabel,
  driverLocation,
}: {
  pickup: LatLng
  dropoff: LatLng
  pickupLabel: string
  dropoffLabel: string
  driverLocation?: LatLng
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // Make sure to add this to your .env
  })

  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)

  const pickupObj = useMemo(() => ({ lat: pickup[0], lng: pickup[1] }), [pickup])
  const dropoffObj = useMemo(() => ({ lat: dropoff[0], lng: dropoff[1] }), [dropoff])
  const driverObj = useMemo(() => (driverLocation ? { lat: driverLocation[0], lng: driverLocation[1] } : null), [driverLocation])

  useEffect(() => {
    if (!isLoaded || !pickupObj || !dropoffObj) return
    const directionsService = new window.google.maps.DirectionsService()
    
    directionsService.route(
      {
        origin: pickupObj,
        destination: dropoffObj,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result)
        } else {
          console.error(`Error fetching directions: ${status}`)
        }
      }
    )
  }, [isLoaded, pickupObj, dropoffObj])

  if (!isLoaded) return <div className="h-full w-full bg-slate-100 flex items-center justify-center font-medium text-slate-500">Loading Google Maps...</div>

  return (
    <GoogleMap
      mapContainerClassName="h-full w-full"
      options={{ disableDefaultUI: true, zoomControl: true }}
      center={driverObj || pickupObj}
      zoom={14}
    >
      {/* Route Line */}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            suppressMarkers: true,
            polylineOptions: { strokeColor: "#4f46e5", strokeWeight: 5, strokeOpacity: 0.8 },
          }}
        />
      )}

      {/* Pickup & Dropoff Markers */}
      <Marker position={pickupObj} label="P" title={pickupLabel} />
      <Marker position={dropoffObj} label="D" title={dropoffLabel} />

      {/* Live Driver Marker */}
      {driverObj && (
        <Marker
          position={driverObj}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#f59e0b",
            fillOpacity: 1,
            strokeWeight: 3,
            strokeColor: "#ffffff",
            scale: 8,
          }}
          title="Driver's Current Location"
          zIndex={999}
        />
      )}
    </GoogleMap>
  )
}
