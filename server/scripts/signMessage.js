const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const addressDb = require(`${__dirname}/addressDb.json`);

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// readline.question("what is your pk", (key) => {
//   privateKey = key;
//   readline.close();
// });

console.log(addressDb);

// const balances = fs.r

function hashMessage(message) {
  const byte = utf8ToBytes(message.toString());
  return keccak256(byte);
}

export async function signMessage(message) {
  console.log(addressDb);
  const hashedMessage = hashMessage(message);
  return secp.sign(hashedMessage, privateKey, { recovered: true });
}

export async function recoveryKey(message, signature, recoveryBit) {
  const hashedMessage = hashMessage(message);
  return secp.recoverPublicKey(hashedMessage, signature, recoveryBit);
}
