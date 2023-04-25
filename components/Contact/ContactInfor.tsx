import React from "react";

export function ContactInfor() {
    return <div className="contact-box pt-100 pb-70 mt-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                    <div className="single-contact-box">
                        <i className="fa fa-map-marker"></i>
                        <div className="content-title">
                            <h3>Address</h3>
                            <p>
                                {/*{GetSiteConfig(config, "ContactInfo.Address")}*/}
                                Minh Khai, Bắc Từ Liêm, Hà Nội
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="single-contact-box">
                        <i className="fa fa-envelope"></i>
                        <div className="content-title">
                            <h3>Email</h3>
                            {/*<p>{GetSiteConfig(config, "ContactInfo.Email")}</p>*/}
                            {/*<p>fax@raxr.com</p>*/}
                            tnashop1234@gmail.com
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="single-contact-box">
                        <i className="fa fa-phone"></i>
                        <div className="content-title">
                            <h3>Phone</h3>
                            {/*<p>{GetSiteConfig(config, "ContactInfo.Phone")}</p>*/}
                            {/*<p>+123 (534) 445</p>*/}
                            +84 156 248 088
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}