import {GetARBaseUrl} from "../API";
import {InputInsertUser, InputUser} from "../../types";

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
export async function getUsername(){
    try{
        const url_getUser = GetARBaseUrl() + "/api/v1/user/get-username/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getUser, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function updateUsers(input: InputUser, id: number){
    try{
        const url_getUser = GetARBaseUrl() + "/api/v1/user/update-user/" + id;
        const fetchData = {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_getUser, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function insertUsers(input: InputInsertUser){
    try{
        const url_getUser = GetARBaseUrl() + "/api/v1/user/insert-user/";
        const fetchData = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
        const response = await fetch(url_getUser, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}