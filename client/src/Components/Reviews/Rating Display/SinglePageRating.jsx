import React from 'react';

//css
import "./SinglePageRating.css";

const SinglePageRating = (props) => {
    const review = props.review[0];
    const place = props.review[0].place;
    const name = props.review[0]?.userId?.name.split(" ")[0];

    // Function to generate star icons based on the rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                // If the current star index is less than or equal to the rating, render a filled star with golden color
                stars.push(<span key={i} style={{color: 'goldenrod', fontSize:'1.5rem'}}>&#9733;</span>);
            } else {
                // Otherwise, render an empty star with golden color
                stars.push(<span key={i} style={{color: 'goldenrod', fontSize:'1.5rem'}}>&#9734;</span>);
            }
        }
        return stars;
    };

    // Extracting ratings from the review object
    const { safetyOfWomen, accommodation, cuisine, transportation, cleanliness, money, veg } = review;

    return (
        <div className='rating-container-single'>
        <h2>{name}'s Ratings for {place}</h2>
            <div className='single-page-rating-container'>
            <div className='indiv-rating'>
                    <p>Safety of Women: {renderStars(safetyOfWomen)}</p>
                </div>
                <div className='indiv-rating'>
                    <p>Accommodation: {renderStars(accommodation)}</p>
                </div>
                <div className='indiv-rating'>
                    <p>Cuisine: {renderStars(cuisine)}</p>
                </div>
                <div className='indiv-rating'>
                    <p>Transportation: {renderStars(transportation)}</p>
                </div>
                <div className='indiv-rating'>
                    <p>Cleanliness: {renderStars(cleanliness)}</p>
                </div>
                <div className='indiv-rating'>
                    <p>Value For Money: {renderStars(money)}</p>
                </div>
                <div className='indiv-rating'>
                    <p>Veg Options: {renderStars(veg)}</p>
                </div>
            </div>
        </div>
    );
};

export default SinglePageRating;
