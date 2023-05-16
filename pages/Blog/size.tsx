import React from "react";
import Layout from '../../layouts/Main';
export default function BlogSize(){
    return<>
        <Layout>
            <div className=" text-black p-4" style={{fontSize:"25px",}}>Bảng size chung cho nam</div>
            <table className="container size-table">
                <thead>
                <tr>
                    <th>Size</th>
                    <th>Chiều cao (cm)</th>
                    <th>Cân nặng (kg)</th>
                    <th>Vòng ngực (cm)</th>
                    <th>Vòng mông (cm)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>S</td>
                    <td>162-168</td>
                    <td>57-62</td>
                    <td>84-88</td>
                    <td>85-89</td>
                </tr>
                <tr>
                    <td>M</td>
                    <td>169-173</td>
                    <td>63-67</td>
                    <td>88-94</td>
                    <td>90-94</td>
                </tr>
                <tr>
                    <td>L</td>
                    <td>171-175</td>
                    <td>68-72</td>
                    <td>94-98</td>
                    <td>95-99</td>
                </tr>
                <tr>
                    <td>XL</td>
                    <td>173-177</td>
                    <td>73-77</td>
                    <td>98-104</td>
                    <td>100-104</td>
                </tr>
                </tbody>
            </table>
            <div className=" text-black p-4" style={{fontSize:"25px",}}>Bảng size chung cho nữ</div>
            <table className="container size-table">
                <thead>
                <tr>
                    <th>Size</th>
                    <th>Chiều cao (cm)</th>
                    <th>Cân nặng (kg)</th>
                    <th>Vòng ngực (cm)</th>
                    <th>Vòng mông (cm)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>S</td>
                    <td>150-155</td>
                    <td>41-46</td>
                    <td>79-82</td>
                    <td>88-90</td>
                </tr>
                <tr>
                    <td>M</td>
                    <td>155-163</td>
                    <td>47-52</td>
                    <td>82-87</td>
                    <td>90-94</td>
                </tr>
                <tr>
                    <td>L</td>
                    <td>160-165</td>
                    <td>53-58</td>
                    <td>88-94</td>
                    <td>94-98</td>
                </tr>
                <tr>
                    <td>XL</td>
                    <td>162-166</td>
                    <td>59-64</td>
                    <td>94-99</td>
                    <td>98-102</td>
                </tr>
                </tbody>
            </table>
        </Layout>
    </>
}