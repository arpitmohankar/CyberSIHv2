import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { Send, ChatBubbleOutline, HourglassEmpty, EmojiObjectsOutlined } from '@mui/icons-material';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const faqAnswers = {
    'What is cybercrime?': 'Cybercrime refers to criminal activities carried out using computers or the internet.',
    'How can I report a cybercrime?': 'You can report a cybercrime by visiting the nearest cyber police station or reporting online at the official government website.',
    'What should I do if my social media account is hacked?': 'Immediately change your password, enable two-factor authentication, and report the incident to the platform.',
    'What is phishing?': 'Phishing is a fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity in electronic communication.',
    'How can I protect my online accounts?': 'Use strong, unique passwords, enable two-factor authentication, and avoid sharing personal information.',
    'What is ransomware?': 'Ransomware is a type of malware that encrypts your files, demanding payment for decryption.',
    'What should I do if I receive a suspicious email?': 'Do not click on any links or attachments and report the email as phishing to your email provider.',
    'How can I secure my Wi-Fi network?': 'Use a strong password, enable WPA3 encryption, and disable WPS.',
    'What is identity theft?': 'Identity theft occurs when someone unlawfully obtains and uses your personal information for fraudulent purposes.',
    'How can I avoid online scams?': 'Be cautious of unsolicited offers, verify sources, and avoid sharing sensitive information online.',
    'What is the Indian Cyber Crime Helpline Number?': 'The Indian Cyber Crime Helpline Number is 155260. Call it to report any cybercrime.',
    'How do I recover a hacked email account?': 'Follow the recovery process of your email provider, change passwords, and secure the account with two-factor authentication.',
    'What is cyberbullying?': 'Cyberbullying is the use of digital platforms to harass or intimidate someone. Report it to authorities and the platform involved.',
    'What are the penalties for cybercrime in India?': 'Penalties vary depending on the crime, ranging from fines to imprisonment under the IT Act, 2000.',
    'How can I educate my children about cyber safety?': 'Teach them about online dangers, monitor their online activity, and encourage them to speak up if they encounter something suspicious.',
    'What should I do if I’m a victim of cyberstalking?': 'Report the incident to the police, block the stalker, and document all evidence.',
    'What is two-factor authentication?': 'Two-factor authentication adds an extra layer of security by requiring a second form of verification, like a code sent to your phone.',
    'What is the difference between malware and a virus?': 'Malware is a general term for malicious software; a virus is a type of malware that can replicate itself and spread.',
    'How can I protect my data on public Wi-Fi?': 'Use a VPN, avoid accessing sensitive information, and ensure websites are HTTPS secured.',
    'What is the role of CERT-In?': 'CERT-In (Computer Emergency Response Team - India) is the national nodal agency for responding to cybersecurity incidents in India.'
  };

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput('');
      setIsThinking(true);

      setTimeout(() => {
        const answer = faqAnswers[input] || 'Sorry, I do not have an answer for that. Please contact support.';
        setMessages((prevMessages) => [...prevMessages, { text: answer, type: 'bot' }]);
        setIsThinking(false);
      }, 1000);
    }
  };

  return (
    <Box className="chatbot-container">
      <Box className="chatbot-header">
        <Typography variant="h6" className="chatbot-title">Cybercrime FAQ Chatbot</Typography>
      </Box>
      <Box className="chatbot-messages">
        {messages.map((message, index) => (
          <Box key={index} className={`chatbot-message ${message.type}`}>
            <Avatar className="chatbot-avatar" sx={{ backgroundColor: message.type === 'user' ? '#FF6584' : '#00B8D4' }}>
              {message.type === 'user' ? <ChatBubbleOutline /> : isThinking ? <HourglassEmpty /> : <EmojiObjectsOutlined />}
            </Avatar>
            <Typography variant="body1" className="chatbot-text">{message.text}</Typography>
          </Box>
        ))}
        {isThinking && (
          <Box className="chatbot-message bot">
            <Avatar className="chatbot-avatar" sx={{ backgroundColor: '#00B8D4' }}>
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
