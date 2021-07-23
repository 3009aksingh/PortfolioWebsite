const mongoose = require("mongoose");

//creating a database 

mongoose.connect("mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/Portfolio?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successful with localhost");
}).catch((error) => {
    console.log("no connection with localhost");
    console.log(error);
})