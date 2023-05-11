import { useEffect, useState } from 'react'
import { LatLng } from 'leaflet'
import { BsThreeDots } from 'react-icons/bs'
import { FaDotCircle, FaFlagCheckered } from 'react-icons/fa'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { IRoute } from '../../interfaces/IRoute'
import AvailableRoutes from './AvailableRoutes'
import RouteDetails from './RouteDetails'

const types = [
    { id: 1, name: 'Basic' },
    { id: 2, name: 'Motor' },
]

function Directions({
    origin,
    destination,
    selectRoute,
}: {
    origin: LatLng | null
    destination: LatLng | null
    selectRoute: (route: IRoute) => void
}) {
    const [selected, setSelected] = useState<number>()
    const [routes, setRoutes] = useState<IRoute[]>([])
    const [selectedRoute, setSelectedRoute] = useState<IRoute>()

    useEffect(() => {
        if (routes.length === 0) {
            fetch(
                `${process.env.REACT_APP_API_URL}/get-route?origin=Avenida de Roma, 76&destination=Av. Padre Manuel da Nóbrega 10-12&wheelchair_type=electrical`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    if (res.STATUS === 'SUCCESS') {
                        setRoutes([
                            res.DATA[0].best_route,
                            ...res.DATA[0].other_routes,
                        ])
                    }
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [routes])

    function onRouteClick(route: IRoute) {
        setSelectedRoute(route)
        selectRoute(route)
    }

    return (
        <section>
            {selectedRoute ? (
                <div className="px-5 pb-5 font-semibold">
                    {selectedRoute.name}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-[50px_minmax(0,_1fr)_50px] items-center">
                        <div className="flex flex-col items-center gap-12">
                            <FaDotCircle />
                            <FaFlagCheckered />
                        </div>
                        <div className="flex flex-col gap-4">
                            <input
                                className="block w-full rounded-[8px] p-3 text-gray-900 ring-1 ring-nilg-gray focus:outline-none"
                                type="text"
                                defaultValue={
                                    origin
                                        ? `${origin?.lat}, ${origin?.lng}`
                                        : ''
                                }
                            />
                            <input
                                className="block w-full rounded-[8px] p-3 text-gray-900 ring-1 ring-nilg-gray focus:outline-none"
                                type="text"
                                defaultValue={
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

                    <div className="mt-4 flex items-center border-t border-nilg-gray px-5 py-3">
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
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </>
            )}

            {routes.length > 0 ? (
                selectedRoute ? (
                    <RouteDetails route={selectedRoute} />
                ) : (
                    <AvailableRoutes
                        routes={routes}
                        routeClick={onRouteClick}
                    />
                )
            ) : (
                <></>
            )}
        </section>
    )
}

export default Directions
