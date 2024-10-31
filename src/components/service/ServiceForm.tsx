import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ServiceFormData } from "../../types";
import InputBasic from "../InputBasic";

type ServiceFormProps = {
    register: UseFormRegister<ServiceFormData>
    errors: FieldErrors<ServiceFormData>
    setValue: UseFormSetValue<ServiceFormData>
    getValues: UseFormGetValues<ServiceFormData>
}

export default function ServiceForm({ register, errors}: ServiceFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-2">
                <InputBasic id="nombre_servicio" label="Servicio" type="text" placeholder="Ingrese servicio"
                    error={errors.nombre_servicio}
                    register={register("nombre_servicio", {
                        required: "Servicio es obligatorio",
                    })}
                />
            </div>

        </>
    )
}
