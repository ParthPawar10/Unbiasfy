import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score
import pickle

AVAILABLE_MODELS_CLASSIFICATION = {
    "random_forest": RandomForestClassifier,
    "logistic_regression": LogisticRegression,
    "svm": SVC,
    "decision_tree": DecisionTreeClassifier
}

AVAILABLE_MODELS_REGRESSION = {
    "linear_regression": LinearRegression
}

def is_classification(df, target_column):
    return df[target_column].nunique() <= 20 or df[target_column].dtype == 'object'

def train_model(df, target_column, model_type=None, test_size=0.2, random_state=42, model_save_path='model.pkl'):
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found in the dataset.")

    task_type = "classification" if is_classification(df, target_column) else "regression"

    if task_type == "classification":
        available_models = AVAILABLE_MODELS_CLASSIFICATION
    else:
        available_models = AVAILABLE_MODELS_REGRESSION

    if model_type is None:
        model_type = list(available_models.keys())[0]  

    if model_type not in available_models:
        raise ValueError(f"Model type '{model_type}' is not supported for {task_type}. Choose from {list(available_models.keys())}.")

    X = df.drop(columns=[target_column])
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)

    model_class = available_models[model_type]
    model = model_class(random_state=random_state) if "random_state" in model_class().get_params() else model_class()

    model.fit(X_train, y_train)

    if task_type == "regression":
        y_pred = model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        metrics = {
            "mean_squared_error": mse,
            "r2_score": r2
        }
    else:
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred, output_dict=True)
        metrics = {
            "accuracy": accuracy,
            "classification_report": report
        }

    with open(model_save_path, 'wb') as model_file:
        pickle.dump(model, model_file)

    return {
        **metrics,
        "model_path": model_save_path,
        "task_type": task_type
    }