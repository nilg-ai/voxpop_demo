import { TbNavigation } from 'react-icons/tb'
import { FaRegMap } from 'react-icons/fa'

import { IRoute } from '../../interfaces/IRoute'
import ScorePill from './ScorePill'

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
            <div className="ml-auto mr-3 flex flex-col whitespace-nowrap text-right">
                <div className="text-sm font-semibold text-nilg-black">
                    {Math.round(route.estimated_time)} min
                </div>
                <div className="text-xs font-semibold text-nilg-dark-gray">
                    {route.distance} m
                </div>
            </div>
            <ScorePill route={route} />
        </section>
    )
}

export default Start
