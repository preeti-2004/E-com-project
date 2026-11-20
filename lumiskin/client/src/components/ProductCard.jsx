
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../api';

export default function ProductCard({ p }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    api.get('/wishlist')
      .then(r => {
        if (active) {
          setLiked(r.data.some(item => item._id === p._id));
        }
      })
      .catch(() => {
        if (active) setLiked(false);
      });

    return () => {
      active = false;
    };
  }, [p._id]);

  const toggleWishlist = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const r = await api.post('/wishlist', { product: p._id });
      setLiked(r.data.added);
    } catch (error) {
      alert(error.response?.data?.message || 'Could not update wishlist. Please log in again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="product-card">
      <Link to={`/product/${p._id}`}>
        <div className="product-image">
          <img src={p.image} alt={p.name} />
          {p.featured && <span className="tag">LUMISKIN PICK</span>}
        </div>

        <div className="product-meta">
          <span>{p.category}</span>
          <span>★ {p.rating || '4.6'}</span>
        </div>

        <h3>{p.name}</h3>
        <p className="muted">{p.brand}</p>

        <div className="price">
          ₹{p.price.toLocaleString('en-IN')}
          {p.compareAtPrice > p.price && (
            <del> ₹{p.compareAtPrice.toLocaleString('en-IN')}</del>
          )}
        </div>
      </Link>

      <button
        className={`heart ${liked ? 'active' : ''}`}
        onClick={toggleWishlist}
        disabled={loading}
        aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
      </button>
    </article>
  );
}
