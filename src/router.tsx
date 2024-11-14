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
import ListCategoryView from './views/category/ListCategoryView'
import DeleteCategoryView from './views/category/DeleteCategoryView'
import EditCategoryView from './views/category/EditCategoryView'
import CreateCategoryView from './views/category/CreateCategoryView'
import ListSubCategoryView from './views/subcategory/ListSubCategoryView'
import CreateSubCategoryView from './views/subcategory/CreateSubCategoryView'
import EditSubCategoryView from './views/subcategory/EditSubCategoryView'
import DeleteSubCategoryView from './views/subcategory/DeleteSubCategoryView'
import ListEventView from './views/event/ListEventView'
import CreateEventView from './views/event/CreateEventView'
import EditEventView from './views/event/EditEventView'
import DeleteEventView from './views/event/DeleteEventView'

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
            {
                path: 'category/',
                element: <ListCategoryView />,
            },
            {
                path: 'category/create',
                element: <CreateCategoryView />,
            },
            {
                path: 'category/:categoryId/edit',
                element: <EditCategoryView />,
            },
            {
                path: 'category/:categoryId/delete',
                element: <DeleteCategoryView />,
            },

            {
                path: 'subcategory/',
                element: <ListSubCategoryView />,
            },
            {
                path: 'subcategory/create',
                element: <CreateSubCategoryView />,
            },
            {
                path: 'subcategory/:subcategoryId/edit',
                element: <EditSubCategoryView />,
            },
            {
                path: 'subcategory/:subcategoryId/delete',
                element: <DeleteSubCategoryView />,
            },

            {
                path: 'event/',
                element: <ListEventView />,
            },
            {
                path: 'event/create',
                element: <CreateEventView />,
            },
            {
                path: 'event/:eventId/edit',
                element: <EditEventView />,
            },
            {
                path: 'event/:eventId/delete',
                element: <DeleteEventView />,
            },

        ]
    },
])