import {useEffect, useState} from "react";
import {getListCampaign} from "../../lib/Campaign/API";
import {Campaign, Product} from "../../types";
import Link from "next/link";
import {getListProduct} from "../../lib/API";
import {dataInputProduct} from "../products-featured/carousel";
import {dataOutputProduct} from "../../pages/product";

function DefaultDataCampaign(): Campaign {
    const data = {
        id: 0,
        name: '',
        sku: '',
        thumb: '',
        start_day: '',
        end_day: '',
        status: 0,
        campaign_description: ''
    }
    return data;
}

export function BlogInHome() {

    const [campaigns, setCampaigns] = useState<Campaign>(DefaultDataCampaign());
    const [products, setProducts] = useState<Product>(dataOutputProduct())
    const [campaign, setCampaign] = useState<Campaign>(DefaultDataCampaign())
    useEffect(() => {
        async function fetchCampaignData() {
            try {
                const res = await getListCampaign()
                const status = res.code;
                if (status === 200) {
                    setCampaigns(res.data[res.data.length - 1]);
                    setCampaign(res.data[0]);
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }

        async function fetchProductData() {
            try {
                const res = await getListProduct(dataInputProduct())
                const status = res.code;

                if (status === 200) {
                    setProducts(res.data[2]);

                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }

        fetchProductData().then();
        // setIsShowLoading(true);
        fetchCampaignData().then();

    }, [])
    return <section className="featured">
        <div className="container">
            <article style={{backgroundImage: `url(${campaigns.thumb})`}}
                     className="featured-item featured-item-large">
                <div className="featured-item__content">
                    <h3>Bộ sưu tập sắp tới!</h3>
                    <Link href={'/campaign/?sku=' + campaigns.sku} legacyBehavior>
                        <a className="btn btn--rounded">Xem bộ sưu tập</a>
                    </Link>
                </div>
            </article>

            <article style={{backgroundImage: `url(${products.thumb})`}}
                     className="featured-item featured-item-small-first">
                <div className="featured-item__content">
                    <h3>{(products.name.length > 15) ? products.name.slice(0, 15) + '...' : products.name} {products.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND"
                    })}</h3>
                    <Link href={'/product?sku=' + products.sku + '&id=' + products.id} legacyBehavior>
                        <a href="#" className="btn btn--rounded">Xem chi tiết</a>
                    </Link>
                </div>
            </article>

            <article style={{backgroundImage: `url(${campaign.thumb})`}}
                     className="featured-item featured-item-small">
                <div className="featured-item__content">
                    <h3>Sản phẩm cho mùa hè</h3>
                    <Link href={'/campaign/?sku=' + campaign.sku} legacyBehavior>
                        <a className="btn btn--rounded">Xem tất cả</a>
                    </Link>
                </div>
            </article>
        </div>
    </section>
}