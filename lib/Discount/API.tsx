import process from "process";

function GetARBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (url === undefined) return "https://a969-27-72-146-175.ngrok-free.app";
    return url
}
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
