import { Types } from 'mongoose';

export interface IExpense {
  _id?: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  userId: Types.ObjectId;
}

export interface ExpenseQuery {
  search?: string;
  category?: string;
  userId: string;
  page?: number;
  limit?: number;
}

export interface PaginatedExpenses {
  expenses: IExpense[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  totalExpenses: number;
  monthlyExpenses: number;
  recentTransactions: IExpense[];
  categoryBreakdown: { category: string; total: number }[];
}
