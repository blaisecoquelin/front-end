Chat Application Frontend

This project is a React-based chat application that interfaces with a FastAPI backend to provide real-time communication between users and an AI assistant. The application enables users to send messages, receive responses from the assistant, and manage their chat history.
Features

    User Messaging: Allows users to input and send messages through a text input field.
    Assistant Responses: Displays AI-generated responses from the assistant.
    Loading Indicator: Shows a "Thinking..." indicator while awaiting a response from the backend.
    Error Handling: Notifies users of any errors encountered during API requests.
    Chat Management: Provides functionality to clear the chat history.
    Reusable Components: Utilizes modular components for chat messages and input fields.

Components

    App: The main component that manages the chat state and renders the user interface.
    ChatMessage: A component responsible for displaying individual chat messages.
    ChatInput: A component that provides the input field for users to send messages.

State Management

The application employs React's useState hook to manage the chat state, which includes:

    messages: An array of message objects representing the chat history.
    isLoading: A boolean indicating whether a response is being awaited from the backend.
    error: A string that stores any error messages encountered during API requests.

API Interaction

The application communicates with the FastAPI backend by sending an HTTP POST request to the /api/chat endpoint. The user's message is included in the request body, and the assistant's response is received and displayed in the chat interface.
How to Run

    Clone the Repository:

git clone https://github.com/your-username/chat-application-frontend.git
cd chat-application-frontend

Install Dependencies:

npm install

Configure the Backend URL:

Open the App.js file and ensure that the backend URL is correctly set to point to your FastAPI backend. For example:

const response = await axios.post('https://fastapi-backend-uugw.onrender.com/api/chat', {
  message: content,
}, {
  headers: {
    'Content-Type': 'application/json',
  },
});

Start the Application:

    npm start

    Access the Application:

    Open your browser and navigate to http://localhost:3000 to interact with the chat interface.

Dependencies

    react: A JavaScript library for building user interfaces.
    axios: A promise-based HTTP client for making API requests.
    lucide-react: A collection of React icons used in the user interface.

Notes

    Ensure the FastAPI backend is running and accessible at https://fastapi-backend-uugw.onrender.com for the chat functionality to work properly.
    The application is styled using Tailwind CSS classes to provide a responsive and modern user interface.
