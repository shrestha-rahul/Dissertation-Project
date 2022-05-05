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
from sklearn.metrics import mean_squared_error,r2_score, mean_absolute_error,mean_squared_log_error

#Streamlit
import streamlit as st
from plotly import graph_objs as plt


#Default-Setting Dates for scarping Dataset
START = '2012-01-01'
END = date.today().strftime("%Y-%m-%d")


#Streamlit 
st.title('Machine Learning: Stock Rregresor & Classifier')
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
  stock_dataset['Daily Return'] = stock_dataset['Close'].pct_change()
  st.subheader('Returns of the Stock')
  returns = plt.Figure()
  returns.layout.update(title_text="Returns of Stock", xaxis_rangeslider_visible=True)
  returns.update_layout(autosize=False,width=1000,height=800,)
  returns.add_trace(plt.Scatter(x=stock_dataset['Date'], y=stock_dataset['Daily Return'], name='50 Days'))
  st.plotly_chart(returns)

#Technical Analysis
if st.checkbox("Show Technical Analysis"):

  
  #Plotting Graph
  fig3 = plts.figure(figsize=(20,12))
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
  plts.plot(stock_dataset['RSI'], label='RSI')
  plts.axhline(30, linestyle='--', color="r")
  plts.axhline(70, linestyle="--", color="r")
  plts.legend()
  st.pyplot(fig4)

  #Plotting the  Bollinger Bands
  fig5 = plts.figure(figsize=(20,10))
  plts.title(' Bollinger Bands Indicator')
  plts.xlabel('Years')
  plts.ylabel('Price')
  plts.plot(closing_prices, label='Price')
  plts.plot(bollinger_upper, label='Upper Band', c='g')
  plts.plot(bollinger_lower, label='Lower Band', c='r')
  plts.plot(bollinger_middle, label='Middle Band', c='y')
  plts.legend()
  st.pyplot(fig5)

  #Plotting the MACD
  fig6 = plts.figure(figsize=(20,10))
  plts.title(' MACD Indicator')
  plts.plot(stock_dataset['MACD'],  label='MACD', color='g')
  plts.plot(stock_dataset['Signal'], label='Signal', color='r')
  plts.legend()
  st.pyplot(fig6)


#Modelling
if st.checkbox("Classifier Model Performance"):
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
  precision = precision_score(y_test, y_pred,  average='macro')
  st.write("Precision Score :", precision) 

  #Recall
  recall = recall_score(y_test, y_pred,  average='macro')
  st.write("Recall Score : ", recall)
  #F1 Score
  f1 = f1_score(y_test, y_pred,average='macro')
  st.write("F1 Score: ", recall)

    



#LSTM Model
def lstm_model():
    st.header('Long Short-Term Memory (LSTM) Model Results:')

    
    #Creating a new dataframe which contains only the 'Close'
    #Converting DataFrame into Numpy Array
    close_data = stock_dataset.filter(['Close'])
    close_dataset = close_data.values

 

    #Splitting the dataset into training and test sets 70/30
    training_data_len = int(np.ceil( len(close_dataset) * .7 ))


    #Normalize/Scale the data
    scaler = MinMaxScaler(feature_range=(0,1))
    scaled_data = scaler.fit_transform(close_dataset)

    #Splitting Scaled Data into Training and Test Sets
    # Create the training dataset
    training_data = scaled_data[0:int(training_data_len), :]

    #Splitting into X-train and y-train
    x_train =  []
    y_train = []

    for i in range(100, len(training_data)):
        x_train.append(training_data[i-100:i, 0])
        y_train.append(training_data[i,0])


    #Converting the X_Train and Y_Train to Numpy Array in-order to train the LSTM Model
    x_train, y_train = np.array(x_train), np.array(y_train)

    #Reshaping the X_Train as LTSM Model expects 3D dimensional array and it is currently 2D
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
        
    #Loading Model
    model = load_model('lstm_model.h5')
        

    #Testing
    #Creating Test Data set
    test_data = scaled_data[training_data_len - 100:, :]

    #X_Test and Y_Test
    x_test = []
    y_test = close_dataset[training_data_len:, :]
    for i in range(100, len(test_data)):
        x_test.append(test_data[i-100:i, 0])


    #Converting the data into numpy array
    x_test, y_test = np.array(x_test), np.array(y_test)

    #Reshaping the data so it is in 3d
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1],1))

    #Using the Models to make Predictions
    y_predictions = model.predict(x_test)
    y_predictions = scaler.inverse_transform(y_predictions)

    
    #Results
    mae =mean_absolute_error(y_predictions,y_test)
    mse= mean_squared_error(y_predictions,y_test)
    rmse = np.sqrt(mean_squared_error(y_predictions,y_test))
    r2 = r2_score(y_predictions,y_test)

    rmse_str = f"""
    <style>
    p.a {{
    font: bold 20px Courier ;
    }}
    </style>
    <p class="a">RMSE:{rmse}</p>
    """
    # 
    # 
    mse_str = f"""
    <style>
    p.a {{
    font: bold 20px Courier green;
    }}
    </style>
    <p class="a">MSE:{mse}</p>
    """
    # 
    # 
    mae_str = f"""
    <style>
    p.a {{
    font:bold 20px Courier;
    }}
    </style>
    <p class="a">MAE:{mae}</p>
    """
    # 
    # 
    r2_str = f"""
    <style>
    p.a {{
    font: bold 20px Courier;
    }}
    </style>
    <p class="a">R2:{r2}</p>
    """

    st.markdown(rmse_str, unsafe_allow_html=True)
    st.markdown(mse_str, unsafe_allow_html=True)
    st.markdown(mae_str, unsafe_allow_html=True)
    st.markdown(r2_str, unsafe_allow_html=True)

 
    # st.subheader('The Root Mean Squared Error')
    # st.subheader(rmse)



    #Plotting the data
    train = close_data[:training_data_len]
    original = close_data[training_data_len:]
    original['Predictions'] = y_predictions

    # st.subheader('Visualization')
    # fig4 = plt.Figure()
    # fig4.layout.update(title_text="Predictions", xaxis_rangeslider_visible=True)
    # fig4.update_layout(autosize=False, width=1000, height=800,)
    # fig4.add_trace(plt.Scatter(x=stock_dataset['Date'], y=original['Close'], name="Original"))
    # fig4.add_trace(plt.Scatter(x=stock_dataset['Date'], y=original['Predictions'], name="Predictions"))
    # st.plotly_chart(fig4)


    
    # Plotting the data
    fig5 = plts.figure(figsize=(20,12))
    plts.title('Model')
    plts.ylabel('Price')
    plts.plot(train['Close'], color="black")
    plts.plot(original[['Close', 'Predictions']])
    plts.legend(['Train', 'Original', 'Predictions'], loc='lower right')
    st.pyplot(fig5)

    st.subheader("Predictions Table")
    st.write(original)
    # End of LSTM Model Function


#ARIMA Model
def arima_model():
  st.header('AutoRegressive Integrated Moving Average (ARIMA) Model')

  #Spltting Data into Train and Test Data
  train_data=stock_dataset.iloc[:int(stock_dataset.shape[0]*0.80)]
  test_data=stock_dataset.iloc[int(stock_dataset.shape[0]*0.80):]
  prediction=test_data.copy()

  #Model Training
  model= auto_arima(train_data["Close"],trace=True, error_action='ignore', start_p=1,start_q=1,max_p=3,max_q=3,
                suppress_warnings=True,stepwise=False,seasonal=False)
  model.fit(train_data["Close"])

  #Forecasting 
  y_prediction=model.predict(len(test_data))
  prediction["Predictions"]=y_prediction
  mae =mean_absolute_error(prediction["Close"],prediction["Predictions"])
  mse= mean_squared_error(prediction["Close"],prediction["Predictions"])
  rmse = np.sqrt(mean_squared_error(prediction["Close"],prediction["Predictions"]))
  r2 = r2_score(prediction["Close"],prediction["Predictions"])

  #RMSE
  st.write("RMSE:", rmse)
  st.write("MSE:", mse)
  st.write("MAE:", mae)
  st.write("R2:", r2)

  # Visualization
  st.subheader('Visualization')
  fig11 = plt.Figure()
  fig11.layout.update(title_text="Interactive Graph: ARIMA", xaxis_rangeslider_visible=True)
  fig11.update_layout(autosize=False, width=1000, height=800,)
  fig11.add_trace(plt.Scatter(x=train_data.index, y=train_data["Close"], mode='lines',name="Train"))
  fig11.add_trace(plt.Scatter(x=test_data.index, y=test_data["Close"], mode='lines',name="Original",))
  fig11.add_trace(plt.Scatter(x=test_data.index, y=prediction["Predictions"], mode='lines',name="Prediction",))
  st.plotly_chart(fig11)

  
  fig12 = plts.figure(figsize=(20,12))
  plts.plot(train_data["Close"], color='Black', label='Train')
  plts.plot(test_data["Close"], color='blue', label='Original')
  plts.plot(prediction["Predictions"], color='Red', label='Prediction')
  plts.title('ARIMAL MODEL')
  plts.ylabel('Stock Price')
  plts.legend()
  st.pyplot(fig12)

  st.subheader("Predictions Table")
  prediction.drop(columns=['High', 'Low', 'Open', 'Volume', '%K', '%D', 'RSI', 'Bollinger_Upper', 'Bollinger_Lower', 'MACD', 'Signal', 'Recommender' ], inplace=True)
  st.write(prediction)

#Modelling
if st.checkbox("Regression Model Performance"):
    lstm_model()
    arima_model()
    








