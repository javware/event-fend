import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginView from './views/auth/LoginView'
import AuthLayout from './layouts/AuthLayout'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import Home from './views/Home'
import Spinner from './components/Spinner'
import ListAddressView from './views/address/ListAddressView'
import CreateAddressView from './views/address/CreateAddressView'
import EditAddressView from './views/address/EditAddressView'
import DeleteAddressView from './views/address/DeleteAddressView'
import ListServiceView from './views/service/ListServiceView'
import CreateServiceView from './views/service/CreateServiceView'
import EditServiceView from './views/service/EditServiceView'
import DeleteServiceView from './views/service/DeleteServiceView'

const AppLayout = lazy(() => import('./layouts/AppLayout'))

export const router = createBrowserRouter([
    {
        path: '/auth/',
        element: <AuthLayout />,
        children: [

            {
                path: 'login',
                element: <LoginView />,
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordView />,
            },
            {
                path: 'new-password',
                element: <NewPasswordView />,
            },


        ]
    },
    {
        path: '/',
        element: (
            <Suspense fallback={<Spinner />}>
                <AppLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'address/',
                element: <ListAddressView />,
            },
            {
                path: 'address/create',
                element: <CreateAddressView />,
            },
            {
                path: 'address/:addressId/edit',
                element: <EditAddressView />,
            },
            {
                path: 'address/:addressId/delete',
                element: <DeleteAddressView />,
            },
            {
                path: 'service/',
                element: <ListServiceView />,
            },
            {
                path: 'service/create',
                element: <CreateServiceView />,
            },
            {
                path: 'service/:serviceId/edit',
                element: <EditServiceView />,
            },
            {
                path: 'service/:serviceId/delete',
                element: <DeleteServiceView />,
            },

        ]
    },
])