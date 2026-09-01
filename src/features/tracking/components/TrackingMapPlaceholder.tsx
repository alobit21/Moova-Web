import { useEffect, useState, useMemo } from "react"
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api"
import locationPinIcon from "@/assets/tracking/location/location.png"
import motorbikeIcon from "@/assets/tracking/location/motorbike.png"

type LatLng = [number, number]

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"]

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
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyDC1mNptZthKAI7ge48qeQUeL1J_Hmqu60"

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
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

  if (loadError) {
    return (
      <div className="h-full w-full bg-slate-100 flex items-center justify-center p-4 text-center text-slate-500 font-medium">
        Error loading Google Maps. Please check your API key permissions.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full bg-slate-100 flex items-center justify-center font-medium text-slate-500">
        Loading Google Maps...
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerClassName="h-full w-full rounded-2xl"
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
            polylineOptions: { strokeColor: "#2648A6", strokeWeight: 5, strokeOpacity: 0.85 },
          }}
        />
      )}

      {/* Custom Pickup Location Marker */}
      {pickupObj && (
        <Marker
          position={pickupObj}
          icon={{
            url: locationPinIcon,
            scaledSize: new window.google.maps.Size(42, 42),
            anchor: new window.google.maps.Point(21, 42),
          }}
          title={`Pickup: ${pickupLabel}`}
        />
      )}

      {/* Custom Dropoff Location Marker */}
      {dropoffObj && (
        <Marker
          position={dropoffObj}
          icon={{
            url: locationPinIcon,
            scaledSize: new window.google.maps.Size(42, 42),
            anchor: new window.google.maps.Point(21, 42),
          }}
          title={`Dropoff: ${dropoffLabel}`}
        />
      )}

      {/* Custom Live Motorbike Driver Marker */}
      {driverObj && (
        <Marker
          position={driverObj}
          icon={{
            url: motorbikeIcon,
            scaledSize: new window.google.maps.Size(48, 48),
            anchor: new window.google.maps.Point(24, 24),
          }}
          title="Dereva Yupo Hapa (Driver's Current Location)"
          zIndex={999}
        />
      )}
    </GoogleMap>
  )
}
