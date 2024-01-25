import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
//css
import "./rating.css";
import { useState } from 'react';

const Rating = (props) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const {setPropertyValue} = props;

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type='radio'
                            name="rating"
                            value={currentRating}
                            onClick={() => {setRating(currentRating); setPropertyValue(currentRating);}}
                        />
                        {currentRating <= (hover || rating) ? (
                            <StarPurple500OutlinedIcon
                                className='star'
                                style={{ color: "gold" }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        ) : (
                            <StarBorderPurple500OutlinedIcon
                                className='star'
                                style={{ color: "green" }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        )}
                    </label>
                );
            })}
        </div>
    );
}

export default Rating;
