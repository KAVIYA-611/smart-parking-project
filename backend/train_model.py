import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import pickle

data = {
    'hour': [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,
             6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,
             6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
    'day':  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
             7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    'location_type': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    'occupancy': [5,8,15,25,40,55,70,75,72,68,75,85,95,98,88,70,45,
                  8,12,20,35,55,70,82,85,80,78,85,92,98,99,95,80,55,
                  6,10,18,30,50,65,78,82,78,75,82,90,96,98,92,78,50]
}

df = pd.DataFrame(data)
print("Dataset created!")
print(f"Total records: {len(df)}")

X = df[['hour', 'day', 'location_type']]
y = df['occupancy']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training complete!")

predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
accuracy = 100 - mae
print(f"Mean Absolute Error: {mae:.2f}")
print(f"Model Accuracy: {accuracy:.2f}%")

print("\nSample Predictions:")
test_cases = [
    [8, 1, 1],
    [18, 6, 1],
    [12, 7, 1],
    [22, 1, 1],
]
for case in test_cases:
    pred = model.predict([case])[0]
    day_name = ['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'][case[1]]
    print(f"Hour:{case[0]} {day_name} Predicted: {pred:.1f}% occupancy")

with open('parking_model.pkl', 'wb') as f:
    pickle.dump(model, f)
print("\nModel saved as parking_model.pkl!")
