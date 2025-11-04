import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';  
import 'dotenv/config';             
import userRouter from './routes/userRoute.js';
import restaurantRouter from "./routes/restaurantRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB()

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use("/api/user", userRouter)
app.use("/api/restaurants", restaurantRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));