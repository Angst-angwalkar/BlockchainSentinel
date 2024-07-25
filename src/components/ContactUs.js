import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailData = {
      to: ['aniket.angwalkar2@mail.dcu.ie', 'recipient2@example.com'],
      from: email,
      subject,
      text: message,
    };

    try {
      const result = await axios.post('http://localhost:8283/send-email', emailData);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> */}
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;
