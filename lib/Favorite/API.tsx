import {GetARBaseUrl} from "../API";
export function GetUserAuthentication(){
    if(localStorage.getItem('accessToken') !== undefined){
        return localStorage.getItem('accessToken');
    }
    return '';
}
export async function getListFavorite(){
    try{
        const url_getListProduct = GetARBaseUrl() + "/api/v1/favorite/";
        const fetchData = {
            method: 'POST',
            // Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODEzNDk1MTksImlhdCI6MTY3ODc1NzUxOSwiaXNzIjoiR3JhbnQiLCJVVUlEIjoiZTZiZjVhYjItNjYxZC00MWE2LTg1ZTktYjkwMzA0NjRlZjA5IiwiVXNlck5hbWUiOiJkdW9uZ25nb2NwcmludEBnbWFpbC5jb20ifQ.O9J4D6F_DsJPmQsS6U3a6KoGESc8Ep3qgqeCM-ZGFiNk2kQLCGjBgRbotk1QrkF5GtNygLSRrJma65J0PvVsfm_EuKp-vratcE-nz3BW46jbLTOa4yAWXUipWBCRHMwPcqznsyCJnRy-gRD4_fUHLf1jgb6GKcNRiQOuA1fZq7mPwCZFaI6tby349KelW9IEAM8YuLA4piqihhvdDXQOSTm-P0rqK9FBIzy2gwvjAojFPA40UgryN0r41_AzFrneSv7Ssuv2aVDGZeAQkdI9Hr94d-CpnVmV6Fg3oaSHV9_3p7Q63Wb7q4jCuNvmlYtR3iKBr-RxkIgeB1gDoQVOzw",
            headers:{
                // Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODEzNDk1MTksImlhdCI6MTY3ODc1NzUxOSwiaXNzIjoiR3JhbnQiLCJVVUlEIjoiZTZiZjVhYjItNjYxZC00MWE2LTg1ZTktYjkwMzA0NjRlZjA5IiwiVXNlck5hbWUiOiJkdW9uZ25nb2NwcmludEBnbWFpbC5jb20ifQ.O9J4D6F_DsJPmQsS6U3a6KoGESc8Ep3qgqeCM-ZGFiNk2kQLCGjBgRbotk1QrkF5GtNygLSRrJma65J0PvVsfm_EuKp-vratcE-nz3BW46jbLTOa4yAWXUipWBCRHMwPcqznsyCJnRy-gRD4_fUHLf1jgb6GKcNRiQOuA1fZq7mPwCZFaI6tby349KelW9IEAM8YuLA4piqihhvdDXQOSTm-P0rqK9FBIzy2gwvjAojFPA40UgryN0r41_AzFrneSv7Ssuv2aVDGZeAQkdI9Hr94d-CpnVmV6Fg3oaSHV9_3p7Q63Wb7q4jCuNvmlYtR3iKBr-RxkIgeB1gDoQVOzw",
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
        }
        const response = await fetch(url_getListProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function saveIntoFavoriteCart(productId: number){
    try{
        const url_getSaveProduct = GetARBaseUrl() + "/api/v1/favorite/insert-favorite";
        const body = {product_id: productId }
        const fetchData = {
            method: 'POST',
            // Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODEzNDk1MTksImlhdCI6MTY3ODc1NzUxOSwiaXNzIjoiR3JhbnQiLCJVVUlEIjoiZTZiZjVhYjItNjYxZC00MWE2LTg1ZTktYjkwMzA0NjRlZjA5IiwiVXNlck5hbWUiOiJkdW9uZ25nb2NwcmludEBnbWFpbC5jb20ifQ.O9J4D6F_DsJPmQsS6U3a6KoGESc8Ep3qgqeCM-ZGFiNk2kQLCGjBgRbotk1QrkF5GtNygLSRrJma65J0PvVsfm_EuKp-vratcE-nz3BW46jbLTOa4yAWXUipWBCRHMwPcqznsyCJnRy-gRD4_fUHLf1jgb6GKcNRiQOuA1fZq7mPwCZFaI6tby349KelW9IEAM8YuLA4piqihhvdDXQOSTm-P0rqK9FBIzy2gwvjAojFPA40UgryN0r41_AzFrneSv7Ssuv2aVDGZeAQkdI9Hr94d-CpnVmV6Fg3oaSHV9_3p7Q63Wb7q4jCuNvmlYtR3iKBr-RxkIgeB1gDoQVOzw",
            headers:{
                Authorization: "Bearer " + GetUserAuthentication(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        // @ts-ignore
        const response = await fetch(url_getSaveProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}
export async function deleteProductInFavoriteCart(productId: number){
    try{
        const url_getDeleteProduct = GetARBaseUrl() + "/api/v1/favorite/delete-favorite/" + productId;
        const fetchData = {
            method: 'POST',
            headers:{
                // Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODEzNDk1MTksImlhdCI6MTY3ODc1NzUxOSwiaXNzIjoiR3JhbnQiLCJVVUlEIjoiZTZiZjVhYjItNjYxZC00MWE2LTg1ZTktYjkwMzA0NjRlZjA5IiwiVXNlck5hbWUiOiJkdW9uZ25nb2NwcmludEBnbWFpbC5jb20ifQ.O9J4D6F_DsJPmQsS6U3a6KoGESc8Ep3qgqeCM-ZGFiNk2kQLCGjBgRbotk1QrkF5GtNygLSRrJma65J0PvVsfm_EuKp-vratcE-nz3BW46jbLTOa4yAWXUipWBCRHMwPcqznsyCJnRy-gRD4_fUHLf1jgb6GKcNRiQOuA1fZq7mPwCZFaI6tby349KelW9IEAM8YuLA4piqihhvdDXQOSTm-P0rqK9FBIzy2gwvjAojFPA40UgryN0r41_AzFrneSv7Ssuv2aVDGZeAQkdI9Hr94d-CpnVmV6Fg3oaSHV9_3p7Q63Wb7q4jCuNvmlYtR3iKBr-RxkIgeB1gDoQVOzw",
                Authorization: "Bearer " + GetUserAuthentication(),

                "Content-Type": "application/json"
            },
        }
        const response = await fetch(url_getDeleteProduct, fetchData);
        return await response.json();
    }catch (e){
        throw e
    }
}