// ColumServiceView.ts
import { ColumnDef } from '@tanstack/react-table';
import { LuEye, LuPenSquare, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import SwitchBasic from '../../components/SwitchBasic';
import { Service } from '../../types';
import { updateStatusService } from '../../api/ServiceAPI'; // Ajusta la ruta según corresponda
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToasts } from '../../hooks/useToasts';

export const ColumServiceView: ColumnDef<Service>[] = [
  { accessorKey: 'nombre_servicio', header: 'Servicio', enableSorting: true },
  {
    accessorKey: 'ind_activo',
    header: 'Estado',
    enableSorting: false,
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { ErrorToast, SuccessToast } = useToasts()

      const { mutate, isPending } = useMutation({
        mutationFn: updateStatusService,
        onError: (error) => {
          ErrorToast(error.message)
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['service'] })
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
        <Link to={`/service/${row.original.id}/edit`} className="text-primary">
          <LuPenSquare strokeWidth={2.1} className="w-5 h-5" />
        </Link>
        <Link to={`/service/${row.original.id}/view`} className="text-green-600">
          <LuEye strokeWidth={2.1} className="w-5 h-5" />
        </Link>
        <Link to={`/service/${row.original.id}/delete`} className="text-red-600">
          <LuTrash2 strokeWidth={2.1} className="w-5 h-5" />
        </Link>
      </div>
    ),
  },
];
