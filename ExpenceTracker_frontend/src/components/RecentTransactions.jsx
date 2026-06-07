import { Box, Typography, Button } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatCurrency, formatDate } from '../utils/validation';

const RecentTransactions = ({ transactions }) => {
  return (
    <Box className="dashboard-panel">
      <Box className="dashboard-panel-header">
        <Box>
          <Typography className="dashboard-panel-title">Recent Transactions</Typography>
          <Typography className="dashboard-panel-subtitle">
            Your latest spending activity
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to="/expenses"
          size="small"
          endIcon={<ArrowForwardIcon />}
          className="dashboard-panel-link"
        >
          View all
        </Button>
      </Box>

      {!transactions?.length ? (
        <Box className="dashboard-empty">
          <ReceiptLongIcon className="dashboard-empty-icon" />
          <Typography>No transactions yet</Typography>
          <Typography variant="body2" color="text.secondary">
            Add your first expense to see it here
          </Typography>
        </Box>
      ) : (
        <Box className="dashboard-transaction-list">
          {transactions.map((item) => (
            <Box key={item._id} className="dashboard-transaction-item">
              <Box className="dashboard-transaction-info">
                <Typography className="dashboard-transaction-title">
                  {item.title}
                </Typography>
                <Typography className="dashboard-transaction-meta">
                  {item.category} · {formatDate(item.date)}
                </Typography>
              </Box>
              <Typography className="dashboard-transaction-amount">
                {formatCurrency(item.amount)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecentTransactions;
