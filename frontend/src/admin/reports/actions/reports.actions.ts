import { portalGateApi } from "@/api/portalGateApi";
import type { ReportApartment, ReportMaintenance, ReportPayment, ReportResident } from "../interfaces/reports.interface";


export const getPaymentsReport = async (): Promise<ReportPayment[]> => {
    const { data } = await portalGateApi.get<ReportPayment[]>('/reports/payments');

    return data;
}

export const getResidentsReport = async (): Promise<ReportResident[]> => {
    const { data } = await portalGateApi.get<ReportResident[]>('reports/residents');
    return data;
}

export const getApartmentsReport = async (): Promise<ReportApartment[]> => {
    const { data } = await portalGateApi.get<ReportApartment[]>(
        "/reports/apartments"
    );

    return data;
};

export const getMaintenanceReport = async (): Promise<ReportMaintenance[]> => {
    const { data } = await portalGateApi.get<ReportMaintenance[]>(
        "/reports/maintenance"
    );

    return data;
};