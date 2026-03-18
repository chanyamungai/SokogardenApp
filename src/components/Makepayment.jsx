import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Makepayment = () => {

    // destructure the details passed  from the GetProducts component
    // The use location hook allows us to get/destructure the propeties passed from the previous component

    const{product} = useLocation().state || {}
    // console.log("The details of the products are",product)

    // Below we specify the image base URL 
    const img_url = "https://chanyamungai.alwaysdata.net/static/images/"

    // Intialize hooks to manage the state of your application 
    const[number , setNumber] = useState("")
    const[loading,setLoading] = useState(false);
    const[success,setSuccess] = useState("");
    const[error,setError] = useState("")
    
    // create a function that will handle the submit action
    const handlesubmit = async (e) => {
        // prevent the site from reloading 
        e.preventDefault()

        // Update the loading hook
        setLoading(true)

        try{
            // Create a form data object
            const formdata =new FormData

            // append the data to the  form data
            formdata.append("phone",number);
            formdata.append("amount",product.product_cost);

            const response = await axios.post ('https://chanyamungai.alwaysdata.net/api/mpesa_payment',formdata)

            // update the products hook with the rsponse given from the API
            setLoading(false)

            setSuccess(response.data.message)

        }
        catch(error){

            // set the loadig hook back to default
            setLoading(false)

            // update the setError with a message
            setError(error.message)

        }

    }

    // declare the navigate hook
    const navigate = useNavigate()


  return (
    <div className='row justify-content-center'>
        {/* <button className='btn btn-outline-primary'>back to products</button> */}
        <h1 className="text-success">Make Payment - lipa na mpesa</h1>

        <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="Back" 
            onClick={() => navigate("/")}/>
        </div>

        <div className=" col-md-6 card shadow p-4">
            <img src={img_url + product.product_photo} alt="Product name" className='product_img'/>

            <div className="card-body">
                <h2 className='text-info'>{product.product_name}</h2>
                <p className='text-dark'>{product.product_description}</p>
                <b className='text-warning'>{product.product_cost}</b> <br />

                <form onSubmit={handlesubmit}> 

                     {/* bind the loading hook */}
                    {loading && <Loader />}
                    <h3 className="text-success"> {success} </h3>
                    <h4 className="text-danger"> {error} </h4>

                    <input type="number" 
                    className='form-control'
                    placeholder='Enter phone number 245XXXXXXXXX'
                    required
                    onChange={(e) => setNumber(e.target.value)}/> <br /> <br />

                    {/* {number} */}

                    <input type="submit" 
                    value="Make payment"
                    className='btn btn-success'/>
                </form>
            </div>
        </div>

      
    </div>
  )
}

export default Makepayment
