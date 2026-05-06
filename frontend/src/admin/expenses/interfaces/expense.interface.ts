export interface Expense {
    id:          number;
    amount:      number;
    description: string;
    date:        string;
    created_at?:  string | null;
    updated_at?:  string | null;
    category:    string;
    supplier:    string;
    metod:       string;
    state:       boolean;
}


export interface ExpensePayload {
  amount: number;
  description: string;
  date: string;
  category: string;
  supplier: string;
  metod: string;
  state: boolean;
}