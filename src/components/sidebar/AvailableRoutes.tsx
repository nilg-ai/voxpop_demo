import { IRoute } from '../../interfaces/IRoute'
import Route from './Route'

function AvailableRoutes({ routes }: { routes: IRoute[] }) {
    return (
        <section className="my-5 bg-nilg-gray">
            <div className="bg-white px-5 text-xs font-semibold text-nilg-dark-gray">
                Recommended Route
            </div>
            <Route route={routes[0]} />

            <div className="mt-2.5 bg-white px-5 pt-5 text-xs font-semibold text-nilg-dark-gray">
                Other Routes
            </div>
            {routes.slice(1).map((route) => (
                <Route route={route} />
            ))}
        </section>
    )
}

export default AvailableRoutes
