import { AiFillStar } from 'react-icons/ai'
import { IRoute } from '../../interfaces/IRoute'

function Route({ route }: { route: IRoute }) {
    return (
        <section className="flex items-center gap-4 border-b border-nilg-gray bg-white p-5">
            <div className="text-sm font-semibold text-nilg-black">
                {route.name}
            </div>
            <div className="ml-auto flex flex-col whitespace-nowrap text-right">
                <div className="text-sm font-semibold text-nilg-black">
                    {route.duration} min
                </div>
                <div className="text-xs font-semibold text-nilg-dark-gray">
                    {route.distance} m
                </div>
            </div>
            <div
                className={
                    'justify-content flex items-center gap-1 rounded py-1 px-2 text-sm font-semibold text-white ' +
                    `${
                        route.score > 7
                            ? 'bg-nilg-green'
                            : route.score < 3
                            ? 'bg-nilg-orange'
                            : 'bg-nilg-yellow'
                    }`
                }
            >
                <AiFillStar /> {route.score}
            </div>
        </section>
    )
}

export default Route
