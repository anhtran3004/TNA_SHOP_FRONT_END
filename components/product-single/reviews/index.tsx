import ReviewsList from './reviews-list';
import Punctuation from './punctuation';
import {Comment, Product} from 'types';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getListComment} from "../../../lib/Comment/API";

type ReviewsProductType = {
  show: boolean;
  product: Product
  setCommentLength: Dispatch<SetStateAction<number>>
}

const Reviews = ({ show, product,  setCommentLength}: ReviewsProductType) => {
  const [reviews, setReviews] = useState<Comment[]>([])
  const [statusInsert, setStatusInsert] = useState(0)
  const style = {
    display: show ? 'flex' : 'none',
  }
  useEffect(() =>{
    async function fetchDataComment(){
      try{
        const res = await getListComment(product.id)
        if(res.code === 200){
          setReviews(res.data);
          setCommentLength(res.data.length);
        }
      }catch (e){
        console.log('error fetch comment')
      }
    }
    fetchDataComment().then();
  }, [product, statusInsert])
  return (
    <section style={style} className="product-single__reviews">
      <Punctuation
       reviews={reviews}
       product={product}
       setStatusInsert={setStatusInsert}
      />
      <ReviewsList reviews={reviews} />
    </section>
  );
};
  
export default Reviews;
    