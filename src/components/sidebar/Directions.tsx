import { useState } from 'react'
import { LatLng } from 'leaflet'
import { BsThreeDots } from 'react-icons/bs'
import { FaDotCircle, FaFlagCheckered } from 'react-icons/fa'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { IRoute } from '../../interfaces/IRoute'
import AvailableRoutes from './AvailableRoutes'

const types = [
    { id: 1, name: 'Basic' },
    { id: 2, name: 'Motor' },
]

const routes: IRoute[] = [
    {
        id: 1,
        name: 'via R. da Rosa and R. Eduardo Coelho',
        distance: 700,
        duration: 9,
        score: 9.5,
    },
    {
        id: 2,
        name: 'via R. da Rosa and Samino',
        distance: 975,
        duration: 12,
        score: 6.6,
    },
    { id: 3, name: 'via R. da Rosa', distance: 1200, duration: 15, score: 6.5 },
    {
        id: 4,
        name: 'via R. Nova do Loureiro and R. Eduardo Coelho',
        distance: 2300,
        duration: 26,
        score: 2.4,
    },
]

function Directions({
    origin,
    destination,
}: {
    origin: LatLng | null
    destination: LatLng | null
}) {
    const [selected, setSelected] = useState<number>()

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
            <div className="mt-4 flex items-center border-b border-t border-nilg-gray px-5 py-3">
                <span className="mr-4 text-sm font-semibold text-nilg-dark-gray">
                    Wheelchair type:{' '}
                </span>
                <div>
                    <select
                        id="type"
                        name="type"
                        className="block w-full rounded-md border-0 py-1.5 text-nilg-black"
                        defaultValue={types[0].id}
                        onChange={(e) => setSelected(+e.target.value)}
                    >
                        {types.map((type) => (
                            <option value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <AvailableRoutes routes={routes} />
        </section>
    )
}

export default Directions
