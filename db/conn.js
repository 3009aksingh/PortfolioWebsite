const mongoose = require("mongoose");

//creating a database 
const url = process.env.MONGODB_URL;
mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successful with localhost");
}).catch((error) => {
    console.log("no connection with localhost");
    console.log(error);
})