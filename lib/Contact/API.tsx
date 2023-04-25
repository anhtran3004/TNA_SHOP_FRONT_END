import {GetARBaseUrl} from "../API";
import {InputContact} from "../../types";

export async function sendMessage(inputContact: InputContact){
    try{
        const url_getSaveProduct = GetARBaseUrl() + "/api/v1/contact/insert-contact";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputContact)
        }
        // @ts-ignore
        const response = await fetch(url_getSaveProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}