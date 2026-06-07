import { Grid, TextField, MenuItem, Paper } from '@mui/material';
import { CATEGORIES } from '../utils/validation';

const SearchFilter = ({ search, category, onSearchChange, onCategoryChange }) => (
  <Paper sx={{ p: 2, mb: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          label="Search expenses"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or description"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          select
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  </Paper>
);

export default SearchFilter;
