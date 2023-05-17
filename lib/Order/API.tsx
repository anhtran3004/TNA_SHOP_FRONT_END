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
export async function getOrder(status: number, userId: number){
    try{
        const body = {status: status}
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/get-order-follow-user/" + userId;
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
export async function getOrderProduct(id: number){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/order-product/"+id;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function changeStatus(id: number, status: number){
    try{
        const body = {status: status}
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/change-status/"+id;
        const fetchData = {
            method: 'PUT',
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
export async function updateShippedDate(id: number){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/update-order-product/"+id;
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getReason(id: number){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/get-reason/"+id;
        const fetchData = {
            headers:{
                "Content-type": "application/json"
            },
            method: 'POST',
        }
        const response = await fetch(url_getOrder, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateReasonOrder(id: number, reason: string){
    try{
        const url_getOrder = GetARBaseUrl() + "/api/v1/order/update-reason-remove/"+ id;
        const body={reason: reason}
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
