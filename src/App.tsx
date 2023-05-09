import React, { useState } from 'react'
import { IMarker } from './interfaces/IMarker'
import CookieBanner from './components/cookie-banner/CookieBanner'
import Header from './components/header/Header'
import Map from './components/map/Map'
import MarkerDetail from './components/marker-detail/MarkerDetail'

function App() {
    const [isShowingDetail, showDetail] = React.useState(false)
    const [selectedMarker, setSelectedMarker] = useState<IMarker | undefined>(
        undefined
    )

    function closeDetails() {
        showDetail(false)
    }

    function onSelectMarker(marker: IMarker) {
        showDetail(true)
        setSelectedMarker(marker)
    }

    return (
        <>
            <Header></Header>
            <div className="relative">
                {isShowingDetail ? (
                    <div className="absolute z-50 h-full w-full sm:w-full md:w-1/3 lg:w-1/4">
                        <MarkerDetail
                            selectedMarker={selectedMarker}
                            onCloseDetails={closeDetails}
                        ></MarkerDetail>
                    </div>
                ) : (
                    <></>
                )}
                <div className="relative z-10">
                    <Map onSelectMarker={onSelectMarker}></Map>
                </div>
            </div>
            <CookieBanner />
        </>
    )
}
export default App
