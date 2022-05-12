const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    trans_name: {
        type: String,
        required: false
    },
    trans_category: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    }
});

const TransactionModel = mongoose.model("transactions", TransactionSchema);
module.exports = TransactionModel;