import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

def handle_missing_values(df, strategy='drop'):
    if strategy == 'mean':
        return df.fillna(df.mean())
    elif strategy == 'median':
        return df.fillna(df.median())
    elif strategy == 'drop':
        return df.dropna()
    else:
        raise ValueError("Strategy must be one of ['mean', 'median', 'drop']")

def encode_categorical(df):
    label_encoders = {}
    for column in df.select_dtypes(include=['object']).columns:
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le
    return df, label_encoders

def scale_numerical(df):
    scaler = StandardScaler()
    numerical_columns = df.select_dtypes(include=['float64', 'int64']).columns
    df[numerical_columns] = scaler.fit_transform(df[numerical_columns])
    return df, scaler

def preprocess_data(df, missing_strategy='mean', scale=True):

    df = handle_missing_values(df, strategy=missing_strategy)
    
    df, label_encoders = encode_categorical(df)
    
    if scale:
        df, scaler = scale_numerical(df)
    else:
        scaler = None
    
    return df, label_encoders, scaler
