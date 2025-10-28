require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests from this IP, please try again later.",
// });
// app.use(limiter);

const allowedOrigins = ["http://localhost:3000","https://impactacross.com","https://www.impactacross.com", "https://76.76.21.21", "https://impactacrossdashboard.vercel.app/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json({ limit: "2000mb" }));
app.use(bodyParser.urlencoded({ limit: "2000mb", extended: true }));
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to `ImpactAcross Backend`!");
});

app.use("/api/v1", require("./routes"));

module.exports = app;
