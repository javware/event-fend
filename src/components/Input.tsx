import { FC } from "react";
import classNames from "classnames";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    disabled?: boolean;
}

const Input: FC<InputProps> = ({ id, label, type = "text", placeholder, error, register, disabled }) => {
    return (
        <div className="relative flex flex-col gap-1">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                aria-invalid={!!error}
                disabled={disabled}
                className={classNames(
                    "border focus:outline-none peer p-4 w-full rounded-lg text-base placeholder:text-transparent disabled:opacity-50 disabled:pointer-events-none",
                    "focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6",
                    "[&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2",
                    {
                        "border-red-500": error,
                        "border-gray-400 focus:border-gray-500": !error,
                    }
                )}
                {...register}
            />
            <label htmlFor={id} className="absolute top-[-0.10rem]  start-0 p-4 text-lg truncate pointer-events-none transition-all ease-in-out duration-200 border border-transparent origin-[0_0] 
            peer-disabled:pointer-events-none text-gray-500
            peer-focus:scale-75 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 
            peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 
            peer-placeholder-shown:text-lg
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:translate-x-0"
            >{label}</label>

            {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
    );
};

export default Input;
