import classNames from "classnames";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

type NavProps = {
    Icon: React.ElementType;
    name: string;
    to: string;
};

export default function Nav({ Icon, name, to }: NavProps) {
    const location = useLocation(); // ruta actual
    const isSelected = location.pathname === to || location.pathname.startsWith(to + '/')

    return (
        <Link to={to} className="w-full">
            <div
                className={classNames(
                    'flex gap-2 py-1.5 px-2 items-center rounded-full transition-all duration-300 ease-in-out',
                    isSelected
                        ? 'bg-white font-semibold text-sky-600'
                        : 'text-white hover:bg-white hover:text-sky-600'
                )}
            >
                <Icon className={classNames(
                    "mx-2 text-4xl",
                    isSelected
                        ? ' text-sky-600'
                        : ' hover:text-sky-600'
                )} />
                <span
                    className={classNames(
                        'w-full ',
                        isSelected
                            ? 'text-sky-600'
                            : 'hover:text-sky-600'
                    )}
                >
                    {name}
                </span>
                <RiArrowRightSLine className="text-4xl" />
            </div>
        </Link>
    );
}
