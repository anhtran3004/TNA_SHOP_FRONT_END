import {useDispatch} from 'react-redux';
import {removeProduct, setCount} from 'store/reducers/cart';
import {InputInventory, ProductStoreType} from 'types';
import {useEffect, useState} from "react";
import {getQuantityOfInventory} from "../../../lib/Inventory/API";

const ShoppingCart = ({thumb, name, id, color, size, count, price, originalPrice}: ProductStoreType) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const [isShowErrorQuantity, setIsShowErrorQuantity] = useState(false);

    const removeFromCart = () => {
        dispatch(removeProduct(
            {
                thumb,
                name,
                id,
                color,
                size,
                count,
                price,
                originalPrice,
            }
    ))
  }

  const setProductCount = (count: number) => {
    if(count <= 0) {
      return;
    }

    const payload = {
      product: { 
        thumb, 
        name, 
        id, 
        color, 
        size, 
        count, 
        price,
          originalPrice
      },
      count,
    }

    dispatch(setCount(payload))
  }
    function defaultDataInputQuantity() : InputInventory{
        const data ={
            product_input:{
                color_name: color,
                size: size
            }
        }
        return data;
    }
    async function fetchQuantityOfInventory() {
        try {
            const res = await getQuantityOfInventory(defaultDataInputQuantity(), parseInt(id));
            if (res.code === 200) {
                console.log(res.data);
                if(res.data.length > 0){
                    setQuantity(res.data[0].quantity);
                }
            }
        } catch (e) {
            console.log('error get quantity');
        }
    }
    useEffect(() =>{
        fetchQuantityOfInventory().then();
    }, [])
    function handleMissingQuantity(){
        setProductCount(quantity);
        setIsShowErrorQuantity(true);
    }
    useEffect(() =>{
        if(count < quantity){
            setIsShowErrorQuantity(false);
        }
    }, [count])
  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt=""/>
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td className="cart-item-before" data-label="Color">{color}</td>
      <td className="cart-item-before" data-label="Size">{size}</td>
      <td>
        <div className="quantity-button">
            <button type="button" onClick={() => {(count > 1) ? setProductCount(count - 1) : setProductCount(1)}} className="quantity-button__btn">
                -
            </button>
            <span>{count}</span>
            <button type="button" onClick={() => {(count >= quantity) ? handleMissingQuantity() : setProductCount(count + 1)}} className="quantity-button__btn">
                +
            </button>
        </div>
          {isShowErrorQuantity && <div style={{color: "red", position: "relative", top: "10px", fontSize:"14px"}}>Hết hàng trong kho!</div>}

      </td>
      <td>{price.toLocaleString("vi-VN", {
          style: "currency",
          currency:"VND"
      })}
          {/*{(price !== originalPrice) &&*/}
          {/*    <div className="product__price--discount">*/}
          {/*        {originalPrice.toLocaleString("vi-VN", {*/}
          {/*        style: "currency",*/}
          {/*        currency:"VND"*/}
          {/*    })}*/}
          {/*    </div>*/}
          {/*}*/}
      </td>
      <td className="cart-item-cancel"><i className="icon-cancel" onClick={() => removeFromCart()}></i></td>
    </tr>
  )
};

  
export default ShoppingCart