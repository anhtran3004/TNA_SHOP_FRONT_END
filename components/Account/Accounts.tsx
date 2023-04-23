import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {InputUser, User} from "../../types";
import {updateUsers} from "../../lib/User/API";
import {randomNumberInRange} from "../../pages/account";
import Success from "../Alert/Success";
import Errors from "../Alert/Errors";
interface Props{
    user: User,
    setStatusUpdateAccount: Dispatch<SetStateAction<number>>
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
    const [valueRole, setValueRole] = useState('');
    const [valueAddress, setValueAddress] = useState('');
    const [valueBirthDate, setValueBirthDate] = useState('');
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [textSuccess, setTextSuccess] = useState("");
    const [textErrors, setTextErrors] = useState("");
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
        setValueAddress(users[0].address);
        // @ts-ignore
        setValueRole(users[0].role);
        // @ts-ignore
        setValueBirthDate(formatDate(users[0].birth_date));
    }, []);
    function inputUser() : InputUser {
        // @ts-ignore
        const data ={
            user_input: {
                email: valueEmail,
                name: valueName,
                phone: valuePhone,
                address: valueAddress,
                birth_date: valueBirthDate,
                role: valueRole
            }
        }
        return data;

    }

    async function UpdateUser() {
        try{
            // @ts-ignore
            const id = props.user[0].id
            const res = await updateUsers(inputUser(), id)
            if(res.code === 200){
                console.log('update success!');
                props.setStatusUpdateAccount(randomNumberInRange(1, 1000));
                setTextSuccess('Cập nhật thông tin tài khoản thành công!');
                setIsOpenSuccess(true);
                setTimeout(() => setIsOpenSuccess(false), 2000)
            }
        }catch (e) {
            console.log('update error');
            setTextErrors('Cập nhật thất bại!');
            setIsOpenError(true);
            setTimeout(() => setIsOpenError(false), 2000)
        }

    }
    return (
        <>
            <h5 style={{ fontWeight: "700", marginBottom:"25px" }}>Thông tin tài khoản</h5>
            {/*<form>*/}
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
                <label>Địa chỉ</label><br></br>
                <input type="text" value={valueAddress} onChange={(e) => setValueAddress(e.target.value)}/>
            </div>
                <div className='form_group'>
                    <label>Sinh nhật(nhập thông tin dể nhận ưu đãi sinh nhật)</label><br></br>
                    <input type="date" value={formatDate(valueBirthDate)} onChange={(e) => setValueBirthDate(e.target.value)}/>
                </div>
                <div>
                    <button onClick={UpdateUser} className='submit_form'>Lưu</button>
                </div>
            {/*</form>*/}
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
    )
}

export default Accounts