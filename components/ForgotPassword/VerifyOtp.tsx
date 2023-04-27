import Link from 'next/link';
import { useForm } from "react-hook-form";

import React, {Dispatch, SetStateAction, useState} from "react";
import {verifyOtp} from "../../lib/Auth/API";
import ResetPassWord from "./ResetPassWord";
import withReactContent from "sweetalert2-react-content";

interface Props{
    email: string,
    setIsShowOtp: Dispatch<SetStateAction<boolean>>
}
const VerifyOtp= (props: Props) => {
    const { register, handleSubmit, errors } = useForm();
    const [otp, setOtp] = useState('');
    const [isShowResetPassword, setIsShowResetPassword] = useState(false);

    const onSubmit = async () => {
        try{
            const res = await verifyOtp(props.email, otp);
            if(res.code === 200){
                console.log('verify otp success');
                setIsShowResetPassword(true);
            }
        }catch (e) {
            console.log('error', e)
        }
    };

    return <>
        {(isShowResetPassword === false) ? <>
                <section className="form-page" style={{position:"relative"}}>
                    <h2 style={{position:"absolute", top:"100px", left:"18%"}} onClick={() => props.setIsShowOtp(false)}>Trở lại</h2>
                    <div className="container">
                        <div className="back-button-section">
                            <Link href="/pages/products">
                                <a><i className="icon-left"></i> Back to shop</a>
                            </Link>
                        </div>

                        <div className="form-block">
                            <h2 className="form-block__title">Mã xác nha đã được gửi đến email của bạn?</h2>
                            <p className="form-block__description">Háy nhận mã xác nhận để tiến hành đựt lại mật khẩu</p>

                            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form__input-row">
                                    <input
                                        className="form__input"
                                        placeholder="OTP"
                                        type="text"
                                        name="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Xác nhận</button>
                            </form>
                        </div>
                    </div>
                </section>
                </>
                :
                <ResetPassWord email={props.email} setIsShowResetPassword={setIsShowResetPassword} />
        }
    </>
}

export default VerifyOtp