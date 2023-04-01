import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation} from 'swiper';

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {

  return (
    <section className="page-intro">  
      <Swiper navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-1.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Bộ sưu tập mùa hè</h2>
                <a href="#" className="btn-shop"><i className="icon-right"></i>Mua ngay</a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-2.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Bộ sưu tập mặc tại nhà</h2>
                <a href="#" className="btn-shop"><i className="icon-right"></i>Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/home/banner1.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Bộ sưu tập thể thao</h2>
                <a href="#" className="btn-shop"><i className="icon-right"></i>Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Miễn phí vận chuyển</h4>
                <p>Miễn phí vận chuyển với nhứng đơn hàng trên 200,000 đồng</p>
              </div>
            </li>
            
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% khách hàng hài lòng</h4>
                {/*<p>Our clients' opinions speak for themselves</p>*/}
                <p>Những bình luận của khách hàng đã nói lên tất cả</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Đảm bảo chất lượng</h4>
                <p>Tất cả sản phẩm tại cửa hàng đều được bảo hành 30 ngày</p>
                {/*<p>30 days warranty for each product from our store</p>*/}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
};

export default PageIntro