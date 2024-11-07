import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { SubCategoryFormData } from "../../types";
import InputBasic from "../InputBasic";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../api/CategoryAPI";
import SelectBasicWithModal from "../SelectBasicWithModal";

type SubCategoryFormProps = {
    register: UseFormRegister<SubCategoryFormData>
    errors: FieldErrors<SubCategoryFormData>
    trigger: UseFormTrigger<SubCategoryFormData>
    setValue: UseFormSetValue<SubCategoryFormData>
    getValues: UseFormGetValues<SubCategoryFormData>
};

export default function SubCategoryForm({ register, errors, trigger, setValue, getValues }: SubCategoryFormProps) {
    const { data } = useQuery({
        queryKey: ['category'],
        queryFn: getCategory,

    })

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <InputBasic
                    id="nombre_cate_evento"
                    label="Tipo de Evento"
                    type="text"
                    placeholder="Ingrese nombre evento"
                    error={errors.nombre_cate_evento}
                    register={register("nombre_cate_evento", { required: "Nombre de Evento es obligatorio" })}
                />
                <SelectBasicWithModal
                    id="id_categoria"
                    label="Categoría"
                    options={data}
                    setValue={setValue}
                    getValues={getValues}
                    trigger={trigger}
                    error={errors.id_categoria}
                    register={register("id_categoria", { required: "Categoría es obligatorio" })}
                />
            </div>
        </>
    );
}
