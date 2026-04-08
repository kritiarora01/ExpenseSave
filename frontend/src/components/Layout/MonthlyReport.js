import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const MONTHS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
];

function MonthlyReport() {
    const [expenses, setExpenses] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    setLoading(true);
    fetch(`/api/expenses/monthly?month=${month}&year=${year}`)
        .then(res => res.json())
        .then(data => {
        setExpenses(data);
        setLoading(false);
            })
        .catch(() => setLoading(false));
    }, [month, year]);

    const income = expenses
    .filter(e => e.type === 'Income')
    .reduce((sum, e) => sum + e.amount, 0);

    const expense = expenses
    .filter(e => e.type === 'Expense')
    .reduce((sum, e) => sum + e.amount, 0);

    const saved = income - expense;

  // Category breakdown
    const categoryData = expenses
    .filter(e => e.type === 'Expense')
    .reduce((acc, e) => {
        const found = acc.find(i => i.name === e.category);
        if (found) found.value += e.amount;
        else acc.push({ name: e.category, value: e.amount });
        return acc;
    }, []);

    const barData = [{ name: MONTHS[month - 1], Income: income, Expense: expense }];

    const cardStyle = (color) => ({
    background: color,
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });

    return (
    <div style={{ padding: '20px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>
        📊 Monthly Report
        </Typography>

      {/* Month & Year Selector */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <select
            value={month}
            onChange={e => setMonth(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', fontSize: '16px' }}
        >
            {MONTHS.map((m, i) => (
            <option key={i + 1} value={i + 1}>{m}</option>
            ))}
        </select>

        <select
            value={year}
            onChange={e => setYear(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', fontSize: '16px' }}
        >
            {[2023, 2024, 2025, 2026].map(y => (
            <option key={y} value={y}>{y}</option>
            ))}
        </select>
        </div>

        {loading ? (
        <Typography>Loading...</Typography>
        ) : (
        <>
            {/* Summary Cards */}
            <Grid container spacing={3} style={{ marginBottom: '30px' }}>
            <Grid item xs={12} sm={4}>
                <div style={cardStyle('#4CAF50')}>
                <Typography variant="h6">💚 Income</Typography>
                <Typography variant="h4">₹{income.toFixed(2)}</Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={4}>
                <div style={cardStyle('#f44336')}>
                <Typography variant="h6">❤️ Expense</Typography>
                <Typography variant="h4">₹{expense.toFixed(2)}</Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={4}>
                <div style={cardStyle(saved >= 0 ? '#2196F3' : '#FF9800')}>
                <Typography variant="h6">{saved >= 0 ? '💙 Saved' : '⚠️ Deficit'}</Typography>
                <Typography variant="h4">₹{Math.abs(saved).toFixed(2)}</Typography>
                </div>
            </Grid>
            </Grid>

          {/* Bar Chart */}
            <Typography variant="h5" style={{ marginBottom: '10px' }}>
            Income vs Expense
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(val) => `₹${val}`} />
                    <Legend />
                <Bar dataKey="Income" fill="#4CAF50" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Expense" fill="#f44336" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>

          {/* Pie Chart */}
        {categoryData.length > 0 && (
            <>
            <Typography variant="h5" style={{ margin: '30px 0 10px' }}>
                Spending by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(val) => `₹${val}`} />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </>
        )}

          {/* No data state */}
        {expenses.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '50px', opacity: 0.5 }}>
            <Typography variant="h6">No transactions found for this month</Typography>
            </div>
        )}
        </>
    )}
    </div>
);
}
export default MonthlyReport;

