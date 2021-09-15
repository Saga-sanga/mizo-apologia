import { useState } from 'react';
import styles from './EmailForm.module.css';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';

function Ask() {
  const router = useRouter();
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
    }).then(res => {
      console.log('Response Received!');
      if (res.status === 200) {
        console.log('Message Sent!');
        router.push('/success');
      }
    });
  };

  return (
    <Layout>
      <main className={styles.formContainer}>
        <div className={`topic-body ${styles.formBody}`}>
          <h1 className={styles.headingMargin}>Zawhna Zawt Rawh</h1>
          <h5 className={styles.headingMargin}>A hnuaia form hmang hian i zawhna zawt rawh le</h5>
          
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.rowField}>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="name">Hming</label>
                <input
                  className={styles.textInputField}
                  id="name"
                  type="text"
                  placeholder="e.g. Lalnuntluanga Ralte"
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="email">Email</label>
                <input
                  className={styles.textInputField}
                  id="email"
                  type="email"
                  // pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
                  placeholder="e.g. valtea@email.com"
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <label className={styles.formLabel} htmlFor="message">Zawhna</label>
            <textarea
              className={styles.textArea + ' ' + styles.textInputField}
              id="message"
              type="text"
              rows="4"
              onChange={e => setMessage(e.target.value)}
              required
            />
            <button className={styles.submitButton} type="submit">Submit</button>
          </form>
          <div>
            <h3 style={{margin: '3rem 0 0.4rem 0'}}>Zawhna Thehluhna Chhungchanga Kaihhruaina</h3>
            <p style={{margin: 0}}>Zawhna I thehluh hunah, heng a hnuaia kaihhruainate hi zawm ang che.
              A hnuaia mite hi zawm a nih loh chuan, i zawhna thehluhte chu chhan an ni lo vang.</p>
            <ol>
              <li>Tawngkam mawi lo, hmuhsitna tawngkam te hmang suh ang che (Efesi 4:29).</li>
              <li>A zawhna chu mawi hnai takin zawt ang che (1 Peter 3:15).</li>
              <li>Inhnialna rilru puin zawt lo hram ang che, inhnialna rawngbawlna kan nei lova,
                thinlung taka thutak zawngtute tanpui kan duh a ni (1 Timothea 6:20).</li>
            </ol>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Ask;