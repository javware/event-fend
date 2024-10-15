import { flexRender, Table as TanstackTable } from "@tanstack/react-table"

type TbodyProps<T> = {
    table: TanstackTable<T>
    isLoading: boolean
}

export default function Tbody<T>({ table, isLoading }: TbodyProps<T>) {

    return (
        <tbody>
            {isLoading ? ( 
                <tr>
                    <td colSpan={table.getAllColumns().length} className="pt-7 text-center">
                        Cargando datos...
                    </td>
                </tr>
            ) : (
                table.getRowModel().rows.map(row => (
                   
                    <tr key={row.id} className="border-b m-6 border-gray-100 hover:bg-slate-100" >
                        {row.getVisibleCells().map(cell => (

                            <td key={cell.id} className="py-2 px-4" >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>

                        ))}
                    </tr>
                ))
            )}
        </tbody>
    )
}
