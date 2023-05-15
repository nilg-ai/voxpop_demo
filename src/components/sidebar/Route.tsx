import { AiFillStar } from 'react-icons/ai'
import { IRoute } from '../../interfaces/IRoute'

function Route({
    route,
    routeClick,
}: {
    route: IRoute
    routeClick: () => void
}) {
    return (
        <section
            className="flex cursor-pointer cursor-pointer items-center gap-4 border-b border-nilg-gray bg-white p-5"
            onClick={routeClick}
        >
            <div className="text-sm font-semibold text-nilg-black">
                {route.name}
            </div>
            <div className="ml-auto flex flex-col whitespace-nowrap text-right">
                <div className="text-sm font-semibold text-nilg-black">
                    {Math.round(route.estimated_time)} min
                </div>
                <div className="text-xs font-semibold text-nilg-dark-gray">
                    {route.distance} m
                </div>
            </div>
            <div
                className={
                    'justify-content flex items-center gap-1 rounded-md bg-nilg-green py-1 px-2 text-sm font-semibold text-white'
                }
            >
                <AiFillStar /> {route.average_accessibility}
            </div>
        </section>
    )
}

export default Route
