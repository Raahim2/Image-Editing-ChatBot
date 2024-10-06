from flask import Flask, request, jsonify
from Models.ImageGen import generate_image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate-image', methods=['POST' , 'GET'])
def generate_image_endpoint():
    print("In Generate Image")
    data = request.get_json()
    prompt = data.get('prompt')
    print(prompt)


    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    output_path = "public/generated_image.png"
    generate_image(prompt, output_path)
    print(f"Image generated and saved as {output_path}")
    return jsonify({"message": f"Image generated and saved as {output_path}", "image_url": '/generated_image.png'}), 200

if __name__ == '__main__':
    app.run(debug=True)
