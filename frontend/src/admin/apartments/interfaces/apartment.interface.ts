type Status = 'occupied' | 'vacant' | 'maintenance';

export interface Apartment {
    id: number;
    name: string;
    code: string;
    floor: number;
    area: number;
    is_overdue: number;
    status: Status;
}

export interface ApartmentResponse {
    id:         number;
    name:       string;
    is_overdue: number;
    code:       string;
    area:       number;
    created_at: string | null;
    updated_at: string | null;
    status:     Status;
}

export interface ApartmentDTO {
    code: string;
    status: Status;
    area: number;
    name?: string;
    is_overdue?: number;
}

export interface ApartmentForm {
    tower: string;
    floor: string;
    number: string;
    status: Status;
    area: string;
}