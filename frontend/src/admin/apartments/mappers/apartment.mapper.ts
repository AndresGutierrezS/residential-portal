import type { Apartment, ApartmentResponse } from "../interfaces/apartment.interface";
import { getFloorFromCode } from "../utils/getFloorFromCode.util";


export const apartmentMap = (a: ApartmentResponse): Apartment => {
    
    return {
        id: a.id,
        code: a.code,
        area: a.area,
        name: a.name,
        is_overdue: a.is_overdue,
        floor: getFloorFromCode(a.code),
        status: a.status,
    }
}