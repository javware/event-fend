import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router-dom';
import { ValidateTokenForm } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { validateTokenUser } from '../../api/AuthAPI';
import { useToasts } from '../../hooks/useToasts';

type NewPasswordTokenProps = {
    token: ValidateTokenForm['token']
    codigo: ValidateTokenForm['codigo']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, codigo, setToken, setIsValidToken }: NewPasswordTokenProps) {
    const { ErrorToast, SuccessToast } = useToasts();
    const { mutate } = useMutation({
        mutationFn: validateTokenUser,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: (data) => {
            SuccessToast(data.message)
            setIsValidToken(true)
            localStorage.removeItem('TOKEN_PASSWORD')
        }

    })

    const handleChange = (codigo: ValidateTokenForm['codigo']) => {
        setToken(codigo)
    }
    const handleComplete = (codigo: ValidateTokenForm['codigo']) => mutate({ token, codigo })

    return (
        <>
            <form className="space-y-6 mt-3">
                <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
                <div className="flex justify-center gap-3">
                    <PinInput value={codigo} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border focus:border-gray-500 focus:outline-none placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border focus:border-gray-500 focus:outline-none placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border focus:border-gray-500 focus:outline-none placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border focus:border-gray-500 focus:outline-none placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border focus:border-gray-500 focus:outline-none placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border focus:border-gray-500 focus:outline-none placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-7 flex flex-col space-y-4">
                <Link to={'/auth/forgot-password'} className="text-center font-normal underline"
                >Solicitar un nuevo Código</Link>
            </nav>
        </>
    )
}