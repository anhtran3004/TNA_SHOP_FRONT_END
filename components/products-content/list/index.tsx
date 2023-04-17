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
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error } = useSwr('/api/products', fetcher);
  // const [products, setProducts] = useState<Product[]>([])
  // useEffect(() =>{
  //   async function fetchProductData() {
  //     try {
  //       const res = await getListProduct(dataInputProduct())
  //       const status = res.code;
  //       if (status === 200) {
  //         setProducts(res.data);
  //       } else {
  //         console.log('error');
  //       }
  //     } catch (e) {
  //       console.log('error');
  //     }
  //   }
  //   // console.log("statusUpdate", statusUpdate);
  //   fetchProductData().then();
  // }), []
  // if (error) return <div>Failed to load users</div>;
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