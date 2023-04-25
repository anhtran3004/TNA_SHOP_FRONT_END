import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import ProductsFeatured from '../components/products-featured';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import {BlogInHome} from "../components/Home/BlogInHome";
import {HotFeatures} from "../components/Home/HotFeatures";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const IndexPage = () => {
    return (
        <Layout>
            <PageIntro/>

            <BlogInHome/>

            <HotFeatures/>

            <ProductsFeatured/>
            <Subscribe/>
            <Footer/>
            <div className="messenger-contact">
                <Link href="">
                    <Image src="/images/home/messenger.png" width={50} height={50}/>
                </Link>
            </div>
        </Layout>
    )
}


export default IndexPage