import classNames from 'classnames';
import { LuPen, LuTrash2 } from 'react-icons/lu';
import { Columns } from '../../../types/index'; // Asegúrate de que 'Column' esté bien definido

// Función que genera las columnas de forma dinámica
export default function TColumns(config: Columns[]) {
    return config.map((col) => {
        switch (col.accessorKey) {
            case 'status':
                return {
                    id: col.accessorKey,
                    accessorKey: col.accessorKey,
                    header: () => <span>{col.label}</span>,
                    cell: (info: { getValue: () => string }) => (
                        <span
                            className={classNames({
                                'text-white px-2 text-center rounded-md': true,
                                'bg-red-500': info.getValue() === 'Inactivo',
                                'bg-green-500': info.getValue() === 'Activo',
                            })}
                        >
                            {info.getValue()}
                        </span>
                    ),
                    enableSorting: col.enableSorting ?? true, // Permitir sorting por defecto
                };
            
            case 'actions':
                return {
                    id: col.accessorKey, // Necesario para identificar la columna
                    accessorKey: col.accessorKey,
                    header: col.label, // Usamos el label directamente como header
                    cell: () => (
                        <div className="space-x-2 text-center">
                            <button className="text-cyan-700">
                                <LuPen />
                            </button>
                            <button className="text-red-600">
                                <LuTrash2 />
                            </button>
                        </div>
                    ),
                    enableSorting: false, // Deshabilitar sorting en las acciones
                };

            default:
                return {
                    id: col.accessorKey, 
                    accessorKey: col.accessorKey,
                    header: () => <span>{col.label}</span>, 
                    cell: (info: { getValue: () => string }) => (
                        <span>{info.getValue()}</span>
                    ),
                    enableSorting: col.enableSorting ?? false, 
                };
        }
    });
}
