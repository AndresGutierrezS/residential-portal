
export interface Message {
    sender_id:         number;
    receiver_id:       number | null;
    apartment_from_id: number | null;
    apartment_to_id:   number | null;
    message:           string;
    sent_at:           Date;
    updated_at:        Date;
    created_at:        Date;
    id:                number;
    sender:            Sender;
}

export interface Sender {
    id:               number;
    name:             string;
    last_name:        string;
    second_last_name: string;
    phone:            string;
    is_active:        number;
    created_at:       Date;
    updated_at:       Date;
}
