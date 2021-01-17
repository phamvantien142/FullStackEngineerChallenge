import loadable from '@react-loadable/revised'
import Loading from '../components/common/Loading'
import adminRoutes from './admin'
import userRoutes from './user'
import {UserType, UrlPrefixes} from '../helpers/constants'

export interface IRoute {
    path: string
    component: ReturnType<typeof loadable>
    exact?: boolean
}

const routesConfiguration: {[key in UserType]: ReadonlyArray<IRoute>} = {
    [UserType.user]: userRoutes,
    [UserType.admin]: adminRoutes,
}
const routes = Object.entries(routesConfiguration)
    .reduce((acc, [userType, routes]) => {
        for (const route of routes) {
            acc.push({
                ...route,
                path: `${UrlPrefixes[userType as UserType]}${route.path}`
            })
        }
        return acc
    }, [] as Array<IRoute>)

export default routes