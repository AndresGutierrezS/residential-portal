import type { Apartment, ApartmentResponse } from "../interfaces/apartment.interface";
import { parseApartmentCode } from "../utils/apartmentCode.util";


export const apartmentMap = (a: ApartmentResponse): Apartment => {
    const parsedCode = parseApartmentCode(a.code);

    return {
        id: a.id,
        code: a.code,
        area: a.area,
        name: a.name,
        is_overdue: a.is_overdue,
        floor: parsedCode ? Number(parsedCode.floor) : 0,
        status: a.status,
    }
}