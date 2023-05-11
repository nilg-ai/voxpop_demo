import { AiFillStar } from 'react-icons/ai'
import { IRoute } from '../../interfaces/IRoute'
import { TbNavigation } from 'react-icons/tb'
import { FaRegMap } from 'react-icons/fa'

function Start({ route }: { route: IRoute }) {
    return (
        <section className="flex cursor-pointer cursor-pointer items-center gap-2 border-nilg-gray bg-white px-5 pb-5">
            <button className="flex items-center gap-2 rounded-[40px] bg-nilg-blue py-2.5 px-4 text-sm font-semibold text-white">
                <TbNavigation /> Start
            </button>
            <button className="border-1 flex items-center gap-2 rounded-[40px] border border-nilg-gray py-2.5 px-4 text-sm font-semibold">
                <FaRegMap className="text-nilg-blue" />{' '}
                <span className="nilg-black">Map</span>
            </button>
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
                    'justify-content flex items-center gap-1 rounded-md py-1 px-2 text-sm font-semibold text-white ' +
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

export default Start
