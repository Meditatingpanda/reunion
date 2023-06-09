import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/authRoute.js';
import postRouter from './routes/postRoute.js';
import userRouter from './routes/userRoute.js';
import * as colors from 'colors';
import connectMongoDB from './db/connectMongoDB.js';
import errorHandler from './middleware/error.js';
import protect from './middleware/validateToken.js';
import helmet from 'helmet';
const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// routes
app.use('/api/', authRouter);
app.use('/api/', protect, postRouter);
app.use('/api/', protect, userRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port http://localhost:${port}/`.cyan);
  connectMongoDB();
}
);

export default app;

