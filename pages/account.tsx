import Layout from '../layouts/Main';
import {useEffect, useState} from "react";
import Order from "../components/Account/Order";
import Voucher from "../components/Account/Voucher";
import Point from "../components/Account/Point";
import Address from "../components/Account/Adress";
import Like from "../components/Account/Like";
import Accounts from "../components/Account/Accounts";
import {useRouter} from "next/router";
export default function Account(){
    const [showMenu, setShowMenu] = useState('1');
    const [username, setUsername] = useState('');
    const router = useRouter();
    useEffect(() => {
        if(localStorage.getItem('dataDecoded') !== undefined){
            const data = JSON.parse(localStorage.getItem('dataDecoded') + "");
            if(data !== null)
            setUsername(data.user);
        }

    }, [])
    function logout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('dataCoded');
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
                            <li onClick={() =>{setShowMenu('1')}} className={showMenu=='1' ? "bor" : ""}><i className='bx bx-package'></i>Đơn hàng của tôi</li>
                            <li onClick={() =>{setShowMenu('2')}} className={showMenu=='2' ? "bor" : ""}><i className="fa-light fa-percent"></i>Khuyến mại</li>
                            <li onClick={() =>{setShowMenu('3')}} className={showMenu=='3' ? "bor" : ""}><i className='bx bx-palette'></i>C-points</li>
                            <li onClick={() =>{setShowMenu('4')}} className={showMenu=='4' ? "bor" : ""}><i className='bx bxs-location-plus' ></i>Sổ địa chỉ</li>
                            <li onClick={() =>{setShowMenu('5')}} className={showMenu=='5' ? "bor" : ""}><i className='bx bx-heart' ></i>Yêu thích</li>
                            <li onClick={() =>{setShowMenu('6')}} className={showMenu=='6' ? "bor" : ""}><i className='bx bxs-user-circle' ></i>Tài khoản</li>
                            <li  onClick={logout}><i className='bx bx-log-out'></i>Đăng xuất</li>
                        </ul>
                        <div className='lh'>
                            <h5 style={{fontWeight:"700"}}>Bạn cần hỗ trợ?</h5>
                            <p>Vui lòng gọi <span style={{color:"#31cbcb"}}>1800 1198</span>(miễn phí cước gọi)</p>
                        </div>
                    </div>
                </div>
                <div className="tab_right_account">
                    {showMenu == '1' ? (
                        <Order />
                    ) : null}
                    {showMenu == '2' ? (
                        <Voucher />
                    ) : null}
                    {showMenu == '3' ? (
                        <Point />
                    ) : null}
                    {showMenu == '4' ? (
                        <Address />
                    ) : null}
                    {showMenu == '5' ? (
                        <Like />
                    ) : null}
                    {showMenu == '6' ? (
                        <Accounts />
                    ) : null}
                </div>
            </div>
        </Layout>
    </>
}