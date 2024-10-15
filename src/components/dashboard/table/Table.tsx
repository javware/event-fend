import { useState } from 'react'
import { getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, SortingState, ColumnDef, } from '@tanstack/react-table'
import { fuzzyFilter } from '../../../hooks/fuzzyFilter'
import Pagination from './Pagination'
import Tbody from './Tbody'
import Thead from './Thead'

type TableProps<T> = {
    data: T[]
    columns: ColumnDef<T, any>[]
    globalFilter: string
    isLoading: boolean
}

export default function Table<T,>({ data, columns, globalFilter, isLoading }: TableProps<T>) {

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting
        },
        initialState: {
            pagination: {
                pageSize: 5
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: fuzzyFilter,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting
    })

    return (
        <>
            <div className='w-full overflow-x-auto scrollbar-thin'>
                <table className='table-auto w-full min-w-[560px]'>
                    <Thead table={table} />
                    <Tbody table={table} isLoading={isLoading} />
                </table>
            </div>
            {!isLoading && <Pagination table={table} />}
        </>


    )
}

