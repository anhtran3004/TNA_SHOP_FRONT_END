import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import ProductsFeatured from '../components/products-featured';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import {BlogInHome} from "../components/Home/BlogInHome";
import {HotFeatures} from "../components/Home/HotFeatures";

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro/>

      <BlogInHome/>

      <HotFeatures/>

      <ProductsFeatured/>
      <Subscribe/>
      <Footer/>
    </Layout>
  )
}


export default IndexPage