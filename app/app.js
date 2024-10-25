require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongoose.js");
const authenticateToken = require("./middlewares/authToken.middleware");

//importing the routes
const authRouter = require("./routes/auth.route.js");
const refreshTokenRouter = require("./routes/refreshToken.route");
const organizationRouter = require("./routes/organization.route");

//initializing the app instance
const app = express();
const port = process.env.PORT || 8080;


//use middlewares on the entire app
app.use(express.json());
app.use(express.static("public"));



//redirecting to the api documentation
app.get("/",(req,res)=>{
    res.json("all g");
})

//using the routes we created
app.use("/",authRouter);
app.use("/refresh-token",refreshTokenRouter);
app.use("/organization",authenticateToken,organizationRouter);


connectDB().then(()=>{
    app.listen(port,()=>{
    console.log("app started on port", port);
})
})