import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = (props) => {
    const [hover, setHover] = useState(null);
    const rating = props.rating;
    const setRating = props.setRating;
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input
                            className="rating"
                            type="radio"
                            name="star"
                            value={ratingValue}
                            onChange={() => setRating(ratingValue)}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#fcbe32" : "#e4e5e9"}
                            size={20}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            {rating}점
        </div>
    );
};

export default StarRating;