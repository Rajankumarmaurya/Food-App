import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screen/Home';
import Login from './screen/Login';
import'../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import'../node_modules/bootstrap/dist/js/bootstrap.bundle';
import'../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screen/Signup';
import { CartProvider } from './component/ContextReducer';
import MyOrder from './screen/MyOrder';

function App() {
  return (
   <>
   <CartProvider>
   <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/login' element={<Login/>} />
    <Route exact path='/createuser' element={<Signup/>} />
    <Route exact path='/myOrder' element={<MyOrder/>} />
    
   </Routes>

   </CartProvider>
   
   </>
  );
}

export default App;
