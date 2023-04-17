import {InputProduct} from "../types";
import process from "process";
function GetARBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (url === undefined) return "https://a969-27-72-146-175.ngrok-free.app";
    return url
}
export async function getListCategories(){
    const urls = process.env.NEXT_PUBLIC_BASE_URL;
    try{
        const url_getCategory = urls + "api/v1/category/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getCategory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getListProduct(filter: InputProduct){
    try{
        const url_getListProduct = GetARBaseUrl() + "/api/v1/product/";
        const fetchData = {
            method: 'POST',
            body: JSON.stringify(filter)
        }
        const response = await fetch(url_getListProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getInventories(productId: string | string[] | undefined){
    try{
        const url_getInventory = GetARBaseUrl() + "/api/v1/product/get-quantity-of-inventory/" + productId;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getColors(productId: string | string[] | undefined){
    try{
        const url_getInventory = GetARBaseUrl() + "/api/v1/product/get-list-color/" + productId;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function getSizes(productId: string | string[] | undefined, colorName: string){
    try{
        const url_getInventory = GetARBaseUrl() + "/api/v1/product/get-list-size/" + productId + "/" + colorName;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}