import { rankItem } from "@tanstack/match-sorter-utils";



export const fuzzyFilter = (row: any, columnId: string, value: string, addMeta: (meta: { itemRank: any }) => void) => {
    const cellValue = row.getValue(columnId)
    const itemRank = rankItem(cellValue, value)

    // Filtrado exacto si el valor es 'activo' o 'inactivo'
    if (value === 'Activo' || value === 'Inactivo') {
        const isMatch = cellValue === value;
        addMeta({ itemRank: { rankedValue: cellValue, passed: isMatch } });
        return isMatch;
    }

    addMeta({ itemRank })
    return itemRank.passed
}