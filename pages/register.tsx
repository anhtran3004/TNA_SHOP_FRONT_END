import Layout from '../layouts/Main';
import Link from 'next/link';
import React, {useState} from "react";
import {getUsername, insertUsers} from "../lib/User/API";
import {InputInsertUser} from "../types";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
const MySwal = withReactContent(Swal);
const alertContent = () => {
  MySwal.fire({
    title: "Chúc Mừng!",
    text: "Đăng ký tài khoản thành công",
    icon: "success",
    timer: 1000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
// @ts-ignore
export default function Register(){
  // const [formData, setFormData] = useState<RegisterFormData>(defaultRegisterFormData());
  const [valueFirstName, setValueFirstName] = useState('')
  const [valueLastName, setValueLastName] = useState('')
  const [valueUsername, setValueUsername] = useState('')
  const [valueEmail, setValueEmail] = useState('')
  const [valuePassword, setValuePassword] = useState('')
  const [valueConfirmPassword, setValueConfirmPassword] = useState('')
  const [valuePhone, setValuePhone] = useState('')
  const [valueAddress, setValueAddress] = useState('')
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    handleCheckUsername().then(() => {
      console.log("user", usernameError)
      if(passwordError || usernameError !== ''){
        return;
      }
      console.log("submit");
      // onSubmit(formData);
      InsertUser().then();
    });


  }
  function defaultDataInputUser() : InputInsertUser{
    const data = {
      user_input: {
        email: valueEmail,
        name: valueLastName + valueFirstName,
        phone: valuePhone,
        address: valueAddress,
        username: valueUsername,
        password: valuePassword,
      }
    }
    return data
  }
  async function InsertUser(){
    try{
      const res = await insertUsers(defaultDataInputUser());
      if(res.code === 200){
        console.log('insert user success!')
        alertContent();
        setTimeout(() => router.push('/login').then(), 1000);
      }
    }catch (e) {
      console.log('error insert value')
    }
  }
  async function handleCheckUsername(){
    const res = await getUsername();
    let dem = 0;
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].username === valueUsername){
        setUsernameError('Username đã tồn tại');
        dem++;
      }
    }
    if(dem === 0){
      setUsernameError('');
    }
  }
  async function handleCheckEmail(){
    const res = await getUsername();
    let dem = 0;
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].email === valueEmail){
        setEmailError('Email đã tồn tại');
        dem++;
      }
    }
    if(dem === 0){
      setEmailError('');
    }
  }
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {value} = e.target;
    if(value !== valuePassword){
      setPasswordError('Mật khẩu không trùng khớp!')

    }else{
      setPasswordError('');
    }
    setValueConfirmPassword(value);
  }
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
            <h2 className="form-block__title">Tạo tài khoản và khám phá tiện ích</h2>
            <p className="form-block__description">Tiến hành đăng ký một tài khoản để trở thành khách hàng
              thân thiết của chúng tôi.</p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form__input-row">
                <input className="form__input" placeholder="First Name" type="text" value={valueFirstName} onChange={(e) => setValueFirstName(e.target.value)} required/>
              </div>

              <div className="form__input-row">
                <input className="form__input" placeholder="Last Name" type="text"value={valueLastName} onChange={(e) => setValueLastName(e.target.value)} required/>
              </div>
              <div className="form__input-row">
                <input className="form__input" placeholder="User Name" type="text"value={valueUsername} onChange={(e) => { setValueUsername(e.target.value)}} onBlur={handleCheckUsername} required/>
                {usernameError && <div style={{color:"red", marginLeft:"10px", marginTop:"5px"}}>{usernameError}</div>}
            </div>
            <div className="form__input-row">
              <input className="form__input" placeholder="Email" type="email" value={valueEmail} onChange={(e) => setValueEmail(e.target.value)} onBlur={handleCheckEmail} required/>
              {emailError && <div style={{color:"red", marginLeft:"10px", marginTop:"5px"}}>{emailError}</div>}
            </div>
              <div className="form__input-row">
                <input className="form__input" placeholder="Phone Number" type="text" value={valuePhone} onChange={(e) => setValuePhone(e.target.value)} required/>
              </div>
              <div className="form__input-row">
                <input className="form__input" type="Password" placeholder="Password" value={valuePassword} onChange={(e) => setValuePassword(e.target.value)} required/>
              </div>
              <div className="form__input-row">
                <input className="form__input" type="Password" placeholder="Confirm Password" value={valueConfirmPassword} onChange={handleConfirmPasswordChange} required/>
              </div>
              {passwordError && <div style={{color:"red", marginLeft:"10px",marginBottom:"5px"}}>{passwordError}</div>}
              <div className="form__input-row">
                <input className="form__input" type="text" placeholder="Address" value={valueAddress} onChange={(e) => setValueAddress(e.target.value)} required/>
              </div>
              {/*<div className="form__info">*/}
              {/*  /!*<div className="checkbox-wrapper">*!/*/}
              {/*  /!*  <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>*!/*/}
              {/*  /!*    <input name="signed-in" type="checkbox" id="check-signed-in" />*!/*/}
              {/*  /!*    <span className="checkbox__check"></span>*!/*/}
              {/*  /!*      <p>Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của Google</p>*!/*/}
              {/*  /!*  </label>*!/*/}
              {/*  /!*</div>*!/*/}
              {/*</div>*/}

              <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Đăng ký</button>

              <p className="form__signup-link">
                <Link href="/login">
                  <a href="#">Bạn đã là thành viên chưa?</a>
                </Link>
              </p>
            </form>
          </div>

        </div>
      </section>
    </Layout>
  </>
}