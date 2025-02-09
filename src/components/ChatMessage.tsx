import React from 'react';
import { UserCircle, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 p-4 ${isUser ? 'bg-opacity-10' : 'bg-opacity-5'}`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <UserCircle className="w-8 h-8 text-blue-400" />
        ) : (
          <Bot className="w-8 h-8 text-green-400" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-gray-200">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};