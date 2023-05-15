import Layout from '../layouts/Main';
import {useEffect, useState} from "react";
import Order from "../components/Account/Order";
import Voucher from "../components/Account/Voucher";
import Point from "../components/Account/Point";
import Address from "../components/Account/Adress";
import Like from "../components/Account/Like";
import Accounts from "../components/Account/Accounts";
import {useRouter} from "next/router";
import {getUsers} from "../lib/User/API";
import {User} from "../types";
import Success from "../components/Alert/Success";
import Errors from "../components/Alert/Errors";
export function dataUserDefault() : User{
    const data = {
        id: 0,
        username: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        birth_date: ''
    }
    return data;
}
export function randomNumberInRange(min: number, max: number) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function Account(){
    const [showMenu, setShowMenu] = useState('1');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(0);
    const router = useRouter();
    const [user, setUser] = useState<User>(dataUserDefault());
    const [statusUpdateAccount, setStatusUpdateAccount] = useState(-1)
    // @ts-ignore
    const favorite = router.query.favorite;
    useEffect(() => {
        if(localStorage.getItem('dataDecoded') !== undefined){
            const data = JSON.parse(localStorage.getItem('dataDecoded') + "");
            if(data !== null){
                setUsername(data.user);
                setUserId(data.id);
                fetchUserData(data.id).then();
            }
        }

    }, [statusUpdateAccount])
    useEffect(() =>{
        if(favorite === 'true'){
            setShowMenu('5');
        }else{
            setShowMenu('1')
        }

    }, [favorite])
    async function fetchUserData(id: number){
        try{
            const res = await getUsers(id);
            if(res.code === 200){
                setUser(res.data);
            }
        }catch (e){
            console.log('error');
        }

    }
    useEffect(() =>{
        console.log("username",user.name);
    }, [user])
    function logout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('dataDecoded');
        router.push('/').then();
    }
    return<>
        <Layout>
            <div className="content_account container">
                <div className='left_account'>
                    <h1>Tài khoản</h1>
                    <div className='box_menu'>
                        <h2>{username}</h2>
                        <ul className='option_account'>
                            <li onClick={() =>{setShowMenu('1')}} className={showMenu=='1' ? "bor" : ""}><i className="fa-solid fa-cart-shopping"></i>Đơn hàng của tôi</li>
                            {/*<li onClick={() =>{setShowMenu('2')}} className={showMenu=='2' ? "bor" : ""}><i className="fa-light fa-percent"></i>Khuyến mại</li>*/}
                            {/*/!*<li onClick={() =>{setShowMenu('3')}} className={showMenu=='3' ? "bor" : ""}><i className="fa-regular fa-hundred-points"></i>C-points</li>*!/*/}
                            {/*<li onClick={() =>{setShowMenu('4')}} className={showMenu=='4' ? "bor" : ""}><i className="fa-sharp fa-solid fa-location-crosshairs"></i>Sổ địa chỉ</li>*/}
                            <li onClick={() =>{setShowMenu('5')}} className={showMenu=='5' ? "bor" : ""}><i className="fa-solid fa-heart"></i>Yêu thích</li>
                            <li onClick={() =>{setShowMenu('6')}} className={showMenu=='6' ? "bor" : ""}><i className="fa-solid fa-user"></i>Tài khoản</li>
                            <li  onClick={logout}><i className="fa-solid fa-right-from-bracket"></i>Đăng xuất</li>
                        </ul>
                        <div className='lh'>
                            <h5 style={{fontWeight:"700",marginTop: "15px"}}>Bạn cần hỗ trợ?</h5>
                            <p>Vui lòng gọi <span style={{color:"#31cbcb"}}>1800 1198</span>(miễn phí cước gọi)</p>
                        </div>
                    </div>
                </div>
                <div className="tab_right_account">
                    {showMenu == '1' ? (
                        <Order />
                    ) : null}
                    {/*{showMenu == '2' ? (*/}
                    {/*    <Voucher />*/}
                    {/*) : null}*/}
                    {/*{showMenu == '3' ? (*/}
                    {/*    <Point />*/}
                    {/*) : null}*/}
                    {showMenu == '4' ? (
                        <Address />
                    ) : null}
                    {showMenu == '5' ? (
                        <Like />
                    ) : null}
                    {showMenu == '6' ? (
                        <Accounts user={user} setStatusUpdateAccount={setStatusUpdateAccount}/>
                    ) : null}
                </div>
            </div>
        </Layout>

    </>
}