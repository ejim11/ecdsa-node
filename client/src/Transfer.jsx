import { useState } from "react";
import server from "./server";
import addressDb from "./addressDb.json";
import { signMessage } from "./signMessage";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, signature, setSignature }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  const signHandler = async () => {
    const message = {
      sender: address,
      recipient,
      sendAmount,
    };
    const privateKey = addressDb[address].privateKey;

    const signature = await signMessage(JSON.stringify(message), privateKey);

    setSignature(toHex(utf8ToBytes(signature.toString())));
  };

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <p>Signature Hash: {signature}</p>
      <div>
        {!signature ? (
          <div className="button sign-btn" onClick={signHandler}>
            Sign
          </div>
        ) : (
          <p className="button sign-btn">Signed</p>
        )}
        <button type="submit" className="button" disabled={!signature}>
          Transfer
        </button>
      </div>
    </form>
  );
}

export default Transfer;
