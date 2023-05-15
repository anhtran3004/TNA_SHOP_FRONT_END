import {Dispatch, SetStateAction, useState} from 'react';
import List from './list';
import {InputProduct, Product} from "../../types";
import Sort from "../products-filter/Sort";
interface Props{
  product: Product[]
  filterProduct: InputProduct,
  setFilterProduct: Dispatch<SetStateAction<InputProduct>>
}
const ProductsContent = (props: Props) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>Tổng sản phẩm<span>({props.product.length})</span></h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
          <div className="products__filter__select">
            <h4>Sắp xếp: </h4>
            <div className="select-wrapper">
              <Sort filterProduct={props.filterProduct} setFilterProduct={props.setFilterProduct} />
            </div>
          </div>
        </form>
      </div>

      <List product={props.product}/>
    </section>
  );
};
  
export default ProductsContent
  