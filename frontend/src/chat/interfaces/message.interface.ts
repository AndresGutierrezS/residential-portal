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
}
