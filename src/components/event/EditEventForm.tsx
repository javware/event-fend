import EventForm from './EventForm'
import { FaSave } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useToasts } from '../../hooks/useToasts';
import { useQueryClient } from '@tanstack/react-query';
import { Event, EventFormData } from '../../types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateEvent } from '../../api/EventAPI';

type EditEventFormProps = {
    data: EventFormData,
    eventId: Event['id']
}

export default function EditEventForm({ data, eventId }: EditEventFormProps) {
    const { ErrorToast, SuccessToast } = useToasts()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const splitDateTime = (dateTime: string) => {
        const [date, time] = dateTime.split(" "); // Divides en fecha y hora
        return { date, time };
    };

    const fechaInicio = splitDateTime(data.fecha_inicio);
    const fechaFin = splitDateTime(data.fecha_fin);

    const initialValues: EventFormData = {
        nombre_organizador: data.nombre_organizador,
        apellido_organizador: data.apellido_organizador,
        nombre_evento: data.nombre_evento,
        direccion: data.direccion,
        correo: data.correo,
        fecha_inicio: fechaInicio.date,
        hora_inicio: fechaInicio.time,
        fecha_fin: fechaFin.date,
        hora_fin: fechaFin.time,
        categoria_evento: data.categoria_evento,
        tipo_evento: data.tipo_evento,
        costo: data.costo,
        estado_evento: data.estado_evento,
    }

    const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: updateEvent,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['event'] })
            queryClient.invalidateQueries({ queryKey: ['editEvent', eventId] })
            SuccessToast('Evento Actualizado')
            navigate('/event')
        }
    })

    const handleForm = (formData: EventFormData) => {
        const dateTimeInicio = `${formData.fecha_inicio} ${formData.hora_inicio}`;
        const dateTimeFin = `${formData.fecha_fin} ${formData.hora_fin}`;
        const data = {
            ...formData,
            id_evento: eventId,
            fecha_inicio: dateTimeInicio,
            fecha_fin: dateTimeFin

        }
        mutate(data)
    }
    return (
        <>


            <form onSubmit={handleSubmit(handleForm)} noValidate className="flex flex-col-reverse md:grid md:grid-cols-3 gap-4 md:items-start">

                <div className='  bg-white rounded-lg shadow-lg p-6  md:col-span-2'>
                    <div className='mb-5'>
                        <h1 className='font-semibold text-xl'>Crear Nuevo Evento</h1>
                        <p className='text-gray-400 text-sm'>
                            Por favor, Complete los campos para registrar un nuevo evento en el sistema.
                        </p>
                    </div>

                    <EventForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        trigger={trigger}
                        section="inputs"
                    />

                    <div className='flex flex-col mt-7 md:flex-row gap-3'>
                        <button
                            type="submit"
                            className='bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1'
                        >
                            <FaSave /> Guardar Cambios
                        </button>
                        <Link
                            to='/event'
                            className='bg-red-600 py-2 px-4 rounded-full text-white text-sm cursor-pointer flex justify-center items-center'
                        >
                            Cancelar
                        </Link>
                    </div>
                </div>

                <div className='  bg-white rounded-lg shadow-lg p-6 md:col-span-1'>
                    <div className='mb-5'>
                        <h1 className='font-semibold text-xl'>Información Adicional</h1>
                        <p className='text-gray-400 text-sm'>
                            Complete la información adicional
                        </p>
                    </div>
                    <EventForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        trigger={trigger}
                        section="selects" // Render select fields in EventForm for this section
                    />
                </div>
            </form>
        </>
    )
}
