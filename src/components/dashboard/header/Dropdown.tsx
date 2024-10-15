import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

type DropdownProps = {
    name: string
    options: Array<{
        label: string;
        onClick: () => void;
        iconActive: React.ReactNode;
        iconInactive: React.ReactNode;

    }>;
};

export default function Dropdown({ name, options }: DropdownProps) {
    return (
        <div className="relative inline-block text-left">
            <Menu>
                <div>
                    <Menu.Button className="inline-flex gap-5 items-center w-full justify-center bg-white pl-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        <div className=' flex flex-col items-start'>
                            <h1 className='text-black font-semibold text-base'>{name}</h1>
                            <span className='font-normal text-gray-400'>Admin</span>
                        </div>
                        <div className='flex items-center justify-center h-9 w-9 -mr-1 ml-2  bg-gray-100 rounded-lg'>
                            <RiArrowDownSLine className=" text-2xl text-gray-600" aria-hidden="true" />
                        </div>

                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {options.map((option, index) => (
                            <div key={index} className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={option.onClick}
                                        >
                                            {active ? option.iconActive : option.iconInactive}
                                            {option.label}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
