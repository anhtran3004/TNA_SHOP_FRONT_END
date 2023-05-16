import React from "react";

import Layout from '../../layouts/Main';
export default function Delivering(){
    return<>
        <Layout>
            <div className="container">
                <h3 className="header-delivering">CƯỚC PHÍ VẬN CHUYỂN</h3>
                <p className="text-delivering">Miễn phí giao hàng với tất cả đơn hàng có giá trị từ 499,000 vnđ trở lên tại tất cả tỉnh thành trên toàn quốc.</p>
                <p className="text-delivering">Đối với những đơn hàng có giá trị dưới 499,000 vnđ, TNA áp dụng biểu phí giao hàng theo từng khu vực được quy định dưới đây. Biểu phí này áp dụng từ 24/08/2017 cho đến khi có thay đổi.</p>
                <ul className="list-delivering">
                    <li className="delivering-item"><strong className="strong-item-delivering">HÀ NỘI</strong></li>
                    <ul className="list-delivering">
                        <li>Đống Đa, Hoàn Kiếm, Ba Đình, Hai Bà Trưng, Cầu Giấy, Thanh Xuân: 10.000đ</li>
                        <li>Hà Đông, Tây Hồ, Hoàng Mai, Long Biên, Bắc Từ Liêm, Nam Từ Liêm, Ba Vì, Chương Mỹ, Đan Phượng, Đông Anh, Gia Lâm, Hoài Đức, Mê Linh, Mỹ Đức, Phúc Thọ, Phú Xuyên, Quốc Oai, Sóc Sơn, Thạch Thất, Thanh Oai, Thanh Trì, Thường Tín, Ứng Hòa, Thị Xã Sơn Tây: 20.000đ</li>
                    </ul>
                    <li><strong>TP HỒ CHÍ MINH</strong></li>
                    <ul className="list-delivering">
                        <li>Tất cả các quận: 30.000đ</li>
                    </ul>
                    <li><strong>ĐÀ NẴNG</strong></li>
                    <ul className="list-delivering">
                        <li>Tất cả các quận: 30.000đ</li>
                    </ul>
                    <li><strong>TẤT CẢ CÁC TỈNH THÀNH KHÁC</strong></li>
                    <ul className="list-delivering">
                        <li>Bắc Giang, Bắc Ninh, Hà Nam, Hải Dương, Hải Phòng, Hưng Yên, Hòa Bình, Nam Định, Phú Thọ, Thái Nguyên, Vĩnh Phúc, Hòa Bình,Bắc Kan, Lạng Sơn, Nghệ An, Ninh Bình, Quảng Ninh, Thái Bình, Thanh Hóa, Tuyên Quang, Yên Bái, Nghệ An: 20.000đ</li>
                        <li>Điện Biên, Lào Cai, Hà Giang, Sơn La, Cao Bằng,Huế, Quảng Trị, Gia Lai, Đắc Lắc, Kom Tum, Đắc Nông, Phú Yên, Khánh Hòa, Hà Tình, Tiền Giang, Bến Tre, Tây Ninh, Đồng Tháp, Trà Vinh, Vĩnh Long, Đồng Nai, Bình Dương, Vũng Tàu, Long An, Quảng Bình, Quy Nhơn, Bình Thuận, Ninh Thuận, Bình Phước, Cần Thơ, Hậu Giang, Kiên Giang, An Giang, Long An, Sóc Trăng, Bạc Liêu, Cà Mau, Quảng Ngãi: 30.000đ</li>
                    </ul>
                </ul>

                <h3 className="header-delivering">THỜI GIAN VẬN CHUYỂN</h3>
                <ul className="list-delivering">
                    <li>Hà Nội: giao hàng từ 1 đến 3 ngày kể từ khi hệ thống xác nhận qua sms/email</li>
                    <li>Tuyến Đà Nẵng, TP.HCM: giao hàng trong vòng 3 ngày kể từ khi hệ thống xác nhận qua sms/email.</li>
                    <li>Tất cả thành phố khác: giao hàng trong vòng từ 3- 7 ngày kể từ khi hệ thống xác nhận qua sms/email.</li>
                </ul>

                <h3 className="header-delivering">ĐƠN HÀNG ĐƯỢC GIAO TỐI ĐA MẤY LẦN?</h3>
                <p className="text-delivering">Đơn hàng được giao tối đa 3 lần (Nếu lần 1 đơn hàng giao không thành công, nhân viên vận chuyển sẽ liên hệ lại bạn lần 2 sau 1-2 ngày làm việc kế tiếp. Như vậy sau 3 lần giao dịch không thành công đơn hàng sẽ hủy)</p>

                <h3 className="header-delivering">KIỂM TRA TÌNH TRẠNG ĐƠN HÀNG</h3>
                <p className="text-delivering">Để kiểm tra thông tin hoặc tình trạng đơn hàng bạn vui lòng sử dụng MÃ ĐƠN HÀNG đã được gửi trong email xác nhận hoặc tin nhắn xác nhận để thông báo tới bộ phận Chăm sóc khách hàng (tổng đài miễn phí cước gọi 1800 6061 nhánh 1)</p>

                <h3>KHI NHẬN ĐƠN HÀNG CÓ ĐƯỢC XEM SẢN PHẨM TRƯỚC KHI THANH TOÁN?</h3>
                <p className="text-delivering">Bạn hoàn toàn có thể mở gói hàng kiểm tra sản phẩm trước khi thanh toán hoặc trước khi vận chuyển rời đi.</p>
                <p className="text-delivering">Trong trường hợp bạn gặp vấn đề phát sinh bạn liên hệ ngay đến chúng tôi 1800 0000 để được hỗ trợ kịp thời.</p>
                <br/>
            </div>

        </Layout>
    </>
}