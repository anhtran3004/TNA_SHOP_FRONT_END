import React, {useEffect} from 'react'
import Image from 'next/image'
import { useState } from 'react';
import ProductItem from "../product-item";
import {getListFavorite} from "../../lib/Favorite/API";
import {getListProduct} from "../../lib/API";
import {Cart, InputProduct, Product} from "../../types";
import Modal from "../Modal/Modal";
import ErrorAlert from "../Alert/ErrorAlert";
const Like = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isOpenAlert, setIsOPenAlert] = useState(false);
    const [textErrorAPI, setTextErrorAPI] = useState("");
    const [activeHeart, setActiveHeart] = useState(false);
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [listCart, setListCart] = useState<Cart[]>([]);


    function dataInputProducts(){
        const data: InputProduct = {
            filter: {
                search:"",
                product_id: [],
                category_id: [],
                campaign_id: [],
                price: {
                    min: 0,
                    max: 10000000
                }
            },
            sort: {
                field: "id",
                order: "DESC"
            },
            pagination: {
                page: 0,
                perPage: 1000
            }
        }
        return data;
    }
    useEffect(() => {
        async function fetchProductData() {
            try {
                const res = await getListProduct(dataInputProducts())
                const status = res.code;
                if (status === 200) {
                    setProducts(res.data);
                } else {
                    console.log('error');
                    setTextErrorAPI("Không thể tải sản phẩm!")
                    setIsOPenAlert(true);
                }
            } catch (e) {
                console.log('error');
            }
        }
        // console.log("statusUpdate", statusUpdate);
        fetchProductData().then();
    }, [])
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getListFavorite();
                const resProduct = await getListProduct(dataInputProducts());
                const statusCode = res.code;
                if (statusCode === 200) {
                    if (res.data !== null) {
                        for (let i = 0; i < res.data.length; i++) {
                            for (let j = 0; j < resProduct.data.length; j++) {
                                if (res.data[i].product_id === resProduct.data[j].id) {
                                    setListProduct((prevListProduct) => [...prevListProduct, resProduct.data[j]]);
                                    setListCart((prevListCart) => [...prevListCart, res.data[i]]);
                                }
                            }
                        }
                    } else {
                        setListProduct([]);
                    }
                } else if (statusCode === 10001) {
                    console.log("Authentication failed");
                    // setIsOpenLoginAlert(true);
                } else {
                    console.log("error");
                    // setIsOpenLoginAlert(true);
                }
            } catch (e) {
                console.log("error", e);
                setTextErrorAPI("Lỗi! Không thể tải sản phẩm")
                // setIsOPenAlertError(true);
            }
        }
        fetchData().then();
    }, []);
    return (
        <>
            <div className="list-product-in-favorite-cart">
            {listProduct.map((product, index) =>(
                <ProductItem product={product} />
            ) )}
            </div>

            {isOpenAlert && (
                <Modal>
                    <ErrorAlert textError={textErrorAPI} setIsCloseAlert={setIsOPenAlert}/>
                </Modal>
            )}
        </>
    )
}

export default Like