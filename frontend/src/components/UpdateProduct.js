import React,{useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = ()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [catagory,setCatagory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails(); 
    },[])

    const getProductDetails = async()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json() 
        setName(result.name);
        setPrice(result.price);
        setCatagory(result.catagory);
        setCompany(result.company);
    }

    const updateProduct = async ()=>{
        console.log(name, price, catagory, company)
        let result = await fetch(`http://localhost:5000/${params.id}`,{
            method: 'Put',
            body: JSON.stringify({name, price, catagory, company}),
            headers:{
                'Content-Type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            
        });
        result = await result.json();
        console.warn(result);
        navigate('/')
    }
    return(
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" className="inputBox"
            onChange={(e)=>{setName(e.target.value)}}
            />
            <input type="text" placeholder="Enter product price" className="inputBox"
            onChange={(e)=>{setPrice(e.target.value)}}
            />
            <input type="text" placeholder="Enter product catagory" className="inputBox"
            onChange={(e)=>{setCatagory(e.target.value)}}
            />
            <input type="text" placeholder="Enter product company" className="inputBox"
            onChange={(e)=>{setCompany(e.target.value)}}
            />
            <button onClick={updateProduct}>Update product</button>
        </div>
    )
}
export default UpdateProduct;