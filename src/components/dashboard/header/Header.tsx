import { RiSearch2Line } from "react-icons/ri";
import { HiOutlineBars3CenterLeft, HiOutlineBell } from "react-icons/hi2";
import Dropdown from "./Dropdown";
// import { User } from "../../types";
import { PiKeyholeDuotone, PiUserBold } from "react-icons/pi";
import { useQueryClient } from "@tanstack/react-query";

type HeaderProps = {
    name: string
    closeSidebar: boolean
    setCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
export default function header({  setCloseSidebar, closeSidebar }: HeaderProps) {

    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }

    const options = [
        {
            label: 'Mi Perfil',
            onClick: () => console.log('Edit clicked'),
            iconActive: <PiUserBold className="mr-2 h-5 w-5" aria-hidden="true" />,
            iconInactive: <PiUserBold className="mr-2 h-5 w-5" aria-hidden="true" />,
        },
        {
            label: 'Cerrar Sesión',
            onClick: (logout),
            iconActive: <PiKeyholeDuotone className="mr-2 h-5 w-5" aria-hidden="true" />,
            iconInactive: <PiKeyholeDuotone className="mr-2 h-5 w-5" aria-hidden="true" />,
        },
    ]
    return (
        <div className="sticky bg-white top-0 z-10 py-2 px-6 border-b shadow-sm flex items-center justify-between">
            <div className="flex gap-5">
                <div onClick={() => setCloseSidebar(!closeSidebar)} className="flex items-center text-red-500 justify-center h-9 w-9 rounded-lg bg-gray-100 cursor-pointer">
                    <HiOutlineBars3CenterLeft className="text-2xl" />
                </div>
                <h1 className="text-2xl font-bold hidden sm:block">Inicio</h1>
            </div>

            <div className="flex gap-5 items-center">
                <form className="flex relative">
                    <RiSearch2Line className="absolute text-gray-600 left-2 top-1/2 transform -translate-y-1/2 hidden lg:block" />
                    <input type="text" className="bg-gray-100 text-gray-500 text-sm pl-8 pr-4 h-9 rounded-lg focus:outline-none hidden lg:block" placeholder="Buscar..." />
                </form>

                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gray-100 cursor-pointer">
                    <HiOutlineBell className="text-gray-600 text-xl" />
                </div>

                <div className="flex items-center ">
                    <img src="https://media.nngroup.com/media/people/photos/2022-portrait-page-3.jpg.600x600_q75_autocrop_crop-smart_upscale.jpg" className="w-9 h-9 rounded-lg" alt="" />
                    <Dropdown name={"Javier Azaña"} options={options} />
                </div>
            </div>
        </div>
    )
}
