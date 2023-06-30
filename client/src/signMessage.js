import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// readline.question("what is your pk", (key) => {
//   privateKey = key;
//   readline.close();
// });

// const balances = fs.r

function hashMessage(message) {
  const byte = utf8ToBytes(message.toString());
  return keccak256(byte);
}

export async function signMessage(message, privateKey) {
  const hashedMessage = hashMessage(message);
  console.log(privateKey);
  return secp256k1.sign(hashedMessage, privateKey, { recoveryBit: 1 });
}

export async function recoveryKey(message, signature, recoveryBit) {
  const hashedMessage = hashMessage(message);
  return secp256k1.recoverPublicKey(hashedMessage, signature, recoveryBit);
}
