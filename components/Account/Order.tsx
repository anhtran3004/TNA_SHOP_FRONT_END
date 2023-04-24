import React, { useState, useEffect } from 'react'
import {changeStatus, getOrder} from "../../lib/Order/API";
import {Order} from "../../types";
import Modal from "../Modal/Modal";
import Link from "next/link";

const Order = () => {
    const [activeStatus, setActiveStatus] = useState(0);
    const listStatus = ["Chờ xác nhận", "Đang giao", "Đã giao", "Đơn đã hủy"];
    const [listWaiting, setListWaiting] = useState<Order[]>([])
    const [listDelivering, setListDelivering] = useState<Order[]>([])
    const [listDelivered, setListDelivered] = useState<Order[]>([])
    const [listRemove, setListRemove] = useState<Order[]>([])
    useEffect(() =>{
        async function fetchDataOrder(){
            try{
                if(activeStatus === 0) {
                    const res = await getOrder(activeStatus);
                    if (res.code === 200) {
                        setListWaiting(res.data);
                    }
                }
                if(activeStatus === 1) {
                    const res = await getOrder(activeStatus);
                    if (res.code === 200) {
                        setListDelivering(res.data);
                    }
                }
                if(activeStatus === 2) {
                    const res = await getOrder(activeStatus);
                    if (res.code === 200) {
                        setListDelivered(res.data);
                    }
                }
                if(activeStatus === 3) {
                    const res = await getOrder(activeStatus);
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
    async function ChangeStatus(id: number){
        try{
            const res = await changeStatus(id, 3);
            if(res.code === 200){
                console.log('change status success!');
                setActiveStatus(3);
            }
        }catch (e) {
            console.log('error')
        }
    }
    return (
        <>
            <h5 className="text-order">Đơn hàng của tôi</h5>
            {/*<p>Tất cả đơn hàng</p>*/}
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
                                <td style={{borderRight: "none", width:"15px"}}>
                                    <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail">Xem chi tiết</button>
                                    </Link>
                                </td>
                                <td style={{borderLeft: "none", width:"15px"}} ><button className="btn-view-delete-order" onClick={() => ChangeStatus(waiting.id)}>Hủy đơn</button></td>
                            {/*</div>*/}

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
                        <th>Action</th>
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
                            {/*<div style={{width:"180px"}}>*/}
                            <td style={{borderRight: "none", width:"15px"}}>
                                <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail">Xem chi tiết</button>
                                </Link>
                            </td>
                            {/*</div>*/}

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
                        <th>Action</th>
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
                            {/*<div style={{width:"180px"}}>*/}
                            <td style={{borderRight: "none", width:"15px"}}>
                                <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail">Xem chi tiết</button>
                                </Link>
                            </td>
                            {/*<td style={{borderLeft: "none", width:"15px"}} ><button className="btn-view-delete-order">Hủy đơn</button></td>*/}
                            {/*</div>*/}

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
                            <td style={{borderRight: "none", width:"15px"}}>
                                <Link href={"/order-detail?orderId=" + waiting.id}>
                                    <button className="btn-view-detail">Xem chi tiết</button>
                                </Link>
                            </td>
                            <td style={{borderLeft: "none", width:"15px"}} >
                                {/*<Link href={"/product?id=" + waiting.}>*/}
                                {/*<button className="btn-view-delete-order" style={{background: "blue"}}>Mua lại</button>*/}
                                {/*</Link>*/}
                            </td>
                            {/*</div>*/}

                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            <div className="page">
            </div>
        </>
    )
}

export default Order