import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Checkbox from './form-builder/checkbox';
import CheckboxColor from './form-builder/checkbox-color';
import Slider from 'rc-slider';
import FilterPrice from '../../components/products-filter/FilterPrice';
// data
import productsTypes from './../../utils/data/products-types';
import productsColors from './../../utils/data/products-colors';
import productsSizes from './../../utils/data/products-sizes';
import {getListCategories, getListProduct} from "../../lib/API";
import {dataInputProduct} from "../products-featured/carousel";
import {Category, InputProduct} from "../../types";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import product from "../../pages/product";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const _ = require('lodash');
interface Props {
  filterProduct: InputProduct,
  setFilterProduct: Dispatch<SetStateAction<InputProduct>>
}
const ProductsFilter = (props: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    async function fetchProductData() {
      try {
        const res = await getListCategories()
        const status = res.code;
        if (status === 200) {
          setCategories(res.data);
        } else {
          console.log('error');
        }
      } catch (e) {
        console.log('error');
      }
    }
    fetchProductData().then();
  }, [])
  const addQueryParams = () => {
    // query params changes
  }
  // function changeCategory(e: React.ChangeEvent<HTMLInputElement>){
  //   setIsChecked(e.target.checked);
  //   onChange(e.target.name, e.target.checked)
  // }
  const handleCategoryToggle = (category: number) => {
    // @ts-ignore
    if (props.filterProduct.filter.category_id.includes(category)) {
      let tempFilter = _.cloneDeep(props.filterProduct);
      tempFilter.filter.category_id = tempFilter.filter.category_id.filter((cat: number) => cat !== category)
      props.setFilterProduct(tempFilter)
    } else {
      const tempFilter = _.cloneDeep(props.filterProduct);
      tempFilter.filter.category_id.push(category)
      props.setFilterProduct(tempFilter);
    }
  };
  const renderCategory = (categoryId: number, index: number, categoryName: string) => {
    if (props.filterProduct.filter.category_id !== undefined) {
      // @ts-ignore
      return (props.filterProduct.filter.category_id.includes(categoryId) ?
          <p key={index} onClick={() => handleCategoryToggle(categoryId)} className="gender-option-item-active">{categoryName}</p>
          :
          <p key={index} onClick={() => handleCategoryToggle(categoryId)} className="gender-option-item">{categoryName}</p>)
    } else {
      return <div key={index}></div>
    }
  }
  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button type="button" 
        onClick={() => setFiltersOpen(!filtersOpen)} 
        className={`products-filter__menu-btn ${filtersOpen ? 'products-filter__menu-btn--active' : ''}`}>
          Add Filter <i className="icon-down-open"></i>
      </button>
      
      <div className={`products-filter__wrapper ${filtersOpen ? 'products-filter__wrapper--open' : ''}`} >
        <div className="products-filter__block">
          <button type="button">Danh Mục Sản Phẩm</button>
          <div className="products-filter__block__content">
            {categories.map((type, index) => (
                renderCategory(parseInt(type.id.toString()), index, type.categoryName)
            ))}
          </div>
        </div>
        <div className="products-filter__block">
          <button type="button">Giá</button>
          <div className="products-filter__block__content">
          <FilterPrice filterProduct={props.filterProduct} setFilterProduct={props.setFilterProduct}/>
          </div>
        </div>
        
        {/*<div className="products-filter__block">*/}
        {/*  <button type="button">Size</button>*/}
        {/*  <div className="products-filter__block__content checkbox-square-wrapper">*/}
        {/*    {productsSizes.map(type => (*/}
        {/*      <Checkbox */}
        {/*        type="square" */}
        {/*        key={type.id} */}
        {/*        name="product-size" */}
        {/*        label={type.label} />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
        
        {/*<div className="products-filter__block">*/}
        {/*  <button type="button">Color</button>*/}
        {/*  <div className="products-filter__block__content">*/}
        {/*    <div className="checkbox-color-wrapper">*/}
        {/*      /!*{productsColors.map(type => (*!/*/}
        {/*      /!*  <CheckboxColor key={type.id} valueName={type.color} name="product-color" color={type.color} />*!/*/}
        {/*      /!*))}*!/*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<button type="submit" className="btn btn-submit btn--rounded btn--yellow">Apply</button>*/}
      </div>
    </form>
  )
}
  
export default ProductsFilter
  