import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import cros from 'cors';
import orderRoute from './routes/orderRoute';
import userRoute from './routes/userRoute';
import deleteOrderRoute from './routes/deleteRoute';
import getOrderRoute from './routes/getOrderRoute';

const app: Express = express();

app.use(express.json());
app.use(cros({
    origin: "*"
}))

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // When response finishes, log method, path, status, elapsed ms
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
  });

  next();
});
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Welcome to the API");
});

app.use('/api/v1/order', orderRoute);
app.use('/api/v1/user', getOrderRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/delete-order', deleteOrderRoute);


export default app;