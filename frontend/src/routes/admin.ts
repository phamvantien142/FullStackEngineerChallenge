import loadable from '@react-loadable/revised'
import {IRoute} from '.'
import Loading from '../components/common/Loading'

const routes: ReadonlyArray<IRoute> = [
    {
        path: '/',
        component: loadable({
            loader: () => import('../components/admin/Home'),
            loading: Loading,
        }),
        exact: true
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
            loader: () => import('../components/admin/AdminRegister'),
            loading: Loading
        })
    },
    {
        path: '/new-user',
        component: loadable({
            loader: () => import('../components/admin/NewUser'),
            loading: Loading
        })
    },
    {
        path: '/new-review',
        component: loadable({
            loader: () => import('../components/admin/NewReview'),
            loading: Loading
        })
    }
]

export default routes