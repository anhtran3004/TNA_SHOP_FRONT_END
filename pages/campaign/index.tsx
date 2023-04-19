import React, {useEffect, useState} from "react";
import Layout from '../../layouts/Main';
import Image from "next/image";
import ProductsFilter from "../../components/products-filter";
import ProductsContent from "../../components/products-content";
import Footer from "../../components/footer";
import {getListProduct} from "../../lib/API";
import {InputProduct, Product, Campaign} from "../../types";
import {dataInputProducts} from "../products";
import {getListCampaign} from "../../lib/Campaign/API";
import Link from "next/link";
import {useRouter} from "next/router";
export function GetDefaultCampaign() {
    const data = {
        id: 0,
        name: '',
        thumb: '',
        sku: '',
        start_day: '',
        end_day: '',
        status: 0,
        campaign_description: ""
    }
    return data
}

export default function CampaignPage(){
    function dataInputProducts(campaignId: number): InputProduct {
        const data = {
            filter: {
                product_id: [],
                category_id: [],
                campaign_id: [campaignId],
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
    const [products, setProducts] = useState<Product[]>([])
    const [isOpenAlert, setIsOPenAlert] = useState(false);
    const [textErrorAPI, setTextErrorAPI] = useState("");
    const [campaignSelected, setCampaignSelected] = useState<Campaign>(GetDefaultCampaign());
    const [campaignId, setCampaignId] = useState(0);
    const [filterProduct, setFilterProduct] = useState<InputProduct>(dataInputProducts(campaignId));

    const router = useRouter();
    const sku = router.query.sku;

    useEffect(() =>{
        async function fetchCampaignData() {
            try {
                const res = await getListCampaign()
                const status = res.code;
                if (status === 200) {
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].sku === sku){
                            setCampaignSelected(res.data[i]);
                            setCampaignId(res.data[i].id)
                        }
                    }
                } else {
                    console.log('error');
                }
            } catch (e) {
                console.log('error');
            }
        }

        fetchCampaignData().then();
    }, [])
    useEffect(() =>{
        console.log(campaignId);
        setFilterProduct(dataInputProducts(campaignId))
    }, [campaignId])
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
    return<>
        <Layout>
            <h1 className="container title-campaign">{campaignSelected.name}</h1>
            <div className="banner-campaign container">

                <div>
                <Image src={campaignSelected.thumb} alt=""
                       width={1200}
                       height={500}
                       // layout="fill"
                       // objectFit="contain"
                       // objectPosition="center"
                />
                </div>

            </div>
            {/*<h1 className="container desc-campaign">{campaignSelected.campaign_description}</h1>*/}
            {/*<div className="container text-campaign">*/}
            {/*    <h1>{campaignSelected.name}</h1>*/}
            {/*    <p>{campaignSelected.campaign_description}</p>*/}
            {/*</div>*/}

            <section className="products-page" style={{marginTop: "20px"}}>

                <div className="container">
                    <ProductsFilter filterProduct={filterProduct} setFilterProduct={setFilterProduct}/>
                    <ProductsContent product={products} filterProduct={filterProduct} setFilterProduct={setFilterProduct}/>
                </div>
            </section>
            <div>
                <Footer/>
            </div>

        </Layout>
    </>
}
