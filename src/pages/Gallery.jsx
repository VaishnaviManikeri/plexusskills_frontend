// frontend/src/pages/Gallery.jsx
import { useState, useEffect, useCallback } from 'react';
import { galleryAPI } from '../api';
import { FaImage, FaVideo, FaTimes, FaPlay, FaTh, FaBars } from 'react-icons/fa';

const PlayIconOverlay = () => (
  <div className="gp-play-overlay">
    <FaPlay size={24} className="gp-play-icon" />
  </div>
);

// Get YouTube ID from URL
const getYouTubeId = (url = '') => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const getEffectiveThumbnail = (item) => {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  const ytId = item.mediaType === 'video' ? getYouTubeId(item.mediaUrl) : null;
  return ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '';
};

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeItem, setActiveItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await galleryAPI.getAll();
      setItems(res.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load the gallery');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActiveItem(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filteredItems = items.filter((i) => filter === 'All' || i.mediaType === filter);
  const categories = ['All', 'image', 'video'];

  return (
    <div className="gp-page">
      <style>{`
        .gp-page {
          --navy: #001C46;
          --navy-light: #0A2A6B;
          --navy-dark: #00123A;
          --purple: #761E6B;
          --pink: #E31B23;
          --gradient: linear-gradient(135deg, #761E6B, #E31B23);
          --white: #FFFFFF;
          --off-white: #F5F7FC;
          --gray-light: #E8EEFF;
          --gray-mid: #5A6A8A;
          --gray-dark: #2A3A5A;
          min-height: 100vh;
          background: var(--off-white);
          font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
        }

        /* Hero Section */
        .gp-hero {
          background: var(--navy);
          padding: 60px 32px 48px;
          text-align: center;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .gp-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(118, 30, 107, 0.2), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .gp-hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(227, 27, 35, 0.15), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .gp-hero-content {
          position: relative;
          z-index: 2;
        }
        .gp-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }
        .gp-hero h1 {
          margin: 0;
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .gp-hero h1 .highlight {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gp-hero p {
          margin: 12px auto 0;
          max-width: 560px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        /* Tabs */
        .gp-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 28px;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
        }
        .gp-tab {
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          padding: 10px 28px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .gp-tab:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .gp-tab.active {
          background: var(--gradient);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 8px 25px rgba(227, 27, 35, 0.3);
        }
        .gp-tab svg {
          font-size: 0.9rem;
        }

        /* View Mode Toggle */
        .gp-view-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          padding: 4px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 28, 70, 0.08);
          margin: 24px auto 0;
          max-width: fit-content;
        }
        .gp-view-btn {
          padding: 8px 14px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: var(--gray-mid);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .gp-view-btn:hover {
          color: var(--navy);
        }
        .gp-view-btn.active {
          background: var(--gradient);
          color: #fff;
          box-shadow: 0 4px 15px rgba(118, 30, 107, 0.25);
        }

        /* Grid */
        .gp-grid-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 32px 64px;
        }
        .gp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .gp-grid.list-view {
          grid-template-columns: 1fr;
        }

        /* Cards */
        .gp-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--gray-light);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 12px rgba(0, 28, 70, 0.06);
        }
        .gp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0, 28, 70, 0.14);
        }
        .gp-card.list-view {
          display: flex;
          flex-direction: row;
        }
        .gp-card.list-view .gp-thumb {
          width: 200px;
          min-height: 150px;
          flex-shrink: 0;
        }
        .gp-card.list-view .gp-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .gp-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          background: var(--gray-light);
          overflow: hidden;
        }
        .gp-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .gp-card:hover .gp-thumb img {
          transform: scale(1.05);
        }
        .gp-thumb-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          background: var(--gradient);
          color: rgba(255, 255, 255, 0.3);
        }

        /* Play Overlay */
        .gp-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 28, 70, 0.2);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gp-card:hover .gp-play-overlay {
          opacity: 1;
        }
        .gp-play-icon {
          background: rgba(0, 28, 70, 0.7);
          border-radius: 50%;
          padding: 14px;
          padding-left: 18px;
          color: #fff;
          box-shadow: 0 0 0 3px rgba(227, 27, 35, 0.4);
          transition: all 0.3s ease;
          width: 60px;
          height: 60px;
        }
        .gp-card:hover .gp-play-icon {
          transform: scale(1.1);
          box-shadow: 0 0 0 4px rgba(227, 27, 35, 0.6);
        }

        .gp-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--gradient);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .gp-card-body {
          padding: 16px 20px 20px;
        }
        .gp-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 2px;
          line-height: 1.3;
        }
        .gp-card-cat {
          font-size: 0.8rem;
          color: var(--purple);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .gp-card-cat .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--pink);
        }

        /* Empty & Loading */
        .gp-empty, .gp-loading {
          text-align: center;
          padding: 80px 20px;
          color: var(--gray-mid);
        }
        .gp-empty .icon {
          font-size: 48px;
          color: var(--purple);
          margin-bottom: 16px;
          opacity: 0.4;
        }
        .gp-empty h3 {
          font-size: 1.4rem;
          color: var(--navy);
          margin-bottom: 8px;
        }

        /* Lightbox */
        .gp-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 28, 70, 0.92);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
          animation: gpFadeIn 0.3s ease;
        }
        @keyframes gpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .gp-lightbox {
          max-width: 900px;
          width: 100%;
          text-align: center;
          animation: gpSlideUp 0.4s ease;
        }
        @keyframes gpSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .gp-lightbox-media {
          max-height: 74vh;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .gp-lightbox-media img,
        .gp-lightbox-media video {
          width: 100%;
          max-height: 74vh;
          object-fit: contain;
          display: block;
          margin: 0 auto;
          background: #000;
        }
        .gp-lightbox-media .gp-youtube-frame {
          width: 100%;
          aspect-ratio: 16/9;
          max-height: 74vh;
          border: none;
          display: block;
        }
        .gp-lightbox-caption {
          color: #fff;
          margin-top: 20px;
          text-align: center;
        }
        .gp-lightbox-caption h3 {
          margin: 0 0 4px;
          font-size: 1.3rem;
          font-weight: 700;
        }
        .gp-lightbox-caption p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
        }
        .gp-lightbox-close {
          position: fixed;
          top: 24px;
          right: 32px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gp-lightbox-close:hover {
          background: var(--gradient);
          border-color: transparent;
          transform: rotate(90deg);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .gp-hero { padding: 40px 20px 32px; }
          .gp-hero h1 { font-size: 2rem; }
          .gp-hero p { font-size: 0.95rem; }
          .gp-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
          .gp-grid-container { padding: 24px 16px 40px; }
          .gp-card.list-view { flex-direction: column; }
          .gp-card.list-view .gp-thumb { width: 100%; aspect-ratio: 4/3; min-height: auto; }
          .gp-tab { padding: 8px 16px; font-size: 0.8rem; }
          .gp-lightbox-close { top: 16px; right: 16px; width: 36px; height: 36px; font-size: 16px; }
          .gp-view-toggle { margin-top: 16px; }
          .gp-view-btn { padding: 6px 10px; font-size: 0.8rem; }
        }

        @media (max-width: 480px) {
          .gp-grid { grid-template-columns: 1fr; gap: 16px; }
          .gp-hero h1 { font-size: 1.6rem; }
          .gp-tabs { gap: 6px; }
          .gp-tab { padding: 6px 14px; font-size: 0.75rem; }
          .gp-tab svg { display: none; }
        }
      `}</style>

      {/* Hero Section */}
      <div className="gp-hero">
        <div className="gp-hero-content">
          <div className="gp-hero-badge">
            📸 Moments That Matter
          </div>
          <h1>
            Our <span className="highlight">Gallery</span>
          </h1>
          <p>
            Explore moments from our campus — events, activities, and everyday life 
            captured in photos and videos.
          </p>
          <div className="gp-tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={`gp-tab ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c === 'All' ? (
                  <>
                    <span>⊞</span> All
                  </>
                ) : c === 'image' ? (
                  <>
                    <FaImage /> Photos
                  </>
                ) : (
                  <>
                    <FaVideo /> Videos
                  </>
                )}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="gp-view-toggle">
            <button
              className={`gp-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FaTh /> Grid
            </button>
            <button
              className={`gp-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FaBars /> List
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="gp-grid-container">
        {loading ? (
          <div className="gp-loading">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#761E6B] mx-auto"></div>
            <p className="mt-4 font-medium">Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="gp-empty">
            <div className="icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="gp-empty">
            <div className="icon">🖼️</div>
            <h3>No Media Found</h3>
            <p>No {filter === 'All' ? 'media' : filter === 'image' ? 'photos' : 'videos'} to show yet.</p>
          </div>
        ) : (
          <div className={`gp-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {filteredItems.map((item) => (
              <div className="gp-card" key={item._id} onClick={() => setActiveItem(item)}>
                <div className="gp-thumb">
                  {item.mediaType === 'image' ? (
                    <img src={item.mediaUrl} alt={item.title} />
                  ) : getEffectiveThumbnail(item) ? (
                    <img src={getEffectiveThumbnail(item)} alt={item.title} />
                  ) : (
                    <div className="gp-thumb-fallback">🎬</div>
                  )}
                  {item.mediaType === 'video' && <PlayIconOverlay />}
                  <span className="gp-badge">
                    {item.mediaType === 'video' ? (
                      <><FaVideo size={10} /> Video</>
                    ) : (
                      <><FaImage size={10} /> Photo</>
                    )}
                  </span>
                </div>
                <div className="gp-card-body">
                  <div className="gp-card-title">{item.title}</div>
                  <div className="gp-card-cat">
                    {item.category || 'General'}
                    <span className="dot"></span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div className="gp-lightbox-overlay" onClick={() => setActiveItem(null)}>
          <button className="gp-lightbox-close" onClick={() => setActiveItem(null)}>
            <FaTimes />
          </button>
          <div className="gp-lightbox" onClick={(e) => e.stopPropagation()}>
            <div className="gp-lightbox-media">
              {activeItem.mediaType === 'image' ? (
                <img src={activeItem.mediaUrl} alt={activeItem.title} />
              ) : getYouTubeId(activeItem.mediaUrl) ? (
                <iframe
                  className="gp-youtube-frame"
                  src={`https://www.youtube.com/embed/${getYouTubeId(activeItem.mediaUrl)}?autoplay=1&rel=0`}
                  title={activeItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeItem.mediaUrl}
                  controls
                  autoPlay
                  poster={getEffectiveThumbnail(activeItem) || undefined}
                />
              )}
            </div>
            <div className="gp-lightbox-caption">
              <h3>{activeItem.title}</h3>
              {activeItem.description && <p>{activeItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
