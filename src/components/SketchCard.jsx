import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SketchCard.module.css';

export default function SketchCard({ item }) {
  const [imgError, setImgError] = useState(false);

  const cardClasses = [
    styles.card,
    item.darkerOverlay ? styles.darkerOverlay : '',
  ].filter(Boolean).join(' ');

  const hasThumbnail = Boolean(item.thumbnail) && !imgError;

  return (
    <Link to={`/sketch/${item.id}`} className={cardClasses}>
      <div className={styles.imageWrapper}>
        {hasThumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className={styles.thumbnail}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderTitle}>{item.title}</span>
          </div>
        )}
        <div className={styles.overlay}>{item.title}</div>
        {item.hasLiveSketch ? (
          <span className={`${styles.badge} ${styles.liveBadge}`} title="Live React p5 Canvas">
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
