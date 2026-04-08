const express = require('express');
const router = express.Router();
const { getExpenses, createExpense, deleteExpense, updateExpense } = require('../controllers/expenses');

router.get('/expenseList', getExpenses);
router.post('/createExpense', createExpense);
router.delete('/delete/:id', deleteExpense);
router.patch('/update/:id', updateExpense);


router.get('/monthly', async (req, res) => {
const Expense = require('../models/expense');
const { month, year } = req.query;
    try {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    const expenses = await Expense.find({
        date: { $gte: start, $lte: end }
    });
    res.json(expenses);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

module.exports = router;