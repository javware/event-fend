import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Service, ServiceFormData } from "../types"
import { ServicesSchema } from "../schema/service_schema"

export async function getService() {
    try {
        const { data } = await api('/servicio')
        const response = ServicesSchema.safeParse(data)
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

export async function createService(formData: ServiceFormData) {
    try {
        const { data } = await api.post('/servicio/crear', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function getServiceById(id: Service['id']) {
    try {
        const { data } = await api.get(`/servicio/buscar`, {
            params: { id_servicio: id } // Pasamos `id` en los parámetros de consulta
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


export async function updateService(formData: ServiceFormData) {
    try {
        const { data } = await api.put<string>(`/servicio/actualizar`, formData)
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

export async function updateStatusService({ id }: { id: Service['id']}) {
    try {
        const { data } = await api.put('/servicio/activar', { id_servicio: id })
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

export async function deleteService(id: Service['id']) {
    try {
        const { data } = await api.delete<string>('/servicio/eliminar', {
            params: { id_servicio: id }
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