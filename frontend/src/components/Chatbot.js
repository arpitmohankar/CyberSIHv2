import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { Send, ChatBubbleOutline, HourglassEmpty, ErrorOutline } from '@mui/icons-material';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput('');
      setIsThinking(true);
      setError('');

      try {
        // Replace this with your API call to Google Gemini
        const response = await fetch('https://api.your-google-gemini-endpoint.com/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_TOKEN`
          },
          body: JSON.stringify({ question: input })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setMessages((prevMessages) => [...prevMessages, { text: data.answer, type: 'bot' }]);
        } else {
          throw new Error(data.message || 'Error fetching response. Please try again later.');
        }
      } catch (err) {
        setMessages((prevMessages) => [...prevMessages, { text: 'Error fetching response. Please try again later.', type: 'bot' }]);
        setError(err.message);
      } finally {
        setIsThinking(false);
      }
    }
  };

  return (
    <Box className="chatbot-container">
      <Box className="chatbot-header">
        <Typography variant="h6" className="chatbot-title">AI-Powered Cybercrime Assistant</Typography>
      </Box>
      <Box className="chatbot-messages">
        {messages.map((message, index) => (
          <Box key={index} className={`chatbot-message ${message.type}`}>
            <Avatar className="chatbot-avatar" sx={{ backgroundColor: message.type === 'user' ? '#007bff' : '#17a2b8' }}>
              {message.type === 'user' ? <ChatBubbleOutline /> : isThinking ? <HourglassEmpty /> : <ErrorOutline />}
            </Avatar>
            <Typography variant="body1" className="chatbot-text">{message.text}</Typography>
          </Box>
        ))}
        {isThinking && (
          <Box className="chatbot-message bot">
            <Avatar className="chatbot-avatar" sx={{ backgroundColor: '#17a2b8' }}>
              <HourglassEmpty />
            </Avatar>
            <Typography variant="body1" className="chatbot-text">Thinking...</Typography>
          </Box>
        )}
      </Box>
      <Box className="chatbot-input-container">
        <TextField
          variant="outlined"
          placeholder="Ask a question..."
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          inputProps={{
            style: { color: 'white' } // Makes the text inside the input box visible
          }}
          sx={{ input: { color: '#FFFFFF' } }} // Additional style for input text color
        />
        <Button variant="contained" onClick={handleSend} className="chatbot-send-button">
          <Send />
        </Button>
      </Box>
      <Box className="chatbot-footer">
        <Typography variant="caption">© 2024 Cyber Security. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Chatbot;
