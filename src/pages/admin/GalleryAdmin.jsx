import React, { useState, useEffect, useRef, useCallback } from 'react';
import { galleryAPI } from '../../api';

const EMPTY_FORM = {
  title: '',
  description: '',
  category: 'General',
  mediaType: 'image',
  sourceType: 'upload',
  mediaUrl: '',
};

// Grabs a frame from a local video File so the admin sees a thumbnail
// immediately, before the file is even uploaded to Cloudinary.
const generateClientVideoThumbnail = (file) =>
  new Promise((resolve) => {
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      video.src = URL.createObjectURL(file);

      video.onloadeddata = () => {
        video.currentTime = Math.min(0.5, (video.duration || 1) / 2);
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 400;
        canvas.height = video.videoHeight || 300;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
        URL.revokeObjectURL(video.src);
      };
      video.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });

const PlayIconOverlay = () => (
  <div className="ga-play-overlay">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>
);

// A plain <video> tag cannot play a YouTube page URL — detect it and use
// YouTube's iframe embed + thumbnail CDN instead of a broken video player.
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

const MediaThumb = ({ item, previewUrl }) => {
  const src = previewUrl || getEffectiveThumbnail(item) || (item.mediaType === 'image' ? item.mediaUrl : '');
  if (item.mediaType === 'video') {
    return (
      <div className="ga-thumb ga-thumb--video">
        {src ? <img src={src} alt={item.title} /> : <div className="ga-thumb-fallback">🎬</div>}
        <PlayIconOverlay />
      </div>
    );
  }
  return (
    <div className="ga-thumb">
      {src ? <img src={src} alt={item.title} /> : <div className="ga-thumb-fallback">🖼️</div>}
    </div>
  );
};

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [banner, setBanner] = useState(null); // { type: 'success' | 'error', text }

  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await galleryAPI.getAll();
      setItems(res.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (!banner) return;
    const t = setTimeout(() => setBanner(null), 3500);
    return () => clearTimeout(t);
  }, [banner]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setFile(null);
    setPreviewUrl('');
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'General',
      mediaType: item.mediaType || 'image',
      sourceType: item.sourceType || 'upload',
      mediaUrl: item.sourceType === 'url' ? item.mediaUrl : '',
    });
    setFile(null);
    setPreviewUrl(item.mediaType === 'image' ? item.mediaUrl : getEffectiveThumbnail(item));
    setEditingId(item._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleFileChange = async (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);

    if (form.mediaType === 'video') {
      setPreviewUrl(''); // clear while generating
      const thumb = await generateClientVideoThumbnail(selected);
      setPreviewUrl(thumb || '');
    } else {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleMediaTypeChange = (type) => {
    setForm((f) => ({ ...f, mediaType: type }));
    setFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleMediaUrlChange = (value) => {
    setForm((f) => ({ ...f, mediaUrl: value }));
    if (form.mediaType === 'image') {
      setPreviewUrl(value.trim());
      return;
    }
    const ytId = getYouTubeId(value);
    setPreviewUrl(ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '');
  };

  const handleSourceTypeChange = (type) => {
    setForm((f) => ({ ...f, sourceType: type }));
    setFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (form.sourceType === 'upload' && !file && !editingId) {
      setError('Please choose a file to upload');
      return;
    }
    if (form.sourceType === 'url' && !form.mediaUrl.trim()) {
      setError('Please paste a media URL');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        mediaType: form.mediaType,
        sourceType: form.sourceType,
      };
      if (form.sourceType === 'url') payload.mediaUrl = form.mediaUrl;
      if (form.sourceType === 'upload' && file) payload.file = file;

      if (editingId) {
        await galleryAPI.update(editingId, payload);
        setBanner({ type: 'success', text: 'Gallery item updated' });
      } else {
        await galleryAPI.create(payload);
        setBanner({ type: 'success', text: 'Gallery item added' });
      }

      closeModal();
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await galleryAPI.delete(deleteId);
      setBanner({ type: 'success', text: 'Gallery item deleted' });
      setItems((prev) => prev.filter((i) => i._id !== deleteId));
    } catch (err) {
      setBanner({ type: 'error', text: err.response?.data?.error || 'Failed to delete item' });
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const typeMatch = filterType === 'All' || item.mediaType === filterType;
    const searchMatch =
      !search.trim() ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div className="ga-page">
      <style>{`
        .ga-page {
          --navy-900: #0b1f3a;
          --navy-700: #16305a;
          --navy-500: #2b4a80;
          --pink-500: #ec4899;
          --pink-600: #db2777;
          --pink-100: #fce7f3;
          --gray-50: #f7f8fb;
          --gray-100: #eef1f6;
          --gray-500: #64748b;
          --gray-900: #1e293b;
          min-height: 100vh;
          background: var(--gray-50);
          font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
          color: var(--gray-900);
        }
        .ga-header {
          background: linear-gradient(135deg, var(--navy-900), var(--navy-700));
          padding: 28px 32px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ga-header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.2px; }
        .ga-header p { margin: 4px 0 0; color: #cdd8ee; font-size: 13.5px; }
        .ga-btn {
          border: none; cursor: pointer; border-radius: 10px; font-weight: 600;
          font-size: 14px; padding: 10px 18px; transition: transform .12s ease, box-shadow .12s ease;
        }
        .ga-btn:active { transform: translateY(1px); }
        .ga-btn-primary { background: var(--pink-500); color: #fff; box-shadow: 0 6px 16px rgba(236,72,153,.35); }
        .ga-btn-primary:hover { background: var(--pink-600); }
        .ga-btn-ghost { background: rgba(255,255,255,.12); color: #fff; }
        .ga-btn-ghost:hover { background: rgba(255,255,255,.2); }
        .ga-btn-outline { background: #fff; color: var(--navy-900); border: 1.5px solid var(--gray-100); }
        .ga-btn-outline:hover { border-color: var(--pink-500); color: var(--pink-600); }
        .ga-btn-danger { background: #fff; color: #dc2626; border: 1.5px solid #fecaca; }
        .ga-btn-danger:hover { background: #fef2f2; }

        .ga-toolbar {
          display: flex; align-items: center; gap: 12px; padding: 20px 32px 0;
          flex-wrap: wrap;
        }
        .ga-tabs { display: flex; gap: 6px; background: #fff; padding: 4px; border-radius: 10px; border: 1px solid var(--gray-100); }
        .ga-tab {
          border: none; background: transparent; padding: 8px 16px; border-radius: 8px;
          font-size: 13.5px; font-weight: 600; color: var(--gray-500); cursor: pointer;
        }
        .ga-tab.active { background: var(--navy-900); color: #fff; }
        .ga-search {
          flex: 1; min-width: 200px; padding: 10px 14px; border-radius: 10px;
          border: 1px solid var(--gray-100); font-size: 14px; background: #fff;
        }
        .ga-search:focus { outline: none; border-color: var(--pink-500); }

        .ga-banner {
          margin: 16px 32px 0; padding: 12px 16px; border-radius: 10px; font-size: 14px; font-weight: 500;
        }
        .ga-banner.success { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
        .ga-banner.error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

        .ga-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px; padding: 24px 32px 48px;
        }
        .ga-card {
          background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid var(--gray-100);
          transition: transform .15s ease, box-shadow .15s ease; display: flex; flex-direction: column;
        }
        .ga-card:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(11,31,58,.12); }
        .ga-thumb { position: relative; width: 100%; aspect-ratio: 4/3; background: var(--gray-100); overflow: hidden; }
        .ga-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ga-thumb-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 34px; background: linear-gradient(135deg,var(--navy-900),var(--navy-500)); }
        .ga-thumb--video .ga-thumb-fallback { color: #fce7f3; }
        .ga-play-overlay {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
        }
        .ga-play-overlay svg { background: rgba(11,31,58,.55); border-radius: 999px; padding: 10px; box-shadow: 0 0 0 3px rgba(236,72,153,.55); }
        .ga-badge {
          position: absolute; top: 10px; left: 10px; background: var(--pink-500); color: #fff;
          font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; letter-spacing: .3px;
        }
        .ga-card-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .ga-card-title { font-size: 15px; font-weight: 700; color: var(--navy-900); line-height: 1.3; }
        .ga-card-cat { font-size: 12px; color: var(--pink-600); font-weight: 600; }
        .ga-card-desc { font-size: 13px; color: var(--gray-500); line-height: 1.4; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .ga-card-actions { display: flex; gap: 8px; margin-top: 6px; }
        .ga-card-actions .ga-btn { flex: 1; padding: 8px 10px; font-size: 13px; }

        .ga-empty { text-align: center; padding: 60px 20px; color: var(--gray-500); }
        .ga-empty .emoji { font-size: 40px; margin-bottom: 10px; }
        .ga-loading { padding: 60px; text-align: center; color: var(--gray-500); }

        .ga-modal-overlay {
          position: fixed; inset: 0; background: rgba(11,31,58,.55); display: flex;
          align-items: flex-start; justify-content: center; padding: 40px 16px; overflow-y: auto; z-index: 50;
        }
        .ga-modal {
          background: #fff; border-radius: 16px; width: 100%; max-width: 560px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,.3);
        }
        .ga-modal-header {
          background: linear-gradient(135deg, var(--navy-900), var(--navy-700)); color: #fff;
          padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;
        }
        .ga-modal-header h2 { margin: 0; font-size: 18px; }
        .ga-modal-close { background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; opacity: .8; }
        .ga-modal-close:hover { opacity: 1; }
        .ga-modal-body { padding: 22px 24px; max-height: 70vh; overflow-y: auto; }
        .ga-field { margin-bottom: 16px; }
        .ga-field label { display: block; font-size: 13px; font-weight: 600; color: var(--navy-900); margin-bottom: 6px; }
        .ga-field input[type="text"], .ga-field input[type="url"], .ga-field textarea, .ga-field select {
          width: 100%; padding: 10px 12px; border: 1.5px solid var(--gray-100); border-radius: 9px;
          font-size: 14px; font-family: inherit; box-sizing: border-box;
        }
        .ga-field input:focus, .ga-field textarea:focus, .ga-field select:focus { outline: none; border-color: var(--pink-500); }
        .ga-field textarea { resize: vertical; min-height: 70px; }
        .ga-row { display: flex; gap: 12px; }
        .ga-row .ga-field { flex: 1; }
        .ga-segmented { display: flex; gap: 8px; }
        .ga-segmented button {
          flex: 1; padding: 9px 0; border-radius: 9px; border: 1.5px solid var(--gray-100); background: #fff;
          font-size: 13.5px; font-weight: 600; color: var(--gray-500); cursor: pointer;
        }
        .ga-segmented button.active { border-color: var(--pink-500); background: var(--pink-100); color: var(--pink-600); }
        .ga-file-drop {
          border: 1.5px dashed var(--gray-100); border-radius: 10px; padding: 16px; text-align: center;
          background: var(--gray-50); cursor: pointer;
        }
        .ga-file-drop:hover { border-color: var(--pink-500); }
        .ga-preview-wrap { margin-top: 12px; display: flex; justify-content: center; }
        .ga-preview { position: relative; width: 100%; max-width: 260px; aspect-ratio: 4/3; border-radius: 10px; overflow: hidden; background: var(--gray-100); }
        .ga-preview img { width: 100%; height: 100%; object-fit: cover; }
        .ga-modal-footer { padding: 16px 24px 22px; display: flex; gap: 10px; justify-content: flex-end; }
        .ga-error-text { color: #dc2626; font-size: 13px; margin-bottom: 12px; font-weight: 500; }
        .ga-hint { font-size: 12px; color: var(--gray-500); margin-top: 6px; }

        .ga-confirm-overlay {
          position: fixed; inset: 0; background: rgba(11,31,58,.55); display: flex;
          align-items: center; justify-content: center; z-index: 60; padding: 16px;
        }
        .ga-confirm-box { background: #fff; border-radius: 14px; padding: 24px; max-width: 360px; text-align: center; }
        .ga-confirm-box h3 { margin: 0 0 8px; color: var(--navy-900); font-size: 17px; }
        .ga-confirm-box p { margin: 0 0 18px; color: var(--gray-500); font-size: 14px; }
        .ga-confirm-actions { display: flex; gap: 10px; }
        .ga-confirm-actions .ga-btn { flex: 1; }
      `}</style>

      <div className="ga-header">
        <div>
          <h1>Gallery Manager</h1>
          <p>Add, edit, and organize photos and videos shown on the public Gallery page</p>
        </div>
        <button className="ga-btn ga-btn-primary" onClick={openCreate}>+ Add Media</button>
      </div>

      <div className="ga-toolbar">
        <div className="ga-tabs">
          {['All', 'image', 'video'].map((t) => (
            <button
              key={t}
              className={`ga-tab ${filterType === t ? 'active' : ''}`}
              onClick={() => setFilterType(t)}
            >
              {t === 'All' ? 'All' : t === 'image' ? 'Images' : 'Videos'}
            </button>
          ))}
        </div>
        <input
          className="ga-search"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {banner && <div className={`ga-banner ${banner.type}`}>{banner.text}</div>}

      {loading ? (
        <div className="ga-loading">Loading gallery items...</div>
      ) : filteredItems.length === 0 ? (
        <div className="ga-empty">
          <div className="emoji">🖼️</div>
          <p>{items.length === 0 ? 'No gallery items yet. Add your first photo or video.' : 'Nothing matches your filters.'}</p>
        </div>
      ) : (
        <div className="ga-grid">
          {filteredItems.map((item) => (
            <div className="ga-card" key={item._id}>
              <MediaThumb item={item} />
              <span className="ga-badge" style={{ top: 10, left: 10 }}>{item.mediaType === 'video' ? 'Video' : 'Image'}</span>
              <div className="ga-card-body">
                <div className="ga-card-title">{item.title}</div>
                <div className="ga-card-cat">{item.category}</div>
                {item.description && <div className="ga-card-desc">{item.description}</div>}
                <div className="ga-card-actions">
                  <button className="ga-btn ga-btn-outline" onClick={() => openEdit(item)}>Edit</button>
                  <button className="ga-btn ga-btn-danger" onClick={() => setDeleteId(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="ga-modal-overlay" onClick={closeModal}>
          <div className="ga-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ga-modal-header">
              <h2>{editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
              <button className="ga-modal-close" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="ga-modal-body">
                {error && <div className="ga-error-text">{error}</div>}

                <div className="ga-field">
                  <label>Media Type</label>
                  <div className="ga-segmented">
                    <button type="button" className={form.mediaType === 'image' ? 'active' : ''} onClick={() => handleMediaTypeChange('image')}>🖼️ Image</button>
                    <button type="button" className={form.mediaType === 'video' ? 'active' : ''} onClick={() => handleMediaTypeChange('video')}>🎬 Video</button>
                  </div>
                </div>

                <div className="ga-field">
                  <label>Source</label>
                  <div className="ga-segmented">
                    <button type="button" className={form.sourceType === 'upload' ? 'active' : ''} onClick={() => handleSourceTypeChange('upload')}>⬆ Upload File</button>
                    <button type="button" className={form.sourceType === 'url' ? 'active' : ''} onClick={() => handleSourceTypeChange('url')}>🔗 Paste URL</button>
                  </div>
                </div>

                {form.sourceType === 'upload' ? (
                  <div className="ga-field">
                    <label>{form.mediaType === 'video' ? 'Video file (any size)' : 'Image file'}</label>
                    <div className="ga-file-drop" onClick={() => fileInputRef.current?.click()}>
                      {file ? file.name : editingId ? 'Click to replace the current file' : 'Click to choose a file'}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={form.mediaType === 'video' ? 'video/*' : 'image/*'}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                ) : (
                  <div className="ga-field">
                    <label>Media URL</label>
                    <input
                      type="url"
                      placeholder={form.mediaType === 'video' ? 'YouTube link or direct .mp4 URL' : 'https://example.com/photo.jpg'}
                      value={form.mediaUrl}
                      onChange={(e) => handleMediaUrlChange(e.target.value)}
                    />
                    {form.mediaType === 'video' && (
                      <div className="ga-hint">
                        Paste a YouTube link (played via embed) or a direct video file URL (e.g. ending in .mp4).
                      </div>
                    )}
                  </div>
                )}

                {previewUrl && (
                  <div className="ga-preview-wrap">
                    <div className="ga-preview">
                      <img src={previewUrl} alt="preview" />
                      {form.mediaType === 'video' && <PlayIconOverlay />}
                    </div>
                  </div>
                )}

                <div className="ga-field" style={{ marginTop: 16 }}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Annual Sports Day 2026"
                  />
                </div>

                <div className="ga-row">
                  <div className="ga-field">
                    <label>Category</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      placeholder="e.g. Events"
                    />
                  </div>
                </div>

                <div className="ga-field">
                  <label>Description (optional)</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Short caption shown with the media"
                  />
                </div>
              </div>

              <div className="ga-modal-footer">
                <button type="button" className="ga-btn ga-btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="ga-btn ga-btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : editingId ? 'Save Changes' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="ga-confirm-overlay" onClick={() => !deleting && setDeleteId(null)}>
          <div className="ga-confirm-box" onClick={(e) => e.stopPropagation()}>
            <h3>Delete this item?</h3>
            <p>This will permanently remove the media from the gallery.</p>
            <div className="ga-confirm-actions">
              <button className="ga-btn ga-btn-outline" onClick={() => setDeleteId(null)} disabled={deleting}>Cancel</button>
              <button className="ga-btn ga-btn-danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}