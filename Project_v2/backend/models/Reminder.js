const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
    reminder_name: {
        type: String,
        required: false
    },
    reminder_category: {
        type: String,
        required: false
    },
    due_date: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    }
});

const ReminderModel = mongoose.model("reminder", ReminderSchema);
module.exports = ReminderModel;