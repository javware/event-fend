import { z } from 'zod'

/** Auth & User **/
export const authSchema = z.object({
    correo: z.string().email(),
    password: z.string(),
    newpassword: z.string(),
    confirm_newpassword: z.string(),
    token: z.string(),
    codigo: z.string(),
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'correo' | 'password'>
export type ForgotPasswordForm = Pick<Auth, 'correo'>
export type ValidateTokenForm = Pick<Auth, 'token' | 'codigo'>
export type NewPasswordForm = Pick<Auth, 'token' | 'newpassword' | 'confirm_newpassword'>

/** Users */

export const userShema = authSchema.pick({
    correo: true
}).extend({
    name: z.string(),
    id: z.number()
})
export type User = z.infer<typeof userShema>


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