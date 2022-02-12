import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';


const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

//const CONNECTION_URL = 'mongodb+srv://mymern:123caption45@cluster0.dwg6m.mongodb.net/MERN_PROJECT?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(PORT, () => console.log('Server is running on port: ' + PORT)))
    .catch((error) => console.log(error.message));