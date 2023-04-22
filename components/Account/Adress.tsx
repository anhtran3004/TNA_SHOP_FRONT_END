import React from 'react'

const Address = () => {
    return (
        <>
            <div className='new_address'>
                <div className='add_address'>
                    <h5 style={{ fontWeight: "700" }}>Địa chỉ nhận hàng</h5>
                    <div><i className='bx bx-plus-circle' ></i> Thêm địa chỉ mới</div>
                </div>
                <div className='list_address'>
                    <div>
                        <p>Trần Anh</p>
                        <p>0932934832</p>
                        <p>số 123, Mink Khai, Nam Từ Liêm, Hà Nội</p>
                    </div>
                    <p style={{color:"#63b1bc"}}>Chỉnh sửa</p>
                </div>
            </div>
            <div className='receipt'>
                <h5 style={{ fontWeight: "700" }}>Hóa đơn mua hàng</h5>
            </div>
        </>
    )
}

export default Address