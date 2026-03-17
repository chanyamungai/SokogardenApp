import axios from 'axios'
import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {

  // Define the two hooks for capturing/storing  the user input 
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  // Declare the three additional hooks
  const[loading , setLoading] = useState("")
  const[success, setSuccess] =useState("")
  const[error, setError] = useState("")

  // Below we have the useNavigate hook to redirect us to another page on success login/signin
  const navigate= useNavigate()

  // below is the function to handel the sigin action
  const handlesubmit =async (e) =>{
    // prevent the site from reloading 
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Please wait while we authenticate your account...")

    try{
      // Create a formdata that will hold the email and the password
      const formdata = new FormData()

      // Insert/append the email and password
      formdata.append("email",email);
      formdata.append("password",password);

      // Interact the axios for the response
      const response = await axios.post("https://chanyamungai.alwaysdata.net/api/signin",formdata);

      // Set the loading hook back to default 
      setLoading("");

      // check whether the user exist as part of your response 
      if(response.data.user){
        // If user is there definately the details entered during the signin are correct
        // setSuccess("Login successfully")

        // Store user details in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));


        // if it is successfull, let a person get redirected to another page
        navigate("/")
        // Navigate into our home route  

      }
      else{
        // User is not found that means the credential enetered on the form are incorrect
        setError("Login Failed.Please try again...")
      }
    }
    catch(error){
      // Set loading back to default
      setLoading("")

      // Update the error hook with a message
      setError("Ooops Something went wrong try again later")

    }
  }
  return (
    <div className='row justify-content-center mt-4'>
        <div className='col-md-6 card shadow p-4'>
          <h1 className='text-dark'>Sign In</h1>
          <h5 className='text-info'>{loading}</h5>
          <h3 className='text-success'>{success}</h3>
          <h4 className='text-danger'>{error}</h4>
          <form onSubmit={handlesubmit}> 
            <input type="email" 
            placeholder='Enter the email address'
            className='form-control'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}/> <br />

            {/* {email} */}

            <input type="password" 
            placeholder='Enter the password here'
            className='form-control'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}/> <br />

            <input type="submit" 
            value="Sign in"
            className='btn btn-primary'/> <br /><br />

            Don't have an account?<Link to={'/signup'}>Register</Link>

          </form>

        </div>
    </div>
  )
}

export default Signin;


// How to store the users details into the local storage

// If(response.data.user){
  
//   // Store user in local storage
//   localStorage.setItem("user", JSON.stringify(response.data.user));

//   console.log("User stored successfully");
// }
