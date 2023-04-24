import React, {useEffect, useState} from "react";
import Layout from '../layouts/Main';
import {useRouter} from "next/router";
import {getOrderProduct} from "../lib/Order/API";
import {OrderProduct} from "../types";
import Image from "next/image";
export default function OrderProducts(){
    const router = useRouter();
    const orderId = router.query.orderId;
    const [listOrder, setListOrder] = useState<OrderProduct[]>([])
    useEffect(() =>{
        async function fetchOrderProduct(){
            try{
                const res = await getOrderProduct(parseInt(orderId+""));
                if(res.code === 200){
                    setListOrder(res.data);
                }
            }catch (e) {
                console.log('error')
            }
        }
        fetchOrderProduct().then();

    }, [])
    return<>
        <Layout>
            <h1 className="container" style={{padding: "20px 0", fontSize: "20px"}}>Chi tiết đơn hàng</h1>
            <div className="container" style={{marginBottom: "20px"}}>
                <a href="/account" className="cart__btn-back"><i className="icon-left"></i> Trở về</a>
            </div>

            <table border={1} className="table_order container">

                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Màu sắc</th>
                    <th>Kích cỡ</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Tổng tiền</th>

                </tr>
                </thead>
                <tbody>
                {listOrder.map((order,  index) =>(
                    <tr className="content-order">
                        <td>{index + 1}</td>
                        <td>{order.name}</td>
                        <td><Image src={order.thumb} alt="" width={100} height={133} /></td>
                        <td>{order.color}</td>
                        <td>{order.size}</td>
                        <td>{order.quantity}</td>
                        <td>{order.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency:"VND"
                        })}</td>
                        <td>{(order.quantity * order.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency:"VND"
                        })}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </Layout>

    </>
}