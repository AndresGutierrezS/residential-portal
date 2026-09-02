
export const getFloorFromCode = (code: string): number => {
    const match = code.match(/-(\d+)/);

    if(!match) return 0;

    return Number(match[1][0]);
}