import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Category, CategoryFormData } from "../types"
import { CategoriesSchema } from "../schema/category_schema"

export async function getCategory() {
    try {
        const { data } = await api('/categoria')
        const response = CategoriesSchema.safeParse(data)
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

export async function createCategory(formData: CategoryFormData) {
    try {
        const { data } = await api.post('/categoria/crear', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function getCategoryById(id: Category['id']) {
    try {
        const { data } = await api.get(`/categoria/buscar`, {
            params: { id_categoria: id } 
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


export async function updateCategory(formData: CategoryFormData) {
    try {
        const { data } = await api.put<string>(`/categoria/actualizar`, formData)
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

export async function updateStatusCategory({ id }: { id: Category['id']}) {
    try {
        const { data } = await api.put('/categoria/activar', { id_categoria: id })
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

export async function deleteCategory(id: Category['id']) {
    try {
        const { data } = await api.delete<string>('/categoria/eliminar', {
            params: { id_categoria: id }
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