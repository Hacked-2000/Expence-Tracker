import { Grid, Box, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { formatCurrency } from '../utils/validation';

const StatCard = ({ label, value, subtext, icon: Icon, variant }) => (
  <Grid item xs={12} sm={6} lg={4}>
    <Box className={`dashboard-stat-card dashboard-stat-${variant}`}>
      <Box className="dashboard-stat-top">
        <Box className="dashboard-stat-icon-wrap">
          <Icon />
        </Box>
        <Typography className="dashboard-stat-label">{label}</Typography>
      </Box>
      <Typography className="dashboard-stat-value">{value}</Typography>
      {subtext && (
        <Typography className="dashboard-stat-subtext">{subtext}</Typography>
      )}
    </Box>
  </Grid>
);

const DashboardStats = ({ totalExpenses, monthlyExpenses, categoryBreakdown }) => {
  const topCategory = categoryBreakdown?.[0];

  return (
    <Grid container spacing={3} className="dashboard-stats-grid">
      <StatCard
        label="Total Expenses"
        value={formatCurrency(totalExpenses)}
        subtext="All time spending"
        icon={AccountBalanceWalletIcon}
        variant="total"
      />
      <StatCard
        label="This Month"
        value={formatCurrency(monthlyExpenses)}
        subtext="Current month total"
        icon={CalendarMonthIcon}
        variant="monthly"
      />
      <StatCard
        label="Top Category"
        value={topCategory ? topCategory.category : '—'}
        subtext={
          topCategory
            ? `${formatCurrency(topCategory.total)} spent`
            : 'No expenses yet'
        }
        icon={TrendingUpIcon}
        variant="category"
      />
    </Grid>
  );
};

export default DashboardStats;
