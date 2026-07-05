const express = require("express")
const app = express()

// import all routes 
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course")
const contactRoute = require("./routes/Contact.js")

const dbconnect= require("./config/database.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {cloudinaryConnect}= require("./config/cloudinary")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")

dotenv.config();
const PORT  = process.env.PORT ||4000;
dbconnect();

// middlewares
app.use(express.json())
app.use(cookieParser());
// app.use(
//     cors({
//         // origin:"http://localhost:5173",
//         origin:"*",
//         credentials: true, // plural
//     })
// )

console.log("FRONTEND_URL ENV =", JSON.stringify(process.env.FRONTEND_URL));
app.use(cors({
  //origin: "http://localhost:5173",
  origin: process.env.FRONTEND_URL, // 👈 frontend URL
  credentials: true,               // 👈 allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));







app.use(
    fileUpload({
        useTempFiles:true,
        tempFilesDir:"/tmp",
        limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
    abortOnLimit: true,
    })
)

// cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contactRoute)

// deafult route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Sever is up an running..."
    })
})

app.listen(PORT ,()=>{
    console.log(`Your App is Running At port ${PORT} `)
})
