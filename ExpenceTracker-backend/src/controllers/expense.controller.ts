import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getDashboardStats,
} from '../model/expense.model';

export const addExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await createExpense({ ...req.body, userId: req.userId! });
    res.status(201).json(expense);
  } catch {
    res.status(500).json({ message: 'Failed to add expense' });
  }
};

export const listExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const result = await getExpenses({
      userId: req.userId!,
      search: req.query.search as string,
      category: req.query.category as string,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

export const getOneExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await getExpenseById(req.params.id as string, req.userId!);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch {
    res.status(500).json({ message: 'Failed to fetch expense' });
  }
};

export const editExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await updateExpense(
      req.params.id as string,
      req.userId!,
      req.body
    );
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch {
    res.status(500).json({ message: 'Failed to update expense' });
  }
};

export const removeExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await deleteExpense(req.params.id as string, req.userId!);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
};

export const dashboard = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await getDashboardStats(req.userId!);
    res.json(stats);
  } catch {
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
};
