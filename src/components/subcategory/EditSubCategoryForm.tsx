import SubCategoryForm from './SubCategoryForm'
import { FaSave } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useToasts } from '../../hooks/useToasts';
import { useQueryClient } from '@tanstack/react-query';
import { SubCategory, SubCategoryFormData } from '../../types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateSubCategory } from '../../api/SubCategoryAPI';

type EditSubCategoryFormProps = {
    data: SubCategoryFormData,
    subcategoryId: SubCategory['id']
}

export default function EditSubCategoryForm({ data, subcategoryId }: EditSubCategoryFormProps) {
    const { ErrorToast, SuccessToast } = useToasts()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
   
    const initialValues: SubCategoryFormData = {
      nombre_cate_evento: data.nombre_cate_evento,
      id_categoria: data.id_categoria,
    }

    const { register, handleSubmit, formState: { errors }, trigger, setValue, getValues} = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: updateSubCategory,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subcategory'] })
            queryClient.invalidateQueries({ queryKey: ['editSubCategory', subcategoryId] })
            SuccessToast('Tipo de Evento Actualizado')
            navigate('/subcategory')
        }
    })

    const handleForm = (formData: SubCategoryFormData) => {
        const data = {
            ...formData,
            id_categoria_evento: subcategoryId
        }
        mutate(data)
    }

    return (
        <>
            <div className='bg-white rounded-lg shadow-lg px-6 py-6 '>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl'>Editar Sub Categoría</h1>
                    <p className='text-gray-400 text-sm'>
                        Por favor, Actualice los campos para modificar la información de la sub categoría en el sistema.
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <SubCategoryForm register={register} errors={errors} setValue={setValue} getValues={getValues} trigger={trigger} />
                    <div className='flex flex-col mt-7 md:flex-row gap-3'>
                        <button type="submit"
                            className='bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1'
                        ><FaSave /> Guardar Cambios</button>
                        <Link to={'/subcategory/'} className='bg-red-600 py-2 px-4 rounded-full text-white text-sm cursor-pointer flex justify-center items-center'>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>

        </>
    )
}
