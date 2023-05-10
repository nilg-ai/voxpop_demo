import { AiOutlineClose } from 'react-icons/ai'
import { IMarker } from '../../interfaces/IMarker'
import MarkerDetail from './MarkerDetail'
import { LatLng } from 'leaflet'
import Directions from './Directions'

function Sidebar({
    selectedMarker,
    onCloseDetails,
    origin,
    destination,
}: {
    selectedMarker: IMarker | undefined
    onCloseDetails: () => void
    origin: LatLng | null
    destination: LatLng | null
}) {
    return (
        <div className="flex h-full flex-col overflow-auto bg-white shadow-[0_0_12px_rgb(0,0,0,0.1)]">
            <div className="absolute top-0 right-0">
                <button
                    className="bg-transparent p-4 text-black hover:bg-transparent focus:ring-0 focus:ring-transparent active:bg-transparent"
                    onClick={onCloseDetails}
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
                    ></Directions>
                </div>
            )}
        </div>
    )
}

export default Sidebar
