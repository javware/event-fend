import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Event, EventFormData } from "../types"
import { EventsSchema } from "../schema/event_schema"

export async function getEvent() {
    try {
        const { data } = await api('/evento')
        const response = EventsSchema.safeParse(data)
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

export async function createEvent(formData: EventFormData) {
    try {
        const { data } = await api.post('/evento/crear', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function getEventById(id: Event['id']) {
    try {
        const { data } = await api.get(`/evento/buscar`, {
            params: { id_evento: id } // Pasamos `id` en los parámetros de consulta
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


export async function updateEvent(formData: EventFormData) {
    try {
        const { data } = await api.put<string>(`/evento/actualizar`, formData)
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

export async function updateStatusEvent({ id }: { id: Event['id']}) {
    try {
        const { data } = await api.put('/evento/activar', { id_evento: id })
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

export async function deleteEvent(id: Event['id']) {
    try {
        const { data } = await api.delete<string>('/evento/eliminar', {
            params: { id_evento: id }
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