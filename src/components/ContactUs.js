import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailData = {
      to: ['aniket.angwalkar2@mail.dcu.ie', 'rahul.eragarla2@mail.dcu.ie'],
      from: email,
      subject,
      message: message,
    };

    try {
      const result = await axios.post('http://localhost:8283/openai/contact/email', emailData);
      if (result.data === "Email sent successfully!") {
        setSuccess(true);
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
      {success && (
        <div className="alert-modal">
          <div className="alert-content">
            <p>Email sent successfully!</p>
            <button onClick={() => setSuccess(false)} className="close-button">Okay</button>
          </div>
        </div>
      )}
      {error && (
        <div className="alert-modal">
          <div className="alert-content">
            <p>There was an error sending the email. Please try again later.</p>
            <button onClick={() => setError(false)} className="close-button">Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
