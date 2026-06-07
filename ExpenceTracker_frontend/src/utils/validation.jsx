export const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Health',
  'Other',
];

export const validateRegister = ({ name, email, password }) => {
  const errors = {};
  if (!name?.trim()) errors.name = 'Name is required';
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Min 6 characters';
  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email?.trim()) errors.email = 'Email is required';
  if (!password) errors.password = 'Password is required';
  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateExpense = ({ title, amount, category, date }) => {
  const errors = {};
  if (!title?.trim()) errors.title = 'Title is required';
  if (!amount || Number(amount) <= 0) errors.amount = 'Amount must be greater than 0';
  if (!category) errors.category = 'Category is required';
  if (!date) errors.date = 'Date is required';
  return { valid: Object.keys(errors).length === 0, errors };
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
