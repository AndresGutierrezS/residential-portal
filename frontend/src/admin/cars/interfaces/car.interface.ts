export interface CarsResponse {
    data: Car[];
    message: string | null;
}

export interface Car {
    id:           number;
    apartment_id: number;
    plate:        string;
    brand:        string;
    model:        string;
    color:        string;
    created_at:   string;
    updated_at:   string;
    apartment:    Apartment;
}

export interface Apartment {
    id:         number;
    name:       string;
    is_overdue: number;
    code:       string;
    created_at: string | null;
    updated_at: string | null;
}
