import type { Resident, ResidentResponse } from "../interfaces/resident.interface";

export const mapResident = (r: ResidentResponse): Resident => {

    return ({
        id: r.id,
        fullname: `${r.person.name} ${r.person.last_name}`,
        code: r.code,
        email: 'email@example.com',
        phone: r.person.phone,
    });
}