import requests
import dotenv
import os
import base64
from PIL import Image
from io import BytesIO

dotenv.load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/mattmdjaga/segformer_b2_clothes"
headers = {"Authorization": f"Bearer {os.getenv('HUGGING_FACE_API')}"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

def save_mask(mask_data, output_filename):
    mask_bytes = base64.b64decode(mask_data)
    mask_image = Image.open(BytesIO(mask_bytes))
    mask_image.save(output_filename)

output = query("Static/image.png")

# Assuming the output contains a list of dictionaries with 'label' and 'mask' keys
for item in output:
    if item['label'] == 'Upper-clothes':
        save_mask(item['mask'], f"Static/mask.png")
        print("Mask saved for Upper-clothes.")