import React, { useState, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import SketchCard from './SketchCard';
import { getSketches } from '../sketches';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const allSketches = useMemo(() => getSketches(), []);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    allSketches.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, [allSketches]);

  const filteredSketches = useMemo(() => {
    if (selectedCategory === 'all') return allSketches;
    return allSketches.filter((s) => s.category === selectedCategory);
  }, [allSketches, selectedCategory]);

  return (
    <div className={styles.galleryPage}>
      <Header />

      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.activeFilter : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All ({allSketches.length})
        </button>
        {categories.map((cat) => {
          const count = allSketches.filter((s) => s.category === cat).length;
          const label = allSketches.find((s) => s.category === cat)?.categoryLabel || cat;
          return (
            <button
              key={cat}
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilter : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      <main className={styles.grid}>
        {filteredSketches.map((item) => (
          <SketchCard key={item.id} item={item} />
        ))}
      </main>

      {filteredSketches.length === 0 && (
        <p className={styles.emptyState}>No sketches found in this category.</p>
      )}

      <Footer />
    </div>
  );
}
