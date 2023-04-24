import { useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import Item from './item';
import { RootState } from 'store';
import Modal from "../Modal/Modal";
import {useEffect, useState} from "react";
import QuestionAlerts from "../Alert/QuestionAlerts";
import {useRouter} from "next/router";
import {verifyToken} from "../../lib/passport";
import Link from "next/link";

const ShoppingCart = () => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState)  => state.cart);
  const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
  const textError = "Hãy đăng nhập để tiến hành thanh toán?";
  const [user, setUser] = useState('');
  const priceTotal = () => {
    let totalPrice = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }

    return totalPrice;
  }
  function nextLogin() {
    router.push('/login').then();
  }
  useEffect(() =>{
    if(localStorage.getItem('accessToken') !== undefined){
      // const data = getAccessToken().then();
      // setUser(localStorage.getItem('accessToken') +"");
      const token = localStorage.getItem('accessToken');
      console.log("token", token);
      const data = verifyToken(token+"");
      if(data !== undefined)
        setUser(data.user);
      localStorage.setItem("dataDecoded", JSON.stringify(data));
      // console.log(data.user);
    }
  },[])

  return <>
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Giỏ hàng</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}>Sản phẩm</th>
                  <th>Màu sắc</th>
                  <th>Kích cỡ</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th></th>
                </tr>

                {cartItems.map(item => (
                  <Item 
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    color={item.color}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    size={item.size}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table> 
          } 
          
          {cartItems.length === 0 && 
            <p>Nothing in the cart</p>
          }
        </div>
        <div className="cart-actions">
          <Link href="/products" legacyBehavior>
            <a className="cart__btn-back"><i className="icon-left"></i> Tiếp tục mua sắm</a>

          </Link>
          {/*<input type="text" placeholder="Mã giảm giá..." className="cart__promo-code" />*/}
          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Tổng tiền<strong>{priceTotal().toLocaleString("vi-VN", {
              style: "currency",
              currency:"VND"
            })}</strong></p>
            {(user === '') ?
                <a onClick={() =>setIsOpenDeleteProductAlert(true)} className="btn btn--rounded btn--yellow">Thanh toán</a>
                :
                <a href="/cart/checkout" className="btn btn--rounded btn--yellow">Thanh toán</a>
            }
          </div>
        </div>
      </div>
    </section>
  {isOpenDeleteProductAlert && (
      <Modal>
        <QuestionAlerts textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                       setOkListener={nextLogin}/>
      </Modal>
  )}
  </>
};

  
export default ShoppingCart