const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./temp.js');
const bodyParser = require('body-parser');
var cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors())
app.use('/', express.static('public_static'));

app.get('/get-ticket-meta', (req, res) => {
  console.log("**** GET /get-ticket-meta ****");
  truffle_connect.getTicketInfo(function (answer) {
    res.send(answer);
  })
});

app.get('/get-total-tickets', (req, res) => {
  console.log("**** GET /get-total-tickets ****");
  truffle_connect.getTotalTickets(function (answer) {
    res.send(parseInt(answer).toString());
  })
});

app.get('/get-tickets-left', (req, res) => {
  console.log("**** GET /get-tickets-left ****");
  truffle_connect.getTicketsLeft(function (answer) {
    res.send(parseInt(answer).toString());
  })
});

app.get('/get-ticket-cost', (req, res) => {
  console.log("**** GET /get-ticket-cost ****");
  truffle_connect.getTicketCost(function (answer) {
    res.send(parseInt(answer).toString());
  })
});

app.get('/get-event-name', (req, res) => {
  console.log("**** GET /get-event-name ****");
  truffle_connect.getEventName(function (answer) {
    res.send(answer);
  })
});

app.get('/get-event-symbol', (req, res) => {
  console.log("**** GET /get-event-symbol ****");
  truffle_connect.getEventSymbol(function (answer) {
    res.send(answer);
  })
});

app.post('/buy-ticket', (req, res) => {
  console.log(req.body);
  let currentAcount = req.body.account;
  console.log("**** POST /buy-ticket ****");
  truffle_connect.buyTicket(currentAcount, function (answer) {
    res.send(answer);
  })
});

app.post('/balance-of', (req, res) => {
  console.log(req.body);
  let currentAcount = req.body.account;
  console.log("**** POST /balance-of ****");
  truffle_connect.balanceOf(currentAcount, function (answer) {
    res.send(answer);
  })
});

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  console.log("Express Listening at http://localhost:" + port);

});