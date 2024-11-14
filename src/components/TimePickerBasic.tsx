import { useEffect, useState } from 'react'
import { FieldError, UseFormGetValues, UseFormRegisterReturn } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'
import 'react-datepicker/dist/react-datepicker.css'
import { EventFormData } from '../types'
import { parseISO } from 'date-fns'

type TimePickerBasicProps = {
    id: string;
    label?: string;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    error?: FieldError;
    register: UseFormRegisterReturn;
    disabled?: boolean;
    getValues: UseFormGetValues<EventFormData>
}

export default function TimePickerBasic({ id, label, onChange, placeholder, error, disabled, getValues }: TimePickerBasicProps) {
    const dateString = getValues(id as keyof EventFormData); 
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    useEffect(() => {
        if (dateString) {
            if (dateString.includes(" ")) {
                const parsedDate = parseISO(dateString);
                setSelectedTime(parsedDate); 
            } else {
                const [hour, minute] = dateString.split(":");
                const currentTime = new Date();
                currentTime.setHours(Number(hour), Number(minute), 0, 0); 
                setSelectedTime(currentTime); 
            }
        }
    }, [dateString]);

    return (
        <div className="flex flex-col mb-2">
            <label htmlFor={id} className="text-gray-500 mb-1">{label}</label>
            <DatePicker
                selected={selectedTime}
                onChange={(date) => {
                    setSelectedTime(date);
                    onChange(date);
                }}
                showTimeSelect
                disabled={disabled}
                placeholderText={placeholder}
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="h:mm aa"
                isClearable={true}
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
    );
};
