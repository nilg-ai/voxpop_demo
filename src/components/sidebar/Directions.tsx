import { LatLng } from 'leaflet'
import { BsThreeDots } from 'react-icons/bs'
import { FaDotCircle, FaFlagCheckered } from 'react-icons/fa'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'

function Directions({
    origin,
    destination,
}: {
    origin: LatLng | null
    destination: LatLng | null
}) {
    return (
        <section>
            <div className="grid grid-cols-[50px_minmax(0,_1fr)_50px] items-center">
                <div className="flex flex-col items-center gap-12">
                    <FaDotCircle />
                    <FaFlagCheckered />
                </div>
                <div className="flex flex-col gap-4">
                    <input
                        className="block w-full rounded-[8px] p-3 text-gray-900 ring-1 ring-nilg-gray focus:outline-none"
                        type="text"
                        value={origin ? `${origin?.lat}, ${origin?.lng}` : ''}
                    />
                    <input
                        className="block w-full rounded-[8px] p-3 text-gray-900 ring-1 ring-nilg-gray focus:outline-none"
                        type="text"
                        value={
                            destination
                                ? `${destination?.lat}, ${destination?.lng}`
                                : ''
                        }
                    />
                </div>
                <div className="flex flex-col items-center gap-12">
                    <BsThreeDots />
                    <HiOutlineArrowsUpDown />
                </div>
            </div>
        </section>
    )
}

export default Directions
