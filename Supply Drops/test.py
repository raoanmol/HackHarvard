import json

# Step 1: Open the JSON file
with open('data.json', 'r') as file:
    # Step 2: Load the JSON data
    data = json.load(file)

# Step 3: Print the data or access it as needed
print(data)

# Accessing specific elements
for employee in data['employees']:
    print(f"Name: {employee['name']}, Age: {employee['age']}, City: {employee['city']}")