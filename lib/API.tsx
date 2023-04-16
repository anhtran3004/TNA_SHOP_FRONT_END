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