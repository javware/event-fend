import { Columns } from "../../../../types/index";

// Configuración de las columnas
export const MemberConfig: Columns[] = [
    { accessorKey: 'first_name', label: 'Nombre', enableSorting: true },
    { accessorKey: 'last_name', label: 'Apellido', enableSorting: true },
    { accessorKey: 'status', label: 'Estado', enableSorting: true },
    { accessorKey: 'actions', label: 'Acciones', enableSorting: false },
  ];