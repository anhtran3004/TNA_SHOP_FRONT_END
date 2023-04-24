import {GetARBaseUrl} from "../API";
import {InputInventory} from "../../types";

export async function getQuantityOfInventory(input: InputInventory, id: number){
    try{
        const url_getInventory = GetARBaseUrl() + "/api/v1/product/get-quantity/" + id;
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_getInventory, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}