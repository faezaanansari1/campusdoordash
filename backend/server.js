import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';  
import 'dotenv/config';             
import userRouter from './routes/userRoute.js';
import restaurantRouter from "./routes/restaurantRoute.js";
import cartRouter from "./routes/cartRoute.js";
import profileRouter from "./routes/meRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
await connectDB().catch(error => {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
});

const allowedOrigins = ['http://localhost:5173']

// Parse JSON bodies
app.use(express.json());

// Enables CORS so the frontend can talk to this API
app.use(cors({origin: allowedOrigins, credentials: true}));

// Parse cookies 
app.use(cookieParser());

// Simple health check
app.get('/', (req, res) => {
  res.send('hello world');
});

// Mount routers
app.use("/api/user", userRouter)
app.use("/api/restaurants", restaurantRouter);
app.use("/api/cart", cartRouter);
app.use("/api/me", profileRouter);

// Starts the HTTP Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));