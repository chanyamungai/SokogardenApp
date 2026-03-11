import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  // Intialize the hooks 
  const [username,Setusername] = useState("");
  const[email,SetEmail] = useState("");
  const[password,SetPassword] = useState("")
  const[phone,SetPhone]= useState("")
  return (
    <div className='row justify-content-center mt-4'>
      <div className='card col-md-6 shadow p-4 '>
          <h1 className='text-primary'>Signup</h1>

          <form>
            <input type="text"
            placeholder='Enter the username'
            className='form-control'
            value={username} 
            onChange={(e) => Setusername(e.target.value)}
            required/> <br />

            {/* {username} */}

            <input type="email"
            placeholder='Enter the email address'
            className='form-control'
            value={email}
            onChange={(e)=> SetEmail(e.target.value)}
            required/> <br />

            {/* {email} */}

            <input type="password"
            placeholder='Enter the password'
            className='form-control'
            value={password} 
            onChange={(e) => SetPassword(e.target.value)}
            required/> <br />

            {/* {password} */}

            <input type="number"
            placeholder='Enter the phone number'
            className='form-control'
            value={phone} 
            onChange={(e) => SetPhone(e.target.value)}/> <br />

            {/* {phone} */}

            <input type="button" value="Signup" className='btn btn-primary'/>
            <br /> <br />

            Already have an account<Link to={'/signin'}>Signin</Link>


          </form>
      </div>
      
    </div>
  )
}

export default Signup;

// Research on Axios module in ReactJs