import { ColumnDef } from '@tanstack/react-table';
import { LuEye, LuPenSquare, LuPower, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { updateStatusCategory } from '../../api/CategoryAPI'; // Ajusta la ruta según corresponda
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToasts } from '../../hooks/useToasts';
import Spinner from '../../components/Spinner';
import classNames from 'classnames';

export const ColumCategoryView: ColumnDef<Category>[] = [
  { accessorKey: 'nombre_categoria', header: 'Categoría', enableSorting: true },
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
        mutationFn: updateStatusCategory,
        onError: (error) => {
          ErrorToast(error.message)
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['category'] })
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
              <Link to={`/category/${row.original.id}/edit`} className="text-primary">
                <LuPenSquare strokeWidth={2.1} className="w-5 h-5" />
              </Link>
              <Link to={`/category/${row.original.id}/view`} className="text-green-600">
                <LuEye strokeWidth={2.1} className="w-5 h-5" />
              </Link>
              <Link to={`/category/${row.original.id}/delete`} className="text-red-600">
                <LuTrash2 strokeWidth={2.1} className="w-5 h-5" />
              </Link>
            </>

          )}
        </div>
      )
    }
  },
];
