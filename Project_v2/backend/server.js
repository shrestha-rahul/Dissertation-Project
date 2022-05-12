const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv").config();
// import models schema
const Users = require("./models/Users");
const Transactions = require("./models/Transactions");
const Budget = require("./models/Budget");
const Reminder = require("./models/Reminder");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// connecting mongodb database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("database connected successfully");
})
.catch((error) => {
    console.log("database connection failed: "+error);
});

function get_sum(data_row){
    return data_row.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0);
}

// get all transactions api
app.get("/get_transactions", (req, res) => {
    Transactions.find({}, (error, data) => {
        if(error){
            res.json(error);
        }else{
            res.json(data);
        }
    });
});

// get all budgets api
app.get("/get_budgets", (req, res) => {
    Budget.find({}, (error, data) => {
        if(error){
            res.json(error);
        }else{
            res.json(data);
        }
    });
});

// get all reminders api
app.get("/get_reminders", (req, res) => {
    Reminder.find({}, (error, data) => {
        if(error){
            res.json(error);
        }else{
            res.json(data);
        }
    });
});

// add transaction api
app.post("/add_transaction", (req, res) => {
    const values = req.body;
    const newTransaction = new Transactions(values);
    newTransaction.save().then((doc) => res.json({"transaction": doc}).status(201));
});

// add budget api
app.post("/add_budget", (req, res) => {
    const values = req.body;
    const newBudget = new Budget(values);
    newBudget.save().then((doc) => res.json({"budget": doc}).status(201));
});

// add reminder api
app.post("/add_reminder", (req, res) => {
    const values = req.body;
    const newReminder = new Reminder(values);
    newReminder.save().then((doc) => res.json({"reminder": doc}).status(201));
});

// sign up api
app.post("/signup", (req, res) => {
    const {username, phone, DOB, email, password} = req.body;
    Users.findOne({email: email})
    .then(userDoc => {
        if(userDoc){
            return res.json({"registered": false}).status(400);
        }
        return bcrypt.hash(password, 12);
    })
    .then(hashed_password => {
        const newUser = new Users({
            username: username,
            phone: phone,
            DOB: DOB,
            email: email,
            password: hashed_password
        });
        return newUser.save();
    });
    res.json({"registered": true}).status(201);
});

// sign in
app.post("/signin", (req, res) => {
    const {email, password} = req.body;
    Users.findOne({email: email}).then(user => {
        if(!user){
            return res.json({"loggedIn": false, "error": "user doesn't exist!"}).status(401);
        }else{
            bcrypt
            .compare(password, user.password)
            .then(is_valid => {
                if(is_valid){
                    return res.json({"loggedIn": true, "user": user}).status(200);
                }else{
                    return res.json({"error": "invalid password!"}).status(400);
                }
            });
        }
    });
});


// remove recent items
app.post("/remove_recent_budget", (req, res) => {
    Budget.findOneAndDelete({},{"sort": { "_id": -1 }}).then(done => {
        res.json({"message": "recent budget removed"});
    });    
});
app.post("/remove_recent_transaction", (req, res) => {
    Transactions.findOneAndDelete({},{"sort": { "_id": -1 }}).then(done => {
        res.json({"message": "recent transaction removed"});
    });    
});
app.post("/remove_recent_reminder", (req, res) => {
    Reminder.findOneAndDelete({},{"sort": { "_id": -1 }}).then(done => {
        res.json({"message": "recent reminder removed"});
    });    
});

// counted total income & expense
app.get("/total_income", (req, res) => {
Transactions.distinct( 'amount', { 'trans_category': { '$eq': 'Income' } } ).then((data) => {
    let trans_total = get_sum(data);
    Budget.distinct( 'amount', { 'budget_category': { '$eq': 'Income' } } ).then((data) => {
        let bud_total = get_sum(data);
        Reminder.distinct( 'amount', { 'reminder_category': { '$eq': 'Income' } } ).then((data) => {
            let rem_total = get_sum(data);
            res.json(trans_total+bud_total+rem_total);
        });
    });
});
});
app.get("/total_expense", (req, res) => {
Transactions.distinct( 'amount', { 'trans_category': { '$ne': 'Income' } } ).then((data) => {
    let trans_total = get_sum(data);
    Budget.distinct( 'amount', { 'budget_category': { '$ne': 'Income' } } ).then((data) => {
        let bud_total = get_sum(data);
        Reminder.distinct( 'amount', { 'reminder_category': { '$ne': 'Income' } } ).then((data) => {
            let rem_total = get_sum(data);
            res.json(trans_total+bud_total+rem_total);
        });
    });
});
});


app.listen(PORT, () => {
    console.log("server is listening at port:"+PORT);
});