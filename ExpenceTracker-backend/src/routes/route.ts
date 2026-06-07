import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateBody, validateQuery } from '../middleware/validate.middleware';
import {
  registerSchema,
  loginSchema,
  createExpenseSchema,
  updateExpenseSchema,
  expenseQuerySchema,
} from '../utils/validation';
import { register, login } from '../controllers/auth.controller';
import {
  addExpense,
  listExpenses,
  getOneExpense,
  editExpense,
  removeExpense,
  dashboard,
} from '../controllers/expense.controller';

const router = Router();

router.post('/auth/register', validateBody(registerSchema), register);
router.post('/auth/login', validateBody(loginSchema), login);

router.use(authMiddleware);

router.get('/expenses/dashboard', dashboard);
router.get('/expenses', validateQuery(expenseQuerySchema), listExpenses);
router.post('/expenses', validateBody(createExpenseSchema), addExpense);
router.get('/expenses/:id', getOneExpense);
router.put('/expenses/:id', validateBody(updateExpenseSchema), editExpense);
router.delete('/expenses/:id', removeExpense);

export default router;
