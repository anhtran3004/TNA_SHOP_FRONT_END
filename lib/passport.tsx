// @ts-ignore
import {jwt} from "jsonwebtoken"
import {RefreshToken} from "./Auth/API";

const refreshToken = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET;

const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        return decoded;
    } catch (err) {
        return null;
    }
};

const getAccessToken = async () => {
    // @ts-ignore
    const decoded = verifyToken(localStorage.getItem('accessToken'));
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