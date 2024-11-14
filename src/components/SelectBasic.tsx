import classNames from "classnames";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { MdExpandMore } from "react-icons/md";

interface SelectBasicProps {
    id: string;
    label: string;
    options: { value: string; label: string }[]; // Array de opciones para el select
    error?: FieldError;
    register: UseFormRegisterReturn;
    disabled?: boolean;
}

export default function SelectBasic({ id, label, options, error, register, disabled }: SelectBasicProps) {
    return (
        <div className="flex flex-col mb-2">
            <label htmlFor={id} className="text-gray-500 mb-1">{label}</label>

            <div className="flex flex-col relative">
                <select
                    id={id}
                    disabled={disabled}
                    className={classNames(
                        "border relative focus:outline-none rounded-lg p-2 text-base disabled:opacity-50 disabled:pointer-events-none appearance-none ", // 'appearance-none' oculta la flecha predeterminada
                        {
                            "border-red-500": error,
                            "border-gray-400 focus:border-primary": !error,
                        }
                    )}
                    {...register}
                    defaultValue={options[0]?.value || ""}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <MdExpandMore className="h-6 w-6 text-primary" />
                </span>
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    )
}

