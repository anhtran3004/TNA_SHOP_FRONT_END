import {InputProduct} from "../../types";
import {Dispatch, SetStateAction, useState} from "react";
const _ = require('lodash');

interface Props{
    filterProduct: InputProduct,
    setFilterProduct: Dispatch<SetStateAction<InputProduct>>
}

export default function FilterPrice(props: Props){
    const listFilterPrice = ["< 200K", "200K - 500K", "500K - 1000K", "> 1000K"];
    const [priceIndex, setPriceIndex] = useState(-1)
    const setPriceFilter = (priceIndex: number) => {
        const tempFilter = _.cloneDeep(props.filterProduct);
        setPriceIndex(priceIndex);
        switch (priceIndex) {
            case 0:
                tempFilter.filter.price.min = 0;
                tempFilter.filter.price.max = 199000;
                break;
            case 1:
                tempFilter.filter.price.min = 200000;
                tempFilter.filter.price.max = 500000;
                break;
            case 2:
                tempFilter.filter.price.min = 500000;
                tempFilter.filter.price.max = 1000000;
                break;
            case 3:
                tempFilter.filter.price.min = 1000000;
                tempFilter.filter.price.max = 100000000;
                break;
            default:
                tempFilter.filter.price.min = 0;
                tempFilter.filter.price.max = 100000001;
        }

        props.setFilterProduct(tempFilter);
    }
    function handleToggle(index: number){
        if(priceIndex === index){
            setPriceFilter(-1)
            // props.setPriceIndex(-1)
        }else{
            setPriceFilter(index)
            // props.setPriceIndex(index);
        }
    }
    return<>
        <div className="list-option">
            {listFilterPrice.map((unitPrice, index) => (
                (priceIndex === index) ?
                    (<p key={index} className="gender-option-item-active"
                        onClick={() => handleToggle(index)}>{unitPrice}</p>) :
                    (<p key={index} className="gender-option-item"
                        onClick={() => handleToggle(index)}>{unitPrice}</p>)
            ))}
        </div>
    </>
}