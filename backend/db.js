const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/daily-journal-backend/";
const mongoURI = "mongodb://localhost:27017/daily-journal-backend?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const mongoURI = "mongodb://osama:12345678@localhost:27017/";


// const connectToMongoDB = async ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to MongoDB");
//     });
// }

const connectToMongoDB = async ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log('Connected to the MongoDB server');
    })
    .catch((error)=>{
        console.log('Error found-> ', error);
    });
}


// mongoose.connect(connectionString)
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });


module.exports = connectToMongoDB;
