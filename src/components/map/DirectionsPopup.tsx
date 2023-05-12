import { LatLng } from 'leaflet'

function DirectionsPopup({
    position,
    setOrigin,
    setDestination,
}: {
    position: LatLng
    setOrigin: (origin: string) => void
    setDestination: (destination: string) => void
}) {
    return (
        <div className="flex flex-col">
            <button onClick={() => setOrigin(position.toString())}>
                Directions from here
            </button>

            <button onClick={() => setDestination(position.toString())}>
                Directions to here
            </button>
        </div>
    )
}

export default DirectionsPopup
