import express from 'express';
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('Hello Worldsssss!');
});

const port = process.env.PORT || 3000;
app.listen(port), () => console.log('Server Started on ' + port);
