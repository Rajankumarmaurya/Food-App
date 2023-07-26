import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
const Signup = () => {
    const navigate = useNavigate()
const[credintials, setcreditials] = useState({name:"", email:"",password:"",geolocation:""})


 const handleSubmit= async(e)=>{
    e.preventDefault();
    // console.log(JSON.stringify({name:credintials.name,email:credintials.email,password:credintials.password,location:credintials.geolocation}))
    const response = await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name:credintials.name, email:credintials.email, password:credintials.password, location:credintials.geolocation})
    });
    const json = await response.json();
    console.log(json)
    if(!json.success){
        alert("Enter valid creaditials")
    }else(
        alert("Registration succes")
        )
        navigate("/login")
    // Navigate("/login")
 }
 const onChange=(event)=>{
setcreditials({...credintials,[event.target.name]:event.target.value})
 }

    return (
        <>
        <Navbar/>
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credintials.name} onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credintials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credintials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credintials.geolocation} onChange={onChange} id="exampleInputPassword1" />
                </div>

                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>All ready a user</Link>
            </form>
            </div>
        </>
    )
}

export default Signup
