import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavProduct } from 'store/reducers/user';
import { RootState } from 'store';
import {Discount, Product} from 'types';
import {useEffect, useState} from "react";
import {getListDiscounts} from "../../lib/Discount/API";
interface Props{
  product: Product
}
export function GetDataDefaultDiscount(): Discount {
    const data ={
        id: 0,
        discount_code: "",
        discount_type: "",
        discount_value: 0
    }
    return data;
}
const ProductItem = (props: Props) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, productId => productId === props.product.id);
  const [discount, setDiscount] = useState<Discount>(GetDataDefaultDiscount())
  // const toggleFav = () => {
  //   dispatch(toggleFavProduct(
  //     {
  //       id,
  //     }
  //   ))
  // }
    useEffect(() =>{
        async function fetchDataDiscount(){
            try{
                const res = await getListDiscounts();
                if(res.code === 200){
                    for (let i = 0; i < res.data.length; i++){
                        if(res.data[i].id === props.product.discount_id){
                            setDiscount(res.data[i]);
                        }
                    }
                }
            }catch (e) {
                console.log('error')
            }
        }
        fetchDataDiscount().then();
    }, [props.product.id])
    // useEffect(() =>{
    //     console.log("discount", discount);
    // }, [discount])
    function calculateDiscount(){
      if(discount?.discount_type === "%"){
          const priceCurrent = (props.product.price - props.product.price * discount.discount_value/ 100);
          return priceCurrent;
      }
        if(discount?.discount_type === "VND"){
            const priceCurrent = props.product.price - discount.discount_value;
            return priceCurrent;
        }
        return props.product.price;
    }
  return (
    <div className="product-item">
      <div className="product__image">
        {/*<button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>*/}
        <button type="button" className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

        <Link href={`/product/?sku=` + props.product.sku + '&id=' + props.product.id}>
          <a>
            <img src={props.product.thumb} alt="product" />
            {(discount && discount.discount_value !== 0) &&
              <span className="product__discount">{discount.discount_value}%</span>
            }
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{props.product.name.length > 30 ? props.product.name.slice(0, 30) + "..." : props.product.name}</h3>
          {(discount && discount.discount_value !== 0) ? <>
              <h4>{calculateDiscount().toLocaleString("vi-VN", {
                  style: "currency",
                  currency:"VND"
              })}</h4>
          <div style={{marginTop: "10px"}} className={"product__price " + (discount ? 'product__price--discount' : '')} >{props.product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency:"VND"
          })}</div>
          </> :
          <>
              <h4>{props.product.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency:"VND"
              })}</h4>
          </>}


          {/*{discount &&  */}
          {/*  <span>${ price }</span>*/}
          {/*}*/}
        </div>
      </div>
  )
};


export default ProductItem