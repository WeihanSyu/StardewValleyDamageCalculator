import json
import re

# Opens our JSON file
f = open('Weapons.json')

# json.load() deserializes our JSON TEXT FILE and returns it as a dictionary. 
# https://docs.python.org/3/library/json.html#json-to-py-table  ->  shows what JSON file type will be converted to what in Python. Not always a dictionary.
data = json.load(f)

# Serializes a Python object -> our dictionary -> into one continuous JSON string so that we can perform RegEx on it
y = json.dumps(data)

f.close()

# Here is where things can get confusing. 
# The premise of this script is to take a JSON file > transform it to a string in Python > RegEdit it so we can loop and automate > output the string back into a JSON file.
# JSON files have a specific format. First of all, every single string quotation must use DOUBLE QUOTES. Second, bracket positions for objects and arrays need INDENTATION.

# The problem we have is when converting back into a JSON file. Whatever we are outputting to the JSON file MUST be in JSON format already.
# Yet, when we perform RegEx on the JSON string after using json.dumps(data), the data is not considered a JSON object even though it's written as one. It does not have correct indentation.
# So to fix this, we use json.loads() to deserialize our JSON string into a Python dictionary. This works because our JSON string is already formatted as a dictionary.
# IF our JSON string was formatted as a list -> [stuff...], then we would get a Python list!
# Now we take our Python dictionary and serialize it into a JSON object using json.dumps()

y = re.sub(r'{"header.+"content"', '{"content"', y)
y = re.sub(r'{"0": ', '[', y)
for i in range(1, 67):
    y = re.sub(f'"{i}":', '', y)
y = re.sub(r'null}}}', 'null}]}', y)

# Deserialize our JSON string(y) into a Python dictionary
new_json = json.loads(y)
# print(type(new_json)) = class dict

# Serialize our Python dictionary into a JSON object with proper indentation
new_json = json.dumps(new_json, indent=3)

# Output to a file
with open('Weapons_edit.json', 'w') as outfile:
    outfile.write(new_json)


