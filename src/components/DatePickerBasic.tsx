import { useState } from 'react'
import { FieldError, UseFormGetValues, UseFormRegisterReturn } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'
import classNames from 'classnames'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale';
import { EventFormData } from '../types'
import { parseISO } from 'date-fns'
registerLocale('es', es);

type DatePickerBasicProps = {
    id: string;
    label?: string;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    disabled?: boolean;
    getValues: UseFormGetValues<EventFormData>
}

export default function DatePickerBasic({ id, label, onChange, placeholder, error, disabled, getValues }: DatePickerBasicProps) {
    const dateString = getValues(id  as keyof EventFormData) ? parseISO(getValues(id as keyof EventFormData) as string) : null;
    const [selectedDate, setSelectedDate] = useState<Date | null>(dateString)

    return (
        <div className="flex flex-col mb-2">
            <label htmlFor={id} className="text-gray-500 mb-1">{label}</label>
            <DatePicker
                locale="es"
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date);
                    onChange(date);
                }}
                disabled={disabled}
                placeholderText={placeholder}
                dateFormat="dd/MM/yyyy"
                isClearable={true}
                withPortal
                wrapperClassName="w-full"
                className={classNames(
                    "border focus:outline-none rounded-lg p-2 text-base disabled:opacity-50 disabled:pointer-events-none w-full",
                    {
                        "border-red-500": error,
                        "border-gray-400 focus:border-primary": !error,
                    }
                )}

            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    )
}

