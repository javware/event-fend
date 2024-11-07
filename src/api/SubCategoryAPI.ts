import { isAxiosError } from "axios"
import api from "../lib/axios"
import { SubCategory, SubCategoryFormData } from "../types"
import { SubCategoriesSchema } from "../schema/subcategory_schema"

export async function getSubCategory() {
    try {
        const { data } = await api('/subcategoria')
        const response = SubCategoriesSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.data['detail']) {
                throw new Error(error.response.data.detail)
            }
            throw new Error(error.response.data.error)
        }
    }
}

export async function createSubCategory(formData: SubCategoryFormData) {
    try {
        const { data } = await api.post('/subcategoria/crear', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function getSubCategoryById(id: SubCategory['id']) {
    try {
        const { data } = await api.get(`/subcategoria/buscar`, {
            params: { id_categoria_evento: id } 
        });
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.data['detail']) {
                throw new Error(error.response.data.detail)
            }
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateSubCategory(formData: SubCategoryFormData) {
    try {
        const { data } = await api.put<string>(`/subcategoria/actualizar`, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.data['detail']) {
                throw new Error(error.response.data.detail)
            }
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatusSubCategory({ id }: { id: SubCategory['id']}) {
    try {
        const { data } = await api.put('/subcategoria/activar', { id_categoria_evento: id })
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.data['detail']) {
                throw new Error(error.response.data.detail)
            }
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteSubCategory(id: SubCategory['id']) {
    try {
        const { data } = await api.delete<string>('/subcategoria/eliminar', {
            params: { id_categoria_evento: id }
        })
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.data['detail']) {
                throw new Error(error.response.data.detail)
            }
            throw new Error(error.response.data.error)
        }
    }
}