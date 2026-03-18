import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {

  // Intialize hooks to help you manage state fo your application
  const[products, setProducts] = useState([]);
  const[loading,setLoading] = useState(false);
  const[error,setError] = useState("");

  // declare the navigate hook
  const navigate = useNavigate()

  // Below we specify the image base URL 
  const img_url = "https://chanyamungai.alwaysdata.net/static/images/"

  // Create a function to help you fetch your products from the API
  const fetchProducts = async() =>{
    try{
      // update the loading hook
      setLoading(true)

      //Interact with your endpoint for fetching the products
      const response = await axios.get("https://chanyamungai.alwaysdata.net/api/get_products")

      // update the products hook with the rsponse given from the API
      setProducts(response.data)

      // set loading hook back to default
      setLoading(false)
    }
    catch(error){
      // if there is an error
      // set the loadig hook back to default 
      setLoading(false)

      // update the error hook with a message
      setError(error.message)

    }
  }
  // we shall use the useeffect hook .This hook enables us to automatically rerender new features incase of any changes
  useEffect(() => {
    fetchProducts()
  },[])

  // console.log(products)
  return (
    <div className='row'>
      <h3 className='text-primary'>Availabale Products</h3>
      {loading && <Loader/>}
      <h4 className="text-danger">{error}</h4>

      {/* Map the products fetched from the API to the user interface  */}

      {products.map((product) => (
          <div className="col-md-3 justify-content-center mb-3">
        <div className="card shadow">
          <img 
          src={img_url + product.product_photo} 
          alt="Productname" 
          className='product_img mt-3'/>
          <div className="card-body">
            <h5 className="text-primary">{product.product_name}</h5>

            <p className="text-dark">{product.product_description.slice(0,100)}...</p>

            <h4 className="text-danger">Ksh {product.product_cost}</h4>

            <button className="btn btn-outline-info" onClick={() => navigate("/makepayment",{state :{product} })}>Purchase now</button>
          </div>
        </div>
      </div>
      ) )}
    </div>
  )
}

export default Getproducts;
