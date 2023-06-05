import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/routes.js';
import multer from 'multer';

const app = express();
const upload = multer();
const corsOptions = {
  origin: '*',
  Credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello Worldsssss!');
});

app.use('/api', routes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
