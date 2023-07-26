import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Card from '../component/card';




const Home = () => {
  const [search,setsearch] = useState('')

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://www.localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      }
    });

    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);

  }
  useEffect(() => {
    loadData()
  }, [])






  return (
    <>
      <Navbar />
      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div class="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?bisquits" class="d-block w-100" style={{ filter: "brightness(50%" }} alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?momos" class="d-block w-100" style={{ filter: "brightness(50%" }} alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pastry" class="d-block w-100" style={{ filter: "brightness(50%" }} alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem ={filterItems}
                        // foodName={filterItems.name}
                          options={filterItems.options[0]}
                          // imgSrc={filterItems.img}
                        >
                        </Card>



                      </div>
                    )
                  }
                  ) : <div>No such data Found</div>}
              </div>
              )
            })
            : ""
        }
        {/* <Card /> */}


      </div>
      <Footer />
    </>
  )
}

export default Home
