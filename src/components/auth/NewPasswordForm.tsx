import { useForm } from "react-hook-form";
import type { NewPasswordForm } from "../../types";
import Input from "../Input";

export default function NewPasswordForm() {

    const initialValues: NewPasswordForm = {
        correo: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    console.log(reset)
    // const { mutate } = useMutation({
    //     mutationFn: newPasswordUser,
    //     onError: (error) => {
    //         toast.error(error.message)
    //         navigate('/auth/forgot-password')
    //     },
    //     onSuccess: (data) => {
    //         localStorage.removeItem('forgotEmailUser');
    //         toast.success(data.message)
    //         reset()
    //         navigate('/auth/login')
    //     }
    // })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            ...formData,
            email: localStorage.getItem('forgotEmailUser') || formData.correo,
        }
        console.log(data)
        // mutate(data)
    }

    const password = watch('password');

    return (
        <form onSubmit={handleSubmit(handleNewPassword)} className="space-y-4 pt-6 p-4 lg:p-6" noValidate >
            <Input id="password" label="Contraseña" type="password" placeholder="Password de Registro"
                error={errors.password}
                register={register("password", {
                    required: "El Password es obligatorio",
                    minLength: {
                        value: 8,
                        message: 'El Password debe ser mínimo de 8 caracteres'
                    }
                })}
            />

            <Input id="password_confirmation" label="Repetir Contraseña" type="password" placeholder="Repite Password de Registro"
                error={errors.password_confirmation}
                register={register("password_confirmation", {
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
