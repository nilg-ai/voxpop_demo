import { AiOutlineClose } from 'react-icons/ai'
import { IMarker } from '../../interfaces/IMarker'
import MarkerDetail from './MarkerDetail'
import { LatLng } from 'leaflet'
import Directions from './Directions'
import { IRoute } from '../../interfaces/IRoute'

function Sidebar({
    selectedMarker,
    closeDetails,
    origin,
    destination,
    selectRoute,
}: {
    selectedMarker: IMarker | undefined
    closeDetails: () => void
    origin: LatLng | null
    destination: LatLng | null
    selectRoute: (route: IRoute) => void
}) {
    return (
        <div className="flex h-full flex-col overflow-auto bg-white shadow-[0_0_12px_rgb(0,0,0,0.1)]">
            <div className="absolute top-0 right-0">
                <button
                    className="bg-transparent p-4 text-black hover:bg-transparent focus:ring-0 focus:ring-transparent active:bg-transparent"
                    onClick={closeDetails}
                >
                    <AiOutlineClose />
                </button>
            </div>
            {selectedMarker ? (
                <MarkerDetail selectedMarker={selectedMarker} />
            ) : (
                <div className="mt-10">
                    <Directions
                        origin={origin}
                        destination={destination}
                        selectRoute={selectRoute}
                    ></Directions>
                </div>
            )}
        </div>
    )
}

export default Sidebar
