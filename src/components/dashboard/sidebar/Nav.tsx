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
                    'flex gap-2 py-1.5 px-2 items-center rounded-lg transition-all duration-300 ease-in-out',
                    isSelected
                        ? 'bg-cyan-500/10 font-semibold text-gray-600'
                        : 'text-gray-600 hover:bg-cyan-500/10 hover:text-gray-600'
                )}
            >
                <Icon className="text-red-600 mx-2 text-4xl" />
                <span className="w-full">{name}</span>
                <RiArrowRightSLine className="text-4xl" />
            </div>
        </Link>
    );
}
