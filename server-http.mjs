
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import apiV1Router from './router/api-v1.mjs';
import apiV2Router from './router/api-v2.mjs';
import { PORT } from './config.mjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openApiSpec = fs.readFileSync(path.resolve('static/open-api.yaml'), 'utf8');
const swaggerDocument = yaml.load(openApiSpec);
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/logo_univ.png'));
});
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.use(bodyParser.json());

app.use('/static', express.static(path.resolve('static')));


app.get('/', (req, res) => {
  res.sendFile(path.resolve('static/client.html'));
});

app.get('/api-doc', (req, res) => {
  res.sendFile(path.resolve('static/api-doc.html'));
});

app.use('/api-v1', apiV1Router);
app.use('/api-v2', apiV2Router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});