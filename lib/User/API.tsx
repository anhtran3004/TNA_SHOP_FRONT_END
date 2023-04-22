import {GetARBaseUrl} from "../API";

export async function getUsers(id: number){
    try{
        const url_getUser = GetARBaseUrl() + "/api/v1/user/get-user/" + id;
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getUser, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}