import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { EventFormData } from '../../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToasts } from "../../hooks/useToasts"
import { FaSave } from 'react-icons/fa'
import { createEvent } from '../../api/EventAPI'
import EventForm from '../../components/event/EventForm'

export default function CreateEventView() {
  const { ErrorToast, SuccessToast } = useToasts();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const initialValues: EventFormData = {
    nombre_organizador: "",
    apellido_organizador: "",
    nombre_evento: "",
    direccion: "",
    correo: "",
    fecha_inicio: "",
    hora_inicio: "",
    fecha_fin: "",
    hora_fin: "",
    categoria_evento: "",
    tipo_evento: "1",
    costo: "",
    estado_evento: "1",
  }

  const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createEvent,
    onError: (error) => {
      ErrorToast(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event'] });
      SuccessToast('Se Registro Correctamente')
      navigate('/event')
    }
  })
  
  const handleForm = (formData: EventFormData) => {
    const dateTimeInicio = `${formData.fecha_inicio} ${formData.hora_inicio}`;
    const dateTimeFin = `${formData.fecha_fin} ${formData.hora_fin}`;
    const data ={
      ...formData,
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
              <FaSave /> Crear Evento
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
