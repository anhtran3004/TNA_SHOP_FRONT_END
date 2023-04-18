import {InputProduct} from "../../types";
import {Dispatch, SetStateAction, useState} from "react";
const _ = require('lodash')
interface Props{
    filterProduct: InputProduct,
    setFilterProduct: Dispatch<SetStateAction<InputProduct>>
}
export default function Sort(props: Props){
    const listSort = [ "Mới Nhất","Giá Cao", "Giá Thấp"];
    const [sortIndex, setSortIndex] = useState(-1)
    const inputListener = () =>{
        const tempFilter = _.cloneDeep(props.filterProduct);
        switch (sortIndex) {
            case 0:
                tempFilter.sort.field = "priority";
                tempFilter.sort.order = "DESC";
                break;
            case 1:
                tempFilter.sort.field = "price";
                tempFilter.sort.order = "ASC";
                break;
            case 2:
                tempFilter.sort.field = "price";
                tempFilter.sort.order = "DESC";
                break;
            default:
                tempFilter.sort.field = "priority";
                tempFilter.sort.order = "DESC";
        }
        props.setFilterProduct(tempFilter);
    }
    return<>
        <select onChange={(e) => {console.log(e.target.value);setSortIndex(parseInt(e.target.value));inputListener()}}>
          {listSort.map((sort, index) =>(
            <option selected={sortIndex == index} key={index} value={index}>{sort}</option>
            ))}

        </select>
    </>
}