// server.js

import express from 'express';
import { libraryRouter } from './routes/libraryRouter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = 6790;

app.use(express.json());
app.use(errorHandler);

// 静态文件服务
app.use(express.static('.'));

// API路由
app.use('/library', libraryRouter);

app.listen(port, () => {
  console.log(`GameDrift server running at http://localhost:${port}`);
});
