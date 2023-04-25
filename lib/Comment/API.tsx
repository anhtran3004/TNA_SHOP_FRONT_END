import {GetARBaseUrl} from "../API";
import {GetUserAuthentication} from "../Favorite/API";
import {InputComment} from "../../types";

export async function getListComment(productId: number){
    try{
        const url_getListDiscount = GetARBaseUrl() + "/api/v1/comment/get-comment-follow-product/" + productId;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListDiscount, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertComment(inputComment: InputComment){
    try{
        const url_getListDiscount = GetARBaseUrl() + "/api/v1/comment/insert-comment";
        const fetchData = {
            method: 'POST',
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputComment)
        }
        const response = await fetch(url_getListDiscount, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}