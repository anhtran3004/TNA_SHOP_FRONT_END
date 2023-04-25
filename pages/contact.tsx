import React from "react";
import Layout from '../layouts/Main';
import {ContactInfor} from "../components/Contact/ContactInfor";
import Footer from "../components/footer";
import ContactForm from "../components/Contact/ContactForm";

export default function Contact(){
    return<>
        <Layout>
            <ContactInfor/>
            <ContactForm/>
            <Footer />
        </Layout>
    </>
}