import React, {useEffect, useState} from 'react';
import CheckboxColor from './../../products-filter/form-builder/checkbox-color';
import {useDispatch, useSelector} from 'react-redux';
import {some} from 'lodash';
import {addProduct} from 'store/reducers/cart';
import {Discount, InputInventory, Inventory, Product, ProductStoreType} from 'types';
import {RootState} from 'store';
import {getColors, getSizes} from "../../../lib/API";
import {useRouter} from "next/router";
import {getListDiscounts} from "../../../lib/Discount/API";
import {GetDataDefaultDiscount} from "../../product-item";
import {getQuantityOfInventory} from "../../../lib/Inventory/API";
import Image from "next/image";
import {deleteProductInFavoriteCart, getListFavorite, saveIntoFavoriteCart} from "../../../lib/Favorite/API";
import Modal from "../../Modal/Modal";
import QuestionAlerts from "../../Alert/QuestionAlerts";
import {Input} from "postcss";
import Link from "next/link";

type ProductContent = {
    product: Product;
}

const Content = (props: ProductContent) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState<number>(1);
    const [color, setColor] = useState<string>('');
    const [itemSize, setItemSize] = useState<string>('');
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [colors, setColors] = useState<Inventory[]>([]);
    const [sizes, setSizes] = useState<Inventory[]>([]);
    const [quantity, setQuantity] = useState(0);
    const [isShowErrorColor, setIsShowErrorColor] = useState(false);
    const [isShowErrorSize, setIsShowErrorSize] = useState(false);
    const [isShowErrorQuantity, setIsShowErrorQuantity] = useState(false);
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const textError = "Hãy đăng nhập để tiến hành tính năng này?";
    const router = useRouter();
    const id = router.query.id
    const onColorSet = (e: string) => setColor(e);
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setItemSize(e.target.value);
    const {favProducts} = useSelector((state: RootState) => state.user);
    const isFavourite = some(favProducts, productId => productId === props.product.id);
    const [colorSelected, setColorSelected] = useState("");
    const [discount, setDiscount] = useState<Discount>(GetDataDefaultDiscount())
    const [activeHeart, setActiveHeart] = useState(false);

    function defaultDataInputQuantity(color: string, itemSize: string): InputInventory {
        const data = {
            product_input: {
                color_name: color,
                size: itemSize
            }
        }
        return data;
    }

    async function fetchQuantityOfInventory() {
        try {
            const res = await getQuantityOfInventory(defaultDataInputQuantity(color, itemSize), props.product.id);
            if (res.code === 200) {
                console.log(res.data);
                if (res.data.length > 0) {
                    setQuantity(res.data[0].quantity);
                }
            }
        } catch (e) {
            console.log('error get quantity');
        }
    }

    async function fetchListColor() {
        try {
            // console.log("id", id);
            const res = await getColors(id);
            if (res.code === 200) {
                setColors(res.data);
            }
        } catch (e) {
            console.log('error');
        }
    }

    async function fetchDataDiscount() {
        try {
            const res = await getListDiscounts();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === props.product.discount_id) {
                        setDiscount(res.data[i]);
                    }
                }
            }
        } catch (e) {
            console.log('error')
        }
    }

    useEffect(() => {
        fetchQuantityOfInventory().then();
        if (itemSize !== '') {
            setIsShowErrorSize(false);
        }
    }, [itemSize])

    //get favorite cart
    async function getFavoriteProduct() {
        try {
            const res = await getListFavorite();
            if (res.code === 200) {
                for (let i = 0; i < res.data.length; i++) {
                    const product_id = res.data[i].product_id;
                    if (product_id === props.product.id) {
                        setActiveHeart(true)
                    }
                }
            }
        } catch (e) {
            console.log('error get favorite product')
        }
    }
    function nextLogin() {
        router.push('/login').then();
    }
    async function saveIntoCart() {
        try {
            const res = await saveIntoFavoriteCart(props.product.id);
            const status = res.code;
            console.log("response code: ", status)
            if (status === 200) {
                console.log("save success!");
                getFavoriteProduct().then();
            } else if (status === 20000) {
                console.log("Save product already exists");

            } else if (status === 401) {
                console.log("Authentication failed");
                setIsOpenDeleteProductAlert(true);
                setActiveHeart(false);

                // <QuestionAlert textError="Vui lòng đăng nhập!" setIsCloseAlert={} setIsAction={} index={} />
            } else {
                console.log("error");
            }
        } catch (e) {
            console.log("error", e);
            setIsOpenDeleteProductAlert(true);
            // setTextErrorAPI("Lỗi, không thể thêm vào giỏ hàng yêu thích!")
            // setIsOPenAlertError(true);
            setActiveHeart(false);
        }
    }
    async function DeleteProduct() {
        try {
                    const res = await deleteProductInFavoriteCart(props.product.id);
                    const status = res.code;
                    console.log("response code: ", status)
                    if (status === 200) {
                        console.log("delete success!");
                        getFavoriteProduct().then();
                    } else if (status === 10001) {
                        console.log("Authentication failed");

                    }
        } catch (e) {
            console.log("error", e);
            // setTextErrorAPI("Không thể xóa khỏi giỏ hàng yêu thích!")
            // setIsOPenAlertError(true);
            setActiveHeart(true);
        }
    }
    useEffect(() => {
        fetchDataDiscount().then();
        getFavoriteProduct().then();

    }, [props.product])
    useEffect(() => {
        console.log(props.product.discount_id)
        fetchListColor().then();
    }, [id])

    async function fetchListSize() {
        try {
            // console.log("id", id);
            const res = await getSizes(id, colorSelected);
            if (res.code === 200) {
                setSizes(res.data);
            }
        } catch (e) {
            console.log('error');
        }
    }

    useEffect(() => {
        fetchListSize().then();
        if (color !== '') {
            setIsShowErrorColor(false);
        }
    }, [colorSelected])
    const addToCart = () => {
        if (color === '') {
            console.log('missing color');
            setIsShowErrorColor(true);
            return;
        }
        if (itemSize === '') {
            console.log('missing size');
            setIsShowErrorSize(true);
            return;
        }
        const productToSave: ProductStoreType = {
            // @ts-ignore
            id: props.product.id,
            name: props.product.name,
            // thumb: props.product.thumb ? product.images[0] : '',
            thumb: props.product.thumb,
            price: calculateDiscount(),
            originalPrice: props.product.price,
            count: count,
            color: color,
            size: itemSize
        }

        const productStore = {
            count,
            product: productToSave
        }

        dispatch(addProduct(productStore));
    }

    function calculateDiscount() {
        if (discount?.discount_type === "%") {
            const priceCurrent = (props.product.price - props.product.price * discount.discount_value / 100);
            return priceCurrent;
        }
        if (discount?.discount_type === "VND") {
            const priceCurrent = props.product.price - discount.discount_value;
            return priceCurrent;
        }
        return props.product.price;
    }

    function handleMissingQuantity() {
        setCount(quantity);
        setIsShowErrorQuantity(true);
        if (itemSize === '') {
            setIsShowErrorSize(true);
        }
        if (color === '') {
            setIsShowErrorColor(true);
        }
    }

    useEffect(() => {
        if (count < quantity) {
            setIsShowErrorQuantity(false);
        }
    }, [quantity, count])

    return (
        <section className="product-content">
            <div className="product-content__intro">
                {/*<h5 className="product__id">Product ID:<br></br>{props.product.id}</h5>*/}
                {((discount !== null) && discount.discount_value !== 0) &&
                <span className="product-on-sale">{discount.discount_value}%</span>
                }
                <h2 className="product__name">{props.product.name}</h2>

                <div className="product__prices">
                    {((discount !== null) && discount.discount_value !== 0) ? <>

                            <h4 className={"product__price " + (discount ? 'product__price--discount' : '')}
                                style={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                    fontSize: "20px",
                                    marginRight: "15px"
                                }}>
                                {props.product.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND"
                                })}</h4>
                            <h4>{calculateDiscount().toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND"
                            })}</h4>

                        </> :
                        <>
                            <h4>{props.product.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND"
                            })}</h4>
                        </>}
                </div>
            </div>
            <div className="product-content__filters">
                <div className="product-filter-item">
                    <h5>Màu:</h5>
                    {colors.length > 0 ? <>
                        <div className="checkbox-color-wrapper">
                            {colors.map((type, index) => (
                                <CheckboxColor
                                    key={index}
                                    type={'radio'}
                                    name="product-color"
                                    color={type.name}
                                    valueName={type.name}
                                    onChange={onColorSet}
                                    setColorSelected={setColorSelected}
                                />
                            ))}
                        </div>
                        {isShowErrorColor && <div style={{color: "red"}}>Bạn chưa chọn màu!</div>}
                        </>
                        :
                        <p style={{color:"red"}}>Sản phẩm tạm hết hàng</p>
                    }


                </div>
                <div className="product-filter-item">
                    <Link href="/Blog/size">
                        <h5>Size: <strong>Xem bảng size</strong></h5>
                    </Link>
                    <div className="checkbox-color-wrapper">
                        <div className="select-wrapper">
                            <select onChange={onSelectChange}>
                                <option>Chọn size</option>
                                {sizes.map((type, index) => (
                                    <option key={index} value={type.size}>{type.size}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    {isShowErrorSize && <div style={{color: "red", marginTop: "10px"}}>Bạn chưa chọn size!</div>}
                </div>
                <div className="product-filter-item">
                    <h5>Số lượng:</h5>
                    <div className="quantity-buttons">
                        <div className="quantity-button">
                            <button type="button" onClick={() => {
                                (count > 1) ? setCount(count - 1) : setCount(1)
                            }} className="quantity-button__btn">
                                -
                            </button>
                            {/*<span>{count}</span>*/}
                            <input type="number" value={count} onChange={(e) => {
                                (parseInt(e.target.value) <= 0) && setCount(1);
                                (parseInt(e.target.value) >= quantity) ? handleMissingQuantity() :
                                setCount(parseInt(e.target.value));
                            }}
                                   style={{width:"50px", fontSize:"18px", fontWeight:"bold", textAlign:"center"}}
                            min="1"
                            onBlur={() => {(count <= 0 || Number.isNaN(count)) && setCount(1); console.log("count", count)}}
                            />
                            <button type="button" onClick={() => {
                                (count >= quantity) ? handleMissingQuantity() : setCount(count + 1)
                            }} className="quantity-button__btn">
                                +
                            </button>
                        </div>
                        <button type="submit" onClick={() => (count > 0 ) && addToCart()} className="btn btn--rounded btn--yellow">
                            Thêm vào giỏ hàng
                        </button>
                        {/*<button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>*/}
                        {/*<button type="button" className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i*/}
                        {/*    className="icon-heart"></i></button>*/}
                        {!activeHeart ?
                            <Image src="/images/products/add-heart.png" alt="" width={40} height={40}
                                   onClick={() =>{setActiveHeart(true); saveIntoCart().then()}}/>
                            :
                            <Image src="/images/products/heart.png" alt="" width={40} height={40}
                                   onClick={() =>{setActiveHeart(false); DeleteProduct().then()}}
                            />
                        }


                    </div>
                    {isShowErrorQuantity && <div style={{color: "red", marginTop: "10px"}}>Hết hàng trong kho!</div>}
                </div>
            </div>
            {isOpenDeleteProductAlert && (
                <Modal>
                    <QuestionAlerts textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                                    setOkListener={nextLogin}/>
                </Modal>
            )}
        </section>
    );
};

export default Content;
    