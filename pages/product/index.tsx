
import {useEffect, useState} from 'react';
import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFeatured from '../../components/products-featured';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/product-single/content';
import Description from '../../components/product-single/description';
import Reviews from '../../components/product-single/reviews';
import { ProductType } from 'types';
import {getListProduct} from "../../lib/API";
import {dataInputProduct} from "../../components/products-featured/carousel";
import {useRouter} from "next/router";
import {Product} from 'types';

type ProductPageType = {
  product: ProductType;
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const pid = query.pid;
//   const res = await fetch(`${server}/api/product/${pid}`);
//   const product = await res.json();
//
//   return {
//     props: {
//       product,
//     },
//   }
// }

export function dataOutputProduct(): Product {
    const data = {
        id: 0,
        name: "",
        sku: "",
        description: "",
        price: 0,
        thumb: "",
        status: 0,
        hot: 0,
        import_date: "",
        update_date: "",
        category_id: 0,
        campaign_id: 0,
        discount_id: 0,
        favorite: 0,
        priority: 0
    }
    return data;
}
const Product = ({ product }: ProductPageType) => {
    const [products, setProducts] = useState<Product>(dataOutputProduct())
  const [showBlock, setShowBlock] = useState('description');
  const router = useRouter();
  const sku = router.query.sku;
    useEffect(() => {
        async function fetchProductData() {
            try {
                const res = await getListProduct(dataInputProduct())
                const status = res.code;

                if (status === 200) {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].sku === sku) {
                            setProducts(res.data[i]);
                        }
                    }
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }

        fetchProductData().then();
        // fetchInventory().then();
    }, [sku])
  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={products.thumb} />
            <Content product={products} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button type="button" onClick={() => setShowBlock('description')} className={`btn btn--rounded ${showBlock === 'description' ? 'btn--active' : ''}`}>Mô tả</button>
              <button type="button" onClick={() => setShowBlock('reviews')} className={`btn btn--rounded ${showBlock === 'reviews' ? 'btn--active' : ''}`}>Bình luận (2)</button>
            </div>

            <Description show={showBlock === 'description'} />
            {/*<Reviews product={product} show={showBlock === 'reviews'} />*/}
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
}

export default Product