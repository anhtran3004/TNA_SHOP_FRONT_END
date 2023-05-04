import Layout from '../layouts/Main';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { server } from '../utils/server'; 
import { postData } from '../utils/services';
import {useEffect, useState} from "react";
import {login} from "../lib/Auth/API";
import {InputLogin} from "../types";
import {useRouter} from "next/router";
import Modal from "../components/Modal/Modal";
import Success from "../components/Alert/Success";
import Errors from "../components/Alert/Errors";

type LoginMail = {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [valueUsername, setValueUsername] = useState('');
  const [valuePassword, setValuePassword] = useState('')
  const { register, handleSubmit, errors } = useForm();
  const [accessToken, setAccessToken] = useState('');
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [textSuccess, setTextSuccess] = useState("");
  const [textErrors, setTextErrors] = useState("");
  const router = useRouter();

  // const onSubmit = async (data: LoginMail) => {
  //   const res = await postData(`${server}/api/login`, {
  //     email: data.email,
  //     password: data.password
  //   });
  //
  //   console.log(res);
  // };
  const onSubmit = () =>{
    // Login().then();
  }
  function RunLogin(){
    Login().then()

  }
  function inputLogin() : InputLogin{
    const data = {
      username: valueUsername,
      password: valuePassword
    }
    return data;
  }
  // useEffect(() =>{
    async function Login(){
    try {
      const res = await login(inputLogin())
      if(res.code === 200){
        console.log("Login success! ", res.data);
        // setAccessToken(res.data.accessToken);
        localStorage.setItem("accessToken", res.data.accessToken)
        setTextSuccess('Login success!');
        setIsOpenSuccess(true);
        setTimeout(() => router.push('/'), 3000)
      }
    }catch (e) {
      console.log('error');
      setTextErrors('Login error!');
      setIsOpenError(true);
      setTimeout(() => setIsOpenError(false), 2000)
    }
    }
  // },[])
  return <>
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a><i className="icon-left"></i> Trở lại mua hàng</a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Đăng nhập</h2>
            <p className="form-block__description">Tiến hành đăng nhập để có thể tận hưởng những tiện
            ích tại cửa hàng của chúng tôi.</p>
            
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  placeholder="username"
                  type="text" 
                  name="username"
                  value={valueUsername}
                  onChange={(e) => setValueUsername(e.target.value)}
                  // ref={register({
                  //   required: true,
                  //   pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  // })}
                />

                {errors.email && errors.email.type === 'required' && 
                  <p className="message message--error">This field is required</p>
                }

                {errors.email && errors.email.type === 'pattern' && 
                  <p className="message message--error">Please write a valid email</p>
                }
              </div>
              
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  value={valuePassword}
                  onChange={(e) => setValuePassword(e.target.value)}
                  required
                />

              </div>

              <div className="form__info">
                {/*<div className="checkbox-wrapper">*/}
                {/*  <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>*/}
                {/*    <input*/}
                {/*      type="checkbox"*/}
                {/*      name="keepSigned"*/}
                {/*      id="check-signed-in"*/}
                {/*      ref={register({ required: false })}*/}
                {/*    />*/}
                {/*    <span className="checkbox__check"></span>*/}
                {/*    <p>Giữ đăng nhập</p>*/}
                {/*  </label>*/}
                {/*</div>*/}
                <a href="/forgot-password" className="form__info__forgot-password">Quên mật khẩu?</a>
              </div>

              {/*<div className="form__btns">*/}
              {/*  <button type="button" className="btn-social fb-btn"><i className="icon-facebook"></i>Facebook</button>*/}
              {/*  <button type="button" className="btn-social google-btn"><img src="/images/icons/gmail.svg" alt="gmail" /> Gmail</button>*/}
              {/*</div>*/}

              <button type="submit" onClick={RunLogin} className="btn btn--rounded btn--yellow btn-submit">Đăng nhập</button>

              <p className="form__signup-link">Bạn đã có tài khoản chưa? <a href="/register">Đăng ký</a></p>
            </form>
          </div>

        </div>
      </section>
    </Layout>
    {isOpenSuccess && (
        // <Modal>
          <Success textSuccess={textSuccess} />
        // </Modal>
    )}
    {isOpenError && (
        // <Modal>
          <Errors textError={textErrors} />
        // </Modal>
    )}
  </>
}
  
export default LoginPage
  