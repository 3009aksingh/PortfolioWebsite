var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const express = require("express");
const path = require("path");


const User = require("./models/usermessage")

const app = express();
const port = process.env.PORT || 3000;

//setting the path

const staticpath = path.join(__dirname, "public");

var url = "mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/Portfolio?retryWrites=true&w=majority";

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jquery', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({
    extended: false
}))
app.use(express.static(staticpath))

//routing

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post("/contact", async (req, res) => {
    console.log("inside contact backend");
    var username = req.body.name;
    var useremail = req.body.email;
    var usermessage = req.body.message;
    // New Code
    MongoClient.connect(url, {
        useUnifiedTopology: true
    }, function (err, dbData) {
        if (err) {
            console.log('something went wrong here ' + err);
        } else {
            console.log("connected successfully");
            var dbObj = dbData.db("Portfolio"); // creating a database in mongodb

            // For insertOne
            var dataObj = {
                name: username,
                email: useremail,
                message: usermessage
            };

            // Mail code 1

            // transporter
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ankit.singh.3009ak@gmail.com',
                    pass: 'ankit@123'
                }
            });

            // mail information
            var mailoptions = {
                from: 'ankit.singh.3009ak@gmail.com',
                to: '3009aksingh@gmail.com',
                subject: 'Welcome User',
                // text: 'Hello, testing mail ahead!!!'
                html: `
                    <h2>Customer details are as follows:</h2>
                    <table style="width: 100%;">
                        <tr>
                            <td class="bg-secondary text-dark">Name</td>
                            <td>${username}</td>
                        </tr>
                        <tr>
                            <td class="bg-secondary text-light">Email Address</td>
                            <td>${useremail}</td>
                        </tr>
                        
                        <tr>
                            <td class="bg-secondary text-light">Message</td>
                            <td>${usermessage}</td>
                        </tr>
                    </table>`
                // Reference : https://www.w3schools.com/nodejs/nodejs_email.asp
            };

            transporter.sendMail(mailoptions, function (error, information) {
                if (error) {
                    console.log(error);
                } else {

                    console.log("Mail sent to the Ankit Singh!");
                }
            });
            // End Mail code 1

            // Mail code 2

            // transporter
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ankit.singh.3009ak@gmail.com',
                    pass: 'ankit@123'
                }
            });

            // mail information
            var mailoptions = {
                from: 'ankit.singh.3009ak@gmail.com',
                to: useremail, // testing
                subject: 'Confirmation Mail',
                // text: 'Hello, testing mail ahead!!!'
                html: `
                    <h2>Your details received are as follows:</h2>
                    <table style="width: 100%;">
                        <tr>
                            <td class="bg-secondary text-dark">Name</td>
                            <td>${username}</td>
                        </tr>
                        <tr>
                            <td class="bg-secondary text-light">Email Address</td>
                            <td>${useremail}</td>
                        </tr>
                     
                        <tr>
                            <td class="bg-secondary text-light">Message</td>
                            <td>${usermessage}</td>
                        </tr>
                    </table>
                    <br><h4>From Ankit Singh</h4>
                    <br>Thanks for connecting! `
                // Reference : https://www.w3schools.com/nodejs/nodejs_email.asp
            };

            transporter.sendMail(mailoptions, function (error, information) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(information.reponse);
                    // console.log(information);
                    console.log("Mail Send to " + useremail);
                }
            });
            // End Mail code 2

            dbObj.collection("users").insertOne(dataObj, function (err, data) {

                if (err) {
                    console.log("err2 = " + err);
                } else {
                    console.log(data.insertedCount + " documents inserted");
                    dbData.close();

                    // Previous mail code

                    // res.status(201).render("index"); // wait
                    res.redirect('/'); // try
                }
            })

        }

    });
})

//server create
app.listen(port, () => {
    console.log('server is running at port no ' + port);
})