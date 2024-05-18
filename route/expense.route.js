const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expense.controller');
const expenseTypeController = require('../controller/expenseType.controller') ;


// Create expense
router.post('/', expenseController.createExpense);

// Read all expenses
router.get('/', expenseController.getAllExpenses);


// get all expenseType
router.get('/types',expenseTypeController.getTypes); 

// Read expense by ID
router.get('/:id', expenseController.getExpenseById);

// Update expense
router.put('/:id', expenseController.updateExpense);

// Delete expense
router.delete('/:id', expenseController.deleteExpense);

// Get expenses by user ID
router.get('/user/:userId', expenseController.getExpensesByUserId);

// lock expense 
router.put('/lock/:id',expenseController.lockExpense) ;


//validate expense 

router.put('/validate/:id' , expenseController.validateExpense) ; 





module.exports = router;
