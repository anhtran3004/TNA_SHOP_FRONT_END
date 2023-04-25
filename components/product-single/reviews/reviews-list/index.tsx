import Rater from 'react-rater';
import createMarkup from 'utils/markup';
import {Comment, ReviewType} from 'types';
import {useEffect} from "react";

type ReviewsListType = {
  reviews: Comment[];
}
// useEffect(() =>{
//
// }, [])
const ReviewsList = (props: ReviewsListType) => {

  return (
    <section className="reviews-list">
      {props.reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review__avatar">
            <img src="/images/products/user.png" alt="avatar" />
          </div>
          
          <div className="review__content">
            <h3>{ review.username }</h3>
            <Rater total={5} interactive={false} rating={review.rating} />
            <div className="review__comment" dangerouslySetInnerHTML={createMarkup(review.content)}>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
  
export default ReviewsList;
    