import { useState } from 'react'
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import Header from '../components/dashboard/header/Header';
import Footer from '../components/dashboard/footer/Footer';
import classNames from 'classnames';
import { useWindowSize } from '../hooks/useWindowSize';

export default function AppLayout() {
    const size = useWindowSize();
    const [closeSidebar, setCloseSidebar] = useState<boolean>(true)

    return (

        <>
            <Sidebar setCloseSidebar={setCloseSidebar} closeSidebar={closeSidebar} />
            <main className='max-w-[120rem] m-auto'>
                <div
                    className={classNames('flex-1 transition-all duration-300',
                        {
                            'ml-[18.5rem]': size?.width && size.width >= 780 && closeSidebar,
                            'ml-0': size?.width && size.width < 780,
                        })}
                >
                    <Header name={"fff"} setCloseSidebar={setCloseSidebar} closeSidebar={closeSidebar} />
                    <div className='px-5 py-5 bg-gray-100/60  min-h-[79vh]'>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
                <Toaster />
            </main>
        </>

    )
}
