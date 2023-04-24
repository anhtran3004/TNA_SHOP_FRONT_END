import Layout from '../layouts/Main';
import ShoppingCart from '../components/shopping-cart';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
    const {cartItems} = useSelector((state: RootState) => state.cart);
    return <>
        <Layout>
            {(cartItems.length === 0) ?
                <>
                    <div className="image-empty-cart">
                        <Image src="/images/home/empty-cart.webp" width={200} height={150}/>
                    </div>

                    <div className="cart-empty">
                        <Link href="/products">
                            <button className="btn btn--rounded btn--yellow">Quay lại mua sắm</button>
                        </Link>
                    </div>
                </>
                :
                <ShoppingCart/>
            }
        </Layout>
    </>
}


export default Products
  