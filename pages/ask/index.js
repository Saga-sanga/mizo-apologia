import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Layout from '../../components/layout';

function Ask() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    };
    fetch('/api/contact', {
      method: 'post',
      body: JSON.stringify(data),
    });
  };

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            type="text"
            rows="4"
            onChange={e => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </Layout>
  );
}

export default Ask;