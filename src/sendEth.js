import React from 'react';
import web3 from './helper';
const Tx = require('ethereumjs-tx').Transaction;

class App extends React.Component {

  constructor(props){
      super(props);
  }

  componentDidMount() {  }


  sendTransaction(sender,senderPrivateKey, receiver, amount) {

    console.log("Inside SendTransaction! sender" + sender + " senderPrivateKey " + 
                senderPrivateKey + " receiver " + receiver + " amount " + amount);

    web3.eth.getTransactionCount(sender, async (err, txCount) => {
      // Build the transaction
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: receiver,
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
        gasLimit: web3.utils.toHex(2100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
      }
      // Sign the transaction
      if(senderPrivateKey[1] == "x"){
      senderPrivateKey = senderPrivateKey.slice(2, senderPrivateKey.length);
      }
      var privKey = new Buffer(senderPrivateKey, 'hex');
      const tx = new Tx(txObject,{'chain':'ropsten'});
      tx.sign(privKey);

      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');

      // Broadcast the transaction
      const transaction = await web3.eth.sendSignedTransaction(raw, (err, tx) => {
        console.log("senT");
        console.log(tx)
      });
      console.log(transaction);
    });

  }

}

const appObj = new App();
export default appObj;
