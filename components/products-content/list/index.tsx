import useSwr from 'swr';
import ProductItem from '../../product-item';
import ProductsLoading from './loading';
import {Product, ProductTypeList} from 'types';
import {useEffect, useState} from "react";
import {getListProduct} from "../../../lib/API";
import {dataInputProduct} from "../../products-featured/carousel";
import {dataOutputProduct} from "../../../pages/product";
interface Props{
  product: Product[]
}
const ProductsContent = (props: Props) => {
  return (
    <>
      {/*{!data && */}
      {/*  <ProductsLoading />*/}
      {/*}*/}

      {props.product &&
        <section className="products-list">
          {props.product.map((item, index)  => (
            <ProductItem
                key={index}
              product={item}
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent