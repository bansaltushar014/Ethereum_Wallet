import React, { useState, useEffect } from 'react';
import web3 from './helper';
import sendEth from './sendEth';
import Card from 'react-bootstrap/Card';


let bip39 = require("bip39");
let hdkey = require('ethereumjs-wallet/hdkey');

        

function CreateAccount(props) {

    const [account, setAccount] = useState(null)
    const [mnemonic, setMnemonic] = useState('')
    const [seed, setSeed] = useState();
   

    useEffect(() => { }, [])


    
    const createAccounts = async ()  => {
        
        
        let Mnemonic =  bip39.generateMnemonic();
        console.log(Mnemonic);
        setMnemonic(Mnemonic);
        let hdwallet = hdkey.fromMasterSeed( await bip39.mnemonicToSeed(Mnemonic));
        

        console.log(hdwallet);
        let wallet_hdpath = "m/44'/60'/0'/0/";
    
        let accounts = [];
                
        for (let i = 0; i < 10; i++) {
            let wallet = hdwallet.derivePath(wallet_hdpath + i ).getWallet();
            let address = '0x' + wallet.getAddress().toString("hex");
            let privateKey = wallet.getPrivateKey().toString("hex");
            accounts.push({address: address, privateKey: privateKey});
        }
        console.log(accounts);
        setAccount(accounts);

        web3.eth.getBalance(accounts[0].address)
        .then(r => {
            console.log(web3.utils.fromWei(r, 'ether'));
        })
    }

    const AccountDetails = () => {
        return(
            <div>
           {
                    account.map((item, index) => {
                        return <div>
                            <Card>
                                <Card.Body>
                                    <Card.Title> <label key={index}>{item.address}</label> </Card.Title>                               
                                </Card.Body>
                            </Card>
                            </div>
                    })
                }


            </div>
        )
    }
    

    return (
        <div>
             {account ? (
                <div>
                    <p> mnemonic is : {mnemonic} </p>
                    <AccountDetails />       
                </div>
            ) : (
                    <button onClick={createAccounts}>createAccount</button>
                )}
        </div>
    )
}


export default CreateAccount;



/*
To do list 
selection of any address
on click show private key 
show balance
timer to refresh check balance update
send money option  (make send money a single function and use it )
*/