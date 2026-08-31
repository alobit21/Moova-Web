export type DeliveryStatus = "arriving" | "delivered" | "delayed"

export type RouteAddress = {
  label: string
  address: string
  meta: string
  coordinates: [number, number]
}

export type TrackingResult = {
  status: string
  etaMinutes?: number
  timestamp?: string
  city?: string
  createdBy?: string
  pickup: RouteAddress
  dropoff: RouteAddress
  driverName?: string
  vehicle?: string
  plate?: string
  paymentMethod?: string
  requestedByLine?: string
  driverLocation?: [number, number]
}