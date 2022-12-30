require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";

import pageRoute from './page/page.route';
import assetRoute from './assets/assets.route';
import projectRoute from './project/project.route';
import userRoute from './user/user.route';
import authRoute from './auth/auth.routes';

import envVariables from 'dotenv';
envVariables.config();

//Initialize App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Origin",
};

corsOptions.credentials = true;
app.use(cors(corsOptions));

app.use('/api/projects', projectRoute);
app.use('/api/pages', pageRoute);
app.use('/api/users', userRoute);
app.use('/auth/', authRoute)

app.use('/api/assets', assetRoute);

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} | Go to http://localhost:${PORT}`);

  console.log("Connecting to MongoDB...");

  mongoose.connect(
    "mongodb://127.0.0.1:27017/webpage_builder",
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log('Connected to MongoDB');
    },
  );

});
