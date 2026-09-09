import { useQuery } from "@tanstack/react-query";
import { getMyPaymentsAction } from "../actions/payment.actions";

export const useMyPayments = () => {
    const paymentsQuery = useQuery({
        queryKey: ["my-payments"],
        queryFn: getMyPaymentsAction,
    });

    return {
        payments: paymentsQuery.data ?? [],
        isLoading: paymentsQuery.isLoading,
        isError: paymentsQuery.isError,
    };
};