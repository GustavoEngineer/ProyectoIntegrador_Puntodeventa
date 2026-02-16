import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating, onRatingChange, readOnly = true }) => {
    // Default to 0 if rating is null/undefined
    const validRating = Number(rating) || 0;
    const [hoverRating, setHoverRating] = React.useState(0);

    // We will display 5 stars
    const totalStars = 5;

    return (
        <div
            className="flex items-center space-x-1"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: readOnly ? 'default' : 'pointer' }}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
        >
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = hoverRating ? starValue <= hoverRating : starValue <= Math.round(validRating);

                return (
                    <svg
                        key={index}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isFilled ? "#FBBF24" : "#E5E7EB"} // Gold if filled, Gray-200 if empty
                        stroke="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onMouseEnter={() => !readOnly && setHoverRating(starValue)}
                        onClick={() => !readOnly && onRatingChange && onRatingChange(starValue)}
                        style={{ transition: 'fill 0.1s' }}
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            })}
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onRatingChange: PropTypes.func,
    readOnly: PropTypes.bool
};

export default StarRating;
