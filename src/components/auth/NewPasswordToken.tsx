import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router-dom';
import { ConfirmToken } from '../../types';

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
}

export default function NewPasswordToken({ token, setToken }: NewPasswordTokenProps) {
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }
    const handleComplete = (token: ConfirmToken['token']) => {
        console.log("completo", token)

    }

    return (
        <>
            <form className="space-y-6 mt-3">
                <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
                <div className="flex justify-center gap-3">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
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