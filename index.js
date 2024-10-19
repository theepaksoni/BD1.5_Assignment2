const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('Welcome to Stock analysis profile');
});

app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseFloat(req.query.quantity);
  let returns = (marketPrice - boughtAt) * quantity;
  res.send(returns.toString());
});

app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  let totalReturns = stock1 + stock2 + stock3 + stock4;
  res.send(totalReturns.toString());
});

app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  let returnPercentage = (returns / boughtAt) * 100;
  res.send(returnPercentage.toString());
});

app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  let totalReturnPercentage = stock1 + stock2 + stock3 + stock4;
  res.send(totalReturnPercentage.toString());
});

function status(returnPercentage) {
  if (returnPercentage > 0) {
    return 'profit';
  } else {
    return 'loss';
  }
}
app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);
  res.send(status(returnPercentage));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
