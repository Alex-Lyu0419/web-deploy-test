import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import routes from './routes';

const app = express();
const port = process.env.PORT || 4000;

// init
app.use(cors());

// define routes
// app.use(bodyParser.json());
app.use(express.json());
app.use('/', routes);

db.connect();

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);
