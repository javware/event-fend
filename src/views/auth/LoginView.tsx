import { useForm } from "react-hook-form"
import { UserLoginForm } from "../../types"
import Input from "../../components/Input"
import { Link } from "react-router-dom"

export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleLogin = (formData: UserLoginForm) => {
        console.log(formData)
    }

    return (
        <>
            <div className='mt-1'>
                <h1 className="text-5xl font-black text-center">Iniciar Sesión</h1>
                <p className="text-xl font-light mt-1 text-center ">
                    Llena el formulario para {''}
                    <span className=" text-red-600 font-bold"> Ingresar</span>
                </p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 p-6 " noValidate>
                    <Input id="email" label="Correo electrónico" type="email" placeholder="email"
                        error={errors.email}
                        register={register("email", {
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


