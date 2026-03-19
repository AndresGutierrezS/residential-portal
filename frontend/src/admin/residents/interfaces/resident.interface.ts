import type { Apartment } from "./Apartment.interface";
import type { Person } from "./Person.interface";
import type { Role } from "./Role.interface";

export interface ResidentResponse {
    id:           number;
    person_id:    number;
    apartment_id: number;
    role_id:      number;
    is_resident:  number;
    code:         string;
    created_at:   Date;
    updated_at:   Date;
    person:       Person;
    apartment:    Apartment;
    role:         Role;
}

export interface Resident {
    id: number;
    fullname: string;
    code: string;
    email: string;
    phone: string;
}





