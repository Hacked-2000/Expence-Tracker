import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
} from '@mui/material';
import { CATEGORIES, validateExpense } from '../utils/validation';

const getInitialForm = (expense) => ({
  title: expense?.title || '',
  amount: expense?.amount || '',
  category: expense?.category || '',
  date: expense?.date
    ? new Date(expense.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0],
  description: expense?.description || '',
});

const ExpenseForm = ({ open, onClose, onSubmit, expense }) => {
  const [form, setForm] = useState(getInitialForm());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(getInitialForm(expense));
      setErrors({});
    }
  }, [open, expense]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = () => {
    const result = validateExpense(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    onSubmit({
      ...form,
      amount: Number(form.amount),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{expense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={form.title}
              onChange={handleChange('title')}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={form.amount}
              onChange={handleChange('amount')}
              error={!!errors.amount}
              helperText={errors.amount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={form.category}
              onChange={handleChange('category')}
              error={!!errors.category}
              helperText={errors.category}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={form.date}
              onChange={handleChange('date')}
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={form.description}
              onChange={handleChange('description')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {expense ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseForm;
