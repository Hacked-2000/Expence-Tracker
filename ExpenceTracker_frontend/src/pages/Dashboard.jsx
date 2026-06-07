import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getDashboard, getUser } from '../utils/apiEndpoints';
import DashboardStats from '../components/DashboardStats';
import RecentTransactions from '../components/RecentTransactions';
import ExpenseChart from '../components/ExpenseChart';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box className="dashboard-loading">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <Box className="dashboard-page">
      <Box className="dashboard-header">
        <Box>
          <Typography className="dashboard-greeting">
            Welcome back, {firstName}
          </Typography>
          <Typography className="dashboard-subheading">
            Here&apos;s an overview of your spending
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to="/expenses"
          variant="contained"
          startIcon={<AddIcon />}
          className="dashboard-add-btn"
        >
          Add Expense
        </Button>
      </Box>

      <DashboardStats
        totalExpenses={stats.totalExpenses}
        monthlyExpenses={stats.monthlyExpenses}
        categoryBreakdown={stats.categoryBreakdown}
      />

      <Grid container spacing={3} className="dashboard-content-grid">
        <Grid item xs={12} lg={7}>
          <ExpenseChart data={stats.categoryBreakdown} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <RecentTransactions transactions={stats.recentTransactions} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
