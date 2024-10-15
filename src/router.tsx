import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LoginView from './views/auth/LoginView'
import AuthLayout from './layouts/AuthLayout'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import Home from './views/Home'

const AppLayout = lazy(() => import('./layouts/AppLayout'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<div>Cargando layout...</div>}>
                <AppLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            // {
            //     path: 'miembros/',
            //     element: <LisMemberView />,
            // },
            // {
            //     path: 'miembros/create',
            //     element: <CreateMemberView />,
            // }
        ]
    },
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
    }
])