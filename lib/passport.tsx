
const  jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken'
import {RefreshToken} from "./Auth/API";

const refreshToken = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;

export const verifyToken = (token: string) => {
    try {
        console.log(accessToken);
        const decoded = jwt.verify(token, 'jwtabcd');
        return decoded;
    }catch (e) {
        console.log('error verify token');
        // getAccessToken().then();
    }

};

export const getAccessToken = async () => {
    const decoded = verifyToken(localStorage.getItem('accessToken') +"");
    if (decoded && decoded.exp > Date.now() / 1000) {
        // Access token is still valid
        return decoded;
    } else {
        // Access token is expired, refresh it using the refresh token

        const data = await RefreshToken(refreshToken+"");
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            return verifyToken(data.accessToken);
        } else {
            // Refresh token is invalid, redirect to login page
            window.location.href = '/login';
            return null;
        }
    }
};