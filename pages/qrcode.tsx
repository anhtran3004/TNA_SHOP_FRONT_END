import { useState, useEffect } from 'react';
import {QrReader} from "react-qr-reader";
// import {QrScanner} from "react-qr-scanner"

export default function OrderDetails() {
    // const QrScanner = require('react-qr-scanner');
    const [orderStatus, setOrderStatus] = useState('Đang giao hàng');
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        if (orderId !== '') {
            // Gọi API để chuyển đổi trạng thái đơn hàng sang hoàn thành
            setOrderStatus('Hoàn thành');
        }
    }, [orderId]);

    const handleScan = (data: string | null) => {
        if (data !== null) {
            setOrderId(data); // Lưu mã đơn hàng từ mã vạch
        }
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    return (
        <div>
            <div>Mã đơn hàng: {orderId}</div>
            <div>Trạng thái đơn hàng: {orderStatus}</div>
            {/*<QrReader*/}
            {/*    delay={300}*/}
            {/*    onError={handleError}*/}
            {/*    onScan={handleScan}*/}
            {/*    style={{ width: '100%' }}*/}
            {/*/>*/}
        </div>
    );
}