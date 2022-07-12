import React from 'react'

const AddProduct = ()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [catagory,setCatagory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError]=React.useState('')

    const addProduct = async ()=>{

        if(!name || !price || !catagory || !company)
        {
            return false;
            setError(true);
        }
            

        console.log(name,price,catagory,company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringyfy({name,price,catagory,company,userId}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json();
        console.log(result)
    }
    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter product name" className="inputBox"
            onChange={(e)=>{setName(e.target.value)}}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder="Enter product price" className="inputBox"
            onChange={(e)=>{setPrice(e.target.value)}}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder="Enter product catagory" className="inputBox"
            onChange={(e)=>{setCatagory(e.target.value)}}
            />
            {error && !catagory && <span className='invalid-input'>Enter valid catagory</span>}

            <input type="text" placeholder="Enter product company" className="inputBox"
            onChange={(e)=>{setCompany(e.target.value)}}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct}>Add product</button>
        </div>
    )
}
export default AddProduct;