import CategoryForm from './CategoryForm'
import { FaSave } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useToasts } from '../../hooks/useToasts';
import { useQueryClient } from '@tanstack/react-query';
import { Category, CategoryFormData } from '../../types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateCategory } from '../../api/CategoryAPI';

type EditMemberFormProps = {
    data: CategoryFormData,
    categoryId: Category['id']
}

export default function EditCategoryForm({ data, categoryId }: EditMemberFormProps) {
    const { ErrorToast, SuccessToast } = useToasts()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const initialValues: CategoryFormData = {
      nombre_categoria: data.nombre_categoria,
      
    }

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: updateCategory,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] })
            queryClient.invalidateQueries({ queryKey: ['editCategory', categoryId] })
            SuccessToast('Categoría Actualizado')
            navigate('/category')
        }
    })

    const handleForm = (formData: CategoryFormData) => {
        const data = {
            ...formData,
            id_categoria: categoryId
        }
        mutate(data)
    }

    return (
        <>
            <div className='bg-white rounded-lg shadow-lg px-6 py-6 '>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl'>Editar Categoría</h1>
                    <p className='text-gray-400 text-sm'>
                        Por favor, Actualice los campos para modificar la información de la categoría en el sistema.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <CategoryForm register={register} errors={errors} setValue={setValue} getValues={getValues} />
                    <div className='flex flex-col mt-7 md:flex-row gap-3'>
                        <button type="submit"
                            className='bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1'
                        ><FaSave /> Guardar Cambios</button>
                        <Link to={'/category/'} className='bg-red-600 py-2 px-4 rounded-full text-white text-sm cursor-pointer flex justify-center items-center'>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>

        </>
    )
}
