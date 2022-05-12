const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    budget_category: {
        type: String,
        required: false
    },
    budget_duration: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    }
});

const BudgetModel = mongoose.model("budget", BudgetSchema);
module.exports = BudgetModel;