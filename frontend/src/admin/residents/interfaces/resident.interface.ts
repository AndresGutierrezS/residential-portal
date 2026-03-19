import type { Apartment } from "./apartment.interface";
import type { Person } from "./person.interface";
import type { Role } from "./role.interface";

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

export interface CreateResidentDTO {
  person: {
    name: string;
    last_name: string;
    second_last_name?: string;
    phone: string;
  };
  role_id: number;
  code: string;
  email: string;
}

export interface UpdateResidentDTO {
  person: {
    name?: string;
    last_name?: string;
    second_last_name?: string;
    phone?: string;
  };
  role_id?: number;
  code?: string;
  email?: string;
}





