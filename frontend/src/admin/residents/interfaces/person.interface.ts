
export interface Person {
    id:               number;
    name:             string;
    last_name:        string;
    second_last_name: string;
    phone:            string;
    is_active:        number;
    created_at:       Date;
    updated_at:       Date;
    user?: User;
}

export interface User {
    id: number;
    person_id: number;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    is_admin: number;
}