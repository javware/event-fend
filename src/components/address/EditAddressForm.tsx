import MemberForm from './AddressForm'
import { FaSave } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useToasts } from '../../hooks/useToasts';
import { useQueryClient } from '@tanstack/react-query';
import { Address, AddressFormData } from '../../types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateAddress } from '../../api/AddressAPI';

type EditMemberFormProps = {
    data: AddressFormData,
    addressId: Address['id']
}

export default function EditAddressForm({ data, addressId }: EditMemberFormProps) {
    const { ErrorToast, SuccessToast } = useToasts()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const initialValues: AddressFormData = {
        nombre_direccion: data.nombre_direccion,
        descripcion_dire: data.descripcion_dire,
        numero_piso: data.numero_piso,
        aforo_max: data.aforo_max ,
    }

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: updateAddress,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['address'] })
            queryClient.invalidateQueries({ queryKey: ['editAddress', addressId] })
            SuccessToast('Dirección Actualizado')
            navigate('/address')
        }
    })

    const handleForm = (formData: AddressFormData) => {
        const data = {
            ...formData,
            id_direccion: addressId
        }
        mutate(data)
    }

    return (
        <>
            <div className='bg-white rounded-lg shadow-lg px-6 py-6 '>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl'>Editar Miembro</h1>
                    <p className='text-gray-400 text-sm'>
                        Por favor, Actualice los campos para modificar la información del miembro en el sistema.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <MemberForm register={register} errors={errors} setValue={setValue} getValues={getValues} />
                    <div className='flex flex-col mt-7 md:flex-row gap-3'>
                        <button type="submit"
                            className='bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1'
                        ><FaSave /> Guardar Cambios</button>
                        <Link to={'/address/'} className='bg-red-600 py-2 px-4 rounded-full text-white text-sm cursor-pointer flex justify-center items-center'>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>

        </>
    )
}
