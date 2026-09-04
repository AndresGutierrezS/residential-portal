import { useQuery } from "@tanstack/react-query";

import {
    getApartmentsReport,
    getMaintenanceReport,
    getPaymentsReport,
    getResidentsReport,
} from "../actions/reports.actions";

type ReportType =
    | "payments"
    | "residents"
    | "units"
    | "maintenance";

export const useReports = (reportType: ReportType) => {

    const reportQuery = useQuery({
        queryKey: ["reports", reportType],
        queryFn: async () => {
            switch (reportType) {

                case "payments":
                    return getPaymentsReport();

                case "residents":
                    return getResidentsReport();

                case "units":
                    return getApartmentsReport();

                case "maintenance":
                    return getMaintenanceReport();

                default:
                    return [];
            }
        },
    });

    return {
        data: reportQuery.data ?? [],
        isLoading: reportQuery.isLoading,
        isError: reportQuery.isError,
    };
};