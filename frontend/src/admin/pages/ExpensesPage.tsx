import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import { ExpensesStats } from "../expenses/components/ExpensesStats";
import { ExpensesSearch } from "../expenses/components/ExpensesSearch";
import { ExpensesTable } from "../expenses/components/ExpensesTable";
import { useExpenses } from "../expenses/hooks/useExpenses";
import type { Expense } from "../expenses/interfaces/expense.interface";
import { ExpensesFormDialog, type ExpenseFormValues } from "../expenses/components/ExpensesFormDialog";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";


export const ExpensesPage = () => {

  const { expenses, createExpense, deleteExpense, updateExpense, isLoading } = useExpenses();

  const [searchTerm, setSearchTerm] = useState("");

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const paidExpenses = expenses.filter((e) => e.state === true).reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenses.filter((e) => e.state === false).reduce((sum, exp) => sum + exp.amount, 0);


  const handleDelete = async () => {
    if (!selectedExpense) return;

    await deleteExpense(selectedExpense.id);

    setIsDeleteDialogOpen(false);
    setSelectedExpense(null);

    toast.success("Gasto eliminado exitosamente");
  };

  const openCreateDialog = () => {
    setDialogMode('create');
    setSelectedExpense(null);
    setIsFormDialogOpen(true);
  }

  const openEditDialog = (expense: Expense) => {
    setDialogMode('edit');
    setSelectedExpense(expense);
    setIsFormDialogOpen(true);
  };

  const openDeleteDialog = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (data: ExpenseFormValues) => {
    const payload = {
      amount: data.amount,
      description: data.description,
      date: data.date,
      category: data.category,
      supplier: data.supplier,
      metod: data.metod,
      state: data.state,
    };

  if (dialogMode === "create") {
    await createExpense(payload);
    toast.success("Gasto registrado exitosamente");
  } else if (selectedExpense) {
    await updateExpense({
      id: selectedExpense.id, 
      data: payload
    });
    toast.success("Gasto actualizado exitosamente");
  }

  setIsFormDialogOpen(false);
  setSelectedExpense(null);
  };

  return (
    <div className="space-y-6">

      <PageHeader 
        title="Gastos"
        description="Control de gastos del condominio"
        action=
        {
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Gasto
          </Button>
        }
      />


      {/* Stats */}
      <ExpensesStats 
        paidExpenses={paidExpenses}
        pendingExpenses={pendingExpenses}
        totalExpenses={totalExpenses}
        paidCount={expenses.filter((e) => e.state === true).length}
        pendingCount={expenses.filter((e) => e.state === false).length}
      />

      {/* Search */}
      <ExpensesSearch 
        value={searchTerm}
        onChange={setSearchTerm}
      />

      
      {isLoading && (
        <LoadingSpinner show/> 
      )}

      {/* Table */}
      <ExpensesTable 
        expenses={expenses}
        onDelete={openDeleteDialog}
        onEdit={openEditDialog}
      />

      <ExpensesFormDialog 
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        mode={dialogMode}
        expense={selectedExpense}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El gasto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
