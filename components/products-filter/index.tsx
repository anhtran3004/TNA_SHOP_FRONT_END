import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Checkbox from './form-builder/checkbox';
import CheckboxColor from './form-builder/checkbox-color';
import Slider from 'rc-slider';

// data
import productsTypes from './../../utils/data/products-types';
import productsColors from './../../utils/data/products-colors';
import productsSizes from './../../utils/data/products-sizes';
import {getListCategories, getListProduct} from "../../lib/API";
import {dataInputProduct} from "../products-featured/carousel";
import {Category, InputProduct} from "../../types";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
interface Props {
  filterProduct: InputProduct,
  setFilterProduct: Dispatch<SetStateAction<InputProduct>>
}
const ProductsFilter = (props: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([])
  const [isChecked, setIsChecked] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
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
  function Check(){
    if (checked) {
      setCheckedCategories([...checkedCategories, name]);
    } else {
      setCheckedCategories(checkedCategories.filter((categoryName) => categoryName !== name));
    }
  }

  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button type="button" 
        onClick={() => setFiltersOpen(!filtersOpen)} 
        className={`products-filter__menu-btn ${filtersOpen ? 'products-filter__menu-btn--active' : ''}`}>
          Add Filter <i className="icon-down-open"></i>
      </button>
      
      <div className={`products-filter__wrapper ${filtersOpen ? 'products-filter__wrapper--open' : ''}`}>
        <div className="products-filter__block">
          <button type="button">Product type</button>
          <div className="products-filter__block__content">
            {categories.map(type => (
              <Checkbox 
                key={type.id} 
                name="product-type" 
                label={type.categoryName}
                checked={checkedCategories.includes(type.categoryName)}
                onChange={(type.categoryName, checked) =>{

                }}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
          </div>
        </div>
        
        <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {productsSizes.map(type => (
              <Checkbox 
                type="square" 
                key={type.id} 
                name="product-size" 
                label={type.label} />
            ))}
          </div>
        </div>
        
        <div className="products-filter__block">
          <button type="button">Color</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              {/*{productsColors.map(type => (*/}
              {/*  <CheckboxColor key={type.id} valueName={type.color} name="product-color" color={type.color} />*/}
              {/*))}*/}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-submit btn--rounded btn--yellow">Apply</button>
      </div>
    </form>
  )
}
  
export default ProductsFilter
  