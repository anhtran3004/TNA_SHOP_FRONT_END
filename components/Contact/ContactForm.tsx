import React, { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {sendMessage} from "../../lib/Contact/API";
import {InputContact} from "../../types";
const MySwal = withReactContent(Swal);


const alertContent = () => {
    MySwal.fire({
        title: "Congratulations!",
        text: "Your message was successfully send and will back to you soon",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    });
};

// Form initial state
const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: "",
};

const ContactForm = () => {
    const [contact, setContact] = useState(INITIAL_STATE);
    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContact((prevState) => ({ ...prevState, [name]: value }));
        // console.log(contact)
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact((prevState) => ({ ...prevState, [name]: value }));
        // console.log(contact)
    };
    function dataDefaultInputContact() : InputContact{
        const data = {
            contact_input: {
                name: contact.name,
                email: contact.email,
                phone: contact.number,
                subject: contact.subject,
                message: contact.text
            }
        }
        return data;
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // const { name, email, number, subject, text } = contact;
            // const payload = {
            //     Name: name,
            //     Email: email,
            //     Phone: number,
            //     Subject: subject,
            //     Message: text
            // };
            // todo: change url to api
            const response = await sendMessage(dataDefaultInputContact())
            // console.log(response);
            if (response.code === 200) {
                setContact(INITIAL_STATE);
                alertContent();
            }

            // window.open(`mailto:info@tranminhmed.vn?subject=${subject}&body=${text}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="contact-section ptb-100">
            <div className="container">
                <div className="row align-items-center">
                    {/*<div className="col-lg-6">*/}
                    {/*    <div className="contact-image">*/}
                    {/*        /!* <img src="/images/contact.png" alt="image" /> *!/*/}
                    {/*        <GoogleMapsComponent></GoogleMapsComponent>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="col-lg-6">
                        <div className="contact-form">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Họ tên"
                                                className="form-control"
                                                value={contact.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="Email"
                                                className="form-control"
                                                value={contact.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="number"
                                                placeholder="Số điện thoại"
                                                className="form-control"
                                                value={contact.number}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="subject"
                                                placeholder="Chủ đề"
                                                // placeholder="Subject"
                                                className="form-control"
                                                value={contact.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                      <textarea
                          name="text"
                          cols={30}
                          rows={6}
                          placeholder="Viết tin nhắn của bạn..."
                          className="form-control"
                          value={contact.text}
                          onChange={handleChangeTextArea}
                          required
                      />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-sm-12">
                                        <button type="submit" className="submit-btn mt-2">
                                            Gửi liên hệ
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
