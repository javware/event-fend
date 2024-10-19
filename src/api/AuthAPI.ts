import { isAxiosError } from "axios"
import api from "../lib/axios"
import { ForgotPasswordForm, NewPasswordForm, UserLoginForm, userShema } from "../types"

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const {data} = await api.post('/auth/login/', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if ('code' in error.response.data) {
                if (error.response.data.code === "token_not_valid") {
                    localStorage.removeItem('AUTH_TOKEN')
                }
            }
            throw new Error(error.response.data.error)
        }else {
            throw new Error("Error de red o CORS");
        }
    }
}

export async function forgotPasswordUser(formData: ForgotPasswordForm) {
    try {
        const { data } = await api.post('/auth/reestablece/', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function newPasswordUser(formData: NewPasswordForm) {
    try {
        const { data } = await api.post('/auth/new_password/', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api('/auth/authentication_user/')
        const response = userShema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}