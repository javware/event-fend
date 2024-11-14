import { useEffect, useState } from 'react';
import { FieldError, UseFormGetValues, UseFormRegisterReturn, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { Combobox } from '@headlessui/react';
import { MdExpandMore } from 'react-icons/md';
import classNames from 'classnames';
import { Address, AddressFormData, EventFormData, } from '../../types';
import { LuCheckCircle } from 'react-icons/lu';
import AddressModal from '../../components/event/AddressModal';

type SelectAddressWithModalProps = {
    id: string
    label: string
    options: Address[] | undefined
    error?: FieldError
    register: UseFormRegisterReturn
    disabled?: boolean
    trigger: UseFormTrigger<any>
    setValue: UseFormSetValue<EventFormData>
    getValues: UseFormGetValues<EventFormData>
    placeholder: string
}

export default function SelectAddressWithModal({ id, label, options, error, trigger, disabled, setValue, getValues, placeholder }: SelectAddressWithModalProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [selectOptions, setSelectOptions] = useState(options)
    const [selectedValue, setSelectedValue] = useState<string>('')
    const [query, setQuery] = useState('')

    useEffect(() => {
        const foundOption = options?.find(option => option.id === getValues('direccion'));
        const value = foundOption ? foundOption.nombre_direccion : ''
        setSelectedValue(value)
    }, [getValues, options]);


    useEffect(() => {
        setSelectOptions(options)
    }, [options])

    const filterIdCategory = (value: string) => {
        if (!selectOptions) return;
        const foundOption = selectOptions.find((option) => option.nombre_direccion === value)

        if (foundOption) {
            setSelectedValue(foundOption.nombre_direccion)
            setValue('direccion', foundOption.id)
            trigger('direccion')
        } else {
            const newAddress: Address = {
                id: (selectOptions.reduce((maxId, option) => Math.max(maxId, +option.id), 0) + 1).toString(),
                nombre_direccion: value,
                descripcion_dire: String(),
                numero_piso: String(),
                aforo_max: String(),
                fecha_inactivo: null,
                ind_activo: "1"
            };
            setSelectOptions([...selectOptions, newAddress])
            setSelectedValue(newAddress.nombre_direccion)
            setValue('direccion', newAddress.id)
            trigger('direccion')
        }

    }

    const filteredOptions = query === '' ? selectOptions : selectOptions?.filter((option) =>
        option.nombre_direccion.toLowerCase().includes(query.toLowerCase())
    )

    const handleAddAddress = (newAddress: AddressFormData) => {
        setIsOpen(false)
        filterIdCategory(newAddress.nombre_direccion)
    }

    const handleClickModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsOpen(true)
    }

    return (
        <>
            <div className="flex flex-col mb-2">
                <label htmlFor={id} className="text-gray-500 mb-1">
                    {label}
                </label>
                <div className="flex">
                    <Combobox
                        value={selectedValue}
                        onChange={(value) => {
                            if (value !== null) {
                                filterIdCategory(value)
                                setSelectedValue(value)
                            }
                        }}
                        disabled={disabled}
                    >
                        <div className="relative w-full">
                            <Combobox.Input
                                className={classNames(
                                    'border rounded-l-lg p-2 text-base w-full focus:outline-none',
                                    {
                                        'border-red-500': error,
                                        'border-gray-400 focus:border-primary': !error,
                                        'disabled:opacity-50 disabled:pointer-events-none': disabled,
                                    }
                                )}
                                placeholder={placeholder}

                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <MdExpandMore className="h-6 w-6 text-primary" />
                            </Combobox.Button>
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10">
                                {filteredOptions?.length === 0 && (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        No options found.
                                    </div>
                                )}
                                {filteredOptions?.map((option) => (
                                    <Combobox.Option
                                        key={option.id}
                                        value={option.nombre_direccion}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-white' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {option.nombre_direccion}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-primary'
                                                            }`}
                                                    >
                                                        <LuCheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </div>
                    </Combobox>
                    <button onClick={handleClickModal} className="bg-primary text-white rounded-r-lg min-w-[10%]">+</button>
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

            </div>

            <AddressModal isOpen={isOpen} onClose={() => setIsOpen(false)} onAddAddress={handleAddAddress} />
        </>
    );
}
