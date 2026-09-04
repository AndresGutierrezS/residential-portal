import type { Apartment } from "@/admin/apartments/interfaces/apartment.interface";

export interface ReportPaymentType {
    id: number;
    type: string;
}

export interface ReportPaymentReason {
    id: number;
    payment_type_id: number;
    reason: string;
}

export interface ReportPerson {
    id: number;
    name: string;
    last_name: string;
    second_last_name: string;
    phone: string;
    is_active: number;
}

export interface ReportRole {
    id: number;
    role: string;
}

export interface ReportApartmentPerson {
    id: number;
    person_id: number;
    apartment_id: number;
    role_id: number;
    is_resident: number;
    code: string;
    person: ReportPerson;
    role: ReportRole;
}

export interface ReportApartment extends Apartment {
    apartment_people: ReportApartmentPerson[];
}

export interface ReportPayment {
    id: number;
    apartment_id: number;
    amount: string;
    payment_type_id: number;
    date: string;
    payment_reason_id: number;
    description: string;
    receipt: string;
    is_paid: number;
    report_id: number | null;
    apartment: Apartment;
    payment_type: ReportPaymentType;
    payment_reason: ReportPaymentReason;
    maintenance: ReportMaintenance | null;
}

export interface ReportResident {
    id: number;
    person_id: number;
    apartment_id: number;
    role_id: number;
    is_resident: number;
    code: string;
    person: ReportPerson;
    apartment: Apartment;
    role: ReportRole;
}

export interface ReportMaintenancePayment {
    id: number;
    apartment_id: number;
    amount: string;
    payment_type_id: number;
    date: string;
    payment_reason_id: number;
    description: string;
    receipt: string;
    is_paid: number;
    report_id: number | null;
    apartment: Apartment;
    payment_reason: ReportPaymentReason;
}

export interface ReportMaintenance {
    id: number;
    month: number;
    year: number;
    apartment_id: number | null;
    is_completed: number;
    amount: string;
    payment_id: number;
    payment: ReportMaintenancePayment;
}