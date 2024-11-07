import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CategoryFormData } from "../../types";
import InputBasic from "../InputBasic";

type CategoryFormProps = {
    register: UseFormRegister<CategoryFormData>
    errors: FieldErrors<CategoryFormData>
    setValue: UseFormSetValue<CategoryFormData>
    getValues: UseFormGetValues<CategoryFormData>
}

export default function CategoryForm({ register, errors}: CategoryFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-2">
                <InputBasic id="nombre_categoria" label="Categoría" type="text" placeholder="Ingrese categoría"
                    error={errors.nombre_categoria}
                    register={register("nombre_categoria", {
                        required: "Categoría es obligatorio",
                    })}
                />
            </div>

        </>
    )
}
