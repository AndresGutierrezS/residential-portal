import type { Payment, PaymentResponse } from "../interfaces/payment.interface";

export const mapPayment = (p: PaymentResponse): Payment => ({
    id: p.id,
    apartmentId: p.apartment_id,
    amount: Number(p.amount),
    paymentTypeId: p.payment_type_id,
    date: new Date(p.date),
    paymentReasonId: p.payment_reason_id,
    description: p.description,
    receipt: p.receipt,
    isPaid: Boolean(p.is_paid),
    reportId: p.report_id ?? undefined,

    apartment: p.apartment,
    paymentType: p.payment_type,
    paymentReason: p.payment_reason,
    report: p.report ?? undefined,

    maintenance: p.maintenance
        ? {
              month: p.maintenance.month,
              year: p.maintenance.year,
              completed: Boolean(p.maintenance.completed),
          }
        : undefined,
});
