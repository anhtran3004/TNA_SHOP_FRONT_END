import Layout from '../layouts/Main';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { server } from '../utils/server'; 
import { postData } from '../utils/services';
import {useState} from "react";
import {forgotPassword} from "../lib/Auth/API";
import VerifyOtp from "../components/ForgotPassword/VerifyOtp";

type ForgotMail = {
  email: string;
}

const ForgotPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState('');
  const [isShowOtp, setIsShowOtp] = useState(false);
  const onSubmit = async () => {
    try{
      const res = await forgotPassword(email);
      if(res.code === 200){
        console.log('send otp success');
        setIsShowOtp(true);
      }
    }catch (e) {
      console.log('error', e)
    }
  };

  return (
    <Layout>
      {!isShowOtp ?
          <section className="form-page">
            <div className="container">
              <div className="back-button-section">
                <Link href="/products">
                  <a><i className="icon-left"></i> Back to shop</a>
                </Link>
              </div>

              <div className="form-block">
                <h2 className="form-block__title">Forgot your password?</h2>
                <p className="form-block__description">Enter your email or phone number and recover your account</p>

                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form__input-row">
                    <input
                        className="form__input"
                        placeholder="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={register({
                          required: true,
                          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                    />
                    {errors.email && errors.email.type === 'required' &&
                        <p className="message message--error">This field is required</p>
                    }

                    {errors.email && errors.email.type === 'pattern' &&
                        <p className="message message--error">Please write a valid email</p>
                    }
                  </div>
                  <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Send OTP</button>
                </form>
              </div>
            </div>
          </section>
          :
          <VerifyOtp email={email} setIsShowOtp={setIsShowOtp}/>
      }
    </Layout>
  )
}
  
export default ForgotPassword