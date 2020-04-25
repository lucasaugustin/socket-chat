import React, { useState, useRef, useEffect } from 'react';

import './home.css';

export function HomeScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const scrollTargetRef = useRef(null)

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    scrollTargetRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = () => {
    setMessages([...messages, {
      author: 'Lucas',
      content: message,
      id: Math.random()*100
    }])
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
          <input className="home--text-input" onChange={handleChange} />
          <button className="home--submit-button" onClick={handleSubmit}> > </button>
        </div>
      </div>
    </div>
  )
}