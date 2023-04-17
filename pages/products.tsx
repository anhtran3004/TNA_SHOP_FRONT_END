import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';
import {useEffect, useState} from "react";
import {InputProduct, Product} from "../types";
import {getListProduct} from "../lib/API";
import {dataInputProduct} from "../components/products-featured/carousel";
import Modal from "../components/Modal/Modal";
import ErrorAlert from "../components/Alert/ErrorAlert"

const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [filterProduct, setFilterProduct] = useState<InputProduct>(dataInputProduct());
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
    }, [filterProduct])
    return <>
        <Layout>
            <Breadcrumb/>
            <section className="products-page">
                <div className="container">
                    <ProductsFilter filterProduct={filterProduct} setFilterProduct={setFilterProduct}/>
                    <ProductsContent product={products}/>
                </div>
            </section>
            <Footer/>
        </Layout>
        {isOpenAlert && (
            <Modal>
                <ErrorAlert textError={textErrorAPI} setIsCloseAlert={setIsOPenAlert}/>
            </Modal>
        )}
    </>
}
  
export default Products
  