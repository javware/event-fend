import { z } from 'zod'

/** Address **/
export const AddressSchema = z.object({
    id: z.string(),
    nombre_direccion: z.string(),
    descripcion_dire: z.string(),   
    numero_piso: z.string(),
    aforo_max: z.string(),
    fecha_inactivo: z.string().nullable(),
    ind_activo: z.string(),
})

export const AddresssSchema = z.array(AddressSchema)

