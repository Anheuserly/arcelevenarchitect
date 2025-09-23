import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: "bot" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  // Load GoDaddy chat script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.godaddy.com/mcc/v1/js/gdchat-widget.min.js';
    script.async = true;
    script.setAttribute('data-godaddy-id', 'YOUR_GODADDY_ACCOUNT_ID'); // Replace with your GoDaddy account ID
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize GoDaddy chat API
  useEffect(() => {
    window.gdChat = window.gdChat || {
      q: [],
      cmd: function(command, arg) {
        window.gdChat.q.push([command, arg]);
      }
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const userMessage = { text: inputMessage, sender: "user" };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Send message to GoDaddy chat
    if (window.gdChat && window.gdChat.cmd) {
      window.gdChat.cmd('sendMessage', {
        message: inputMessage,
        name: 'Website Visitor',
        email: 'visitor@example.com' // You can dynamically set this if you have user info
      });
    }

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          text: "Thanks for your message! Our team will get back to you soon.", 
          sender: "bot" 
        }
      ]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container" ref={chatbotRef}>
      {!isOpen && (
        <button className="chat-toggle-button" onClick={toggleChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chat with Us</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === "bot" ? "bot-message" : "user-message"}`}
              >
                {message.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-message typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={sendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;