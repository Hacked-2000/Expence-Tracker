import Joi from 'joi';

export const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Health',
  'Other',
];

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});

export const createExpenseSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required(),
  amount: Joi.number().positive().required(),
  category: Joi.string()
    .valid(...CATEGORIES)
    .required(),
  date: Joi.date().required(),
  description: Joi.string().trim().max(500).allow('').optional(),
});

export const updateExpenseSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).optional(),
  amount: Joi.number().positive().optional(),
  category: Joi.string()
    .valid(...CATEGORIES)
    .optional(),
  date: Joi.date().optional(),
  description: Joi.string().trim().max(500).allow('').optional(),
}).min(1);

export const expenseQuerySchema = Joi.object({
  search: Joi.string().trim().allow('').optional(),
  category: Joi.string()
    .valid(...CATEGORIES, '')
    .optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});
