import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Card = (props) => {
let dispatch = useDispatchCart();
let data = useCart();
const priceRef = useRef();
  let option = props.options;
  let priceOption = Object.keys(option)
  const[qty, setQty] = useState(1)
  const[size, setsize] = useState("")
  // let foodItem = props.foodItems;
  const handleAddToCart= async ()=>{
    let food= []
    for (const item of data){
      if(item.id ===props.foodItem._id){
        food = item;
        break
      }
    }
    if (food !==[]){
      if(food.size === size){
        await dispatch({type: "UPDATE", id:props.foodItem._id, price:finalPrice, qty:qty})
        return
      }
      else if(food.size !==size){

        await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty:qty, size:size});
        return
      }
      return
    }
    await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty:qty, size:size});
  //  await console.log(data)
  }
  let finalPrice= qty* parseInt(option[size]);
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[])
  return (
    <>
      <div class="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
        <div class="card-body">
          <h5 class="card-title">{props.foodItem.name}</h5>
          {/* <p class="card-text">Some quick example text </p> */}
          <div className="container w-100">
            <select className='m-2 h-100  bg-success empty' onChange={(e)=> setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100  bg-success rounded empty' ref={priceRef} onChange={(e)=> setsize(e.target.value)}>
              {
                priceOption.map((data) => {
                  return <option key={data} value={data}>{data}

                  </option>
                })
              }

            </select>
            <div className='d-inline h-100 fs-5'>
              Rs{finalPrice}/-
            </div>


          </div>
          <hr />
          <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </>
  )
}

export default Card
