import { rankItem } from "@tanstack/match-sorter-utils";

export const fuzzyFilter = (row: any, value: string, addMeta: (meta: { itemRank: any }) => void) => {
    const combinedValue = Object.values(row.original)
        .filter(val => typeof val === 'string' || typeof val === 'number')
        .join(' ')
        .toLowerCase();

    const itemRank = rankItem(combinedValue, value.toLowerCase());
    addMeta({ itemRank });

    return itemRank.passed;
}