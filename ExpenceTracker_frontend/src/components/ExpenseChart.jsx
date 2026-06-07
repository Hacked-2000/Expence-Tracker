import { Box, Typography } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { chartColors } from '../theme/theme';

const COLORS = chartColors;

const ExpenseChart = ({ data }) => {
  return (
    <Box className="dashboard-panel dashboard-chart-panel">
      <Box className="dashboard-panel-header">
        <Box>
          <Typography className="dashboard-panel-title">Category Breakdown</Typography>
          <Typography className="dashboard-panel-subtitle">
            Where your money goes
          </Typography>
        </Box>
        <PieChartIcon className="dashboard-panel-icon" />
      </Box>

      {!data?.length ? (
        <Box className="dashboard-empty dashboard-empty-chart">
          <PieChartIcon className="dashboard-empty-icon" />
          <Typography>No category data yet</Typography>
        </Box>
      ) : (
        <>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Box className="dashboard-chart-legend">
            {data.map((item, index) => (
              <Box key={item.category} className="dashboard-legend-item">
                <span
                  className="dashboard-legend-dot"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="dashboard-legend-label">{item.category}</span>
                <span className="dashboard-legend-value">₹{item.total}</span>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ExpenseChart;
