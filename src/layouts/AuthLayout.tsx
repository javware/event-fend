import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <>
            <div className='flex h-screen bg-white text-slate-900'>
                <div className='w-full lg:w-2/5 h-screen overflow-y-auto flex justify-center items-center'>
                    <div className="w-full max-w-lg p-3 lg:p-8 ">
                        <img src="/logo1.png" className='w-24 m-auto mb-3' alt="logo_log" />
                        <Outlet />
                    </div>
                </div>

                <div className="hidden lg:block md:w-3/5 h-screen relative">
                    <img src="/fondo_login.png" className='object-cover w-full h-full' alt="fondo_log" />
                    <img src="/logo2.png" className='w-32 bottom-0 right-0 mr-10 mb-5 absolute z-10' alt="logo_log" />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <Toaster />
            </div>
        </>
    )
}
