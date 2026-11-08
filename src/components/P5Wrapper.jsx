import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import styles from './P5Wrapper.module.css';

/**
 * P5Wrapper - Mounts and cleans up a p5.js instance mode sketch in a React component.
 *
 * @param {Object} props
 * @param {Function} props.sketch - Instance mode function (p) => { ... }
 */
export default function P5Wrapper({ sketch }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !sketch) return;

    let canvasInstance = null;

    try {
      canvasInstance = new p5(sketch, containerRef.current);
    } catch (err) {
      console.error('Failed to initialize p5 instance:', err);
    }

    return () => {
      if (canvasInstance) {
        canvasInstance.remove();
        canvasInstance = null;
      }
    };
  }, [sketch]);

  return <div ref={containerRef} className={styles.canvasContainer} />;
}
