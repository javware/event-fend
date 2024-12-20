import { RxLayers } from 'react-icons/rx'
import { RiHome3Line } from 'react-icons/ri'
import { LuCalendarSearch, LuLayoutList, LuListTree, LuMapPin, LuSettings, LuX } from 'react-icons/lu';
import Nav from './Nav';
import classNames from 'classnames';
import useSidebarStore from '../../../store/sidebarStore';


export default function Sidebar() {
  const { isOpen, setSidebar } = useSidebarStore();

  return (
    <>
      <div
        className={classNames(
          'fixed z-30 border-r p-4 bg-primary transition-transform transform duration-300',
          {
            'w-screen': isOpen, // Pantallas pequeñas
            'md:w-[18.5rem]': isOpen, // Pantallas medianas y grandes
            '-translate-x-full': !isOpen, // Oculto
            'translate-x-0': isOpen, // Visible
          }
        )}
      >
        <div className='flex items-center justify-between text-2xl py-3'>
          <div className='flex items-center gap-2'>
            <img src="/logo1.png" className='w-10' alt="" />
            <h1 className="font-bold text-4xl text-white"> EventSoft </h1>
          </div>
          <div className='p-2 rounded-full text-white bg-white shadow shadow-gray-300 cursor-pointer md:hidden' onClick={() => setSidebar(false)}>
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
            <Nav Icon={LuMapPin} name='Dirección' to='/address' />
            <Nav Icon={LuLayoutList} name='Servicio' to='/service' />
            <Nav Icon={RxLayers} name='Categoría' to='/category' />
            <Nav Icon={LuListTree} name='Tipo de Eventos' to='/subcategory' />
            <Nav Icon={LuCalendarSearch} name='Evento' to='/event' />
            <Nav Icon={LuSettings} name='Seguridad' to='#' />

          </nav>
        </div>
      </div>
    </>

  )
}
