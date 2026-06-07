import mongoose, { Schema, Types } from 'mongoose';
import {
  IExpense,
  ExpenseQuery,
  DashboardStats,
  PaginatedExpenses,
} from '../interface/expense.interface';

const expenseSchema = new Schema<IExpense>(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, trim: true, default: '' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export const createExpense = (data: Omit<IExpense, '_id'>) =>
  Expense.create(data);

export const getExpenses = async (query: ExpenseQuery): Promise<PaginatedExpenses> => {
  const filter: Record<string, unknown> = {
    userId: new Types.ObjectId(query.userId),
  };

  if (query.category) {
    filter.category = query.category;
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const [expenses, total] = await Promise.all([
    Expense.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
    Expense.countDocuments(filter),
  ]);

  return {
    expenses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getExpenseById = (id: string, userId: string) =>
  Expense.findOne({ _id: id, userId });

export const updateExpense = (
  id: string,
  userId: string,
  data: Partial<IExpense>
) =>
  Expense.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
    runValidators: true,
  });

export const deleteExpense = (id: string, userId: string) =>
  Expense.findOneAndDelete({ _id: id, userId });

export const getDashboardStats = async (
  userId: string
): Promise<DashboardStats> => {
  const uid = new Types.ObjectId(userId);
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalResult, monthlyResult, recentTransactions, categoryBreakdown] =
    await Promise.all([
      Expense.aggregate([
        { $match: { userId: uid } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Expense.aggregate([
        { $match: { userId: uid, date: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Expense.find({ userId: uid }).sort({ date: -1 }).limit(5),
      Expense.aggregate([
        { $match: { userId: uid } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } },
        { $project: { category: '$_id', total: 1, _id: 0 } },
        { $sort: { total: -1 } },
      ]),
    ]);

  return {
    totalExpenses: totalResult[0]?.total || 0,
    monthlyExpenses: monthlyResult[0]?.total || 0,
    recentTransactions,
    categoryBreakdown,
  };
};
