import React, { useState, useEffect } from 'react';
import web3 from './helper';
import sendEth from './sendEth';

function Import(props) {

    const [priv, setPriv] = useState('')
    const [account, setAccount] = useState('')
    const [amount, setAmount] = useState('')
    const [receiver, setReceiver] = useState('')
    const [eth, setEth] = useState('')

    useEffect(() => { }, [])


    const onSendEther = (e) => {
        e.preventDefault()
        console.log("make transaction with " + receiver+ " and "+ eth + "sender " + account.address) ;
        sendEth.sendTransaction(account.address, account.privateKey, receiver, eth);
    }

    const handleAddress = (event) => {
        setReceiver(event.target.value);
    }

    const handleEther = (event) => {
        setEth(event.target.value);
    }


    const details = (result) => {
        console.log("Inside details!" + result.address);
        
    }

    const privateAccount = (prive) => {
        try {
            var result = web3.eth.accounts.privateKeyToAccount('6d46cdcbc43dcb18fdd4d77c6ce0a89a685dff8aa02b11bc3dfdac7fb9aca73e');
            console.log(result);
            setAccount(result);
            web3.eth.getBalance(result.address)
            .then(r => {
                setAmount(web3.utils.fromWei(r, 'ether'));
            })
        } catch (e) {
            alert(e);
        }
    }

    const onSumbitForm = (e) => {
        e.preventDefault()
        console.log(priv);
        privateAccount(priv);
    }

    const handleKey = (event) => {
        setPriv(event.target.value)
    }

    return (
        <div>
            <form onSubmit={onSumbitForm}>
                <label> Private Key </label> <br />
                <input type="text" onChange={handleKey} placeholder="Priv Key" /> <br />
                <input type="submit" />
            </form>
            {account ? (
                <div>
                    <p> Amount is : {amount}</p>
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

export default Import;


/* To Do 
ui need to be fixed
after payment confirmation show somthing 
show new balance as well
update the new balance after that 
put error conditions
*/