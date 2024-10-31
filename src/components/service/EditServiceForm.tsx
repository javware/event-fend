import ServiceForm from './ServiceForm'
import { FaSave } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useToasts } from '../../hooks/useToasts';
import { useQueryClient } from '@tanstack/react-query';
import { Service, ServiceFormData } from '../../types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateService } from '../../api/ServiceAPI';

type EditMemberFormProps = {
    data: ServiceFormData,
    serviceId: Service['id']
}

export default function EditServiceForm({ data, serviceId }: EditMemberFormProps) {
    const { ErrorToast, SuccessToast } = useToasts()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const initialValues: ServiceFormData = {
        nombre_servicio: data.nombre_servicio,
      
    }

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: updateService,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service'] })
            queryClient.invalidateQueries({ queryKey: ['editService', serviceId] })
            SuccessToast('Servicio Actualizado')
            navigate('/service')
        }
    })

    const handleForm = (formData: ServiceFormData) => {
        const data = {
            ...formData,
            id_servicio: serviceId
        }
        mutate(data)
    }

    return (
        <>
            <div className='bg-white rounded-lg shadow-lg px-6 py-6 '>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl'>Editar Servicio</h1>
                    <p className='text-gray-400 text-sm'>
                        Por favor, Actualice los campos para modificar la información del servicio en el sistema.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <ServiceForm register={register} errors={errors} setValue={setValue} getValues={getValues} />
                    <div className='flex flex-col mt-7 md:flex-row gap-3'>
                        <button type="submit"
                            className='bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1'
                        ><FaSave /> Guardar Cambios</button>
                        <Link to={'/service/'} className='bg-red-600 py-2 px-4 rounded-full text-white text-sm cursor-pointer flex justify-center items-center'>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>

        </>
    )
}
