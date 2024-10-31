import { flexRender, Table } from "@tanstack/react-table";
import classNames from "classnames";
import { LuChevronDown, LuChevronsUpDown, LuChevronUp } from "react-icons/lu";

type TheadProps = {
    table: Table<any>
}

export default function Thead({ table }: TheadProps) {
    return (
        <thead className='bg-sky-600/10'>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="text-sm text-sky-600" >
                    {headerGroup.headers.map((header, index, headersArray) => (
                        <th key={header.id} className={classNames('py-2 px-4 ',
                            {
                                'rounded-l-lg': index === 0, // Redondear la primera celda
                                'rounded-r-lg': index === headersArray.length - 1 // Redondear la última celda
                            }
                        )}>
                            {header.isPlaceholder ? null :
                                <div className={classNames({ 'cursor-pointer select-none flex justify-between items-center': header.column.getCanSort() })}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {(() => {
                                        const sortDirection = header.column.getIsSorted();
                                        const sortIcons = { asc: <LuChevronDown />, desc: <LuChevronUp /> };

                                        return sortDirection
                                            ? sortIcons[sortDirection]
                                            : (header.column.getCanSort() ? <LuChevronsUpDown /> : null);
                                    })()}
                                </div>
                            }
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    )
}
