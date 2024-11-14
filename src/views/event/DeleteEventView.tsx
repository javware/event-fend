import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useToasts } from "../../hooks/useToasts"
import { LuTrash2 } from "react-icons/lu"
import Spinner from "../../components/Spinner"
import { deleteEvent } from "../../api/EventAPI"

export default function DeleteEventView() {
    const { ErrorToast, SuccessToast } = useToasts();
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const params = useParams()
    const eventId = params.eventId!

    const { mutate, isPending } = useMutation({
        mutationFn: deleteEvent,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['event'] });
            SuccessToast('Evento marcado como inactivo')
            navigate('/event')
        },

    })

    if (isPending) return <Spinner />
    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-28">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Eliminar Evento</h1>
            <LuTrash2 className="w-11 h-11 mb-2 text-red-600" />
            <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas desactivar a este evento? Podrás reactivarlo en cualquier momento.
            </p>
            <div className="flex justify-center items-center space-x-4">
                <button onClick={() => mutate(eventId)} className="bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1">
                    <LuTrash2 />
                    Confirmar Eliminación
                </button>

                <Link to={'/event/'} className='bg-red-600 py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex justify-center items-center'>
                    Cancelar
                </Link>
            </div>
        </div>
    )
}
