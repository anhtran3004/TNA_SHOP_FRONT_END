import Layout from '../../layouts/Main';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import CheckoutItems from '../../components/checkout/items';
import {RootState} from 'store';
import {useEffect, useState} from "react";
import {getUsers} from "../../lib/User/API";
import {InputOrder, InputOrderProduct, ProductStoreType, User} from "../../types";
import {dataUserDefault} from "../account";
import {insertOrder, insertOrderProduct} from "../../lib/Order/API";
import Success from "../../components/Alert/Success";
import Errors from "../../components/Alert/Errors";
import {removeProduct} from "../../store/reducers/cart";
import {useRouter} from "next/router";

const CheckoutPage = ({thumb, name, id, color, size, count, price}: ProductStoreType) => {
  const [delivery, setDelivery] = useState(0);
  const [shipName, setShipName] = useState('Viettel Post')
  const [user, setUser] = useState<User>(dataUserDefault());
  let [valueName, setValueName] = useState('');
  let [valuePhone, setValuePhone] = useState('');
  let [valueEmail, setValueEmail] = useState('');
  let [valueAddress, setValueAddress] = useState('');
  let [valueUserId, setValueUserId] = useState(-1);
  let [isOpenSuccess, setIsOpenSuccess] = useState(false);
  let [isOpenError, setIsOpenError] = useState(false);
  let [textSuccess, setTextSuccess] = useState("");
  let [textErrors, setTextErrors] = useState("");
  const [orderInsertId, setOrderInsertId] = useState(2);
  const router = useRouter();
  // const [listPrice, set]
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state: RootState) => state.cart);
  const removeFromCart = () => {
    for(let i = 0; i < cartItems.length; i++){
      dispatch(removeProduct(
          {
            thumb,
            name,
            id,
            color,
            size,
            count,
            price
          }
      ))
    }

  }

  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }

    return totalPrice;
  })

  async function fetchUserData(id: number) {
    try {
      const res = await getUsers(id);
      if (res.code === 200) {
        setUser(res.data);
      }
    } catch (e) {
      console.log('error');
    }

  }

  useEffect(() => {
    if (localStorage.getItem('dataDecoded') !== undefined) {
      const data = JSON.parse(localStorage.getItem('dataDecoded') + "");
      if (data !== null) {
        fetchUserData(data.id).then();
      }
    }
  }, [])
  useEffect(() => {
    if (user.id !== dataUserDefault().id) {
      // @ts-ignore
      setValueEmail(user[0].email);
      // @ts-ignore
      setValueAddress(user[0].address);
      // @ts-ignore
      setValuePhone(user[0].phone);
      // @ts-ignore
      setValueName(user[0].name);
      // @ts-ignore
      setValueUserId(user[0].id);
    } else {
      console.log("true");
    }


  }, [user])

  function dataDefaultInputOrder(): InputOrder {
    const data = {
      order_input: {
        name: valueName,
        email: valueEmail,
        address: valueAddress,
        phone: valuePhone,
        ship_name: shipName,
        method_delivery: 'payment on delivery',
        user_id: valueUserId,
        shipping_fee: 20000,
        total_price: priceTotal
      }
    }
    return data;
  }

  function dataDefaultInputOrderProduct(orderId: number, productId: number, price: number, quantity: number, color: string, size: string): InputOrderProduct {
    const data = {
      order_input: {
        order_id: orderId,
        product_id: productId,
        price: price,
        quantity: quantity,
        color: color,
        size: size
      }
    }
    return data;
  }

  async function InsertOrder() {
    try {

      const res = await insertOrder(dataDefaultInputOrder())
      if (res.code === 200) {
        console.log('insert success!');
        // setOrderInsertId(res.data.insertId);
        // console.log(res.data.insertId)
        await InsertOrderProduct(res.data.insertId);
        setTextSuccess('Thanh toán thành công!');
        setIsOpenSuccess(true);
        setTimeout(() => setIsOpenSuccess(false), 2000)
        removeFromCart();
        setTimeout(() => router.push('/'), 3000)
      }


    } catch (e) {
      console.log('error')
      setTextErrors('Thanh toán thất bại!');
      setIsOpenError(true);
      setTimeout(() => setIsOpenError(false), 2000)
    }
  }

  async function InsertOrderProduct(orderId: number) {
    try {
      for (let i = 0; i < cartItems.length; i++) {
        const res = await insertOrderProduct(dataDefaultInputOrderProduct(orderId, parseInt(cartItems[i].id), cartItems[i].price, cartItems[i].count, cartItems[i].color, cartItems[i].size))
        if (res.code === 200) {
          console.log('insert success!');
        }
      }
    } catch (e) {
      console.log('error')
    }
  }

  async function checkout() {
    await InsertOrder();
    // await InsertOrderProduct(orderInsertId);
  }

  return <>
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Vận chuyển và thanh toán</h3>
            <CheckoutStatus step="checkout"/>
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              {/*<div className="checkout__btns">*/}
              {/*  <button className="btn btn--rounded btn--yellow">Đăng nhập</button>*/}
              {/*  <button className="btn btn--rounded btn--border">Đăng ký</button>*/}
              {/*</div>*/}

              <div className="block">
                <h3 className="block__title">Thông tin giao hàng</h3>
                <form className="form">
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input className="form__input form__input--sm" type="text" placeholder="Full name"
                             value={valueName} onChange={(e) => setValueName(e.target.value)}/>
                    </div>
                    <div className="form__col">
                      <input className="form__input form__input--sm" type="text" placeholder="Email" value={valueEmail}
                             onChange={(e) => {
                               setValueEmail(e.target.value)
                             }}/>
                    </div>
                  </div>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input className="form__input form__input--sm" type="text" placeholder="Phone number"
                             value={valuePhone} onChange={(e) => setValuePhone(e.target.value)}/>
                    </div>

                    {/*<div className="form__col">*/}
                    {/*  <div className="select-wrapper select-form">*/}
                    {/*    <select>*/}
                    {/*      <option>Country</option>*/}
                    {/*      <option value="VietNam">VietNam</option>*/}
                    {/*      <option value="China">China</option>*/}
                    {/*      <option value="Argentina">Argentina</option>*/}
                    {/*    </select>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                  </div>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input className="form__input form__input--sm" type="text" placeholder="Address"
                             value={valueAddress} onChange={(e) => setValueAddress(e.target.value)}/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Phương thức thanh toán</h3>
                <ul className="round-options round-options--three">
                  <li className="round-item">
                    <img src="/images/logos/checkout.jpg" alt="Paypal" />
                  </li>
                </ul>
              </div>
              
              <div className="block">
                <h3 className="block__title">Hình thức vận chuyển</h3>
                <ul className="round-options round-options--two">
                  <li className={(delivery === 0) ? "delivery-selected round-item round-item--bg" : "round-item round-item--bg"}
                      onClick={() => {
                        setDelivery(0);
                        setShipName('Viettel Post')
                      }}>
                    <img src="/images/logos/viettel_post.png" alt="Paypal"/>
                    {/*<p>$15.00</p>*/}
                  </li>
                  <li className={(delivery === 1) ? "delivery-selected round-item round-item--bg" : "round-item round-item--bg"}
                      onClick={() => {
                        setDelivery(1);
                        setShipName('Ninja Van')
                      }}>
                    <img src="/images/logos/ninja-van.webp" alt="Paypal"/>
                    {/*<p>$10.00</p>*/}
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Giỏ hàng của bạn</h3>
                <CheckoutItems />
                
                <div className="checkout-total">
                  <p>Tổng thanh toán</p>
                  <h3>{priceTotal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency:"VND"
                  })}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <a href="/cart" className="cart__btn-back"><i className="icon-left"></i> Trở về</a>
            <div className="cart-actions__items-wrapper">
              <button type="button" className="btn btn--rounded btn--border">Tiếp tục mua sắm</button>
              <button type="button" className="btn btn--rounded btn--yellow" onClick={checkout}>Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
    {isOpenSuccess && (
        // <Modal>
        <Success textSuccess={textSuccess}/>
        // </Modal>
    )}
    {isOpenError && (
        // <Modal>
        <Errors textError={textErrors}/>
        // </Modal>
    )}
  </>
};

  
export default CheckoutPage