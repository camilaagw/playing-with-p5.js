import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSketchById } from '../sketches';
import P5Wrapper from './P5Wrapper';
import styles from './SketchPage.module.css';

export default function SketchPage() {
  const { id } = useParams();
  const [sketchFn, setSketchFn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const p5InstanceRef = useRef(null);
  const item = getSketchById(id);

  const handleCanvasReady = useCallback((instance) => {
    p5InstanceRef.current = instance;
  }, []);

  const takeSnapshot = useCallback(() => {
    const inst = p5InstanceRef.current;
    if (!inst || !inst.canvas) {
      setToastMessage('Canvas not ready yet.');
      return;
    }

    try {
      const dataUrl = inst.canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `${item.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setToastMessage(`📸 Snapshot saved as ${item.id}.png!`);
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.error('Failed to take snapshot:', err);
      setToastMessage('Could not capture canvas snapshot.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  }, [item]);

  useEffect(() => {
    function handleKeyDown(e) {
      // 's' or 'S' snapshots thumbnail (unless typing in an input)
      if (
        (e.key === 's' || e.key === 'S') &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
      ) {
        takeSnapshot();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [takeSnapshot]);

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
        <div className={styles.topBarActions}>
          {sketchFn && (
            <button
              onClick={takeSnapshot}
              className={styles.snapshotBtn}
              title="Save a PNG snapshot of current canvas (shortcut: S)"
            >
              📸 Snapshot Thumbnail (S)
            </button>
          )}
        </div>
      </div>

      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

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
          <P5Wrapper sketch={sketchFn} onCanvasReady={handleCanvasReady} />
        ) : (
          <div className={styles.pendingCard}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className={styles.pendingThumbnail}
            />
            <p className={styles.pendingNotice}>
              This sketch is queued for migration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
