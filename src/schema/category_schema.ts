import { z } from 'zod'

/** Address **/
export const CategorySchema = z.object({
    id: z.string(),
    nombre_categoria: z.string(),
    fecha_inactivo: z.string().nullable(),
    ind_activo: z.string(),
})

export const CategoriesSchema = z.array(CategorySchema)