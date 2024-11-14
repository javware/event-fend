import { z } from 'zod'

/** Address **/
export const EventSchema = z.object({
    id: z.string(),
    nombre_organizador: z.string(),
    apellido_organizador: z.string(),
    nombre_evento: z.string(),
    tipo_doc: z.string(),
    numero_doc: z.string(),
    celular: z.string(),
    direccion: z.string(),
    descripcion_dire: z.string(),
    correo: z.string(),
    fecha_inicio: z.string(),
    fecha_fin: z.string(),
    categoria_evento: z.string(),
    nombre_cate_evento: z.string(),
    tipo_evento: z.string(),
    costo: z.string(),
    ind_activo: z.string(),
    estado_evento: z.string(),
})

export const EventsSchema = z.array(EventSchema)