from flask import Flask, jsonify, request
from application import db
from application import app
from werkzeug.security import generate_password_hash,check_password_hash
from application.utils import save_file
from application.models import *

# get all transactions api
@app.route("/get_transactions", methods=['GET'])
def get_transactions():
    all_transactions = Transcations.query.all()
    results = transactions_schema.dump(all_transactions)
    return jsonify(results)

# get all budgets api
@app.route("/get_budgets", methods=['GET'])
def get_budgets():
    all_budgets = Budget.query.all()
    results = budgets_schema.dump(all_budgets)
    return jsonify(results)

# get all reminders api
@app.route("/get_reminders", methods=['GET'])
def get_reminders():
    all_reminders = Reminder.query.all()
    results = reminders_schema.dump(all_reminders)
    return jsonify(results)

# add transaction api
@app.route('/add_transaction', methods = ['POST'])
def add_transaction():
    transName = request.form.get('transName')
    transCategory = request.form.get('transCategory')
    date = request.form.get('date')
    amount = request.form.get('amount')
    new_transaction = Transcations(transName, transCategory, date, amount)
    db.session.add(new_transaction)
    db.session.commit()
    return transaction_schema.jsonify({'transaction':new_transaction})

# add budget api
@app.route('/add_budget', methods = ['POST'])
def add_budget():
    budget_category = request.form.get('budget_category')
    budget_duration = request.form.get('budget_duration')
    amount = request.form.get('amount')
    new_budget = Budget(budget_category, budget_duration, amount)
    db.session.add(new_budget)
    db.session.commit()
    return budget_schema.jsonify({'budget':new_budget})


# add reminder api
@app.route('/add_reminder', methods = ['POST'])
def add_reminder():
    reminder_name = request.form.get('reminder_name')
    reminder_category = request.form.get('reminder_category')
    due_date = request.form.get('due_date')
    amount = request.form.get('amount')
    new_reminder = Reminder(reminder_name, reminder_category, due_date, amount)
    db.session.add(new_reminder)
    db.session.commit()
    return reminder_schema.jsonify({'reminder':new_reminder})

# sign up api
@app.route("/signup", methods=['POST'])
def signup():
    name = request.form.get('name')
    phone = request.form.get('phone')
    DOB = request.form.get('DOB')
    email = request.form.get('email')
    password = request.form.get('password')
    hashed_password = generate_password_hash(password, method='sha256')
    user = User(name,phone,DOB,email, hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'registered':True})

# sign in
@app.route("/signin", methods=['POST'])
def signin():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        users = user_schema.dump(user)
        return jsonify({'loggedIn':True, 'user':users})
    else:
        return jsonify({'loggedIn':False})

    