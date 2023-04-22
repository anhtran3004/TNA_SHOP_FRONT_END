import React from 'react'
import { useState } from 'react'

const Point = () => {
    const [active, setActive] = useState('1')
    return (
        <>
            <h5 style={{ fontWeight: "700" }}>Thông tin C-point</h5>
            <div className='statistic_point'>
                <div >
                    <div style={{display:"flex", borderBottom:"solid 1px black "}} className="c-point">
                        <p>Tổng C-point</p>
                        <p>0</p>
                    </div>
                    <div style={{display:"flex", borderBottom:"solid 1px black "}} className="c-point">
                        <p>C-point khả dụng</p>
                        <p>0</p>
                    </div>
                </div>
                <div>
                    <div style={{display:"flex", borderBottom:"solid 1px black "}} className="c-point">
                        <p>C-point chưa nhận</p>
                        <p style={{color:"red"}}>0</p>
                    </div>
                    <div style={{display:"flex", borderBottom:"solid 1px black "}} className="c-point">
                        <p>C-point chờ</p>
                        <p style={{color:"red"}}>0</p>
                    </div>
                </div>
            </div>
            <div className='point_history'>
                <h5 style={{ fontWeight: "700" }}>Lịch sử</h5>
                <div className='menu_options_history'>
                    <p className={active == '1' ? "active_his" : ""} onClick={() => setActive('1')}>Tất cả</p>
                    <p className={active == '2' ? "active_his" : ""} onClick={() => setActive('2')}>Tích điểm</p>
                    <p className={active == '3' ? "active_his" : ""} onClick={() => setActive('3')}>Tiêu</p>
                </div>
                <table border={1} className="table_order">
                    <thead>
                    <tr>
                        <th>Sử dụng</th>
                        <th>C-point</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>A1234</td>
                        <td>1</td>
                        <td>12-09-2022</td>
                        <td>Đã tích</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Point