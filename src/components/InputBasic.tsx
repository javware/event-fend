import classNames from "classnames";
import { FC } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputBasicProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    disabled?: boolean;
}

const InputBasic: FC<InputBasicProps> = ({ id, label, type = "text", placeholder, error, register, disabled }) => {
    return (
        <div className="flex flex-col mb-2">
            <label htmlFor={id} className="text-gray-500 mb-1">{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                aria-invalid={!!error}
                disabled={disabled}
                className={classNames(
                    "border focus:outline-none rounded-lg p-2 text-base disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "border-red-500": error,
                        "border-gray-400 focus:border-primary": !error,
                    }

                )}
                {...register}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    );
};

export default InputBasic;
