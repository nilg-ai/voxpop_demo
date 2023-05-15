import React, { useState } from 'react'
import { IMarker } from './interfaces/IMarker'
import CookieBanner from './components/cookie-banner/CookieBanner'
import Header from './components/header/Header'
import Map from './components/map/Map'
import Sidebar from './components/sidebar/Sidebar'
import { IRoute } from './interfaces/IRoute'

function App() {
    const [isShowingSidebar, showSidebar] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null)
    const [origin, setOrigin] = useState<string>('')
    const [destination, setDestination] = useState<string>('')
    const [selectedRoute, setSelectedRoute] = useState<IRoute | null>(null)
    const [directionRoutes, setDirectionRoutes] = useState<IRoute[]>([])

    function onCloseDetails() {
        showSidebar(false)
    }

    function onSelectMarker(marker: IMarker) {
        showSidebar(true)
        setSelectedMarker(marker)
    }

    function onSetOrigin(origin: string) {
        showSidebar(true)
        setSelectedMarker(null)
        setOrigin(origin)
    }

    function onSetDestination(destination: string) {
        showSidebar(true)
        setSelectedMarker(null)
        setDestination(destination)
    }

    function onSelectedRoute(route: IRoute) {
        setSelectedRoute(route)
    }

    function onSetDirectionRoutes(routes: IRoute[]) {
        setDirectionRoutes(routes)
    }

    return (
        <>
            <Header></Header>
            <div className="relative">
                {isShowingSidebar ? (
                    <div className="absolute z-50 h-full w-full sm:w-full md:w-1/2 lg:w-1/4">
                        <Sidebar
                            selectedMarker={selectedMarker}
                            closeDetails={onCloseDetails}
                            origin={origin}
                            destination={destination}
                            selectRoute={onSelectedRoute}
                            setDirectionRoutes={onSetDirectionRoutes}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <div className="relative z-10">
                    <Map
                        selectMarker={onSelectMarker}
                        directionsClick={(marker) =>
                            onSetOrigin(marker.address as string)
                        }
                        setOrigin={onSetOrigin}
                        setDestination={onSetDestination}
                        selectedRoute={selectedRoute}
                        directionRoutes={directionRoutes}
                    ></Map>
                </div>
            </div>
            <CookieBanner />
        </>
    )
}
export default App
