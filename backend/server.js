import 'dotenv/config';
import express, { application } from 'express'
import cors from 'cors'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js';
import aiRoutes from './routes/aiRoutes.js';
import UserRoutes from './routes/userRoutes.js';


const app = express()
await connectCloudinary();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

app.get('/', (req, res) => {res.send('Hello Worghjhjfj!')})
app.use(requireAuth());

app.use("/api/ai", aiRoutes);
app.use("/api/user", UserRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})