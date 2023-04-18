import {GetARBaseUrl} from "../API";

export async function getListCampaign(){
    try{
        const url_getListCampaign = GetARBaseUrl() + "/api/v1/campaign/";
        const fetchData = {
            method: 'POST',
        }
        const response = await fetch(url_getListCampaign, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}