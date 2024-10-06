import os
import requests
from dotenv import load_dotenv
import base64
from PIL import Image
import numpy as np

load_dotenv()

api_key = os.getenv("HUGGING_FACE_API")

API_URL = "https://api-inference.huggingface.co/models/kandinsky-community/kandinsky-2-2-decoder-inpaint"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

prompt = "a hat"

init_image_url = "https://huggingface.co/datasets/hf-internal-testing/diffusers-images/resolve/main/kandinsky/cat.png"
init_image = Image.open(requests.get(init_image_url, stream=True).raw)

# Create a mask
mask = np.zeros((768, 768), dtype=np.float32)
# Let's mask out an area above the cat's head
mask[:250, 250:-250] = 1

# Convert the image and mask to base64 encoding (required for JSON payload)
init_image_base64 = base64.b64encode(init_image.tobytes()).decode("utf-8")
mask_base64 = base64.b64encode(mask.tobytes()).decode("utf-8")

# Create the payload for the request
payload = {
    "image": init_image_base64,
    "mask": mask_base64,
    "prompt": prompt,
    "height": 768,
    "width": 768,
    "num_inference_steps": 20
}

# Send the POST request to the Hugging Face API
response = requests.post(API_URL, headers=headers, json=payload)

# Check the response and handle it accordingly
if response.status_code == 200:
    # Save the resulting inpainted image to a file
    with open("cat_with_hat.png", "wb") as out_file:
        out_file.write(response.content)
    print("Inpainting successful! Saved as 'cat_with_hat.png'.")
else:
    print(f"Failed to inpaint. Status code: {response.status_code}, Error: {response.text}")
    if response.status_code == 400:
        print("Error: Input should be a valid string. Please check the payload and try again.")
