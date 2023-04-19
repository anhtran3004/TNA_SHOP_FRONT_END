import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation} from 'swiper';
import {useEffect, useState} from "react";
import {getListCampaign} from "../../lib/Campaign/API";
import {Campaign} from "../../types";
import Link from "next/link";
import Modal from "../Modal/Modal";
import Loading from "../Loading/loading";

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isShowLoading, setIsShowLoading] = useState(true);
  useEffect(() => {
    async function fetchCampaignData() {
      try {
        const res = await getListCampaign()
        const status = res.code;
        if (status === 200) {
          setCampaigns(res.data);
        } else {
          console.log('error');
        }
      } catch (e) {
        console.log('error');
      }
    }
    // setIsShowLoading(true);
    fetchCampaignData().then(() => {
      setIsShowLoading(false);
    });

  }, [])
  return <>
    <section className="page-intro">

      <Swiper navigation effect="fade" className="swiper-wrapper">
        {isShowLoading &&
            <SwiperSlide>
              <div className="page-intro__slide" style={{backgroundImage: `url(/)`}}>
                <div className="container">
                  <div className="page-intro__slide__content">
                    <h2></h2>
                    <a className="btn-shop"><i className="icon-right"></i>Mua ngay</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
        }
        {campaigns.map((cam, index) =>(
            <SwiperSlide key={index}>
              <div className="page-intro__slide" style={{ backgroundImage: `url(${cam.thumb})` }}>
                <div className="container">
                  <div className="page-intro__slide__content">
                    <h2>{cam.name}</h2>
                    <Link href={'/campaign/?sku=' + cam.sku} legacyBehavior>
                      <a className="btn-shop"><i className="icon-right"></i>Mua ngay</a>
                    </Link>

                  </div>
                </div>
              </div>
            </SwiperSlide>
        ))}
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
    {isShowLoading &&
        <section className="loading-campaign">
          <Loading/>
        </section>
    }



  </>
};

export default PageIntro