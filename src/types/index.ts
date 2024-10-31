import { z } from 'zod'
import { AddressSchema } from '../schema/address_schema'
import { ServiceSchema } from '../schema/service_schema'

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


/** Address **/
export type Address = z.infer<typeof AddressSchema>
export type AddressFormData = Pick<Address, 'nombre_direccion' | 'descripcion_dire' | 'numero_piso' | 'aforo_max'>

/** Service **/
export type Service = z.infer<typeof ServiceSchema>
export type ServiceFormData = Pick<Service, 'nombre_servicio'>