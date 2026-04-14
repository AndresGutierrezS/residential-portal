import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPaymentAction, deletePaymentAction, getPaymentsAction, getReasonsAction, getTypesAction, updatePaymentAction } from "../actions/payment.actions";
import type { CreatePaymentDTO } from "../interfaces/payment.interface";


export const usePayments = (typeId?: number) => {

    const queryClient = useQueryClient();

    const paymentsQuery = useQuery({
        queryKey: ['payments'],
        queryFn: getPaymentsAction,
    });

    const typesQuery = useQuery({
        queryKey: ['payment-types'],
        queryFn: getTypesAction,
    });

    const reasonsQuery = useQuery({
        queryKey: ['payment-reasons', typeId],
        queryFn: () => getReasonsAction(typeId!),
        enabled: !!typeId,
    });

    // const getPaymentById = (id: number) => {
    //     return useQuery({
    //         queryKey: ['payment', id],
    //         queryFn: () => getPaymentByIdAction(id),
    //         enabled: !!id,
    //     });
    // };

    const createMutation = useMutation({
        mutationFn: createPaymentAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['payments']});
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({id, data}: {id: number, data: CreatePaymentDTO}) => updatePaymentAction(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['payments']});
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deletePaymentAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['payments']})
        }
    })

    return {
        payments: paymentsQuery.data ?? [],
        types: typesQuery.data ?? [],
        reasons: reasonsQuery.data ?? [],

        isLoading: paymentsQuery.isLoading,
        isError: paymentsQuery.isError,

        createPayment: createMutation.mutate,
        updatePayment: updateMutation.mutate,
        deletePayment: deleteMutation.mutate,
    }
}