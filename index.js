const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal + newItemPrice;
  res.send(cartTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isMember) {
    cartTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let numberOfDays = 0;
  if (shippingMethod === 'express') {
    numberOfDays = distance / 100;
  } else {
    numberOfDays = distance / 50;
  }
  res.send(numberOfDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyAmount = purchaseAmount * loyaltyRate;
  res.send(loyaltyAmount.toString());
});

app.get('/shout', (req, res) => {
  let name = req.query.name;
  let uppername = name.toUpperCase();
  res.send(uppername);
});

app.get('/fullname', (req, res) => {
  let firstName = req.query.firstname;
  let lastName = req.query.lastname;
  let fullName = firstName + ' ' + lastName;
  res.send(fullName);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
