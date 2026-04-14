export interface PaymentType {
    id:         number;
    type:       string;
    created_at: string;
    updated_at: string;
}

export interface PaymentReason {
    id:              number;
    payment_type_id: number;
    reason:          string;
    created_at:      string;
    updated_at:      string;
}


export interface PaymentResponse {
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
    created_at: string;
    updated_at: string;

    apartment: Apartment;
    payment_type: PaymentType;
    payment_reason: PaymentReason;
    report?: Report | null;
    maintenance?: Maintenance | null;
}

export interface Apartment {
    id:         number;
    name:       string;
    is_overdue: number;
    code:       string;
    created_at: string;
    updated_at: string;
    status:     string;
}


export interface Report {
    id:         number;
    user_id:    number;
    content:    string;
    date:       string;
    created_at: string;
    updated_at: string;
}

export interface Maintenance {
    id: number;
    payment_id: number;
    month: number;
    year: number;
    amount: string; 
    completed: number; 
}

export interface Payment {
    id: number;
    apartmentId: number;
    amount: number;
    paymentTypeId: number;
    date: Date;
    paymentReasonId: number;
    description: string;
    receipt: string;
    isPaid: boolean;
    reportId?: number;

    apartment: Apartment;
    paymentType: PaymentType;
    paymentReason: PaymentReason;
    report?: Report;

    maintenance?: {
        month: number;
        year: number;
        completed: boolean;
    };
}