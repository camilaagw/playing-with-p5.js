import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/" className={styles.titleLink}>
          Dazzling Coding Creations
        </Link>
      </h1>
      <div className={styles.lineContainer}>
        <div className={styles.line} />
        <Link to="/" title="Home">
          <img src="images/logo.png" alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.line} />
      </div>
      <h2 className={styles.subtitle}>The home for things I draw with code.</h2>
    </header>
  );
}
