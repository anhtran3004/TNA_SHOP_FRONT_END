import React, { useState, useEffect } from 'react'
import {changeStatus, getOrder, getOrderProduct, updateShippedDate} from "../../lib/Order/API";
import {InputInventory, InputUpdateInventory, Order, OrderProduct} from "../../types";
import Modal from "../Modal/Modal";
import Link from "next/link";
import {getQuantityOfInventory, updateInventory} from "../../lib/Inventory/API";
import ReasonRemove from "../Order/ReasonRemove";
import Success from "../Alert/Success";
import Errors from "../Alert/Errors";
import ViewReasonRemove from "../Order/ViewReasonRemove";

const Order = () => {
    const [activeStatus, setActiveStatus] = useState(0);
    const listStatus = ["Chờ xác nhận", "Đang giao", "Đã giao", "Đơn đã hủy"];
    const [listWaiting, setListWaiting] = useState<Order[]>([])
    const [listDelivering, setListDelivering] = useState<Order[]>([])
    const [listDelivered, setListDelivered] = useState<Order[]>([])
    const [listRemove, setListRemove] = useState<Order[]>([]);
    const [orderId, setOrderId] = useState(-1);
    const [listOrder, setListOrder] = useState<OrderProduct[]>([])
    const [isOpenReason, setIsOpenReason] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
    const [isOpenViewReason, setIsOpenViewReason] = useState(false);

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem('dataDecoded') +"")
        async function fetchDataOrder(){
            try{
                if(activeStatus === 0) {
                    const res = await getOrder(activeStatus, user.id);
                    if (res.code === 200) {
                        setListWaiting(res.data);
                    }
                }
                if(activeStatus === 1) {
                    const res = await getOrder(activeStatus, user.id);
                    if (res.code === 200) {
                        setListDelivering(res.data);
                    }
                }
                if(activeStatus === 2) {
                    const res = await getOrder(activeStatus, user.id);
                    if (res.code === 200) {
                        setListDelivered(res.data);
                    }
                }
                if(activeStatus === 3) {
                    const res = await getOrder(activeStatus, user.id);
                    if (res.code === 200) {
                        setListRemove(res.data);
                    }
                }

            }catch (e) {
                console.log('error')
            }
        }
        fetchDataOrder().then();
    }, [activeStatus])
    async function ChangeStatus(id: number, status: number){
        try{
            const res = await changeStatus(id, status);
            if(res.code === 200){
                console.log('change status success!', id);
                setActiveStatus(status);
                setOrderId(id);
                await fetchOrderProduct(id);
                await UpdateInventory().then();
                await  UpdateShippedDate(id);
            }
        }catch (e) {
            console.log('error')
        }
    }
    async function UpdateShippedDate(id: number){
        try{
            const res = await updateShippedDate(id)
            if(res.code === 200){
                console.log('update success!')
            }
        }catch (e) {
            console.log('Err')
        }
    }
    function defaultDataInputInventory(size: string, colorName: string, quantity: number) : InputUpdateInventory{
        const data ={
            product_input: {
                color_name: colorName,
                size: size,
                quantity: quantity
            }
        }
        return data;
    }
        async function fetchOrderProduct(orderId : number){
            try{
                const res = await getOrderProduct(orderId);
                if(res.code === 200){
                    setListOrder(res.data);
                    for(let i = 0; i < res.data.length; i++){
                        const response = await getQuantityOfInventory(defaultDataInputQuantity(res.data[i].color, res.data[i].size), res.data[i].product_id);
                        if(response.code === 200){
                            console.log("quantity", response.data[0].quantity)
                            if(response.data.length > 0){
                                console.log('quantity inventory', response.data[0].quantity - res.data[i].quantity, res.data[i].color, res.data[i].size, res.data[i].product_id);
                                const resa = await updateInventory(defaultDataInputInventory(res.data[i].size, res.data[i].color, (response.data[0].quantity - res.data[i].quantity)), res.data[i].product_id);
                                if(resa.code === 200){
                                    console.log('update success!')
                                }
                            }
                        }
                    }

                }
            }catch (e) {
                console.log('error')
            }
        }
    function defaultDataInputQuantity(colorName: string, size: string) : InputInventory{
        const data ={
            product_input:{
                color_name: colorName,
                size: size
            }
        }
        return data;
    }
    async function UpdateInventory(){
        try {
            for(let i = 0; i < listOrder.length; i++){
                const response = await getQuantityOfInventory(defaultDataInputQuantity(listOrder[i].color, listOrder[i].size), listOrder[i].product_id);
                if(response.code === 200){
                    if(response.data.length > 0){
                        const res = await updateInventory(defaultDataInputInventory(listOrder[i].color, listOrder[i].size, (response.data[0].quantity - listOrder[i].quantity)), listOrder[i].product_id);
                        if(res.code === 200){
                            console.log('update success!')
                        }
                    }
                }

            }
            // const res = await updateInventory(defaultDataInputInventory())
        }catch (e) {
            console.log('error update quantity of inventory')
        }
    }
    return (
        <>
            <h5 className="text-order">Đơn hàng của tôi</h5>
            <div className="status-order">
                {listStatus.map((status, index) =>(
                    <div key={index} onClick={() =>{setActiveStatus(index)}} className={(activeStatus === index) ? "status-order-active" : "status-order-item"}>{status}</div>
                ))}

            </div>
            {(activeStatus === 0) && (
                <table border={1} className="table_order">

                    <thead>
                    <tr>
                        <th style={{width: "10px"}}>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th colSpan={2} >Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listWaiting.map((waiting,  index) =>(
                        <tr className="content-order" key={index}>
                            <td style={{width: "10px"}}>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency:"VND"
                            })}</td>
                                <td style={{borderRight: "none", width:"15px"}}>
                                    <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail"  style={{width:"120px", padding:"10px 0", height:"50px", margin:"0 10px"}}>
                                        <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                        Xem chi tiết
                                    </button>
                                    </Link>
                                </td>
                                <td style={{borderLeft: "none", width:"15px"}} >
                                    <button className="btn-view-delete-order" onClick={() => {
                                        setIsOpenReason(true);
                                        setOrderId(waiting.id);}}
                                            style={{width:"100px", padding:"10px 0", height:"50px", marginRight:"10px"}}>
                                        <i className="fa-solid fa-circle-xmark" style={{marginRight:"10px"}}></i>
                                        Hủy đơn
                                    </button>
                                </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            {(activeStatus === 1) && (
                <table border={1} className="table_order">

                    <thead>
                    <tr>
                        <th style={{width: "10px"}}>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listDelivering.map((waiting,  index) =>(
                        <tr className="content-order">
                            <td style={{width: "10px"}}>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency:"VND"
                            })}</td>
                            <td style={{borderRight: "none", width:"15px"}}>
                                <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail" style={{width:"120px", padding:"10px 0", height:"50px", margin:"0 10px"}}>
                                        <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                        Xem chi tiết</button>
                                </Link>
                            </td>
                            <td style={{borderLeft: "none", }} ><button className="btn-view-delete-order" style={{width:"110px", background:"orange"}}
                                                                        onClick={() => ChangeStatus(waiting.id, 2)}>Đã nhận hàng</button></td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            {(activeStatus === 2) && (
                <table border={1} className="table_order">

                    <thead>
                    <tr>
                        <th style={{width: "10px"}}>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listDelivered.map((waiting,  index) =>(
                        <tr className="content-order">
                            <td style={{width: "10px"}}>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency:"VND"
                            })}</td>
                            <td style={{borderRight: "none", width:"15px"}}>
                                <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail" style={{width:"120px", padding:"10px 0", height:"50px", margin:"0 10px"}}>
                                        <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                        Xem chi tiết</button>
                                </Link>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            {(activeStatus === 3) && (
                <table border={1} className="table_order">

                    <thead>
                    <tr>
                        <th style={{width: "10px"}}>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listRemove.map((waiting,  index) =>(
                        <tr className="content-order">
                            <td style={{width: "10px"}}>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency:"VND"
                            })}</td>
                            {/*<div style={{width:"180px"}}>*/}
                            <td style={{borderRight: "none", width: "15px"}}>
                                <button className="btn-view-confirm-order" style={{width:"170px", padding:"10px 0", height:"50px", margin:"0 10px"}}
                                        onClick={() => {setIsOpenViewReason(true); setOrderId(waiting.id)}}
                                >
                                    <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                    Xem lý do hủy đơn
                                </button>
                            </td>
                            <td style={{borderRight: "none", width:"15px"}}>
                                <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail" style={{width:"120px", padding:"10px 0", height:"50px", margin:"0 10px"}}>
                                        <i className="fa-solid fa-eye" style={{marginRight:"10px"}}></i>
                                        Xem chi tiết</button>
                                </Link>
                            </td>

                            {/*</div>*/}

                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            {isOpenViewReason &&
                <ViewReasonRemove setIsOpenReason={setIsOpenViewReason} orderId={orderId}/>
            }
            {isOpenReason &&
                <ReasonRemove
                    setIsOpenReason={setIsOpenReason}
                    setIsOpenSuccess={setIsOpenSuccess}
                    setTextSuccess={setTextSuccess}
                    setIsOpenError={setIsOpenError}
                    setTextError={setTextErrors}
                    changeStatus={ChangeStatus}
                    orderId={orderId}
                />
            }
            {isOpenSuccess && (
                <Modal>
                    <Success textSuccess={textSuccess}/>
                </Modal>
            )}
            {isOpenError && (
                <Modal>
                    <Errors textError={textErrors}/>
                </Modal>
            )}
        </>
    )
}

export default Order