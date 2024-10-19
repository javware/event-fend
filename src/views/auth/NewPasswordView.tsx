import { useState } from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import { ValidateTokenForm } from "../../types";


export default function NewPasswordView() {
    const token = localStorage.getItem('TOKEN_PASSWORD') || ''
    const [codigo, setToken] = useState<ValidateTokenForm['codigo']>('')
    const [isValidToken, setIsValidToken] = useState(false)
    
    return (
        <>
            <h1 className="text-5xl font-black text-center">Reestablecer Password</h1>
            <p className="text-xl font-light  mt-1 text-center">
                Ingresa el código que recibiste  {''}
                <span className=" text-red-600 font-bold"> por Correo</span>
            </p>

            {!isValidToken ?
                <NewPasswordToken token={token} codigo={codigo} setToken={setToken} setIsValidToken={setIsValidToken} /> :
                <NewPasswordForm />}

        </>
    )
}
