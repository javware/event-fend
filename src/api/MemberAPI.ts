// import { isAxiosError } from "axios"
// import api from "../lib/axios"
// // import { listMemberSchema, MemberFormData } from "../types"

// export async function createMember(formData: MemberFormData) {
//     try {
//         const { data } = await api.post('/member/', formData)
//         return data
//     } catch (error) {
//         if (isAxiosError(error) && error.response) {
//             throw new Error(error.response.data.error)
//         }
//     }
// }

// export async function getMember() {
//     try {
//         const { data } = await api('/member/')
//         const response = listMemberSchema.safeParse(data)
//         if (response.success) {
//             return response.data
//         }
//     } catch (error) {
//         if (isAxiosError(error) && error.response) {
//             if (error.response.data['detail']) {
//                 throw new Error(error.response.data.detail)
//             }
//             throw new Error(error.response.data.error)
//         }
//     }
// }