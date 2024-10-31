import { z } from 'zod'

/** Address **/
export const ServiceSchema = z.object({
    id: z.string(),
    nombre_servicio: z.string(),
    fecha_inactivo: z.string().nullable(),
    ind_activo: z.string(),
})

export const ServicesSchema = z.array(ServiceSchema)