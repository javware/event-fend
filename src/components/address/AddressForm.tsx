import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AddressFormData } from "../../types";
import InputBasic from "../InputBasic";

type AddressFormProps = {
    register: UseFormRegister<AddressFormData>
    errors: FieldErrors<AddressFormData>
    setValue: UseFormSetValue<AddressFormData>
    getValues: UseFormGetValues<AddressFormData>
}

export default function AddressForm({ register, errors}: AddressFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <InputBasic id="nombre_direccion" label="Dirección" type="text" placeholder="Ingrese dirección"
                    error={errors.nombre_direccion}
                    register={register("nombre_direccion", {
                        required: "Dirección es obligatorio",
                    })}
                />
                <InputBasic id="descripcion_dire" label="Descripción" type="text" placeholder="Ingrese descripción"
                    error={errors.descripcion_dire}
                    register={register("descripcion_dire", {
                        required: "Descripción es obligatorio",
                    })}
                />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">

                <InputBasic id="numero_piso" label="Número de Piso" type="text" placeholder="Ingrese número de piso"
                    error={errors.numero_piso}
                    register={register("numero_piso", {
                        required: "Número piso es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se permiten números",
                        },
                        minLength: {
                            value: 1,
                            message: "Debe tener al menos 1 dígitos",
                        },

                    })}
                />
                <InputBasic id="aforo_max" label="Aforo" type="text" placeholder="Ingrese número de aforo"
                    error={errors.aforo_max}
                    register={register("aforo_max", {
                        required: "Número aforo es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se permiten números",
                        },
                        minLength: {
                            value: 1,
                            message: "Debe tener al menos 1 dígitos",
                        },

                    })}
                />

            </div>


        </>
    )
}