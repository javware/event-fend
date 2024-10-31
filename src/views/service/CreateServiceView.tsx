import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ServiceFormData } from '../../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToasts } from "../../hooks/useToasts"
import { FaSave } from 'react-icons/fa'
import { createService } from '../../api/ServiceAPI'
import ServiceForm from '../../components/service/ServiceForm'

export default function CreateServiceView() {
  const { ErrorToast, SuccessToast } = useToasts();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const initialValues: ServiceFormData = {
    nombre_servicio: "",
  }

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createService,
    onError: (error) => {
      ErrorToast(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service'] });
      SuccessToast('Se Registro Correctamente')
      navigate('/service')
    }
  })

  const handleForm = (formData: ServiceFormData) => mutate(formData)


  return (
    <>
      <div className='bg-white rounded-lg shadow-lg px-6 py-6'>
        <div className='mb-5'>
          <h1 className='font-semibold text-xl'>Crear Nuevo Servicio</h1>
          <p className='text-gray-400 text-sm'>
            Por favor, Complete los campos para registrar un nuevo servicio en el sistema.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleForm)} noValidate>
          <ServiceForm register={register} errors={errors} setValue={setValue} getValues={getValues} />
          <div className='flex flex-col mt-7 md:flex-row gap-3'>
            <button type="submit"
              className='bg-primary py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex items-center justify-center gap-1'
            ><FaSave /> Crear Servicio</button>
            <Link to={'/service/'} className='bg-red-600 py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex justify-center items-center'>
              Cancelar
            </Link>
          </div>
        </form>
      </div>

    </>
  )
}
