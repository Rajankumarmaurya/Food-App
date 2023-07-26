const mongoose = require('mongoose');
const DB = 'mongodb+srv://gofood:rajanmaurya@cluster0.gdrkl4o.mongodb.net/gofoodmern?retryWrites=true&w=majority';


const mongoDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Connected!');
    let fetched_data = mongoose.connection.db.collection("food_items");
    let data=await fetched_data.find({}).toArray() 
      let foodCategory= mongoose.connection.db.collection("foodCategory")
      let data2 = await foodCategory.find({}).toArray()

    
        global.food_items = data;
        global.foodCategory = data2;
        // console.log(data2)
      
    




    // console.log(data);
    // global.food_items = data;
    // // console.log(global.food_items)
  } catch (error) {
    console.log('err: ', error);
  }
};

  // const mongoDB = async()=>{
  //   try{
  //     const connect = await mongoose.connect(DB);
  //     if(connect){
  //       console.log("connection succesful")
  //       const fetched_data = await mongoose.connection.db.collection("food_items");
  //       fetched_data.find({}).toArray(function(err,data){
  //         if(err) console.log(err);
  //         else console.log(data)
  //       })
  //     }
  //   } catch(error){
  //     console.log('error')
  //   }
  // }

  module.exports = mongoDB;
  