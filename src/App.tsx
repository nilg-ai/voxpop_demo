import React, { useState } from 'react'
import { IMarker } from './interfaces/IMarker'
import CookieBanner from './components/cookie-banner/CookieBanner'
import Header from './components/header/Header'
import Map from './components/map/Map'
import Sidebar from './components/sidebar/Sidebar'
import { LatLng } from 'leaflet'
import { IRoute } from './interfaces/IRoute'

function App() {
    const [isShowingSidebar, showSidebar] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState<IMarker | undefined>(
        undefined
    )
    const [origin, setOrigin] = useState<LatLng | null>(null)
    const [destination, setDestination] = useState<LatLng | null>(null)
    const [selectedRoute, setSelectedRoute] = useState<IRoute | null>(null)

    function onCloseDetails() {
        showSidebar(false)
    }

    function onSelectMarker(marker: IMarker) {
        showSidebar(true)
        setSelectedMarker(marker)
    }

    function onSetOrigin(origin: LatLng) {
        showSidebar(true)
        setOrigin(origin)
    }

    function onSetDestination(destination: LatLng) {
        showSidebar(true)
        setDestination(origin)
    }

    function onSelectedRoute(route: IRoute) {
        setSelectedRoute(route)
    }

    return (
        <>
            <Header></Header>
            <div className="relative">
                {isShowingSidebar ? (
                    <div className="absolute z-50 h-full w-full sm:w-full md:w-1/3 lg:w-1/4">
                        <Sidebar
                            selectedMarker={selectedMarker}
                            closeDetails={onCloseDetails}
                            origin={origin}
                            destination={destination}
                            selectRoute={onSelectedRoute}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <div className="relative z-10">
                    <Map
                        onSelectMarker={onSelectMarker}
                        setOrigin={onSetOrigin}
                        setDestination={onSetDestination}
                        selectedRoute={selectedRoute}
                    ></Map>
                </div>
            </div>
            <CookieBanner />
        </>
    )
}
export default App
