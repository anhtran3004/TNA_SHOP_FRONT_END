import React, { useState, useEffect } from 'react'
import {getOrder} from "../../lib/Order/API";
import {Order} from "../../types";

const Order = () => {
    const [activeStatus, setActiveStatus] = useState(0);
    const listStatus = ["Chờ xác nhận", "Đang giao", "Đã giao", "Đơn đã hủy"];
    const [listWaiting, setListWaiting] = useState<Order[]>([])
    const [listDelivering, setListDelivering] = useState<Order[]>([])
    const [listDelivered, setListDelivered] = useState<Order[]>([])
    const [listRemove, setListRemove] = useState<Order[]>([])


    function numberWithDots(x: number) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
    useEffect(() =>{
        async function fetchDataOrder(){
            try{
                const res = await getOrder(activeStatus);
                if(res.code === 200){
                    if(activeStatus === 0){
                        setListWaiting(res.data);
                    }else if(activeStatus === 1){
                        setListDelivering(res.data)
                    }else if(activeStatus === 2){
                        setListDelivered(res.data)
                    }else{
                        setListRemove(res.data);
                    }

                }
            }catch (e) {
                console.log('error')
            }
        }
        fetchDataOrder().then();

    }, [])
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
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listWaiting.map((waiting,  index) =>(
                        <tr>
                            <td>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price}</td>
                            <td><button className="btn-view-detail">Xem chi tiết</button></td>
                            <td>Hủy đơn</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            {(activeStatus === 1) && (
                <table border={1} className="table_order">

                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listDelivering.map((waiting,  index) =>(
                        <tr>
                            <td>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price}</td>
                            <td>View Detail</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            {(activeStatus === 2) && (
                <table border={1} className="table_order">

                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listDelivered.map((waiting,  index) =>(
                        <tr>
                            <td>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price}</td>
                            <td>Xem chi tiết</td>

                        </tr>
                    ))}

                    </tbody>
                </table>
            )}
            {(activeStatus === 3) && (
                <table border={1} className="table_order">

                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listRemove.map((waiting,  index) =>(
                        <tr>
                            <td>{index + 1}</td>
                            <td>{waiting.name}</td>
                            <td>{waiting.email}</td>
                            <td>{waiting.address}</td>
                            <td>{waiting.total_price}</td>
                            <td>View Detail</td>
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