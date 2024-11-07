import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CategoryFormData } from '../../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToasts } from "../../hooks/useToasts"
import { FaSave } from 'react-icons/fa'
import { createCategory } from '../../api/CategoryAPI'
import CategoryForm from '../../components/category/CategoryForm'

export default function CreateCategoryView() {
  const { ErrorToast, SuccessToast } = useToasts();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const initialValues: CategoryFormData = {
    nombre_categoria: "",
  }

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      ErrorToast(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
      SuccessToast('Se Registro Correctamente')
      navigate('/category')
    }
  })

  const handleForm = (formData: CategoryFormData) => mutate(formData)


  return (
    <>
      <div className='bg-white rounded-lg shadow-lg px-6 py-6'>
        <div className='mb-5'>
          <h1 className='font-semibold text-xl'>Crear Nueva Categoría</h1>
          <p className='text-gray-400 text-sm'>
            Por favor, Complete los campos para registrar una nueva categoría en el sistema.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleForm)} noValidate>
          <CategoryForm register={register} errors={errors} setValue={setValue} getValues={getValues} />
          <div className='flex flex-col mt-7 md:flex-row gap-3'>
            <button type="submit"
              className='bg-primary py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex items-center justify-center gap-1'
            ><FaSave /> Crear Categoría</button>
            <Link to={'/category/'} className='bg-red-600 py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex justify-center items-center'>
              Cancelar
            </Link>
          </div>
        </form>
      </div>

    </>
  )
}
