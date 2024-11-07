import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CategoryForm from "../category/CategoryForm";
import { FaSave } from "react-icons/fa";
import { CategoryFormData } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../api/CategoryAPI";
import { useToasts } from "../../hooks/useToasts";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCategory: (newCategory: { value: string; label: string }) => void;
}

export default function CategoryModal({ isOpen, onClose, onAddCategory }: CategoryModalProps) {
    const { ErrorToast, SuccessToast } = useToasts();
    const queryClient = useQueryClient()
    const initialValues: CategoryFormData = {
        nombre_categoria: "",
    }

    const { register, reset, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createCategory,
        onError: (error) => {
            ErrorToast(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] });
            SuccessToast('Se Registro Correctamente la categoría')
            reset()
        }
    })

    const handleForm = (formData: CategoryFormData,) => {
        const newCategory = { value: formData.nombre_categoria.toLowerCase(), label: formData.nombre_categoria };
        onAddCategory(newCategory);
        onClose()
        mutate(formData)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-500"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-500"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-center text-gray-900"
                                    >
                                        Crear Nueva Categoría
                                    </Dialog.Title>

                                    <form noValidate>
                                        <CategoryForm register={register} errors={errors} setValue={setValue} getValues={getValues} />
                                        <div className='flex flex-col mt-7 md:flex-row gap-3 justify-center'>
                                            <button type="submit" onClick={handleSubmit(handleForm)}
                                                className='bg-primary py-2 px-4 rounded-full text-white  text-sm cursor-pointer flex items-center justify-center gap-1'
                                            ><FaSave /> Crear Categoría</button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>


    )
}
