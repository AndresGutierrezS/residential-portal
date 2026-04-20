import { portalGateApi } from "@/api/portalGateApi"
import type { CreatePaymentDTO, Payment, PaymentReason, PaymentResponse, PaymentType } from "../interfaces/payment.interface";
import { mapPayment } from "../mappers/payment.mapper";


export const getPaymentsAction = async (): Promise<Payment[]> => {
    const { data } = await portalGateApi.get<PaymentResponse[]>('payments');
    return data.map(p => mapPayment(p));
}

export const createPaymentAction = async (payload: CreatePaymentDTO): Promise<PaymentResponse> => {
    try {
        const { data } = await portalGateApi.post<PaymentResponse>('payments', payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const updatePaymentAction = async (id: number, payload: CreatePaymentDTO ): Promise<PaymentResponse> => {
    const { data } = await portalGateApi.put<PaymentResponse>(`payments/${id}`, payload);
    return data;
}

export const deletePaymentAction = async (id: number): Promise<void> => {
    await portalGateApi.delete(`payments/${id}`);
    return;
}

export const getPaymentByIdAction = async (id: number): Promise<Payment> => {
    const { data } = await portalGateApi.get<PaymentResponse>(`payments/${id}`);
    return mapPayment(data);
}

export const getPaymentsByTypeAction = async (typeId: number): Promise<Payment[]> => {
    const { data } = await portalGateApi.get<PaymentResponse[]>(`payments?payment_type_id=${typeId}`);
    return data.map(mapPayment);
}

export const getReasonsAction = async (typeId: number): Promise<PaymentReason[]> => {
    const { data } = await portalGateApi.get<PaymentReason[]>(`payment-reasons?payment_type_id=${typeId}`);
    return data;
}

export const getTypesAction = async (): Promise<PaymentType[]> => {
    const { data } = await portalGateApi.get<PaymentType[]>('payment-types');
    return data;
}

export const markAsPaidAction = async (id: number): Promise<Payment> => {
    const { data } = await portalGateApi.patch<Payment>(`payments/${id}/mark-as-paid`);
    return data;
}