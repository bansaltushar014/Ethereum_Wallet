import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './helper';
const Tx = require('ethereumjs-tx').Transaction


class App extends React.Component {

  componentDidMount() {

    console.log(web3.version);
    web3.eth.net.isListening()
      .then(() => console.log('is connected'))
      .catch(e => console.log('Wow. Something went wrong'));

    // To create a wallet 
    console.log(web3.eth.accounts.create());

    // Accounts exist
    web3.eth.getAccounts()
      .then((r) => {
        console.log(r);
      })

    // got account via private key 
    // torus 6d46cdcbc43dcb18fdd4d77c6ce0a89a685dff8aa02b11bc3dfdac7fb9aca73e
    // ganache d2f27219121ec66a0ae1be3c892af9ab2aaae587d334cb3e7eddfed0b7e74cf8
    var privateKey = '6d46cdcbc43dcb18fdd4d77c6ce0a89a685dff8aa02b11bc3dfdac7fb9aca73e';
    var result = web3.eth.accounts.privateKeyToAccount(privateKey);
    
    console.log(result);

    // Will work with Ganache Only. 
    // web3.eth.sendTransaction({ from: result.address, to: '0x1285751a95A586A1Ff8BC2b4062E6D3faCB4BFf6', value: web3.utils.toWei('0.01') })
    // .then(r => {
    //   console.log(r);
    // })
    // .catch(e => {
    //   console.log(e);
    // })

    // this.sendTransaction(result, privateKey);
    // var accounts = this.generateAddressesFromSeed('hint friend yellow armed unknown figure dolphin kitten property basket trigger foster');
    // hint friend yellow armed unknown figure dolphin kitten property basket trigger foster
    // 582e54acb44385583bc04d1c7a7bf21d9eaa795a78d6409c9735970b0d0fa16e860d3a1c73995dd367b9837fdfcd56950fd951f4a57d37c40a0bea8fcfe23274
    // this.sendTransaction(accounts[1], accounts[1].privateKey, accounts[0])
    this.createAccounts();
  }

  
  createAccounts = async ()  => {
    
    let bip39 = require("bip39");
    let hdkey = require('ethereumjs-wallet/hdkey');
    const seed = bip39.generateMnemonic();
    console.log(seed);
    let hdwallet = hdkey.fromMasterSeed( await bip39.mnemonicToSeed(seed));

    console.log(hdwallet);
    let wallet_hdpath = "m/44'/60'/0'/0/";

    let accounts = [];
    bip39.mnemonicToSeed(seed)
    .then(r => {
      console.log(r.toString('hex'));
    })
    
    for (let i = 0; i < 10; i++) {

        let wallet = hdwallet.derivePath(wallet_hdpath + i ).getWallet();
        let address = '0x' + wallet.getAddress().toString("hex");
        let privateKey = wallet.getPrivateKey().toString("hex");
        accounts.push({address: address, privateKey: privateKey});
    }
    console.log(accounts);
    
}

  generateAddressesFromSeed = async (seed)  => {
    
    let bip39 = require("bip39");
    let hdkey = require('ethereumjs-wallet/hdkey');
    let hdwallet = hdkey.fromMasterSeed( await bip39.mnemonicToSeed(seed));

    console.log(hdwallet);
    let wallet_hdpath = "m/44'/60'/0'/0/";

    let accounts = [];
    bip39.mnemonicToSeed(seed)
    .then(r => {
      console.log(r.toString('hex'));
    })
    
    for (let i = 0; i < 10; i++) {

        let wallet = hdwallet.derivePath(wallet_hdpath + i ).getWallet();
        let address = '0x' + wallet.getAddress().toString("hex");
        let privateKey = wallet.getPrivateKey().toString("hex");
        accounts.push({address: address, privateKey: privateKey});
    }
    console.log(accounts);
    return accounts;
}

  sendTransaction(result,privateKey, account1) {
    console.log("Inside SendTransaction!");
    web3.eth.getTransactionCount(result.address, async (err, txCount) => {
      // Build the transaction
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account1.address,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(2100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
      }
      // Sign the transaction
      var privKey = new Buffer(privateKey, 'hex');
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;


// Getting this for any seed. 
// let wallet_hdpath = "m/44'/60'/0'/";
// 0: {address: "0x45c53694ac3b3fedd3548a6834a2b0561e4a1ffe", privateKey: "77a052a6e108bc5fb105c47eb69c672732ed4a3799c40bdd284ac3391d176515"}
// 1: {address: "0xa26e1d14610424ab4d1d56c675df7f8a2e78d5f2", privateKey: "179b3740b00995a50d40579dfe594d32322898d55332561da6b290272746524b"}
// 2: {address: "0xc3eaa3e428bfeb658b3268260db68d5fe8998e4c", privateKey: "c44b4ae63ff9ee3e0d07bfa9bfedec87b261bdbf8f3107aa157471666e56f194"}
// 3: {address: "0x02822a7a222dd21748e22b484f03e57b4bfa6dd5", privateKey: "80c9c107cb05f1abb8246d866190d988398a28f843c69ebf6d472d835c58771c"}
// 4: {address: "0xc1b508c0715be6480bb39e86e1ad923705035159", privateKey: "e32898938c8fb94267c52efdd88a0f62e91476d7e4c084b78fb8a12db5539cdd"}
// 5: {address: "0x91de5988efcbeb4c1abc944a99d90934080c5688", privateKey: "7c98c6fc848c446f45aa032a09c5d236ca461621cb66768eff4096ada94f4d51"}
// 6: {address: "0xb82b8120010011f9c020f2de1f884072b296f57f", privateKey: "9deba446388eb00297ea040f2515235d3f8df558dfb6b6f5df63396465a6a9c6"}
// 7: {address: "0xa3e25afdb367270b0f26a468601f1bb6282ae16a", privateKey: "30334c259f352bededacc25849a593deccb9d040d865ded99df267823d177d37"}
// 8: {address: "0xc4ac042af32b5819934bc548133118febf507757", privateKey: "741270ae1a3e0b17a6456c8fbd92730d17a921abf6ed0b08b213c18ba806dc60"}
// 9: {address: "0x67c712eb903d0dc17fbbf3bcb6e9ded7d15172d7", privateKey: "1dc002b7321fa62a60d437b4a1dab0dcbc39e551876e5f6ddae7399cc838181c"}

// let wallet_hdpath = "m/44'/60'/0'/0/";
// 0: {address: "0x6858dc3a3e1c2f4de7da740bb0257ed8a0ae582b", privateKey: "67b50b90ea53409a8df8f6d025b8d90d1ba10e9d9fe704bb255aed85691589d2"}
// 1: {address: "0x3aa5e4ade7e6a67565fdfaa30511dd5362ea4ce7", privateKey: "021632a34dca9d79a47540b70d1ba0ca747de25536a1ea380406098ba70ef1d6"}
// 2: {address: "0xe53d989b8f69a2dbabacf5cb23c186cf5ae0fb61", privateKey: "8dc5392dbe8ae7614b365cfcc597a1bbc9bba80e1a514b6e246f5e46869ae93f"}
// 3: {address: "0x6d8acd64fb58dcc987fc6d067a8a27c048579679", privateKey: "a07ff828df30f9386a322c398367797d972add575da1119958aa94bf583bbd44"}
// 4: {address: "0x42bb95860082d7d367207eeea860f4081d5f9829", privateKey: "bd262fdfa9004e2d311b3b1cbbf96863172158794a544703d415c39b2174fcae"}
// 5: {address: "0xa3d0885701943f3f11a6c7da6de8c9bac0552724", privateKey: "8dfdf07375f7237c655f72c1f8dfdb124cba6145decab22c8f07a13075445a74"}
// 6: {address: "0x8cc1e00d116fe9fd6f5f869053ac4501c5f57522", privateKey: "513a654220703b7a0682622b5082f8b10e7368cdfa74de45dc7048e7e8bc9b48"}
// 7: {address: "0x36534e250def6345effbd69d6a069debd691daa8", privateKey: "e93a338fb15fd5a45c066e6ee455fcd6a812048c143adcda6867bc3f7bb223af"}
// 8: {address: "0xbd4e5db130e38fdea0b8d155f6b2441338e44939", privateKey: "53abcd0fc707af96f54d563d9bcbcd160547766d3d5b74a0ff02a81f8af12567"}
// 9: {address: "0x906139b0c099742723dd087ec7e29560200c21ea", privateKey: "5e08bb5ce29354d7bda9f1e110241cc54342e282357d28a821d79a655dd09839"}


// _hdkey: HDKey
// chainCode: Uint8Array(32) [65, 225, 234, 6, 252, 50, 71, 254, 199, 88, 124, 87, 244, 82, 176, 65, 140, 145, 174, 29, 23, 110, 114, 7, 205, 249, 2, 76, 53, 175, 163, 186]
// depth: 0
// index: 0
// parentFingerprint: 0
// versions: {private: 76066276, public: 76067358}
// _fingerprint: 3778365474
// _identifier: Uint8Array(20) [225, 53, 72, 34, 228, 116, 58, 191, 112, 134, 246, 186, 235, 206, 28, 113, 188, 147, 113, 177]
// _privateKey: Uint8Array(32) [73, 85, 124, 80, 68, 184, 179, 94, 119, 163, 227, 161, 33, 151, 157, 64, 91, 192, 205, 122, 226, 214, 198, 223, 80, 5, 193, 250, 55, 187, 164, 85]
// _publicKey: Uint8Array(33) [3, 141, 234, 179, 48, 143, 242, 91, 174, 80, 202, 44, 183, 32, 14, 58, 123, 158, 174, 166, 164, 132, 107, 15, 41, 166, 217, 87, 244, 134, 168, 185, 38]
// fingerprint: (...)
// identifier: (...)
// privateExtendedKey: (...)
// privateKey: (...)
// pubKeyHash: (...)
// publicExtendedKey: (...)
// publicKey: (...)
// __proto__: Object
// __proto__: Object

// _hdkey: HDKey
// chainCode: Uint8Array(32) [65, 225, 234, 6, 252, 50, 71, 254, 199, 88, 124, 87, 244, 82, 176, 65, 140, 145, 174, 29, 23, 110, 114, 7, 205, 249, 2, 76, 53, 175, 163, 186]
// depth: 0
// index: 0
// parentFingerprint: 0
// versions: {private: 76066276, public: 76067358}
// _fingerprint: 3778365474
// _identifier: Uint8Array(20) [225, 53, 72, 34, 228, 116, 58, 191, 112, 134, 246, 186, 235, 206, 28, 113, 188, 147, 113, 177]
// _privateKey: Uint8Array(32) [73, 85, 124, 80, 68, 184, 179, 94, 119, 163, 227, 161, 33, 151, 157, 64, 91, 192, 205, 122, 226, 214, 198, 223, 80, 5, 193, 250, 55, 187, 164, 85]
// _publicKey: Uint8Array(33) [3, 141, 234, 179, 48, 143, 242, 91, 174, 80, 202, 44, 183, 32, 14, 58, 123, 158, 174, 166, 164, 132, 107, 15, 41, 166, 217, 87, 244, 134, 168, 185, 38]
// fingerprint: (...)
// identifier: (...)
// privateExtendedKey: (...)
// privateKey: (...)
// pubKeyHash: (...)
// publicExtendedKey: (...)
// publicKey: (...)
// __proto__: Object
// __proto__: Object
