import loadable from '@react-loadable/revised'
import {IRoute} from '.'
import Loading from '../components/common/Loading'

const routes: ReadonlyArray<IRoute> = [
    {
        path: '/',
        component: loadable({
            loader: () => import('../components/admin/Home'),
            loading: Loading
        })
    },
    {
        path: '/login',
        component: loadable({
            loader: () => import('../components/admin/AdminLogin'),
            loading: Loading
        })
    },
    {
        path: '/register',
        component: loadable({
            loader: () => import('../components/admin/Register'),
            loading: Loading
        })
    },
]

export default routes