import React, { useState, useEffect } from 'react'

const Order = () => {
    function numberWithDots(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <>
            <h5 style={{ fontWeight: "700" }}>Đơn hàng của tôi</h5>
            <p>Tất cả đơn hàng</p>
            <table border={1} className="table_order">
                <thead>
                <tr>
                    <th>Đơn hàng</th>
                    <th>Ngày mua</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>A1234</td>
                    <td>12-09-2022</td>
                    <td>1</td>
                    <td>{numberWithDots(2000)}đ</td>
                    <td>Đã giao hàng</td>
                </tr>
                </tbody>
            </table>
            <div className="page">
            </div>
        </>
    )
}

export default Order