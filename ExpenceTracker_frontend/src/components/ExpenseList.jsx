import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Box,
  Pagination,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { formatCurrency, formatDate } from '../utils/validation';

const categoryStyles = {
  Food: { bg: 'rgba(245, 158, 11, 0.12)', color: '#d97706' },
  Transport: { bg: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' },
  Entertainment: { bg: 'rgba(236, 72, 153, 0.12)', color: '#ec4899' },
  Bills: { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' },
  Shopping: { bg: 'rgba(16, 185, 129, 0.12)', color: '#10b981' },
  Health: { bg: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4' },
  Other: { bg: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6' },
};

const ExpenseList = ({
  expenses,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const openMenu = (event, item) => {
    setMenuAnchor(event.currentTarget);
    setActiveItem(item);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setActiveItem(null);
  };

  const handleEdit = () => {
    onEdit(activeItem);
    closeMenu();
  };

  const handleDelete = () => {
    onDelete(activeItem);
    closeMenu();
  };

  if (!expenses.length) {
    return (
      <Paper className="expense-table-card empty-state">
        <ReceiptLongOutlinedIcon className="expense-empty-icon" />
        <Typography fontWeight={600}>No expenses found</Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search or add a new expense
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="expense-table-card">
      <TableContainer className="expense-table-wrap">
        <Table>
          <TableHead>
            <TableRow className="expense-table-head-row">
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell className="hide-mobile">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center" width={60} />
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((item) => {
              const style = categoryStyles[item.category] || categoryStyles.Other;
              return (
                <TableRow key={item._id} className="expense-table-row">
                  <TableCell>
                    <Typography className="expense-title">{item.title}</Typography>
                    {item.description && (
                      <Typography className="expense-desc">{item.description}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.category}
                      size="small"
                      className="expense-category-chip"
                      sx={{
                        backgroundColor: style.bg,
                        color: style.color,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell className="hide-mobile expense-date">
                    {formatDate(item.date)}
                  </TableCell>
                  <TableCell align="right" className="expense-amount">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      className="expense-menu-btn"
                      onClick={(e) => openMenu(e, item)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { className: 'expense-action-menu' } }}
      >
        <MenuItem onClick={handleEdit} className="expense-menu-item">
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} className="expense-menu-item delete">
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {pagination.total > 0 && (
        <Box className="expense-pagination">
          <Typography variant="body2" color="text.secondary">
            Showing {(pagination.page - 1) * pagination.limit + 1}–
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total}
          </Typography>
          {pagination.totalPages > 1 && (
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={(_, p) => onPageChange(p)}
              shape="rounded"
              color="primary"
              size="medium"
            />
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ExpenseList;
