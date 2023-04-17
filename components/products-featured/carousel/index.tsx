import ProductItem from './../../product-item';
import {InputProduct, ProductTypeList, Product} from 'types';
// import Swiper core and required components
import { Swiper, SwiperSlide } from 'swiper/react';
import {useEffect, useRef, useState} from "react";
import {getListProduct} from "../../../lib/API";

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if(window.innerWidth > 568) {
    slidesPerView = 2;
    spaceBetween = 15;
    centeredSlides = false;
  }
  if(window.innerWidth > 800) {
    slidesPerView = 3;
    spaceBetween = 15;
    centeredSlides = false;
  }
  if(window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

type ProductsCarouselType = {
  products: ProductTypeList[]
}
export function dataInputProduct(): InputProduct {
  const data = {
    filter: {
      product_id: [],
      category_id: [],
      price: {
        min: 0,
        max: 10000000
      }
    },
    sort: {
      field: "priority",
      order: "DESC"
    },
    pagination: {
      page: 0,
      perPage: 1000
    }
  }
  return data;
}
const ProductsCarousel = () => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() =>{
    async function fetchProductData() {
      try {
        const res = await getListProduct(dataInputProduct())
        const status = res.code;
        if (status === 200) {
          for(let i = 0; i < res.data.length; i++){
            if(res.data[i].hot === 1)
              setProducts((prev) => [...prev,res.data[i]]);
          }

        } else {
          console.log('error');
        }
      } catch (e) {
        console.log('error');
      }
    }
    // console.log("statusUpdate", statusUpdate);
    fetchProductData().then();
  }), []
  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel containers">
      <Swiper 
      spaceBetween={spaceBetween} 
      // loop={true}
      centeredSlides={centeredSlides} 
      watchOverflow={true} 
      slidesPerView={slidesPerView}
      // onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="swiper-wrapper">
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductItem
              product={item}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductsCarousel