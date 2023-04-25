import process from "process";
import {GetARBaseUrl} from "../API";

export async function getListDiscounts(){
    try{
        const url_getListDiscount = GetARBaseUrl() + "/api/v1/discount/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListDiscount, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
