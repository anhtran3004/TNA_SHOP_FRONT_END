import React from 'react'

const accounts = () => {
    return (
        <>
            <h5 style={{ fontWeight: "700", marginBottom:"25px" }}>Thông tin tài khoản</h5>
            <form>
                <div className='form_group'>
                    <label>Họ tên</label><br></br>
                    <input type="text" placeholder='Họ tên' />
                </div>
                <div className='form_group'>
                    <label>Số điện thoại</label><br></br>
                    <input type="text" value="0932823382" readOnly/>
                </div>
                <div className='form_group'>
                    <label>Email</label><br></br>
                    <input type="text" placeholder='Email' />
                </div>
                <div>
                    <h6 style={{fontWeight:"600", marginBottom:"25px"}}>Sinh nhật(nhập thông tin dể nhận ưu đãi sinh nhật)</h6>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div className='form_birth'>
                            <label>Ngày</label><br></br>
                            <input type="text" value="21" />
                        </div>
                        <div className='form_birth'>
                            <label>Tháng</label><br></br>
                            <input type="text" value="09" />
                        </div>
                        <div className='form_birth'>
                            <label>Năm</label><br></br>
                            <input type="text" value="2001" />
                        </div>

                    </div>
                    <button type="submit" className='submit_form'>Lưu</button>
                </div>
            </form>
        </>
    )
}

export default accounts