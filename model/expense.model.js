const mongoose = require("mongoose");

// Define the expense schema
const expenseSchema = new mongoose.Schema({
  missionTitle: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  comment: { type: String, default: "" },
  validated: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  
    deleted:{
        type:Boolean , default : false
    },
  expenses: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
      },
      expenseType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExpenseType",
        required: true,
      },
      amount: { type: Number, required: true },
      comment: { type: String, default: "" },
    },
  ],
});

// Create the "expense" model
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
