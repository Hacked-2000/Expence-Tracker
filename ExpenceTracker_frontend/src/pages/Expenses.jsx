import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../utils/apiEndpoints';
import SearchFilter from '../components/SearchFilter';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getExpenses({ search, category, page, limit: 10 });
      setExpenses(data.expenses);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, category, page]);

  useEffect(() => {
    const timer = setTimeout(fetchExpenses, 300);
    return () => clearTimeout(timer);
  }, [fetchExpenses]);

  const handleAdd = () => {
    setSelected(null);
    setFormOpen(true);
  };

  const handleEdit = (expense) => {
    setSelected(expense);
    setFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selected) {
        await updateExpense(selected._id, data);
      } else {
        await createExpense(data);
      }
      setFormOpen(false);
      fetchExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteExpense(deleteTarget._id);
      setDeleteTarget(null);
      if (expenses.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchExpenses();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="expenses-page">
      <Box className="expenses-header">
        <Box>
          <Typography className="expenses-title">Expense History</Typography>
          <Typography className="expenses-subtitle">
            Manage and track all your expenses
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          className="dashboard-add-btn"
        >
          Add Expense
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <SearchFilter
        search={search}
        category={category}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        onCategoryChange={(val) => {
          setCategory(val);
          setPage(1);
        }}
      />

      {loading ? (
        <Box className="expense-loading">
          <CircularProgress />
        </Box>
      ) : (
        <ExpenseList
          expenses={expenses}
          pagination={pagination}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
          onPageChange={setPage}
        />
      )}

      <ExpenseForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        expense={selected}
      />

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Expense</DialogTitle>
        <DialogContent>
          Are you sure you want to delete &quot;{deleteTarget?.title}&quot;?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Expenses;
