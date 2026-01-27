import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => {
    // Default to 0 if rating is null/undefined
    const validRating = Number(rating) || 0;

    // We will display 5 stars
    const totalStars = 5;

    return (
        <div className="flex items-center space-x-1" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {[...Array(totalStars)].map((_, index) => {
                const starFilled = index < Math.round(validRating);
                return (
                    <svg
                        key={index}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={starFilled ? "#FBBF24" : "#E5E7EB"} // Gold if filled, Gray-200 if empty
                        stroke="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            })}
            <span style={{ color: '#6B7280', fontSize: '0.875rem', marginLeft: '4px' }}>
                {validRating.toFixed(1)}
            </span>
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default StarRating;
