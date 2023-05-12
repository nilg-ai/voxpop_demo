import { useState } from 'react'

import { LatLng } from 'leaflet'
import {
    TileLayer,
    MapContainer,
    Popup,
    useMapEvents,
    Polyline,
} from 'react-leaflet'
import { IMarker } from '../../interfaces/IMarker'
import Spinner from '../Spinner'
import './Map.scss'
import 'leaflet/dist/leaflet.css'
import { IRoute } from '../../interfaces/IRoute'
import LocationMarkers from './LocationMarkers'
import DirectionsPopup from './DirectionsPopup'

function Map({
    selectMarker,
    directionsClick,
    setOrigin,
    setDestination,
    selectedRoute,
    directionRoutes,
}: {
    selectMarker: (marker: IMarker) => void
    directionsClick: (marker: IMarker) => void
    setOrigin: (origin: string) => void
    setDestination: (destination: string) => void
    selectedRoute: IRoute | null
    directionRoutes: IRoute[]
}) {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [showDirectionsPopup, setShowDirectionsPopup] = useState(false)
    const [cursorPos, setCursorPos] = useState<LatLng | null>(null)

    const MapEvents = () => {
        useMapEvents({
            contextmenu: (event) => {
                setCursorPos(event.latlng)
                setShowDirectionsPopup(true)
            },
            popupclose: () => {
                setCursorPos(null)
            },
        })
        return <></>
    }

    return (
        <div className="relative">
            {isLoading ? (
                <div className="absolute z-20 flex h-full w-full items-center justify-center bg-slate-400 opacity-70">
                    <Spinner />
                </div>
            ) : (
                <></>
            )}
            <MapContainer
                className="relative z-10 h-screen"
                center={[38.75, -9.15]}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarkers
                    selectMarker={selectMarker}
                    directionsClick={directionsClick}
                    setLoading={setLoading}
                    isLoading={isLoading}
                ></LocationMarkers>

                <MapEvents />

                {showDirectionsPopup && cursorPos && (
                    <Popup position={cursorPos}>
                        <DirectionsPopup
                            position={cursorPos}
                            setOrigin={setOrigin}
                            setDestination={setDestination}
                        />
                    </Popup>
                )}

                {/* {selectedRoute &&
                    selectedRoute.segments.map((point, i) => (
                        <Polyline
                            key={i}
                            positions={[
                                [point.origin[1], point.origin[0]],
                                [point.destination[1], point.destination[0]],
                            ]}
                            color={'#353cdd'}
                            weight={8}
                            smoothFactor={1}
                        />
                    ))} */}

                {selectedRoute
                    ? selectedRoute.segments.map((point, i) => (
                          <Polyline
                              key={i}
                              positions={[
                                  [point.origin[1], point.origin[0]],
                                  [point.destination[1], point.destination[0]],
                              ]}
                              color={'#353cdd'}
                              weight={8}
                              smoothFactor={1}
                          />
                      ))
                    : directionRoutes.map((route, i) => {
                          return route.segments.map((point, j) => (
                              <Polyline
                                  key={j}
                                  positions={[
                                      [point.origin[1], point.origin[0]],
                                      [
                                          point.destination[1],
                                          point.destination[0],
                                      ],
                                  ]}
                                  color={
                                      i === directionRoutes.length - 1
                                          ? '#353cdd'
                                          : '#8E8EA6'
                                  }
                                  weight={8}
                                  smoothFactor={1}
                              />
                          ))
                      })}
            </MapContainer>
        </div>
    )
}

export default Map
