import React, { useState, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import SketchCard from './SketchCard';
import { getSketches } from '../sketches';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allSketches = useMemo(() => getSketches(), []);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set();
    allSketches.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, [allSketches]);

  // Combined search and category filtering
  const filteredSketches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allSketches.filter((s) => {
      const matchesCategory =
        selectedCategory === 'all' || s.category === selectedCategory;
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [allSketches, selectedCategory, searchQuery]);

  return (
    <div className={styles.galleryPage}>
      <Header />

      <div className={styles.controlsContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search sketches by title or concept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={styles.clearSearchBtn}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All ({allSketches.length})
          </button>
          {categories.map((cat) => {
            const count = allSketches.filter((s) => s.category === cat).length;
            const label =
              allSketches.find((s) => s.category === cat)?.categoryLabel || cat;
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

        <div className={styles.resultsCount}>
          Showing {filteredSketches.length} of {allSketches.length} sketches
        </div>
      </div>

      <main className={styles.grid}>
        {filteredSketches.map((item) => (
          <SketchCard key={item.id} item={item} />
        ))}
      </main>

      {filteredSketches.length === 0 && (
        <div className={styles.emptyState}>
          <p>No sketches found matching "{searchQuery}".</p>
          <button
            className={styles.resetBtn}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
