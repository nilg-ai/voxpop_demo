import { FaDotCircle } from 'react-icons/fa'
import { IRoute } from '../../interfaces/IRoute'
import Start from './Start'
import { BsArrow90DegRight } from 'react-icons/bs'

function RouteDetails({ route }: { route: IRoute }) {
    return (
        <section className="bg-nilg-gray">
            <Start route={route} />
            <div className="relative mt-2.5 flex items-center bg-white">
                <div className="p-5 text-nilg-blue">
                    <FaDotCircle />
                </div>
                <span className="relative text-sm font-semibold">
                    Your location
                </span>
                <div className="absolute left-14 bottom-0 right-5 border border-nilg-gray"></div>
            </div>
            {route.segments.map((point) => (
                <div className="relative flex items-center bg-white py-2.5">
                    <div className="p-5">
                        <BsArrow90DegRight />
                    </div>
                    <span className="relative pr-5 text-sm font-semibold">
                        {point.instruction}
                    </span>

                    <div className="absolute left-14 bottom-0 right-5 flex items-center">
                        <span className="whitespace-nowrap text-[10px] text-nilg-dark-gray">
                            100 m
                        </span>
                        <hr className="ml-2 w-full border border-nilg-gray" />
                    </div>
                </div>
            ))}
        </section>
    )
}

export default RouteDetails