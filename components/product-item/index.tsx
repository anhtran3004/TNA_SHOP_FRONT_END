import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavProduct } from 'store/reducers/user';
import { RootState } from 'store';
import {Product} from 'types';
interface Props{
  product: Product
}
const ProductItem = (props: Props) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, productId => productId === props.product.id);

  // const toggleFav = () => {
  //   dispatch(toggleFavProduct(
  //     {
  //       id,
  //     }
  //   ))
  // }

  return (
    <div className="product-item">
      <div className="product__image">
        {/*<button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>*/}
        <button type="button" className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

        <Link href={`/product/?sku=` + props.product.sku + '&id=' + props.product.id}>
          <a>
            <img src={props.product.thumb} alt="product" />
            {/*{discount && */}
            {/*  <span className="product__discount">{discount}%</span>*/}
            {/*}*/}
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{props.product.name.length > 30 ? props.product.name.slice(0, 30) + "..." : props.product.name}</h3>
        {/*<div className={"product__price " + (discount ? 'product__price--discount' : '')} >*/}
          <h4>{props.product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency:"VND"
          })}</h4>

          {/*{discount &&  */}
          {/*  <span>${ price }</span>*/}
          {/*}*/}
        </div>
      </div>
  )
};


export default ProductItem