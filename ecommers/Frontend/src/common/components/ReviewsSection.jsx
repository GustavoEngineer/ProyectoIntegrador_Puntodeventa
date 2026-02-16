import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/layout/body/main/context/AuthContext';
import { apiCall } from '../../services/api';
import StarRating from './StarRating';
import Button from './Button';

const ReviewsSection = ({ productId }) => {
    const { user, isAuthenticated } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const data = await apiCall(`/resenas/pieza/${productId}`);
            setReviews(data || []);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            // Don't show critical error for empty reviews, just empty list
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        if (rating === 0) {
            setError('Por favor selecciona una calificación');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            await apiCall('/resenas', {
                method: 'POST',
                body: JSON.stringify({
                    Id_Usuario: user.id, // Assuming user object has id
                    Id_Pieza: productId,
                    Calificacion: rating,
                    Comentario: comment
                })
            });

            // Refresh reviews and reset form
            setComment('');
            setRating(0);
            fetchReviews();
            alert('Reseña agregada correctamente');
        } catch (err) {
            console.error('Error submitting review:', err);
            setError(err.message || 'Error al enviar la reseña');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="reviews-section">
            <h3 className="section-title">Reseñas</h3>

            {/* Reviews List */}
            <div className="reviews-list">
                {loading ? (
                    <p>Cargando reseñas...</p>
                ) : reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-card-header">
                                <div className="review-user-info">
                                    <div className="review-avatar" style={{ backgroundColor: ['#E0E7FF', '#FEF3C7', '#DCFCE7', '#FEE2E2'][index % 4] }}>
                                        {/* Avatar Placeholder */}
                                        <span className="avatar-text" style={{ color: ['#4F46E5', '#D97706', '#16A34A', '#DC2626'][index % 4] }}>
                                            {/* Initials (assuming Id_Usuario for now, ideally Name) */}
                                            U{review.Id_Usuario}
                                        </span>
                                    </div>
                                    <div className="review-meta">
                                        <h4 className="reviewer-name">Usuario {review.Id_Usuario}</h4>
                                        <div className="rating-row">
                                            <StarRating rating={review.Calificacion} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="review-card-body">
                                <p className="review-comment">{review.Comentario}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewsSection;
