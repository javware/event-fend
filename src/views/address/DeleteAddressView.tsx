import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteAddress } from "../../api/AddressAPI"
import { useToasts } from "../../hooks/useToasts"
import { LuTrash2 } from "react-icons/lu";
import Spinner from "../../components/Spinner";

export default function DeleteAddressView() {
    const { ErrorToast, SuccessToast } = useToasts();
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const params = useParams()
    const addressId = params.addressId!

    const { mutate, isPending } = useMutation({
        mutationFn: deleteAddress,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['address'] });
            SuccessToast('Dirección marcado como inactivo')
            navigate('/address')
        },

    })

    if (isPending) return <Spinner />
    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg px-6 py-32 h-full">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Eliminar Dirección</h1>
            <LuTrash2 className="w-11 h-11 mb-2 text-red-600" />
            <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas desactivar a esta dirección? Podrás reactivarlo en cualquier momento.
            </p>
            <div className="flex justify-center  items-center space-x-4">
                <button onClick={() => mutate(addressId)} className="bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1">
                    <LuTrash2 />
                    Confirmar Eliminación
                </button>

                <Link to={'/address/'} className='bg-red-600 py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex justify-center items-center'>
                    Cancelar
                </Link>
            </div>
        </div>
    )
}
