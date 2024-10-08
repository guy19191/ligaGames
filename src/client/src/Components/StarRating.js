import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ onChange ,ratingDefult}) => {
    const [rating, setRating] = useState(ratingDefult);
    const [hover, setHover] = useState(0);

    const handleMouseMove = (e, index) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - left) / width;
        setHover(index + (percent > 0.5 ? 1 : 0.5));
    };

    const handleClick = () => {
        setRating(hover);
        if (typeof onChange === 'function') {
            onChange(hover);
        }
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const renderStar = (index) => {
        const value = hover || rating;
        const filled = value >= index + 1;
        const halfFilled = value >= index + 0.5 && value < index + 1;

        return (
            <div
                key={index}
                style={{
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'inline-block',
                    margin: '0 8px',
                    direction: 'ltr'
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <Star
                    size={48}
                    style={{
                        color: '#D1D5DB', // text-gray-300 equivalent
                        fill: 'none',
                        stroke: 'currentColor'
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        overflow: 'hidden',
                        width: filled ? '100%' : halfFilled ? '50%' : '0%',
                        direction: 'ltr'
                    }}
                >
                    <Star
                        size={48}
                        style={{
                            fill: 'rgb(250 204 21)',
                            stroke: 'rgb(250 204 21)'
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
            <div>
            {[0, 1, 2, 3, 4].map(renderStar)}
        </div>

    );
};

export default StarRating;