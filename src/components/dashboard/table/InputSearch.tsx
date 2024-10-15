import { useEffect, useState } from "react";

type DebouncedInputProps = {
    value: string
    type: string
    onChange: (value: string) => void;
    className: string
    placeholder: string
}

export default function InputSearch({ value, onChange, ...props }: DebouncedInputProps) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(inputValue);
        }, 30)

        return () => clearTimeout(timeout);
    }, [inputValue])

    return (
        <input value={value} onChange={e => setInputValue(e.target.value)} {...props} />
    )
}
