require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

const app = express();

const PORT = process.env.PORT || 4000;
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Unable to connect to the database:', error);
    });

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());

// app.use(cors());
const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.128:3000/', 'https://fana.spa.com',];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // Customize headers as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,  // Automatically send response for preflight request
};
app.use(cors(corsOptions));

// Handle preflight requests for any route
app.options('*', cors({
    origin: true, // allow all origins for OPTIONS
    credentials: true
}));

// app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to `ImpactAcross Website Backend`!");
});

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
// const serviceRoute = require('./routes/serviceRoute');
const blogRoute = require('./routes/blogRoute');
const publicationRoute = require('./routes/publicationRoute');
const multimediaRoute = require('./routes/multimediaRoute');
const trainingRoute = require('./routes/trainingRoute');

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
// app.use('/api/service', serviceRoute);
app.use('/api/blog', blogRoute);
app.use('/api/publication', publicationRoute);
app.use('/api/multimedia', multimediaRoute);
app.use('/api/training', trainingRoute);