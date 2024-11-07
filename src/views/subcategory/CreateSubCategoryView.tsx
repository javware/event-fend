import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SubCategoryFormData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToasts } from "../../hooks/useToasts";
import { FaSave } from 'react-icons/fa';
import SubCategoryForm from '../../components/subcategory/SubCategoryForm';
import { createSubCategory } from '../../api/SubCategoryAPI';

export default function CreateSubCategoryView() {
  const { ErrorToast, SuccessToast } = useToasts();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const initialValues: SubCategoryFormData = {
    nombre_cate_evento: "",
    id_categoria: "",
  };

  const { register, handleSubmit, formState: { errors }, trigger, setValue, getValues } = useForm<SubCategoryFormData>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createSubCategory,
    onError: (error) => {
      ErrorToast(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategory'] });
      SuccessToast('Se Registro Correctamente');
      navigate('/subcategory');
    }
  });

  const handleForm = (formData: SubCategoryFormData) => {
    mutate(formData)
  };

  return (
    <div className='bg-white rounded-lg shadow-lg px-6 py-6'>
      <div className='mb-5'>
        <h1 className='font-semibold text-xl'>Crear Nuevo Tipo de Evento</h1>
        <p className='text-gray-400 text-sm'>
          Por favor, Complete los campos para registrar un nuevo tipo de evento en el sistema.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <SubCategoryForm register={register} errors={errors} setValue={setValue} getValues={getValues} trigger={trigger} />

        <div className='flex flex-col mt-7 md:flex-row gap-3'>
          <button type="submit" className='bg-primary py-2 px-4 rounded-full text-white text-sm cursor-pointer flex items-center justify-center gap-1'>
            <FaSave /> Crear Tipo Evento
          </button>
          <Link to={'/subcategory/'} className='bg-red-600 py-2 px-4 rounded-full text-white text-sm cursor-pointer flex justify-center items-center'>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
