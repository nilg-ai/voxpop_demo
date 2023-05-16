import { AiFillStar } from 'react-icons/ai'
import { IRoute } from '../../interfaces/IRoute'

function ScorePill({ route }: { route: IRoute }) {
    return (
        <div
            className={
                'justify-content flex items-center gap-1 rounded-md bg-nilg-green py-1 px-2 text-sm font-semibold text-white ' +
                `bg-${route.color}`
            }
        >
            <AiFillStar /> {route.average_accessibility * 10}
        </div>
    )
}

export default ScorePill
