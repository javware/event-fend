import { RxCalendar, RxLayers } from 'react-icons/rx';
import { GoCopilot } from 'react-icons/go';
import { TbMessage2 } from 'react-icons/tb';
import { RiHome3Line } from 'react-icons/ri';
import { LuX } from 'react-icons/lu';
import Nav from './Nav';

type SiderProps = {
  closeSidebar: boolean
  setCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Sidebar({ closeSidebar, setCloseSidebar }: SiderProps) {

  return (
<>
    <div className={`fixed inset-0 z-30 w-full  overflow-hidden md:w-[18.5rem]  border-r p-4 bg-white transition-transform duration-300 ${closeSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='flex items-center justify-between text-2xl py-3'>
        <div className='flex items-center gap-2'>
          <img src="/logo1.png" className='w-10' alt="" />
          <h1 className="font-bold text-4xl"> EventSoft </h1>
        </div>
        <div className='p-2 rounded-full text-white shadow shadow-gray-300 cursor-pointer md:hidden ' onClick={() => setCloseSidebar(false)}>
          <LuX className='w-6 h-6 text-black' />
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='pt-6 text-2xl font-semibold'>¡Hola, Javier Azaña!</h1>
          <span className='text-sm'>Estamos aquí para ayudarte</span>
        </div>
        <nav className='pr-1 flex flex-col gap-1 overflow-y-auto h-[calc(100vh-11rem)] scrollbar-hide'>
          <Nav Icon={RiHome3Line} name='Inicio' to='/' />
          <Nav Icon={RxLayers} name='Events' to='/eventos' />
          <Nav Icon={GoCopilot} name='Gallerys' to='#' />
          <Nav Icon={RxCalendar} name='Calendar' to='#' />
          <Nav Icon={TbMessage2} name='Message' to='#' />
          <Nav Icon={GoCopilot} name='Seguridad' to='#' />

        </nav>
      </div>
      
    </div>




    
    </>

  )
}
