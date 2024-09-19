from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load pre-trained model for classification and text generation
classifier = pipeline('text-classification', model='distilbert-base-uncased-finetuned-sst-2-english')
generator = pipeline('text-generation', model='gpt2')

@app.route('/process_complaint', methods=['POST'])
def process_complaint():
    data = request.json
    complaint_text = data.get('complaintText', '')

    # Check for valid complaint text
    if not complaint_text:
        return jsonify({'error': 'No complaint text provided'}), 400

    # Use the classifier to categorize the complaint
    classification = classifier(complaint_text)
    category = classification[0]['label']

    # Generate a response based on the category
    response = generate_response(category)

    return jsonify({
        'category': category,
        'response': response
    })

def generate_response(category):
    responses = {
        'POSITIVE': 'Thank you for your feedback! We are glad you had a positive experience.',
        'NEGATIVE': 'We are sorry to hear about your experience. Your complaint has been forwarded to the relevant department.',
        'LABEL_0': 'Please provide more details for further assistance.',
        'LABEL_1': 'Your complaint is being reviewed and will be addressed shortly.'
    }

    # Use GPT-2 to generate a custom response
    custom_response = generator(f'Generate a response for a complaint categorized as {category}', max_length=50)[0]['generated_text']
    
    return responses.get(category, custom_response)

if __name__ == '__main__':
    app.run(debug=True)
