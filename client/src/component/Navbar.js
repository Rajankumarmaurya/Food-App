import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Model';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const[cartview,setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = ()=>{
localStorage.removeItem("authToken");
navigate("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">FOODY</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link  active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className='mav-item'>
                    <Link className='nav-link active fs-5' aria-current="page" to="/myOrder">My orders</Link>
                  </li>


                  : ""
              }

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              : <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                  My cart {""}
                  <Badge pill bg ="danger">{data.length}</Badge>

                </div>
                {cartview? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout

                </div>
              </div>

            }




          </div>
        </div>
      </nav>
    </>
  )
}
