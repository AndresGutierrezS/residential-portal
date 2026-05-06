import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createExpense, deleteExpense, getExpenses, updateExpense } from "../actions/expenses.actions";
import type { Expense, ExpensePayload } from "../interfaces/expense.interface";

export const useExpenses = () => {
  
    const queryClient = useQueryClient();

    const expensesQuery = useQuery({
        queryKey: ['expenses'],
        queryFn: getExpenses,
    })

    const createMutation = useMutation({
        mutationFn: createExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expenses']});
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({id, data}: {id: number, data: ExpensePayload}) => updateExpense(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expenses']});
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expenses']});
        }
    })

    // const expenseQuery = useQuery({
    //     queryKey: ['expense'],
    //     queryFn: getExpense,
    // })

    return {
        expenses: expensesQuery.data ?? [],
        
        isLoading: expensesQuery.isLoading,
        isError: expensesQuery.isError,

        createExpense: createMutation.mutate,
        updateExpense: updateMutation.mutate,
        deleteExpense: deleteMutation.mutate,
    }
}
