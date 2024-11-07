import { RxCalendar, RxLayers } from 'react-icons/rx';
import { GoCopilot } from 'react-icons/go';
import { TbMessage2 } from 'react-icons/tb';
import { RiHome3Line } from 'react-icons/ri';
import { LuX } from 'react-icons/lu';
import Nav from './Nav';
import { useWindowSize } from '../../../hooks/useWindowSize';
import classNames from 'classnames';

type SiderProps = {
  closeSidebar: boolean
  setCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Sidebar({ closeSidebar, setCloseSidebar }: SiderProps) {
  const size = useWindowSize();

  return (
    <>
      <div
        className={classNames(
          'fixed z-30 border-r p-4 bg-primary transition-transform transform duration-300',
          {
            'w-screen': size?.width && size.width < 780 && !closeSidebar, // Pantallas pequeñas
            'md:w-[18.5rem]': closeSidebar || size?.width && size.width >= 780,// Pantallas medianas y grandes
            '-translate-x-full': !closeSidebar || size?.width && size.width < 780,
            'translate-x-0': !closeSidebar && size?.width && size.width <= 780,
          }
        )}
      >
        <div className='flex items-center justify-between text-2xl py-3'>
          <div className='flex items-center gap-2'>
            <img src="/logo1.png" className='w-10' alt="" />
            <h1 className="font-bold text-4xl text-white"> EventSoft </h1>
          </div>
          <div className='p-2 rounded-full text-white shadow shadow-gray-300 cursor-pointer md:hidden ' onClick={() => setCloseSidebar(true)}>
            <LuX className='w-6 h-6 text-black' />
          </div>
        </div>
        <div className='flex flex-col gap-6 text-white'>
          <div>
            <h1 className='pt-6 text-2xl font-semibold'>¡Hola, Javier Azaña!</h1>
            <span className='text-sm'>Estamos aquí para ayudarte</span>
          </div>
          <nav className='pr-1 flex flex-col gap-1 overflow-y-auto h-[calc(100vh-11rem)] scrollbar-hide'>
            <Nav Icon={RiHome3Line} name='Inicio' to='/' />
            <Nav Icon={GoCopilot} name='Dirección' to='/address' />
            <Nav Icon={TbMessage2} name='Servicio' to='/service' />
            <Nav Icon={RxLayers} name='Categoría' to='/category' />
            <Nav Icon={GoCopilot} name='Tipo de Eventos' to='/subcategory' />
            <Nav Icon={RxCalendar} name='Evento' to='#' />
            <Nav Icon={RxCalendar} name='Seguridad' to='#' />

          </nav>
        </div>
      </div>
    </>

  )
}
