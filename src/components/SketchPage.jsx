import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSketchById } from '../sketches';
import P5Wrapper from './P5Wrapper';
import styles from './SketchPage.module.css';

export default function SketchPage() {
  const { id } = useParams();
  const [sketchFn, setSketchFn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const item = getSketchById(id);

  useEffect(() => {
    let isCancelled = false;

    if (!item) {
      setLoading(false);
      return;
    }

    if (item.hasLiveSketch && item.loadSketch) {
      setLoading(true);
      setError(null);
      item
        .loadSketch()
        .then((mod) => {
          if (!isCancelled) {
            setSketchFn(() => mod.default || mod);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            console.error('Failed to load sketch module:', err);
            setError('Could not load sketch.');
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [id, item]);

  if (!item) {
    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.backLink}>
            ← Back to Gallery
          </Link>
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Sketch Not Found</h1>
          <p className={styles.description}>
            The requested sketch does not exist in the collection.
          </p>
          <Link to="/" className={styles.legacyButton}>
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.backLink}>
          ← Back to Gallery
        </Link>
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{item.categoryLabel || item.category}</span>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.description}>{item.description}</p>
        {item.instructions && (
          <p className={styles.instructions}>{item.instructions}</p>
        )}

        {loading ? (
          <div className={styles.loading}>Loading sketch...</div>
        ) : error ? (
          <div className={styles.loading}>{error}</div>
        ) : sketchFn ? (
          <P5Wrapper sketch={sketchFn} />
        ) : (
          <div className={styles.pendingCard}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className={styles.pendingThumbnail}
            />
            <p className={styles.pendingNotice}>
              This sketch is queued for full React migration in Phase 3.
            </p>
            {item.legacyHref && (
              <a
                href={item.legacyHref}
                className={styles.legacyButton}
                target="_blank"
                rel="noreferrer"
              >
                View Legacy Version ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
