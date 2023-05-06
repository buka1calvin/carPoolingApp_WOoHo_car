import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app=express();
app.use(cors({origin:'*',methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
mongoose.connect(process.env.DEV_DATABASE,{ useNewUrlParser: true })
  .then(() => {
    app.use(express.json());
  });	

export default app;
