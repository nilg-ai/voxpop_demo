import { createElement, useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'

import L, { LatLng, marker } from 'leaflet'
import {
    TileLayer,
    Marker,
    MapContainer,
    Popup,
    useMapEvents,
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import { FaThumbsUp, FaThumbsDown, FaRegMap } from 'react-icons/fa'
import { BsArrow90DegRight } from 'react-icons/bs'

import { IMarker } from '../../interfaces/IMarker'
import Spinner from '../Spinner'
import './Map.scss'
import 'leaflet/dist/leaflet.css'

function LocationMarkers({
    onSelectMarker,
    setLoading,
    isLoading,
}: {
    onSelectMarker: (marker: IMarker) => void
    setLoading: (state: boolean) => void
    isLoading: boolean
}) {
    const [selectedMarker, setSelectedMarker] = useState<IMarker | undefined>(
        undefined
    )
    const [markers, setMarkers] = useState<IMarker[]>([])
    const [isError, setError] = useState<boolean>(false)

    const markerHtmlStyles = (color: string) => `
    background-color: ${color};
    width: 1rem;
    height: 1rem;
    left: -0.2rem;
    top: -0.2rem;
    position: relative;
    border-radius: 50%;`

    const icon = (color: string) =>
        L.divIcon({
            html: `<div style="${markerHtmlStyles(color)}" />`,
        })

    const selectedMarkerHtmlStyles = `
    background-image: url(${marker});
    width: 2rem;
    height: 2rem;
    left: -0.45rem;
    top: -0.9rem;
    position: relative;
    border-radius: 50%;
    background-repeat: no-repeat;`

    const selectedIcon = L.divIcon({
        html: `<div style="${selectedMarkerHtmlStyles}" />`,
    })

    const getData = () => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/list-all-points`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.STATUS === 'SUCCESS') {
                    setMarkers(
                        res.DATA.map((el: any) => ({
                            id: el.idx,
                            lat: el.lat,
                            long: el.long,
                            color: el.point_color_code,
                            likes: el.likes,
                            dislikes: el.dislikes,
                            address: el.img_name,
                            directionsUrl: el.GOOGLE_MAPS_URL,
                        }))
                    )
                } else {
                    setError(true)
                }
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setError(true)
                console.error(err)
            })
    }

    useEffect(() => {
        if (markers.length === 0 && !isLoading && !isError) {
            getData()
        }
    })

    return (
        <MarkerClusterGroup chunkedLoading>
            {markers.map((marker, i) => (
                <Marker
                    key={i}
                    position={new LatLng(marker.lat, marker.long)}
                    icon={
                        marker.lat === selectedMarker?.lat &&
                        marker.long === selectedMarker.long
                            ? selectedIcon
                            : icon(marker.color ?? '#FFFFFF')
                    }
                    eventHandlers={{
                        click: (event) => {
                            setSelectedMarker(marker)
                            onSelectMarker(marker)
                            event.target.closePopup()
                        },
                        mouseover: (event) => {
                            if (
                                marker.lat !== selectedMarker?.lat ||
                                marker.long !== selectedMarker.long
                            ) {
                                event.target.openPopup()
                            }
                        },
                    }}
                >
                    <Popup>
                        <div className="flex flex-col">
                            <div className="justify-content flex min-w-[12rem] items-center gap-2">
                                <div className="w-3/5 whitespace-normal">
                                    {marker.address}
                                </div>
                                <div className="flex w-2/5 justify-end gap-1">
                                    <button
                                        onClick={() => {}}
                                        className="!h-8 w-8 !rounded-full !bg-nilg-blue"
                                    >
                                        <BsArrow90DegRight className="text-sm font-semibold" />
                                    </button>
                                    <a
                                        href={marker.directionsUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <button className="!h-8 w-8 !rounded-full !border-slate-500/25 !bg-white">
                                            <FaRegMap className="text-sm font-semibold text-nilg-blue" />
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center text-slate-300">
                                <FaThumbsUp />
                                <span className="ml-1">{marker.likes}</span>
                                <FaThumbsDown className="ml-5" />
                                <span className="ml-1">{marker.dislikes}</span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    )
}

function DirectionsPopup({
    position,
    setOrigin,
    setDestination,
}: {
    position: LatLng
    setOrigin: (origin: LatLng) => void
    setDestination: (destination: LatLng) => void
}) {
    return (
        <div className="flex flex-col">
            <button onClick={() => setOrigin(position)}>
                Directions from here
            </button>

            <button onClick={() => setDestination(position)}>
                Directions to here
            </button>
        </div>
    )
}

function Map({
    onSelectMarker,
    setOrigin,
    setDestination,
}: {
    onSelectMarker: (marker: IMarker) => void
    setOrigin: (origin: LatLng) => void
    setDestination: (destination: LatLng) => void
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
                    onSelectMarker={onSelectMarker}
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
            </MapContainer>
        </div>
    )
}

export default Map
