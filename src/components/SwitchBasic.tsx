import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { Row } from '@tanstack/react-table';
import classNames from 'classnames';
import Spinner from './Spinner';

// Propiedades genéricas para SwitchBasic
interface SwitchBasicProps<T> {
    row: Row<T>;
    mutate: (data: { id: string }) => void; 
    isPending: boolean; 
}

export default function SwitchBasic<T extends { id: string; ind_activo?: string }>({ row, mutate, isPending }: SwitchBasicProps<T>) {
    const { original } = row;
    const [enabled, setEnabled] = useState(original.ind_activo === '1');

    useEffect(() => {
        setEnabled(original.ind_activo === '1');
    }, [original.ind_activo]);

    const handleToggle = async () => {
        if (!enabled) {
            setEnabled(true);
            mutate({ id: original.id })
        }
    };

    if (isPending) return <Spinner />

    return (
        <Switch
            checked={enabled}
            onChange={handleToggle}
            className={classNames(
                'relative inline-flex items-center h-5 rounded-full w-9 transition-colors duration-200 ease-in-out',
                enabled ? 'bg-primary' : 'bg-gray-200'
            )}
        >
            <span
                className={classNames(
                    'inline-block w-3 h-3 transform bg-white rounded-full transition duration-200 ease-in-out',
                    enabled ? 'translate-x-5' : 'translate-x-1'
                )}
            />
        </Switch>
    );
}
