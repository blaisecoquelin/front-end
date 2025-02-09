import { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message, ChatState } from './types';
import { Link, Trash2 } from 'lucide-react';
import axios from 'axios';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }));
    
    try {
      const response = await axios.post('https://fastapi-backend-uugw.onrender.com/api/chat', {
        message: content
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response.data.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('API Error:', error);
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: axios.isAxiosError(error) 
          ? error.response?.data?.detail || 'Failed to get response. Please try again.'
          : 'Failed to get response. Please try again.',
      }));
    }
  };

  const clearChat = () => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-900 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white"></h1>
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-white flex items-center gap-2" onClick={() => {}}>
            <Link className="w-5 h-5" /><span>Share link to Prompt</span>
          </button>
          <button className="text-gray-400 hover:text-white flex items-center gap-2" onClick={clearChat}>
            <Trash2 className="w-5 h-5" />
            <span>Delete Prompt</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl h-[calc(100vh-8rem)]">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatState.messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {chatState.isLoading && (
              <div className="text-center text-gray-500">
                <div className="animate-pulse">Thinking...</div>
              </div>
            )}
            {chatState.error && (
              <div className="text-red-500 text-center">{chatState.error}</div>
            )}
          </div>
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={chatState.isLoading}
          />
        </div>
      </main>
      <div className="text-center mt-4">
        <span className="text-gray-400 text-sm opacity-70">
          &copy; {new Date().getFullYear()} Smart IT consulting Ltd.
        </span>
      </div>
    </div>
  );
}

export default App;
