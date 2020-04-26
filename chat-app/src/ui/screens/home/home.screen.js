import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

import './home.css';

const socket = io('http://localhost:8000');

export function HomeScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [author, setAuthor] = useState('new user');
  const [isEditting, setIsEditting] = useState(false);

  const scrollTargetRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    socket.on('update-messages', function(data){ 
      setMessages(data);;
    });
  }, [])

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  }

  const toogleIsEditting = () => {
    setIsEditting(!isEditting);
  }

  useEffect(() => {
    scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const handleSubmit = () => {
    messageInputRef.current.focus();

    if (!message) return;

    socket.emit('new-message', {
      author,
      content: message,
      id: Math.random()*10000
    });

    setMessage('');
  }

  return (  
    <div className="home--container" >
      <div className="home--wrapper">
        <div className="home--messages">
          {messages.map((message) => (
            <p key={message.id}>
              {message.author}: {message.content} 
            </p>
          ))}
          <div ref={scrollTargetRef} />
        </div>
        <div className="home-bottom-wrapper">
          <input
            className="home--input"
            onChange={handleMessageChange}
            value={message}
            ref={messageInputRef}
            placeholder="write here"
          />
          <button className="home--submit-button" onClick={handleSubmit}>
            >
          </button>
        </div>
        <div className="home--name-container">
          {isEditting && (
            <input 
              className="home--input"
              placeholder="username"
              onChange={handleAuthorChange}
            />
          )}
        </div>
        <button className="button__close" onClick={toogleIsEditting}>
          {isEditting ? 'close' : 'change user'}
        </button>
      </div>
    </div>
  )
}