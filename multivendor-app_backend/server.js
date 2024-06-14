import path from 'path'
import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
// import products from "./data/products.js"
import connectDB from "./config/db.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cookieParser from "cookie-parser";
const port = process.env.port || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

app.use(cors());

app.get('/', (req, res)=>{
    res.send("App is running.");
});

// app.get('/api/products', (req, res)=>{
//     res.json(products);
// });

// app.get('/api/products/:id', (req, res)=>{
//     const product = products.find((p) => p.id === req.params.id)
//     res.json(product);
// })

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>console.log(`Server running on port ${port}`))
