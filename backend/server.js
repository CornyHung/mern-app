// const express = required('express'); Common js
import express from 'express';
// Import router đã được khai báo
import authRoutes from './routes/auth.route.js';

import {ENV_VARS} from './config/varEnv.js'
import {connectDB} from './config/db.js'


// Tạo instand của express
const app = express();
const port = ENV_VARS.PORT

app.use(express.json()) // dựa trên bodyParser.json (Là 1 hàm sử lý req từ req => json để có thể đọc được data => Có thể coi nó là 1 middleware) =>req.body

// use router
app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
  console.log('Server is run on port ' + port);
  connectDB()
});
