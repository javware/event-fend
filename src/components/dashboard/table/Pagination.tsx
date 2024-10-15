import { Table } from "@tanstack/react-table";
import classNames from "classnames";
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

type PaginationProps = {
    table: Table<any>
}

export default function Pagination({ table }: PaginationProps) {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1; // Página actual basada en 1

    const getStateTable = () => {
        const totalRows = table.getFilteredRowModel().rows.length;
        const pageSize = table.getState().pagination.pageSize;
        const pageIndex = table.getState().pagination.pageIndex;
        const rowsPerPage = table.getRowModel().rows.length;

        const firstIndex = (pageIndex * pageSize) + 1;
        const lastIndex = (pageIndex * pageSize) + rowsPerPage;

        return {
            totalRows,
            firstIndex,
            lastIndex
        }
    }

    const handlePageClick = (pageIndex: number) => {
        table.setPageIndex(pageIndex - 1); // Cambiar página
    };

    const renderPageButton = (pageIndex: number) => (
        <button
            key={pageIndex}
            className={classNames({
                "py-1 md:py-1.5 px-2 md:px-3 text-xs font-medium rounded-lg": true,
                "bg-primary text-white": pageIndex === currentPage, // Estilo del botón activo
                "bg-gray-200 text-gray-700": pageIndex !== currentPage, // Estilo de botones inactivos
                "hover:bg-gray-300": pageIndex !== currentPage, // Hover en botones inactivos
            })}
            onClick={() => handlePageClick(pageIndex)}
        >
            {pageIndex}
        </button>
    );

    const renderEllipsis = (key: string) => (
        <span key={key} className="py-1 px-1">
            ...
        </span>
    );

    const getPageButtons = () => {
        const pages = [];

        if (totalPages <= 5) {
            // Mostrar todas las páginas si hay 5 o menos
            for (let i = 1; i <= totalPages; i++) {
                pages.push(renderPageButton(i));
            }
        } else {
            // Mostrar la primera página siempre
            pages.push(renderPageButton(1));

            if (currentPage > 3) {
                // Mostrar elipsis si estamos más allá de la página 3
                pages.push(renderEllipsis("start-ellipsis"));
            }

            // Mostrar las páginas alrededor de la actual
            const startPage = Math.max(2, currentPage - 1); // No mostrar menos que la página 2
            const endPage = Math.min(totalPages - 1, currentPage + 1); // No mostrar más que la penúltima página

            for (let i = startPage; i <= endPage; i++) {
                pages.push(renderPageButton(i));
            }

            if (currentPage < totalPages - 2) {
                // Mostrar elipsis si no estamos cerca del final
                pages.push(renderEllipsis("end-ellipsis"));
            }

            // Mostrar la última página siempre
            pages.push(renderPageButton(totalPages));
        }

        return pages;
    };

    return (

        <div className='flex flex-col md:flex-row justify-between items-center gap-8 text-center mt-5 '>
            <div className='flex gap-5 items-center'>
                {/* select */}
                <div>
                    <select
                        className='text-gray-600 rounded-xl border  outline-none p-1'
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}>
                        <option value="5">5 pág.</option>
                        <option value="10">10 pág.</option>
                        <option value="20">20 pág.</option>
                        <option value="25">25 pág.</option>
                        <option value="50">50 pág.</option>
                    </select>
                </div>
                {/* info page */}
                <div className='text-gray-600 font-semibold'>
                    {getStateTable().firstIndex}&nbsp; - &nbsp;
                    {getStateTable().lastIndex}&nbsp; de &nbsp;
                    {getStateTable().totalRows}
                </div>
            </div>

            <div className='flex items-center '>
                <button
                    className='text-gray-60 rounded-lg disabled:hover:text-gray-400'
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}>
                    <LuChevronsLeft />
                </button>
                <button
                    className='text-gray-600 rounded-lg disabled:hover:text-gray-400'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    <LuChevronLeft className='m-1' />
                </button>

                {/* paginación */}
                <div className="flex items-center space-x-2">{getPageButtons()}</div>

                <button
                    className='text-gray-600 rounded-lg disabled:hover:text-gray-400'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    <LuChevronRight className='m-1' />
                </button>
                <button
                    className='text-gray-600 rounded-lg disabled:hover:text-gray-400'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}>
                    <LuChevronsRight />
                </button>
            </div>


        </div>




    )
}
