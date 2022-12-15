const express = require('express');
const app = express();
const elecData = require('./routes/elecData');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const path = require('path')
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.json());

// routes

app.use('/api/v1/elecData', elecData);

app.use(express.static(path.join(__dirname, "./front/build")))
app.get('*', function(_, res){
  res.sendFile(
    path.join(__dirname, "./front/build/index.html"), 
    function(err){
      res.status(500).send(err)
    }
    )
})

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
