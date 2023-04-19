import {Product} from "../../../types";

type ProductDescriptionType = {
  show: boolean;
  product: Product
}

const Description = (props: ProductDescriptionType) => {
  const style = {
    display: props.show ? 'flex' : 'none',
  }

  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block">
        <i className="icon-cart"></i>
        <h4>Mô tả chi tiết về sản phẩm</h4>
        <p>{props.product.description}</p>
      </div>
      <div className="product-description-block">
        <i className="icon-cart"></i>
        <h4>Details and product description</h4>
        <p>White Summer Vibes T-shirt in the uiKit line with a colorful print. <br></br>Made of jersey cotton. T-shirt fits perfectly with jeans, pants or shorts.</p>
      </div>
    </section>
  );
};
  
export default Description;
    