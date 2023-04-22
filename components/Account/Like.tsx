import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
const Like = () => {
    function numberWithDots(x: number) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
    const [click, setClick] = useState(false);
    return (
        <>
            <h5 style={{ fontWeight: "700" }}>Sản phẩm yêu thích</h5>
            <div className='list-products row' >
                <div className='product' style={{ margin: "48px 14px" }}>
                    <div className='heart' onClick={() => setClick(true)}>
                        <i className='bx bxs-heart' ></i>
                        <p>Yêu thích</p>
                    </div>
                    <div className='thumbnail-product'>
                        <Image
                            // loader={myLoader}
                            src="/static/products-ar/ARISTINO_ABZ00601_PREVIEW_0.jpg"
                            width="240"
                            height="320"
                            alt=""
                        />
                    </div>
                    <div className='infor-product' id="l">
                        <div className='brand'>OWEN</div>
                        <span className={'name '}>Áo phong trắng</span>
                        <span style={{ border: "none", borderRadius: "5px" }} >...</span>
                        <div id="parent_p">
                            <div className='price'>{numberWithDots(2000000)}đ</div>
                            <div className='detail'>See-more</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Like