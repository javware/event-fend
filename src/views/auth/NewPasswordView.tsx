import { useState } from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import { ConfirmToken } from "../../types";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)
    console.log(setIsValidToken)
    // const navigate = useNavigate()

    return (
        <>
            <h1 className="text-5xl font-black text-center">Reestablecer Password</h1>
            <p className="text-xl font-light  mt-1 text-center">
                Ingresa el código que recibiste  {''}
                <span className=" text-red-600 font-bold"> por Correo</span>
            </p>

            {!isValidToken ?
                <NewPasswordToken token={token} setToken={setToken} /> :
                <NewPasswordForm />}

        </>
    )
}
