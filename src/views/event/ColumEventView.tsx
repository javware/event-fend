// ColumServiceView.ts
import { ColumnDef } from '@tanstack/react-table';
import { LuEye, LuPenSquare, LuPower, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToasts } from '../../hooks/useToasts';
import Spinner from '../../components/Spinner';
import classNames from 'classnames';
import { updateStatusEvent } from '../../api/EventAPI';

export const ColumEventView: ColumnDef<Event>[] = [
  {
    accessorKey: 'full_name',
    header: 'Nombres',
    enableSorting: true,
    cell: ({ row }) => {
      const { nombre_organizador, apellido_organizador } = row.original;
      return (
        <div className='flex items-center gap-2'>
          <div>{nombre_organizador} {apellido_organizador}</div>
        </div>
      );
    },
  },
  { accessorKey: 'nombre_evento', header: 'Evento', enableSorting: true },
  { accessorKey: 'nombre_cate_evento', header: 'T. Evento', enableSorting: true },
  { accessorKey: 'descripcion_dire', header: 'Dirección', enableSorting: true },
  { accessorKey: 'costo', header: 'Precio', enableSorting: true },
  {
    accessorKey: 'full_date',
    header: 'Fechas',
    enableSorting: false,
    cell: ({ row }) => {
      const { fecha_inicio, fecha_fin } = row.original;
      return (
        <div className='flex flex-col items-center gap-2 text-sm w-32'>
          <div className='text-green-700 '>{fecha_inicio}</div>
          <div className="text-red-700">{fecha_fin}</div>
        </div>
      );
    },
  },

  {
    accessorKey: 'ind_activo',
    header: 'Estado',
    enableSorting: false,
    cell: ({ row }) => {
      const { ind_activo } = row.original
      const data = ind_activo === "1" ? "Activo" : "Inactivo"

      return (
        <div className='text-center'>
          <div className={classNames(
            ' rounded-full text-xs py-0.5 w-16 m-auto',
            ind_activo === "1"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"

          )}>{data}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    enableSorting: false,
    cell: ({ row }) => {
      const { ind_activo, id } = row.original
      const queryClient = useQueryClient();
      const { ErrorToast, SuccessToast } = useToasts()

      const { mutate, isPending } = useMutation({
        mutationFn: updateStatusEvent,
        onError: (error) => {
          ErrorToast(error.message)
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['event'] })
          SuccessToast(data.message);
        }
      })
      if (isPending) return <Spinner />
      return (
        <div className="flex space-x-2 justify-center">
          {ind_activo === "0" ? (
            <button onClick={() => mutate({ id })} className="text-green-600">
              <LuPower strokeWidth={2.1} className="w-5 h-5" />
            </button>
          ) : (
            <>
              <Link to={`/event/${row.original.id}/edit`} className="text-primary">
                <LuPenSquare strokeWidth={2.1} className="w-5 h-5" />
              </Link>
              <Link to={`/event/${row.original.id}/view`} className="text-green-600">
                <LuEye strokeWidth={2.1} className="w-5 h-5" />
              </Link>
              <Link to={`/event/${row.original.id}/delete`} className="text-red-600">
                <LuTrash2 strokeWidth={2.1} className="w-5 h-5" />
              </Link>
            </>

          )}
        </div>
      )
    }
  },
];
