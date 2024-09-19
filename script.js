document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Add pulse animation to the send button
    const sendButton = document.getElementById('send-button');
    sendButton.classList.add('rotating');

    // Display user message
    const chatWindow = document.getElementById('chat-window');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `
        <div class="message-text">${userInput}</div>
        <div class="message-icon"></div>
    `;
    chatWindow.appendChild(userMessage);

    // Generate bot response
    const botResponse = getBotResponse(userInput);

    // Display bot response and stop pulse animation
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = `
            <div class="message-icon"></div>
            <div class="message-text">${botResponse}</div>
        `;
        chatWindow.appendChild(botMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom

        // Remove pulse animation from the send button  
        sendButton.classList.remove('rotating');
    }, 1000);

    // Clear input field
    document.getElementById('user-input').value = '';
});

document.getElementById('upload-button').addEventListener('click', function() {
    document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const chatWindow = document.getElementById('chat-window');
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-text">File uploaded: ${file.name}</div>
            <div class="message-icon"></div>
        `;
        chatWindow.appendChild(userMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom

        // Handle file upload (e.g., send file to server or process it here)
        // This part depends on your specific requirements
    }
});

function getBotResponse(userInput) {
    // Example responses based on user input
    const responses = {
        'hello': 'Hi there! How can I assist you today?',
        'how are you': 'I’m doing well, thank you! How can I help you?',
        'train status': 'Please provide your PNR number to check the train status.',
        'goodbye': 'Goodbye! Have a great day!'
    };

    // Normalize user input to lowercase for comparison
    const normalizedInput = userInput.toLowerCase();

    // Return a response if found, otherwise a default message
    return responses[normalizedInput] || 'I’m sorry, I didn’t understand that. Can you please rephrase?';
}
