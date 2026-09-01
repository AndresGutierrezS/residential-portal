import type { Resident, ResidentResponse } from "../interfaces/resident.interface";

export const mapResident = (r: ResidentResponse): Resident => {

    return ({
        id: r.id,
        person_id: r.person_id,
        apartment_id: r.apartment_id,
        role_id: r.role_id,
        fullName: `${r.person.name} ${r.person.last_name} ${r.person.second_last_name ? r.person.second_last_name : ''}`,
        code: r.apartment.code,
        email: r.person.user?.email || '',
        phone: r.person.phone,
    });
}