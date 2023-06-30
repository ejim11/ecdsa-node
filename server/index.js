const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const fs = require("fs");

app.use(cors());
app.use(express.json());

let balances = JSON.parse(
  fs.readFileSync(`${__dirname}/addressDb.json`, "utf-8")
);

console.log(balances);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address].amount || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender].amount -= amount;
    balances[recipient].amount += amount;
    res.send({ balance: balances[sender].amount });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
