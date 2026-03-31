import type { Apartment, ApartmentResponse } from "../interfaces/apartment.interface";


export const apartmentMap = (a: ApartmentResponse): Apartment => {
    
    return {
        id: a.id,
        code: a.code,
        name: a.name,
        is_overdue: a.is_overdue,
        floor: Number(a.code.at(0)),
        status: a.status,
    }
}