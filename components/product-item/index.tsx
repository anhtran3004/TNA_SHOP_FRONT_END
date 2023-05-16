import Link from 'next/link';
import {useDispatch} from 'react-redux';
import {Comment, Discount, Product} from 'types';
import {useEffect, useState} from "react";
import {getListDiscounts} from "../../lib/Discount/API";
import Image from "next/image";
import {deleteProductInFavoriteCart, getListFavorite, saveIntoFavoriteCart} from "../../lib/Favorite/API";
import Modal from "../Modal/Modal";
import QuestionAlerts from "../Alert/QuestionAlerts";
import {useRouter} from "next/router";
import Rater from "react-rater";
import {getListComment} from "../../lib/Comment/API";

interface Props {
    product: Product
}

export function GetDataDefaultDiscount(): Discount {
    const data = {
        id: 0,
        discount_code: "",
        discount_type: "",
        discount_value: 0
    }
    return data;
}

const ProductItem = (props: Props) => {
    const dispatch = useDispatch();
    const [activeHeart, setActiveHeart] = useState(false);
    const [discount, setDiscount] = useState<Discount>(GetDataDefaultDiscount());
    const [isOpenDeleteProductAlert, setIsOpenDeleteProductAlert] = useState(false);
    const textError = "Hãy đăng nhập để tiến hành tính năng này?";
    const [reviews, setReviews] = useState<Comment[]>([])
    const router = useRouter();
    useEffect(() => {
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

        fetchDataDiscount().then();
    }, [props.product.id])
    useEffect(() =>{
        async function fetchDataComment(){
            try{
                const res = await getListComment(props.product.id)
                if(res.code === 200){
                    setReviews(res.data);
                }
            }catch (e){
                console.log('error fetch comment')
            }
        }
        fetchDataComment().then();
    }, [])
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
        getFavoriteProduct().then();

    }, [props.product])

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
    function punctuation() {
        let data = 0;
        if (reviews.length === 0) {
            return 0;
        }
        for (let i = 0; i < reviews.length; i++) {
            data += reviews[i].rating;
        }
        const result = data / reviews.length;
        return parseFloat(result.toFixed(1));
    }
    return (
        <div className="product-item">
            <div className="product__image">
                {/*<button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>*/}
                {/*<button type="button" className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>*/}
                <div className="favorite-cart">
                    {!activeHeart ?
                        <img src="/images/products/add-heart.png" alt="" width={40} height={40}
                               onClick={() => {
                                   setActiveHeart(true);
                                   saveIntoCart().then()
                               }}/>
                        :
                        <img src="/images/products/heart.png" alt="" width={40} height={40}
                               onClick={() => {
                                   setActiveHeart(false);
                                   DeleteProduct().then()
                               }}
                        />
                    }
                </div>
                <Link href={`/product/?sku=` + props.product.sku + '&id=' + props.product.id}>
                    <a>
                        <img src={props.product.thumb} alt="product"/>
                        {(discount && discount.discount_value !== 0) &&
                            <span className="product__discount">{discount.discount_value}%</span>
                        }
                    </a>
                </Link>
            </div>

            <div className="product__description">
                <h3 style={{marginBottom: "0"}}>{props.product.name.length > 30 ? props.product.name.slice(0, 30) + "..." : props.product.name}</h3>
                <div style={{fontSize:"18px"}}>
                    <Rater total={5} interactive={false} rating={punctuation()}/>
                </div>
                {(discount && discount.discount_value !== 0) ? <>
                        <h4>{calculateDiscount().toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                        })}</h4>
                        <div style={{marginTop: "5px"}}
                             className={"product__price " + (discount ? 'product__price--discount' : '')}>{props.product.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                        })}</div>
                    </> :
                    <>
                        <h4>{props.product.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                        })}</h4>
                    </>}


                {/*{discount &&  */}
                {/*  <span>${ price }</span>*/}
                {/*}*/}
            </div>
            {isOpenDeleteProductAlert && (
                <Modal>
                    <QuestionAlerts textError={textError} setIsOpenQuestionAlert={setIsOpenDeleteProductAlert}
                                    setOkListener={nextLogin}/>
                </Modal>
            )}
        </div>
    )
};


export default ProductItem