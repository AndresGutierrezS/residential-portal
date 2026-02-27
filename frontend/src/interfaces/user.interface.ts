export interface Role {
  id: number;
  role: string;
}

export interface ApartmentPivot {
  role_id: number;
  is_resident: boolean;
  code: string;
  role?: Role;
}

export interface Apartment {
  id: number;
  name: string;
  code: string;
  is_overdue: boolean;
  pivot?: ApartmentPivot;
}

export interface Person {
  id: number;
  name: string;
  last_name: string;
  second_last_name: string;
  phone: string;
  is_active: boolean;

  apartments?: Apartment[];
  apartment_people?: ApartmentPivot[];
}

export interface User {
  id: number;
  email: string;
  person: Person;
}