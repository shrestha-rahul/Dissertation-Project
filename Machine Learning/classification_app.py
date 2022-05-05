#Libraries
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plts
from datetime import date
import pandas_datareader as data
from pandas_datareader import *
import math
from PIL import Image
import yfinance as yf
import pickle

#Scaler
from sklearn.metrics import classification_report
from sklearn.model_selection import RandomizedSearchCV
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler 
from sklearn.metrics import mean_squared_error
from numpy import sqrt 


#Model import
from sklearn.model_selection import train_test_split
from keras.models import load_model
from sklearn.tree import DecisionTreeRegressor
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LinearRegression
from statsmodels.tsa.arima.model import ARIMA
from pmdarima.arima import auto_arima
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.arima_model import ARIMAResults
from sklearn import tree 

#Model Result Analysis
from sklearn.metrics import accuracy_score, confusion_matrix, roc_auc_score, ConfusionMatrixDisplay, precision_score, recall_score, f1_score, classification_report, roc_curve, plot_roc_curve, auc, precision_recall_curve, plot_precision_recall_curve, average_precision_score
from sklearn.model_selection import cross_val_score

#Streamlit
import streamlit as st
from plotly import graph_objs as plt


#Default-Setting Dates for scarping Dataset
START = '2012-01-01'
END = date.today().strftime("%Y-%m-%d")


#Streamlit 
st.title('Stock Trading Classifier')
st.header('Please Enter A Stock Ticker')
stock_user_input = st.text_input(' ', 'HSBC')

#Data Select
if st.checkbox("Want to Enter A Custom Start Date for Dataset?"):
  #Start Date
  st.header('Please Enter A START Date (YYYY-MM-DD):')
  start_date_user_input = st.text_input(' ')
  START = start_date_user_input
  
  
#Scraping Dataset from Yahoo Finance
stock_dataset = data.DataReader(stock_user_input, 'yahoo', START, END)


#Adding Technical Indicators to the dataset
#Stochastic Oscillator
stock_dataset['14-high'] = stock_dataset['High'].rolling(14).max()
stock_dataset['14-low'] = stock_dataset['Low'].rolling(14).min()
stock_dataset['%K'] = (stock_dataset['Close'] - stock_dataset['14-low'])*100/(stock_dataset['14-high'] - stock_dataset['14-low'])
stock_dataset['%D'] = stock_dataset['%K'].rolling(3).mean()

stock_dataset.drop(['14-high', '14-low'], axis = 1, inplace=True)

# Adding Buy/Sell Signals from Sotchastic Oscillator Indicator
def categorise_so(row):  
    if row['%K'] <= 20 and row['%D'] <= 20:
        return 'Buy'
    elif row['%K'] >= 80 and  row['%D']>= 80:
        return 'Sell'
    else:
        return 'Hold'
   
stock_dataset['SO Indicator'] = stock_dataset.apply(lambda row: categorise_so(row), axis=1)

#RSI
delta = stock_dataset['Close'].diff()
up = delta.clip(lower=0)
down = -1*delta.clip(upper=0)
ema_up = up.ewm(com=13, adjust=False).mean()
ema_down = down.ewm(com=13, adjust=False).mean()
rs = ema_up/ema_down
stock_dataset['RSI'] = 100 - (100/(1 + rs))

# Adding Buy/Sell Signals from RSI Indicator
def categorise_rsi(row):  
    if row['RSI'] <= 30:
        return 'Buy'
    elif row['RSI'] >= 70:
        return 'Sell'
    else:
        return 'Hold'
  
stock_dataset['RSI Indicator'] = stock_dataset.apply(lambda row: categorise_rsi(row), axis=1)

#Bollinger Bands
def get_sma(prices, rate):
    return prices.rolling(rate).mean()

def get_bollinger_bands(prices, rate=20):
    # SMA for 20 Days (Middle Band)
    sma = get_sma(prices, rate)
    std = prices.rolling(rate).std()

    # Calculating Upper Band
    bollinger_upper = sma + (std * 2 )

    # Calculate Lower Band
    bollinger_lower = sma - (std * 2 )

    #Middle Band
    bollinger_middle = sma
    return bollinger_upper, bollinger_lower, bollinger_middle


closing_prices = stock_dataset['Close']
bollinger_upper, bollinger_lower, bollinger_middle = get_bollinger_bands(closing_prices)

#Adding Bollinger Bands to the Dataset
stock_dataset['Bollinger_Upper'] = bollinger_upper
stock_dataset['Bollinger_Lower'] = bollinger_lower

# Adding Buy/Sell Signals from Bollinger Bands Indicator
def categorise_bollinger(row):  
    if row['Close'] < row['Bollinger_Lower']:
        return 'Buy'
    elif row['Close'] > row['Bollinger_Upper']:
        return 'Sell'
    else:
        return 'Hold'
    
   
stock_dataset['Bollinger Indicator'] = stock_dataset.apply(lambda row: categorise_bollinger(row), axis=1)


#MACD Inidicator
# Calculating the MACD Line and the Signal Line
ema12 = stock_dataset['Close'].ewm(span=12, adjust=False).mean()
ema26 = stock_dataset['Close'].ewm(span=26, adjust=False).mean()
macd = ema12 - ema26
signal = macd.ewm(span=9, adjust=False).mean()


#Appeding the MACD and Signal Data to Dataset
stock_dataset['MACD'] = macd
stock_dataset['Signal'] = signal

#Adding Target Variable
# Recommender Based on the three indicators
def recommender(row): 
    # If All Share the Same Signal OutPut That Signal (Buy)
    if row['RSI Indicator'] == "Buy" and row['SO Indicator'] == 'Buy' and  row['Bollinger Indicator'] == 'Buy':
        return 'Buy'
     # If Any 2 Indicators Share the Same Signal Output That Signal (buy)
    elif row['RSI Indicator'] == 'Buy' and row['SO Indicator'] == 'Buy':
        return 'Buy'
    elif row['RSI Indicator'] == 'Buy' and row['Bollinger Indicator'] == 'Buy':
        return 'Buy'
    elif row['SO Indicator'] == 'Buy' and row['Bollinger Indicator'] == 'Buy':
        return 'Buy'   
    # If All Share the Same Signal Output That Signal (Sell)
    elif row['RSI Indicator'] == 'Sell' and row['SO Indicator'] == 'Sell' and  row['Bollinger Indicator'] == 'Sell':
        return 'Sell'
    # If Any 2 Indicators Share the Same Signal Output That Signal (Sell)
    elif row['RSI Indicator'] == 'Sell' and row['SO Indicator'] == 'Sell':
        return 'Sell'
    elif row['RSI Indicator'] == 'Sell' and row['Bollinger Indicator'] == 'Sell':
        return 'Sell'
    elif row['SO Indicator'] == 'Sell' and row['Bollinger Indicator'] == 'Sell':
        return 'Sell'    
    # If All Share the Same Signal OutPut That Signal (Hold)
    elif row['RSI Indicator'] == 'Hold' and row['SO Indicator'] == 'Hold' and  row['Bollinger Indicator'] == 'Hold':
        return 'Hold'
    # If Any 2 Indicators Share the Same Signal Output That Signal (Hold)
    elif row['RSI Indicator'] == 'Hold' and row['SO Indicator'] == 'Hold':
        return 'Hold'
    elif row['RSI Indicator'] == 'Hold' and row['Bollinger Indicator'] == 'Hold':
        return 'Hold'
    elif row['SO Indicator'] == 'Hold' and row['Bollinger Indicator'] == 'Hold':
        return 'Hold'      
    else:
        return 'Unclassed'

stock_dataset['Recommender'] = stock_dataset.apply(lambda row: recommender(row), axis=1)


#Dropping Other Trading Signals from Indicators
stock_dataset.drop(['RSI Indicator', 'SO Indicator', 'Bollinger Indicator', 'Adj Close'], axis = 1, inplace=True)



#Encoding Categorical Variables
signal_dict = {'Hold': 0, 'Sell': 1, 'Buy': 2}
stock_dataset['Recommender'] = stock_dataset['Recommender'].map(signal_dict)

#Dropping Null Values
stock_dataset = stock_dataset.dropna()

# converting 'Weight' from float to int
stock_dataset['Recommender'] = stock_dataset['Recommender'].astype(int)



#Independant and Dependent Variable
y=stock_dataset.iloc[:,12:13] #Dependent variable
X=stock_dataset.iloc[:,0:12] #Independent variable

#Spliting the data into train and test
X_train, X_test, y_train, y_test = train_test_split( X, y, test_size=0.3, random_state=42)

#Scaling
scaler = MinMaxScaler(feature_range=(0,1))
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)




#Dataset Info
if st.checkbox("Show Stock Dataset Information...."):


  st.text('Tail of Stock Dataset from Yahoo Finance')
  st.write(stock_dataset.tail())
  st.text('Head of Stock Dataset from Yahoo Finance')
  st.write(stock_dataset.head())
  st.subheader('Stock Dataset Information')
  st.text('Shape of Dataset:')
  st.write(stock_dataset.shape)
  st.text('Statistical Information of Datasset:')
  st.write(stock_dataset.describe())

#Exploratory Data Analysis
if st.checkbox("Show Stock Data Analysis"):

  #Reshaping DataFrame so Date is a proper column
  stock_dataset = stock_dataset.reset_index()

  #Opening and Closing Price of Stock
  st.subheader('Open and Close Price Graph')
  fig1 = plt.Figure()
  fig1.layout.update(title_text="Stock Open and Close Price Data", xaxis_rangeslider_visible=True)
  fig1.update_layout(autosize=False,width=1000,height=800,)
  fig1.add_trace(plt.Scatter(x=stock_dataset['Date'], y=stock_dataset['Open'], name='Stock_Open'))
  fig1.add_trace(plt.Scatter(x=stock_dataset['Date'], y=stock_dataset['Close'], name='Stock_Close'))   
  st.plotly_chart(fig1)


  #Moving Average of 50 Days, 100 Days and 200 days
  moving_average_50 = stock_dataset.Close.rolling(50).mean()
  moving_average_100 = stock_dataset.Close.rolling(100).mean()
  moving_average_200 = stock_dataset.Close.rolling(200).mean()


  #Graphs
  #50 Day, 100 Days and 200 Days Moving Average Vs Closing Price of Stock
  st.subheader('50 Days, 100 Days and 200 Days Moving Average Vs Closing Price of Stock')
  fig2 = plt.Figure()
  fig2.layout.update(title_text="50/100/200 MA vs Close Price", xaxis_rangeslider_visible=True)
  fig2.update_layout(autosize=False,width=1000,height=800,)
  fig2.add_trace(plt.Scatter(x=stock_dataset['Date'], y=moving_average_50, name='50 Days'))
  fig2.add_trace(plt.Scatter(x=stock_dataset['Date'], y=moving_average_100, name='100 Days'))
  fig2.add_trace(plt.Line(x=stock_dataset['Date'], y=moving_average_200, name='200 Days'))
  fig2.add_trace(plt.Scatter(x=stock_dataset['Date'], y=stock_dataset['Close'], name='Close Price'))   
  st.plotly_chart(fig2)

  #Returns Graph
  stock_dataset['Daily Return'] = stock_dataset['Adj Close'].pct_change()
  st.subheader('Returns of the Stock')
  returns = plt.Figure()
  returns.layout.update(title_text="Returns of Stock", xaxis_rangeslider_visible=True)
  returns.update_layout(autosize=False,width=1000,height=800,)
  returns.add_trace(plt.Scatter(x=stock_dataset['Date'], y=stock_dataset['Daily Return'], name='50 Days'))
  st.plotly_chart(returns)

#Technical Analysis
if st.checkbox("Show Technical Analysis"):
  
  #Plotting Graph
  fig3 = plts.figure(figsize=(20,10))
  plts.title(' Stochastic Oscillator Indicator')
  plts.plot(stock_dataset['%K'], label='%K', c='black')
  plts.plot(stock_dataset['%D'], label='%D',  c='yellow')
  plts.axhline(20, linestyle='--', color="r")
  plts.axhline(80, linestyle="--", color="r")
  plts.legend()
  st.pyplot(fig3)

  #Plotting RSI Graph
  fig4 = plts.figure(figsize=(20,10))
  plts.title(' RSI Indicator')
  plts.xlabel('Months')
  plts.plot(stock_dataset['RSI'], label='RSI')
  plts.axhline(30, linestyle='--', color="r")
  plts.axhline(70, linestyle="--", color="r")
  plts.legend()
  st.pyplot(fig4)

  #Plotting the  Bollinger Bands
  fig5 = plts.figure(figsize=(20,10))
  plts.title(' Bollinger Bands Indicator')
  plts.xlabel('Months')
  plts.ylabel('Closing Prices')
  plts.plot(closing_prices, label='Price')
  plts.plot(bollinger_upper, label='Upper Band', c='g')
  plts.plot(bollinger_lower, label='Lower Band', c='r')
  plts.plot(bollinger_middle, label='Middle Band', c='y')
  plts.legend()
  st.pyplot(fig5)

  #Plotting the MACD
  fig6 = plts.figure(figsize=(20,10))
  plts.title(' MACD Indicator')
  plts.xlabel('Months')
  plts.plot(stock_dataset['MACD'],  label='MACD', color='g')
  plts.plot(stock_dataset['Signal'], label='Signal', color='r')
  plts.legend()
  st.pyplot(fig6)


#Modelling
if st.checkbox("Model Performance"):
  #Model
  #Loading Model
  rf_tuned_model = 'rf_tuned_model.sav'
  loaded_model = pickle.load(open(rf_tuned_model, 'rb'))

  #Making Prediction with Model
  y_pred = loaded_model.predict(X_test)

  #Evaluate
  accuracy = accuracy_score(y_pred , y_test)
  st.write("Accuracy Score :", accuracy)

  #Precision
  test_precision = precision_score(y_test, y_pred,  average='macro')
  st.write("Precision Score :", test_precision) 
  #Recall
  test_recall = recall_score(y_test, y_pred,  average='macro')
  st.write("Recall Score : ", test_recall)
  #F1 Score
  test_f1 = f1_score(y_test, y_pred,average='macro')
  st.write("F1 Score: ", test_f1)










  

# #Model Choice Options
# models_list = ['NONE','LSTM', 'Linear Regression', 'Decision Tree', 'ARIMA']
# models = pd.DataFrame(models_list)
# st.subheader("Model Selection")
# model_choice = st.selectbox('Please choose a model from the list: ',models_list)

# if model_choice == 'NONE':
#   st.write("NO Models Selected!")
# elif model_choice == 'LSTM':
#   lstm_model()
# elif model_choice == 'Linear Regression':
#   lr_model()
# elif model_choice == 'Decision Tree':
#   tree_model()
# elif model_choice == 'ARIMA':
#   arima_model()


