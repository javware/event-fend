import { rankItem } from "@tanstack/match-sorter-utils";

export const fuzzyFilter = (row: any, columnId: string, value: string, addMeta: (meta: { itemRank: any }) => void) => {
    const combinedValue = Object.values(row.original)
        .filter(val => typeof val === 'string' || typeof val === 'number') // Filtrar solo valores tipo string y número
        .join(' ')
        .toLowerCase();

    const itemRank = rankItem(combinedValue, value.toLowerCase());
    addMeta({ itemRank });

    return itemRank.passed;
}