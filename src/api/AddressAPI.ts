import { isAxiosError } from "axios"
import api from "../lib/axios"
import { AddresssSchema } from "../schema/address_schema"
import { Address, AddressFormData } from "../types"

export async function getAddress() {
    try {
        const { data } = await api('/direccion')
        const response = AddresssSchema.safeParse(data)
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

export async function createAddress(formData: AddressFormData) {
    try {
        const { data } = await api.post('/direccion/crear', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function getAddressById(id: Address['id']) {
    try {
        const { data } = await api.get(`/direccion/buscar`, {
            params: { id_direccion: id } // Pasamos `id` en los parámetros de consulta
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


export async function updateAddress(formData: AddressFormData) {
    try {
        const { data } = await api.put<string>(`/direccion/actualizar`, formData)
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

export async function updateStatusAddress({ id }: { id: Address['id'] }) {
    try {
        const { data } = await api.put('/direccion/activar', { id_direccion: id })
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

export async function deleteAddress(id: Address['id']) {
    try {
        const { data } = await api.delete<string>('/direccion/eliminar', {
            params: { id_direccion: id }
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

