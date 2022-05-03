from application import app, db, ma


# User Model
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(55), nullable=False)
    phone = db.Column(db.String(55), nullable=False)
    DOB = db.Column(db.String(55), nullable=False)
    email = db.Column(db.String(55), nullable=False)
    password = db.Column(db.String(200))

    def __init__(self, username, phone, DOB, email, password):
        self.username = username
        self.phone = phone
        self.DOB = DOB
        self.email = email
        self.password = password

class UserSchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'username', 'phone', 'DOB', 'email', 'password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Transaction Model
class Transcations(db.Model):
    trans_id = db.Column(db.Integer, primary_key=True)
    trans_name = db.Column(db.String(100))
    trans_category = db.Column(db.String(100))
    date = db.Column(db.String(100))
    amount = db.Column(db.String(100))

    def __init__(self, trans_name, trans_category, date, amount):
        self.trans_name = trans_name
        self.trans_category = trans_category
        self.date = date
        self.amount = amount

class TranscationSchema(ma.Schema):
    class Meta:
        fields = ('trans_id', 'trans_name', 'trans_category', 'date', 'amount')

transaction_schema = TranscationSchema()
transactions_schema = TranscationSchema(many=True)

# Budget Model
class Budget(db.Model):
    budget_id = db.Column(db.Integer, primary_key=True)
    budget_category = db.Column(db.String(100))
    budget_duration = db.Column(db.String(100))
    amount = db.Column(db.String(100))

    def __init__(self, budget_category, budget_duration, amount):
        self.budget_category = budget_category
        self.budget_duration = budget_duration
        self.amount = amount

class BudgetSchema(ma.Schema):
    class Meta:
        fields = ('budget_id', 'budget_category', 'budget_duration', 'amount')

budget_schema = BudgetSchema()
budgets_schema = BudgetSchema(many=True)


# Reminder Model
class Reminder(db.Model):
    reminder_id = db.Column(db.Integer, primary_key=True)
    reminder_name = db.Column(db.String(100))
    reminder_category = db.Column(db.String(100))
    due_date = db.Column(db.String(100))
    amount = db.Column(db.String(100))

    def __init__(self, reminder_name, reminder_category, due_date, amount):
        self.reminder_name = reminder_name
        self.reminder_category = reminder_category
        self.due_date = due_date
        self.amount = amount

class ReminderSchema(ma.Schema):
    class Meta:
        fields = ('reminder_id', 'reminder_name', 'reminder_category', 'due_date', 'amount')

reminder_schema = ReminderSchema()
reminders_schema = ReminderSchema(many=True)
