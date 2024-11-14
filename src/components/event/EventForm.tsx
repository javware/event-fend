import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"
import { EventFormData } from "../../types"
import { format } from 'date-fns'
import InputBasic from "../InputBasic"
import TimePickerBasic from "../TimePickerBasic"
import DatePickerBasic from "../DatePickerBasic"
import SelectAddressWithModal from "../../views/event/SelectAddressWithModal"
import { useQuery } from "@tanstack/react-query"
import { getAddress } from "../../api/AddressAPI"
import { getSubCategory } from "../../api/SubCategoryAPI"
import SelectTypeEventWithModal from "../../views/event/SelectTypeEventWithModal"
import SelectBasic from "../SelectBasic"
import { documentTypes, modalityTypes } from "../../lib/formOptions"

type EventFormProps = {
    register: UseFormRegister<EventFormData>
    errors: FieldErrors<EventFormData>
    setValue: UseFormSetValue<EventFormData>
    getValues: UseFormGetValues<EventFormData>
    trigger: UseFormTrigger<EventFormData>
    section: 'inputs' | 'selects';
}

export default function EventForm({ register, errors, section, setValue, getValues, trigger }: EventFormProps) {
    const { data } = useQuery({
        queryKey: ['address'],
        queryFn: getAddress,
    })

    const { data: subcategory } = useQuery({
        queryKey: ['subcategory'],
        queryFn: getSubCategory,
    })

    const handleDateChange1 = (date: Date | null) => {
        const formatDate = date ? format(date, "dd-MM-yyyy") : "";
        setValue('fecha_inicio', formatDate);
        trigger('fecha_inicio')
        console.log("Dai seleccionada:", formatDate)
    }

    const handleTimeChange1 = (date: Date | null) => {
        const formatTime = date ? format(date, "HH:mm:ss") : "";
        setValue("hora_inicio", formatTime)
        trigger('hora_inicio')
        console.log("Hora seleccionada:", formatTime)
    }

    const handleDateChange2 = (date: Date | null) => {
        const formatDate = date ? format(date, "dd-MM-yyyy") : "";
        setValue('fecha_fin', formatDate);
        trigger('fecha_fin')
    }

    const handleTimeChange2 = (date: Date | null) => {
        const formatTime = date ? format(date, "HH:mm:ss") : "";
        setValue("hora_fin", formatTime)
        trigger('hora_fin')
    }


    return (
        <>
            {section === 'inputs' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                        <InputBasic id="nombre_organizador" label="Nombres Completos" type="text" placeholder="Ingrese nombre"
                            error={errors.nombre_organizador}
                            register={register("nombre_organizador", {
                                required: "Nombre es obligatorio",
                            })}
                        />
                        <InputBasic id="apellido_organizador" label="Apellidos Completos" type="text" placeholder="Ingrese apellido"
                            error={errors.apellido_organizador}
                            register={register("apellido_organizador", {
                                required: "Apellido es obligatorio",
                            })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                        <InputBasic id="correo" label="Correo" type="text" placeholder="Ingrese correo"
                            error={errors.correo}
                            register={register("correo", {
                                required: "Correo es obligatorio",
                            })}
                        />

                        <SelectBasic id="tipo_evento" label="Seleccione Modalidad"
                            options={documentTypes}
                            error={errors.tipo_evento}
                            register={register("tipo_evento",
                                { required: "Modalidad es obligatorio" })
                            }
                            disabled={false}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                        <DatePickerBasic id="fecha_inicio" label="Fecha Inicio"
                            placeholder="Seleccionar"
                            getValues={getValues}
                            error={errors.fecha_inicio}
                            register={register('fecha_inicio', { required: 'Fecha incio es obligatorio' })}
                            onChange={handleDateChange1}
                        />
                        <TimePickerBasic id="hora_inicio" label="Hora Inicio"
                            placeholder="Seleccionar"
                            getValues={getValues}
                            error={errors.hora_inicio}
                            register={register("hora_inicio", {
                                required: "Hora inicio es obligatorio",
                            })}
                            onChange={handleTimeChange1}
                        />
                        <DatePickerBasic id="fecha_fin" label="Fecha Fin"
                            placeholder="Seleccionar"
                            getValues={getValues}
                            error={errors.fecha_fin}
                            register={register('fecha_fin', { required: 'Fecha fin es obligatorio' })}
                            onChange={handleDateChange2}
                        />
                        <TimePickerBasic id="hora_fin" label="Hora Fin" placeholder="Seleccionar"
                            getValues={getValues}
                            error={errors.hora_fin}
                            register={register("hora_fin", {
                                required: "Hora fin es obligatorio",
                            })}
                            onChange={handleTimeChange2}
                        />

                    </div>
                </>
            )}

            {section === 'selects' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-1">
                        <InputBasic id="nombre_evento" label="Nombre del Evento" type="text" placeholder="Ingrese nombre evento"
                            error={errors.nombre_evento}
                            register={register("nombre_evento", {
                                required: "Nombre evento es obligatorio",
                            })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-1">
                        <SelectAddressWithModal id="direccion" label="Busca ó Seleccione Dirección"
                            placeholder="Escribe..."
                            options={data}
                            setValue={setValue}
                            getValues={getValues}
                            trigger={trigger}
                            error={errors.direccion}
                            register={register("direccion", { required: "Categoría es obligatorio" })}
                        />


                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-1">
                        <SelectTypeEventWithModal id="categoria_evento" label="Busca ó Seleccione Tipo de Evento"
                            placeholder="Escribe..."
                            options={subcategory}
                            setValue={setValue}
                            getValues={getValues}
                            trigger={trigger}
                            error={errors.categoria_evento}
                            register={register("categoria_evento", { required: "Tipo Evento es obligatorio" })}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-1">

                        <SelectBasic id="estado_evento" label="Preferencia de Registro"
                            options={modalityTypes}
                            error={errors.estado_evento}
                            register={register("estado_evento",
                                { required: "Tipo de Solicitud es obligatorio" })
                            }
                            disabled={false}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-1">
                        <InputBasic id="costo" label="Costo" type="text" placeholder="0.00"
                            error={errors.costo}
                            register={register("costo", {
                                required: "El precio es requerido",
                                validate: {
                                    positive: (value) => parseFloat(value) > 0 || "El precio debe ser mayor a cero",
                                    maxDecimals: (value) => {
                                        const decimalPart = value.split(".")[1];
                                        return !decimalPart || decimalPart.length <= 2 || "El precio solo puede tener hasta dos decimales";
                                    },
                                    maxValue: (value) => parseFloat(value) <= 100000000 || "El precio no puede exceder 100,000,000",
                                },
                                // onBlur formatea automáticamente a dos decimales si es un entero
                                onBlur: (e) => {
                                    const value = e.target.value;
                                    const parsedValue = parseFloat(value);
                                    if (!isNaN(parsedValue)) {
                                        e.target.value = parsedValue.toFixed(2); // Formatea a "XX.00" si es un entero
                                    }
                                }
                            })}
                        />
                    </div>
                </>
            )}
        </>
    )
}
