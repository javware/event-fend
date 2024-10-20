import { useForm } from "react-hook-form"
import { UserLoginForm } from "../../types"
import Input from "../../components/Input"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { authenticateUser } from "../../api/AuthAPI"
import { useToasts } from "../../hooks/useToasts"
export default function LoginView() {
    const { ErrorToast } = useToasts();
    const navigate = useNavigate()
    const initialValues: UserLoginForm = {
        correo: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            const backPath = new URLSearchParams(location.search).get('backPath') || '/'
            navigate(backPath);
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <>
            <div className='mt-1'>
                <h1 className="text-5xl font-black text-center">Iniciar Sesión</h1>
                <p className="text-xl font-light mt-1 text-center ">
                    Comienza a crear eventos  {''}
                    <span className=" text-red-600 font-bold"> iniciando sesión</span>
                </p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 pt-6 p-4 lg:p-6 " noValidate>
                    <Input id="correo" label="Correo electrónico" type="correo" placeholder="correo"
                        error={errors.correo}
                        register={register("correo", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Introduce un email válido",
                            },
                        })}
                    />

                    <Input id="password" label="Contraseña" type="password" placeholder="password"
                        error={errors.password}
                        register={register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    <button type="submit"
                        className="bg-red-600 w-full p-3 rounded-3xl text-white font-semibold text-xl cursor-pointer"
                    > Iniciar Sesión </button>

                </form>
                <nav className="mt-5 flex flex-col space-y-4">
                    <Link to={'/auth/forgot-password'} className="text-center  font-normal"
                    >¿Olvidate tu contraseña? <span className="underline pl-4">Reestablecer</span></Link>
                </nav>

            </div>
        </>
    )
}


