import RateReviewIcon from '@mui/icons-material/RateReview';
//css
import "./noReviews.css"

const NoReviews = ()=>{
    return(
        <div className="no-reviews-container">
            <div className='icon-container'>
                <RateReviewIcon className='no-review-icon'/>
            </div>
            <p>No Reviews Yet</p>
        </div>
    );
}

export default NoReviews;