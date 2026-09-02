
export const buildApartmentCode = (
            tower: string, floor: string, number: string
        ): string => {
    return `${tower}-${floor}${number.padStart(2, '0')}`;
}

export const parseApartmentCode = (code: string) => {
    const [tower, value] = code.split('-');

    if (!tower || !value || value.length < 3) {
        return null;
    }

    const floor = value.slice(0, -2);
    const number = value.slice(-2);

    return {
        tower,
        floor,
        number,
    };
};