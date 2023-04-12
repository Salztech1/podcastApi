// const mongoose = require("mongoose")
// mongoose.connect("mongodb+srv://salomenjinda0:salomenjinda@cluster0.knzpjt5.mongodb.net/?retryWrites=true&w=majority")
// .then(() => {
//     console.log("mongodb connected")
// })

// //const mongoose = require("mongoose")

// const newSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },

//     lastName: {
//         type: String,
//         required: true
//     },

//     number: {
//         type: String,
//         required: true
//     },

//     email: {
//         type: String,
//         required: true
//     },

//     password:{
//         type: String,
//         required: true
//     }
// })



// const collection = mongoose.model("collection", newSchema)

// module.exports=collection


require("dotenv").config({ path: './config.env' })
const mongoose = require("mongoose")
let bodyParser = require('body-parser');
const userRoute = require("./routes/userRoutes")
const cors = require('cors')
const app = require("./app")

const PORT = process.env.PORT || 8000

const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log("Databse connected")
})

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function(_, res, next) {
//     res.header('Access-Control-Allow-Origin', "http://localhost:3000");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });


app.use('/api/v1/users', userRoute)

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})

