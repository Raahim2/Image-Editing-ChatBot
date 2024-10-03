import requests
import os
import dotenv
import requests

dotenv.load_dotenv()
token = os.getenv("HUGGING_FACE_API")


API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50"
headers = {"Authorization": f"Bearer {token}"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

output = query("image.png")
print(output)