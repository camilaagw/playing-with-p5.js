import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Gallery from './components/Gallery';
import SketchPage from './components/SketchPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/sketch/:id" element={<SketchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
