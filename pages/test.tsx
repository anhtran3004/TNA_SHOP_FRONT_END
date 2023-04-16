import {getListCategories} from "../lib/API";
import {useEffect, useState} from "react";
import {Category} from "../types";

export default function Test(){
    const [listCategory, setListCategory] = useState<Category[]>([])
    useEffect(() =>{
        async function fetchData(){
            try{
                const res = await getListCategories();
                console.log(res.code);
                if(res.code === 200){
                    setListCategory(res.data);
                }



            }catch (e){
                console.log('err')
            }
        }
        fetchData().then();
    })
    return <>
        <h1>Meo Meo</h1>
        {listCategory.map((cate, index) => {
            <h1>{cate.categoryName}</h1>
        })}

    </>
}