const Expense = require("../model/expense.model");

// Create expense
async function createExpense(req, res) {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Read all expenses with populated client, user, and expenseType fields
const getAllExpenses = async (req, res) => {
  try {

    let expenses = await Expense.find({deleted:false})
      .populate({ path:"user", model:"User" })
      .populate({ path:"expenses.customer", model:"Client" })
      .populate({ path: "expenses.expenseType", model:"ExpenseType"})
      .exec();

    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read expense by ID with populated client, user, and expenseType fields
const getExpenseById =async(req, res)=> {
  try {
    const expense = await Expense.findById(req.params.id).populate(
      "client user expenses.customer expenses.expenseType"
    );
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update expense
const updateExpense = async(req, res) =>{
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete expense
const  deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    let id = req.params.id ; 
expense.deleted= true ; 
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }else{
      let deletedExpense = await Expense.findByIdAndUpdate({_id:id},expense); 
      res.json({ message: "Expense deleted successfully" });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get expenses by user ID with populated client, user, and expenseType fields
const getExpensesByUserId = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.params.userId })
      .populate({ path:"user", model:"User" })
      .populate({ path:"expenses.customer", model:"Client" })
      .populate({ path: "expenses.expenseType", model:"ExpenseType"})
      .exec();

    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// lock expense
const lockExpense = async(req, res) =>{

try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
   if(expense.locked == false){
      expense.locked = true;
    }else{
      expense.locked = false;
    }


    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// validate expense
const validateExpense = async(req, res) =>{
 try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if(expense.validated == false){
      expense.validated = true;
    }else{
      expense.validated = false;
    }
    
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}






module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  lockExpense,
  validateExpense,
  deleteExpense,
  getExpensesByUserId,
};
