export function HotFeatures() {
    return <section className="section">
        <div className="container">
            <header className="section__intro">
                <h4>Lý do bạn nên chọn chúng tôi?</h4>
            </header>

            <ul className="shop-data-items">
                <li>
                    <i className="icon-shipping"></i>
                    <div className="data-item__content">
                        <h4>Miễn phí vận chuyển</h4>
                        {/*<h4>Free Shipping</h4>*/}
                        <p>Tất cả tất các đơn hàng trên 200,000 đều được miễn phí vận chuyển.</p>
                        {/*<p>All purchases over $199 are eligible for free shipping via USPS First Class Mail.</p>*/}
                    </div>
                </li>

                <li>
                    <i className="icon-payment"></i>
                    <div className="data-item__content">
                        <h4>Dễ dàng thanh toán</h4>
                        <p>Tất cả các thanh toán đều được xử lý ngay lập tức thông qua giao thức thanh toán an toàn.</p>
                    </div>
                </li>

                <li>
                    <i className="icon-cash"></i>
                    <div className="data-item__content">
                        <h4>Đảm bảo hoàn tiền</h4>
                        <p>Nếu sản phẩm đến bị hư hỏng hoặc bạn đã thay đổi ý định, bạn có thể gửi nó trở lại để được
                            hoàn tiền đầy
                            đủ.</p>
                    </div>
                </li>

                <li>
                    <i className="icon-materials"></i>
                    <div className="data-item__content">
                        <h4>Đảm bảo chất lượng</h4>
                        <p>Được thiết kế để bền vững, mỗi sản phẩm của chúng tôi đều được chế tác bằng những vật liệu
                            tốt nhất.</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>;
}