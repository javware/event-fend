import { Outlet } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
    return (
        <>
            <div className='flex h-screen bg-white text-slate-900'>
                <div className='w-2/5 h-screen overflow-y-auto flex justify-center items-center'>
                    <div className="w-full max-w-lg p-8 ">
                        <img src="/logo1.png" className='w-24 m-auto mb-3' alt="" />
                        <Outlet />
                    </div>
                </div>

                <div className="w-3/5 h-screen relative">
                    <img src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/362234117_763487258932484_7877302856301376517_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFb960bShFXxRD-HPovM_bu1-6znximkQXX7rOfGKaRBYf1oEYZdfd_WIKGswEwLNv9pHhln7vtUjJeztqPWX3H&_nc_ohc=YmAgCyV_z_oQ7kNvgG5Vea3&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=ATH0NhVC8XoHfe4r0sF5C2D&oh=00_AYAjkAn_m7NrPld6dqFFygFx26gcKUa4DKnzDVnJPdssRA&oe=67106A27" className='object-cover w-full h-full' alt="" />
                    <img src="/logo2.png" className='w-32 bottom-0 right-0 mr-10 mb-5 absolute z-10' alt="" />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
            </div>
        </>
    )
}
