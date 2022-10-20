import requests
import json
import passwordGenerator

url = 'http://localhost:5000/getmsg'
while(True):
    pwd = passwordGenerator.generate()
    username = 'username:lollobeach2000'
    password = 'password": "'+ pwd
    jsonString = '{"username": "lollobeach2000", "'+ password +'"}'
    print(jsonString)
    x = requests.get(url)
    print(x.text)