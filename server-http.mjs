import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import apiV1Router from './router/api-v1.mjs';
import { PORT } from './config.mjs';

const app = express();

app.use(bodyParser.json());

app.use('/static', express.static(path.resolve('static')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});

app.use('/api-v1', apiV1Router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});