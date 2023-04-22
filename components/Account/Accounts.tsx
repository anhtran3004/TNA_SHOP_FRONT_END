import React, {useEffect, useState} from 'react'
import {User} from "../../types";
interface Props{
    user: User
}
export function formatDate(date: string){
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

}
const Accounts = (props: Props) => {
    const [valueName, setValueName] = useState('');
    const [valuePhone, setValuePhone] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    const [valueBirthDate, setValueBirthDate] = useState('')
    useEffect(() =>{
        console.log("props.user", props.user);
        const users = props.user;
        // @ts-ignore
        console.log("props.user.name", users[0].name);
        // @ts-ignore
        setValueName(users[0].name);
        // @ts-ignore
        setValuePhone(users[0].phone);
        // @ts-ignore
        setValueEmail(users[0].email);
        // @ts-ignore
        setValueBirthDate(users[0].birth_date);
    }, [])
    return (
        <>
            <h5 style={{ fontWeight: "700", marginBottom:"25px" }}>Thông tin tài khoản</h5>
            <form>
                <div className='form_group'>
                    <label>Họ tên</label><br></br>
                    <input type="text" placeholder={valueName} value={valueName} onChange={(e) => setValueName(e.target.value)}/>
                </div>
                <div className='form_group'>
                    <label>Số điện thoại</label><br></br>
                    <input type="text" value={valuePhone} onChange={(e) => setValuePhone(e.target.value)}/>
                </div>
                <div className='form_group'>
                    <label>Email</label><br></br>
                    <input type="text"  placeholder='Email' value={valueEmail} onChange={(e) => setValueEmail(e.target.value)}/>
                </div>
                <div className='form_group'>
                    <label>Sinh nhật(nhập thông tin dể nhận ưu đãi sinh nhật)</label><br></br>
                    <input type="date" value={formatDate(valueBirthDate)} onChange={(e) => setValueBirthDate(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" className='submit_form'>Lưu</button>
                </div>
            </form>
        </>
    )
}

export default Accounts