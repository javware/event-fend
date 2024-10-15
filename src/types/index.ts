import { z } from 'zod'

/** Auth & User **/
export const authSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
})

export type Auth = z.infer<typeof authSchema>
export type ConfirmToken = Pick<Auth, 'token'>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'email' | 'password' | 'password_confirmation'>


// types/index.ts
export const tableSchema = z.object({
    accessorKey: z.string(), // La clave para acceder a los datos (como 'name', 'status', etc.)
    label: z.string(),   // El nombre de la columna que se mostrará
    enableSorting: z.boolean(), // Sorting habilitado o no (opcional)
})
export type Table = z.infer<typeof tableSchema>
export type Columns = Pick<Table, 'accessorKey' | 'enableSorting' | 'label'>

export type RowData = {
    [key: string]: any;
};