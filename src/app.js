import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import allRoutes from './routes/index'
import passport from 'passport';
import session from 'express-session';
import PassportLocal from 'passport-local'
import User from './models/user';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app=express();
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.json())

app.use(cors({origin:'*',methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
mongoose.connect(process.env.DEV_DATABASE,{ useNewUrlParser: true })
  .then(() => {
    app.use(express.json());
  });	
  
  app.use(session({
    secret: 'bukaG',
    resave: false,
    saveUninitialized: false,
    cookie:{secure:true}
  }));
  // const LocalStrategy = PassportLocal.Strategy;
  // passport.use(new LocalStrategy(User.authenticate()));
  // passport.serializeUser(User.serializeUser());
  // passport.deserializeUser(User.deserializeUser());

  app.use(passport.initialize())
  app.use(passport.session())
  try {
    app.use('/api/v1', allRoutes);
  } catch (error) {
    console.log(error);
  }

export default app;
