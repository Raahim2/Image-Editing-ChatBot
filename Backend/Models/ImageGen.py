import os
import dotenv
import requests
import io
from PIL import Image

dotenv.load_dotenv()
token = os.getenv("HUGGING_FACE_API")

API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"
headers = {"Authorization": f"Bearer {token}"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

def generate_image(prompt , output_path):
    image_bytes = query({
        "inputs": prompt,
    })

    image = Image.open(io.BytesIO(image_bytes))
    image.save(output_path)

    print(f"Image saved as {output_path}")

