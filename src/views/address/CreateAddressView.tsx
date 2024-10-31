
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AddressForm from '../../components/address/AddressForm'
import { AddressFormData } from '../../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAddress } from '../../api/AddressAPI'
import { useToasts } from "../../hooks/useToasts"
import { FaSave } from 'react-icons/fa'

export default function CreateAddressView() {
    const { ErrorToast, SuccessToast } = useToasts();
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const initialValues: AddressFormData = {
        nombre_direccion: "",
        descripcion_dire: "",
        numero_piso: "",
        aforo_max: "",
    }

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createAddress,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['address'] });
            SuccessToast('Se Registro Correctamente')
            navigate('/address')
        }
    })

    const handleForm = (formData: AddressFormData) => mutate(formData)


    return (
        <>
            <div className='bg-white rounded-lg shadow-lg px-6 py-6'>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl'>Crear Nueva Dirección</h1>
                    <p className='text-gray-400 text-sm'>
                        Por favor, Complete los campos para registrar una nueva dirección en el sistema.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <AddressForm register={register} errors={errors} setValue={setValue} getValues={getValues} />
                    <div className='flex flex-col mt-7 md:flex-row gap-3'>
                        <button type="submit"
                            className='bg-primary py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex items-center justify-center gap-1'
                        ><FaSave /> Crear Dirección</button>
                        <Link to={'/address/'} className='bg-red-600 py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex justify-center items-center'>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>

        </>
    )
}
