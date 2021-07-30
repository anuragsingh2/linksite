import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { emailRegex } from '../../shared/constants';
import { fb } from '../../shared/service';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [verifyPw, setVerifyPw] = useState('');

  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(
      email && emailRegex.test(email) && pw && verifyPw && pw === verifyPw,
    );
  }, [email, pw, verifyPw]);

  const signup = () => {
    if (valid) {
      fb.auth
        .createUserWithEmailAndPassword(email, pw)
        .then(() => console.log('Signup Success'));
    }
  };

  return (
    <div className={styles.main}>
      <h1>Sign Up</h1>
      <input
        type="email"
        value={email}
        placeholder="Enter valid Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={pw}
        placeholder="Password should be greater than 6 characters"
        onChange={e => setPw(e.target.value)}
      />
      <input
        type="password"
        value={verifyPw}
        placeholder="Verify Password"
        onChange={e => setVerifyPw(e.target.value)}
      />
      <button onClick={signup} disabled={!valid} className={styles.button}>
        Sign Up
      </button>
    </div>
  );
};
