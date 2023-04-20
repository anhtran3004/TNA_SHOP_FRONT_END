import process from "process";
import {InputLogin} from "../../types";

export async function login(input: InputLogin){
    const urls = process.env.NEXT_PUBLIC_BASE_URL;
    try{
        const url_login = urls + "/api/v1/user/login";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_login, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function RefreshToken(refreshToken: string){
    const urls = process.env.NEXT_PUBLIC_BASE_URL;
    const body = {refreshToken: refreshToken}
    try{
        const url_refreshToken = urls + "/api/v1/user/login";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url_refreshToken, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}