import { useState } from "react";
import { HiCurrencyDollar, HiMiniUserGroup, HiMiniUserPlus } from "react-icons/hi2";
import { RiCalendarCheckLine } from "react-icons/ri";
import SummaryCard from "../components/SummaryCard";
import InputSearch from "../components/dashboard/table/InputSearch";
import { Link } from "react-router-dom";



export default function Home() {
    const [globalFilter, setGlobalFilter] = useState('');

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-5 bg-">
                <SummaryCard Icon={RiCalendarCheckLine} name='Total Booking' bgcolor='bg-green-600' price='1.507' />
                <SummaryCard Icon={HiMiniUserPlus} name='Total New Customers'  bgcolor='bg-pink-600' price='195.5' />
                <SummaryCard Icon={HiCurrencyDollar} name='Total Earnings' bgcolor='bg-orange-600'  price='S/25.500' />
                <SummaryCard Icon={HiMiniUserGroup} name='Total' bgcolor='bg-yellow-500'  price='700' />
            </div>
            <div className='bg-white rounded-xl border border-gray-100 px-4 py-4 w-full'>
                <div className='flex flex-col items-center gap-3 justify-between md:flex-row relative mb-5'>
                    <h1 className='font-semibold'>Eventos del Mes</h1>
                    <div className='flex gap-3'>
                        <InputSearch
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={value => setGlobalFilter(String(value))}
                            className='py-2 px-8 rounded-lg h-9 text-sm text-gray-600 bg-gray-100 outline-none'
                            placeholder='Escribe para buscar...'
                        />
                        <Link to="/miembros/create" className="flex items-center bg-sky-600 text-white py-2 px-3 rounded-lg text-sm">
                            Ver todo
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
}
