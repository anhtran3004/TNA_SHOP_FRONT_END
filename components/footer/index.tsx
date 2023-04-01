// import Logo from '../../assets/icons/logo';

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6>
              <Image src="/images/home/logo-tna-shop.png" width={56} height={38} />
              SHOP</h6>
            <p>TNA shop thiết kế quần áo cho giới trẻ, người già - nhưng quan trọng nhất là cho những người thời trang.</p>
            <ul className="site-footer__social-networks">
              <li><a href="#"><i className="icon-facebook"></i></a></li>
              <li><a href="#"><i className="icon-twitter"></i></a></li>
              <li><a href="#"><i className="icon-linkedin"></i></a></li>
              <li><a href="#"><i className="icon-instagram"></i></a></li>
              <li><a href="#"><i className="icon-youtube-play"></i></a></li>
            </ul>
          </div>

          <div className="site-footer__links">
            <ul>
              <li>Mua hàng online</li>
              <li><a href="#">Trạng thái đon hàng</a></li>
              <li><a href="#">Vận chuyển và gia hàng</a></li>
              <li><a href="#">Phẩn hối</a></li>
              <li><a href="#">Phương thức thanh toán</a></li>
              <li><a href="#">Liên hệ với chúng tôi</a></li>
            </ul>
            <ul>
              <li>Thông tin mở rộng</li>
              <li><a href="#">Thẻ đổi quà</a></li>
              <li><a href="#">Tìm kiếm của hàng offline</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Trở thành thành viên</a></li>
              <li><a href="#">Đến trang phản hồi</a></li>
            </ul>
            <ul>
              <li>Contact</li>
              <li><a href="#">tnashop1234@gmail.com</a></li>
              <li><a href="#">Hotline: +84 156 248 088</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/*<div className="site-footer__bottom">*/}
      {/*  <div className="container">*/}
      {/*    <p>DESIGN BY ICEO.CO - © 2019. ALL RIGHTS RESERVED.</p>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </footer>
  )
};


export default Footer