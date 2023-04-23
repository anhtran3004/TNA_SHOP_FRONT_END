import {GetARBaseUrl} from "../API";
import {InputOrder, InputOrderProduct} from "../../types";

export async function insertOrder(input: InputOrder){
    try{
        const url_insertOrder = GetARBaseUrl() + "/api/v1/order/insert-order";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertOrderProduct(input: InputOrderProduct){
    try{
        const url_insertOrder = GetARBaseUrl() + "/api/v1/order/insert-order-product";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_insertOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getOrder(status: number){
    try{
        const body = {status: status}
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}