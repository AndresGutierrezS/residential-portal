import { portalGateApi } from "@/api/portalGateApi"
import type { Expense } from "../interfaces/expense.interface";

export const getExpenses = async (): Promise<Expense[]> => {
    const { data } = await portalGateApi.get<Expense[]>('expenses');
    return data;
}

export const createExpense = async (payload: Expense): Promise<Expense> => {
    const { data } = await portalGateApi.post<Expense>('expenses', payload);
    return data;
}

export const updateExpense = async (id: number, payload: Expense): Promise<Expense> => {
    const { data } = await portalGateApi.put<Expense>(`expenses/${id}`, payload);
    return data;
}

export const deleteExpense = async (id: number): Promise<void> => {
    await portalGateApi.delete(`expenses/${id}`);
    return;
}

export const getExpense = async (id: number): Promise<Expense> => {
    const { data } = await portalGateApi.get<Expense>(`expenses/${id}`);
    return data;
}