import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import Header from '../components/dashboard/header/Header';
import Footer from '../components/dashboard/footer/Footer';
import classNames from 'classnames';
import useSidebarStore from '../store/sidebarStore';


export default function AppLayout() {
    const checkScreenSize = useSidebarStore((state) => state.checkScreenSize);
    const { isOpen } = useSidebarStore();

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [checkScreenSize]);
    console.log(isOpen)

    return (

        <>
            <Sidebar/>
            <main className='max-w-[120rem] m-auto'>
                <div
                    className={classNames('flex-1 transition-all duration-300',
                        {
                            'ml-[18.5rem]': isOpen,
                            'ml-0': !isOpen,
                        })}
                >
                    <Header/>
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
