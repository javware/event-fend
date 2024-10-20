import { useForm } from "react-hook-form";
import type { NewPasswordForm } from "../../types";
import Input from "../Input";
import { useMutation } from "@tanstack/react-query";
import { newPasswordUser } from "../../api/AuthAPI";
import { useToasts } from "../../hooks/useToasts";
import { useNavigate } from "react-router-dom";

export default function NewPasswordForm() {
    const { ErrorToast, SuccessToast } = useToasts();
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        token: '',
        newpassword: '',
        confirm_newpassword: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    console.log(reset)
    const { mutate } = useMutation({
        mutationFn: newPasswordUser,
        onError: (error) => {
            ErrorToast(error.message)
            navigate('/auth/forgot-password')
        },
        onSuccess: (data) => {
            SuccessToast(data.message)
            reset()
            localStorage.removeItem('FORGOT_TOKEN_USER')
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            ...formData,
            token: localStorage.getItem('FORGOT_TOKEN_USER') || formData.token,
        }
        mutate(data)
    }

    const password = watch('newpassword');

    return (
        <form onSubmit={handleSubmit(handleNewPassword)} className="space-y-4 pt-6 p-4 lg:p-6" noValidate >
            <Input id="newpassword" label="Contraseña" type="password" placeholder="Password de Registro"
                error={errors.newpassword}
                register={register("newpassword", {
                    required: "El Password es obligatorio",
                    minLength: {
                        value: 8,
                        message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                })}
            />

            <Input id="confirm_newpassword" label="Repetir Contraseña" type="password" placeholder="Repite Password de Registro"
                error={errors.confirm_newpassword}
                register={register("confirm_newpassword", {
                    required: "Repetir Password es obligatorio",
                    validate: value => value === password || 'Los Passwords no son iguales'
                })}
            />

            <button type="submit"
                className="bg-red-600 w-full p-3 rounded-3xl text-white font-semibold text-xl cursor-pointer"
            > Establecer Password </button>


        </form>
    )
}
