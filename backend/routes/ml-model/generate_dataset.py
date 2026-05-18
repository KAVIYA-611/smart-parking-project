import pandas as pd
import random

data = []

for i in range(500):
    total = random.randint(200, 500)
    available = random.randint(0, total)

    status = "Free" if available > total * 0.3 else "Busy"

    latitude = round(random.uniform(9.90, 9.95), 6)
    longitude = round(random.uniform(78.10, 78.15), 6)

    area = random.choice([
        "Madurai",
        "Anna Nagar",
        "KK Nagar",
        "Thiru Nagar",
        "Mattuthavani"
    ])

    hour = random.randint(0, 23)
    minute = random.randint(0, 59)

    time = f"{hour:02}:{minute:02}"

    data.append([
        total,
        available,
        status,
        latitude,
        longitude,
        area,
        time
    ])

df = pd.DataFrame(data, columns=[
    "total",
    "available",
    "status",
    "latitude",
    "longitude",
    "area",
    "time"
])

df.to_csv("parking_data.csv", index=False)

print("500+ rows dataset generated successfully")