import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SketchCard.module.css';

export default function SketchCard({ item }) {
  const cardClasses = [
    styles.card,
    item.darkerOverlay ? styles.darkerOverlay : '',
  ].filter(Boolean).join(' ');

  return (
    <Link to={`/sketch/${item.id}`} className={cardClasses}>
      <div className={styles.imageWrapper}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className={styles.thumbnail}
          loading="lazy"
        />
        <div className={styles.overlay}>{item.title}</div>
        {item.hasLiveSketch ? (
          <span className={`${styles.badge} ${styles.liveBadge}`} title="Converted to React + p5 instance mode">
            Live
          </span>
        ) : null}
      </div>
      <div className={styles.meta}>
        <span className={styles.categoryTag}>{item.categoryLabel || item.category}</span>
      </div>
    </Link>
  );
}
