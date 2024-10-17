import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import Input from "../../components/Input";
// import { useMutation } from "@tanstack/react-query";
// import { forgotPasswordUser } from "../../api/AuthAPI";


export default function ForgotPasswordView() {
  // const navigate = useNavigate()
  const initialValues: ForgotPasswordForm = {
    correo: ''
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  // const { mutate } = useMutation({
  //   mutationFn: forgotPasswordUser,
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  //   onSuccess: (data, variables) => {
  //     const email = variables.email
  //     localStorage.setItem('forgotEmailUser', email);
  //     toast.success(data.message)
  //     navigate('/auth/new-password')
  //   }
  // })

  const handleForgotPassword = (formData: ForgotPasswordForm) => {

    console.log(formData)

  }


  return (
    <>
      <h1 className="text-5xl font-black  text-center">Cambiar Password</h1>
      <p className="text-xl font-light  mt-1 text-center">
        ¡Olvidaste tu password? coloca tu email y {''}
        <span className=" text-red-600 font-bold">reestablece tu password</span>
      </p>
      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-4 pt-6 p-4 lg:p-6 " noValidate>
        <Input id="correo" label="Correo electrónico" type="correo" placeholder="correo"
          error={errors.correo}
          register={register("correo", {
            required: "El email es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Introduce un correo válido",
            },
          })}
        />

        <button type="submit"
          className="bg-red-600 w-full p-3 rounded-3xl text-white font-semibold text-xl cursor-pointer"
        > Enviar Instrucciones </button>

      </form>

      <nav className="mt-5 flex flex-col space-y-4">
        <Link to={'/auth/login'} className="text-center  font-normal"
        >¿Ya tienes cuenta? <span className="underline pl-4">Iniciar Sesión</span></Link>
      </nav>
    </>
  )
}