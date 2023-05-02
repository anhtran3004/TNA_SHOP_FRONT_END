import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';
import {useEffect, useState} from "react";
import {InputProduct, Product} from "../types";
import {getListProduct} from "../lib/API";

import Modal from "../components/Modal/Modal";
import ErrorAlert from "../components/Alert/ErrorAlert"
export function dataInputProducts(){
    const data: InputProduct = {
        filter: {
            search: "",
            product_id: [],
            category_id: [],
            campaign_id: [],
            price: {
                min: 0,
                max: 10000000
            }
        },
        sort: {
            field: "id",
            order: "DESC"
        },
        pagination: {
            page: 0,
            perPage: 1000
        }
    }
    return data;
}
const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [filterProduct, setFilterProduct] = useState<InputProduct>(dataInputProducts());
    const [isOpenAlert, setIsOPenAlert] = useState(false);
    const [textErrorAPI, setTextErrorAPI] = useState("");
    useEffect(() =>{
        async function fetchProductData() {
            try {
                const res = await getListProduct(filterProduct)
                const status = res.code;
                if (status === 200) {
                    setProducts(res.data);
                } else {
                    console.log('error');
                    setTextErrorAPI("Không thể tải sản phẩm!")
                    setIsOPenAlert(true);
                }
            } catch (e) {
                console.log('error');
            }
        }
        // console.log("statusUpdate", statusUpdate);
        fetchProductData().then();
        console.log("filterProduct", filterProduct);
    }, [filterProduct])
    useEffect(() => {
        console.log(products);
    }, [products])
    return <>
        <Layout>
            <Breadcrumb/>
            <section className="products-page">
                <div className="container">
                    <ProductsFilter filterProduct={filterProduct} setFilterProduct={setFilterProduct}/>
                    <ProductsContent product={products} filterProduct={filterProduct} setFilterProduct={setFilterProduct}/>
                </div>
            </section>
            <div>
                <Footer/>
            </div>

        </Layout>
        {isOpenAlert && (
            <Modal>
                <ErrorAlert textError={textErrorAPI} setIsCloseAlert={setIsOPenAlert}/>
            </Modal>
        )}
    </>
}
  
export default Products
  