type Status = 'Disponible' | 'Ocupado' | 'Mantenimiento';

export interface Apartment {
    id: number
    name: string
    code: string
    floor: number
    isOverdue: boolean
    status: Status
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
    is_overdue?: boolean
}