import { ColumnDef } from '@tanstack/react-table';
import { LuEye, LuPenSquare, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import SwitchBasic from '../../components/SwitchBasic';
import { Address } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToasts } from '../../hooks/useToasts';
import { updateStatusAddress } from '../../api/AddressAPI';

export const ColumAddressView: ColumnDef<Address>[] = [
    {
        accessorKey: 'full_address',
        header: 'Dirección Completa',
        enableSorting: true,
        cell: ({ row }) => {
            const { nombre_direccion, descripcion_dire } = row.original;
            return (
                <div className='flex items-center gap-2'>
                    <div>{nombre_direccion}</div>
                    <div className="text-gray-700">({descripcion_dire})</div>
                </div>
            );
        },
    },
    { accessorKey: 'aforo_max', header: 'Aforo', enableSorting: true },
    { accessorKey: 'numero_piso', header: 'N° Piso', enableSorting: true },
    {
        accessorKey: 'ind_activo',
        header: 'Estado',
        enableSorting: false,
        cell: ({ row }) => {
            const queryClient = useQueryClient();
            const { ErrorToast, SuccessToast } = useToasts()

            const { mutate, isPending} = useMutation({
                mutationFn: updateStatusAddress,
                onError: (error) => {
                    ErrorToast(error.message)
                },
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: ['address'] })
                    SuccessToast(data.message);
                }
            })

            return (
                <div className='text-center'>
                    <SwitchBasic
                        row={row}
                        mutate={mutate}
                        isPending={isPending}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex space-x-2 justify-center">
                <Link to={`/address/${row.original.id}/edit`} className="text-primary">
                    <LuPenSquare strokeWidth={2.1} className="w-5 h-5" />
                </Link>
                <Link to={`/address/${row.original.id}/view`} className="text-green-600">
                    <LuEye strokeWidth={2.1} className="w-5 h-5" />
                </Link>
                <Link to={`/address/${row.original.id}/delete`} className="text-red-600">
                    <LuTrash2 strokeWidth={2.1} className="w-5 h-5" />
                </Link>
            </div>
        ),
    },
];
