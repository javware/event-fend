import { useState } from "react"
import InputSearch from "../../components/dashboard/table/InputSearch"
import Table from "../../components/dashboard/table/Table"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getAddress } from "../../api/AddressAPI"
import { useToasts } from "../../hooks/useToasts"
import { ColumAddressView } from "./ColumAddressView"

export default function ListAddressView() {
    const { ErrorToast } = useToasts()
    const [globalFilter, setGlobalFilter] = useState('')

    const { data, error, isLoading } = useQuery({
        queryKey: ['address'],
        queryFn: getAddress,
    })

    if (error) {
        ErrorToast(error.message)
    }

    const tableData = data && data.length > 0 ? data : []

    return (
        <div className='bg-white rounded-xl border border-gray-100 px-4 py-4 w-full'>
            <div className='flex flex-col items-center gap-3 justify-between md:flex-row relative mb-5'>
                <div className="flex flex-col text-center md:text-left">
                    <h1 className='font-semibold text-xl'>Lista de Direcciones</h1>
                    <p className='text-gray-400 text-sm'>
                        Visualiza y gestiona la información de las direcciones registrados.
                    </p>
                </div>

                <div className='flex gap-3'>
                    <InputSearch
                        type="text"
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        className='py-2 px-8 rounded-lg h-9 text-sm text-gray-600 bg-gray-100 outline-none'
                        placeholder='Escribe para buscar...'
                    />
                    <Link to="/address/create" className="flex items-center bg-sky-600 text-white py-2 px-3 rounded-lg text-sm">
                        Agregar
                    </Link>

                </div>
            </div>
            <Table data={tableData} columns={ColumAddressView} globalFilter={globalFilter} isLoading={isLoading} />

        </div>
    )
}
