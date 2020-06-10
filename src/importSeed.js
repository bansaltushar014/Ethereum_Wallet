import React, { useState, useEffect } from 'react';
import web3 from './helper';
import sendEth from './sendEth';

function ImportSeed(props) {

    const [mnemonic, setMnemonic] = useState('')
    const [account, setAccount] = useState('')
    const [receiver, setReceiver] = useState('')
    const [eth, setEth] = useState('')

    
    useEffect(() => { }, [])

    
    const onSendEther = (e) => {
        e.preventDefault()
        console.log("make transaction with " + receiver+ " and "+ eth + "sender " + account[0].address) ;
        sendEth.sendTransaction(account[0].address, account[0].privateKey, receiver, eth);
    }

    const handleAddress = (event) => {
        setReceiver(event.target.value);
    }

    const handleEther = (event) => {
        setEth(event.target.value);
    }

    const generateAddressesFromSeed = async (mnemonic)  => {
    
        let bip39 = require("bip39");
        let hdkey = require('ethereumjs-wallet/hdkey');
        let hdwallet = hdkey.fromMasterSeed( await bip39.mnemonicToSeed(mnemonic));
    
        console.log(hdwallet);
        let wallet_hdpath = "m/44'/60'/0'/0/";
    
        let accounts = [];

        // Just to Print
        bip39.mnemonicToSeed(mnemonic)
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
        setAccount(accounts);
    }

    const onSumbitForm = (e) => {
        e.preventDefault()
        // generateAddressesFromSeed(mnemonic);
        generateAddressesFromSeed('hint friend yellow armed unknown figure dolphin kitten property basket trigger foster');
    }

    const handleKey = (event) => {
        setMnemonic(event.target.value)
    }

    return (
        <div>
             <form onSubmit={onSumbitForm}>
                <label> Enter Mnemonic </label> <br />
                <input type="text" onChange={handleKey} placeholder="Mnemonic" /> <br />
                <input type="submit" />
            </form>
            {account ? (
                <div>
                    <p> account is : {account[0].address}</p>
                    <form onSubmit={onSendEther}>
                        <label> Send Ether </label> <br />
                        <input type="text" onChange={handleAddress} placeholder="Receiver Address" /> <br />
                        <input type="text" onChange={handleEther} placeholder="Ether" /> <br /> 
                        <input type="submit" />
                    </form>
                </div>
            ) : (
                    <p></p>
                )}
        </div>
    )
}

export default ImportSeed;

/*
provide option to send ether on selection 
send the ether
confimation screen 
*/