import loadable from '@react-loadable/revised'
import {IRoute} from '.'
import Loading from '../components/common/Loading'

const routes: ReadonlyArray<IRoute> = [
    {
        path: '/',
        component: loadable({
            loader: () => import('../components/user/Home'),
            loading: Loading
        }),
        exact: true
    },
    {
        path: '/login',
        component: loadable({
            loader: () => import('../components/user/UserLogin'),
            loading: Loading
        })
    }
]

export default routes