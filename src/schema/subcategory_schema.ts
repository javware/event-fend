import { z } from 'zod'

/** Address **/
export const SubCategorySchema = z.object({
    id: z.string(),
    nombre_cate_evento: z.string(),
    id_categoria: z.string(),
    nombre_categoria: z.string(),
    fecha_inactivo: z.string().nullable(),
    ind_activo: z.string(),
   
})


export const SubCategoriesSchema = z.array(SubCategorySchema)