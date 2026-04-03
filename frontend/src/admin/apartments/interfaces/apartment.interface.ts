type Status = 'occupied' | 'vacant' | 'maintenance';

export interface Apartment {
    id: number;
    name: string;
    code: string;
    floor: number;
    is_overdue: number;
    status: Status;
}

export interface ApartmentResponse {
    id:         number;
    name:       string;
    is_overdue: number;
    code:       string;
    created_at: string | null;
    updated_at: string | null;
    status:     Status;
}

export interface ApartmentDTO {
    code: string;
    status: Status;
    name?: string;
    is_overdue?: number;
}

export interface ApartmentForm {
    code: string;
    status: Status;
    area?: string;
    floor?: string;
    owner?: string;
}