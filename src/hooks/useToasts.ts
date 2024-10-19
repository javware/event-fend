import { toast } from "sonner";

export const useToasts = () => {
    const ErrorToast = (message: string): void => {
        toast.error(message, {
            unstyled: false,
            // description: 'My description',
            classNames: {
                toast: 'bg-white shadow shadow-lg',
                title: 'text-red-600 font-semibold',
                description: 'text-red-600',
                actionButton: 'bg-zinc-600',
                cancelButton: 'bg-orange-600',
                closeButton: 'bg-lime-600',
                icon: 'toast-icon text-red-600'
              },
            // richColors: true,
            position: 'top-right'
        });
    };

    const SuccessToast = (message: string): void => {
        toast.success(message, {
            unstyled: false,
            classNames: {
                toast: 'bg-white shadow shadow-lg',
                title: 'text-green-600 font-semibold',
                description: 'text-green-600',
                actionButton: 'bg-zinc-600',
                cancelButton: 'bg-orange-600',
                closeButton: 'bg-lime-600',
                icon: 'toast-icon text-green-600'
              },
            position: 'top-right'
        });
    };

    return { ErrorToast, SuccessToast };
};
