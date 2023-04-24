import {useEffect, useState} from 'react';
import CheckboxColor from './../../products-filter/form-builder/checkbox-color';
import {useDispatch, useSelector} from 'react-redux';
import {some} from 'lodash';
import {addProduct} from 'store/reducers/cart';
import {Discount, InputInventory, Inventory, Product, ProductStoreType} from 'types';
import {RootState} from 'store';
import {getColors, getInventories, getSizes} from "../../../lib/API";
import {useRouter} from "next/router";
import {getListDiscounts} from "../../../lib/Discount/API";
import {GetDataDefaultDiscount} from "../../product-item";
import {getQuantityOfInventory} from "../../../lib/Inventory/API";

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
    const router = useRouter();
    const id = router.query.id
    const onColorSet = (e: string) => setColor(e);
    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setItemSize(e.target.value);

    const {favProducts} = useSelector((state: RootState) => state.user);
    const isFavourite = some(favProducts, productId => productId === props.product.id);
    const [colorSelected, setColorSelected] = useState("");
    const [discount, setDiscount] = useState<Discount>(GetDataDefaultDiscount())

    async function fetchInventory() {
        try {
            // console.log("id", id);
            const res = await getInventories(id);
            if (res.code === 200) {
                setInventory(res.data);
            }
        } catch (e) {
            console.log('error');
        }
    }
    function defaultDataInputQuantity(color: string, itemSize: string) : InputInventory{
        const data ={
            product_input:{
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
                if(res.data.length > 0){
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
        if(itemSize !== ''){
            setIsShowErrorSize(false);
        }
    }, [itemSize])
    useEffect(() => {
        fetchDataDiscount().then();

    }, [props.product])
    useEffect(() => {
        console.log(props.product.discount_id)
        fetchInventory().then()
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
        if(color !== ''){
            setIsShowErrorColor(false);
        }
    }, [colorSelected])
    const addToCart = () => {
        if(color === ''){
            console.log('missing color');
            setIsShowErrorColor(true);
            return;
        }
        if(itemSize === ''){
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
            price: props.product.price,
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
    function handleMissingQuantity(){
        setCount(quantity);
        setIsShowErrorQuantity(true);
        if(itemSize === ''){
            setIsShowErrorSize(true);
        }
        if(color === ''){
            setIsShowErrorColor(true);
        }
    }
    useEffect(() =>{
        if(count < quantity){
            setIsShowErrorQuantity(false);
        }
    }, [quantity, count])
    return (
        <section className="product-content">
            <div className="product-content__intro">
                {/*<h5 className="product__id">Product ID:<br></br>{props.product.id}</h5>*/}
                <span className="product-on-sale">Sale</span>
                <h2 className="product__name">{props.product.name}</h2>

                <div className="product__prices">
                    {/*<h4>${ product.currentPrice }</h4>*/}
                    {/*{product.discount &&*/}
                    {/*  <span>${ product.price }</span>*/}
                    {/*}*/}
                    {/*<h4>{props.product.price.toLocaleString("vi-VN", {*/}
                    {/*  style: "currency",*/}
                    {/*  currency:"VND"*/}
                    {/*})}</h4>*/}

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
                    <h5>Color:</h5>
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
                </div>
                <div className="product-filter-item">
                    <h5>Size: <strong>See size table</strong></h5>
                    <div className="checkbox-color-wrapper">
                        <div className="select-wrapper">
                            <select onChange={onSelectChange}>
                                <option>Choose size</option>
                                {sizes.map((type, index) => (
                                    <option key={index} value={type.size}>{type.size}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    {isShowErrorSize && <div style={{color: "red", marginTop: "10px"}}>Bạn chưa chọn size!</div>}
                </div>
                <div className="product-filter-item">
                    <h5>Quantity:</h5>
                    <div className="quantity-buttons">
                        <div className="quantity-button">
                            <button type="button" onClick={() => {(count > 1) ? setCount(count - 1) : setCount(1)}} className="quantity-button__btn">
                                -
                            </button>
                            <span>{count}</span>
                            <button type="button" onClick={() => {(count >= quantity) ? handleMissingQuantity() : setCount(count + 1)}} className="quantity-button__btn">
                                +
                            </button>

                        </div>

                        <button type="submit" onClick={() => addToCart()} className="btn btn--rounded btn--yellow">Add
                            to cart
                        </button>
                        {/*<button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>*/}
                        <button type="button" className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i
                            className="icon-heart"></i></button>

                    </div>
                    {isShowErrorQuantity && <div style={{color: "red", marginTop: "10px"}}>Hết hàng trong kho!</div>}
                </div>
            </div>
        </section>
    );
};

export default Content;
    