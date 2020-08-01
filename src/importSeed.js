import React, { useState, useEffect, useRef } from 'react';
import web3 from './helper';
import sendEth from './sendEth';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function ImportSeed(props) {

    const [mnemonic, setMnemonic] = useState('')
    const [account, setAccount] = useState('')
    const [receiver, setReceiver] = useState('')
    const [eth, setEth] = useState('')
    const [modalShow, setmodalShow] = useState(false);
    const target = useRef(null);
    const addTarget = useRef(null);
    const [amount, setAmount] = useState('')
    const [show, setShow] = useState(false);
    const [addressShow, setAddressShow] = useState(false);
    

    useEffect(() => { }, [])


    const handleSecondYes = () => {
        setmodalShow(false);
    }

    const handleSecondShow = () => {
        console.log("running 2");
        setmodalShow(true);
    }


    const onSendEther = (e) => {
        e.preventDefault()
        console.log("make transaction with " + receiver + " and " + eth + "sender " + account[0].address);
                
        handleSecondShow();
        if (eth < amount) {
            sendEth.sendTransaction(account[0].address, account[0].privateKey, receiver, eth)
                .then(r => {
                    getBalance(account[0]);
                    handleSecondYes();
                })

        } else {
            handleSecondYes();
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 5000);
        }

    }

    const getBalance = (result) => {
        console.log("Get Balance" + result.address);
        web3.eth.getBalance(result.address)
            .then(r => {
                setAmount(web3.utils.fromWei(r, 'ether'));
            })
    }

    const handleAddress = (event) => {
        setReceiver(event.target.value);
        if(web3.utils.isAddress(event.target.value)) {
            setAddressShow(true);
            setTimeout(() => {
                setAddressShow(false);
            }, 2000);
        } else {
            setAddressShow(false);
        }
    }

    const handleEther = (event) => {
        setEth(event.target.value);
    }

    const generateAddressesFromSeed = async (mnemonic) => {

        let bip39 = require("bip39");
        let hdkey = require('ethereumjs-wallet/hdkey');
        let hdwallet = hdkey.fromMasterSeed(await bip39.mnemonicToSeed(mnemonic));

        console.log(hdwallet);
        let wallet_hdpath = "m/44'/60'/0'/0/";

        let accounts = [];

        // Just to Print
        bip39.mnemonicToSeed(mnemonic)
            .then(r => {
                console.log(r.toString('hex'));
            })

        for (let i = 0; i < 10; i++) {

            let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
            let address = '0x' + wallet.getAddress().toString("hex");
            let privateKey = wallet.getPrivateKey().toString("hex");
            accounts.push({ address: address, privateKey: privateKey });
        }
        console.log(accounts);
        setAccount(accounts);
        getBalance(accounts[0])
    }

    const onSumbitForm = (e) => {
        e.preventDefault()
        generateAddressesFromSeed(mnemonic);
        // generateAddressesFromSeed('hint friend yellow armed unknown figure dolphin kitten property basket trigger foster');
    }

    const handleKey = (event) => {
        setMnemonic(event.target.value)
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <Modal show={modalShow} onHide={handleSecondYes}>
                <Modal.Body>
                <Spinner animation="border" variant="dark" /> &nbsp;&nbsp;
                    Loading...
                </Modal.Body>
            </Modal>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <form onSubmit={onSumbitForm}>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Private Key</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" onChange={handleKey} placeholder="Mnemonic" aria-describedby="inputGroup-sizing-sm" />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={onSumbitForm}>Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </Col>
                <Col sm={2}></Col>
            </Row>

            {account ? (
                <div>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <p> account is : {account[0].address}</p> <br/>
                            <p> amount is : {amount}</p>
                            <form onSubmit={onSendEther}>
                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">Send Ether</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" ref={addTarget} onChange={handleAddress} placeholder="Receiver Address" aria-describedby="inputGroup-sizing-sm" />
                                    <FormControl aria-label="Small" type="number"  ref={target}  step="0.000000000000000001" onChange={handleEther} placeholder="Ether" aria-describedby="inputGroup-sizing-sm" />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={onSendEther}>Submit</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </form>
                            <Overlay target={target.current} show={show} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Not Much Ether
                                    </Tooltip>
                                )}
                            </Overlay>
                            <Overlay target={addTarget.current} show={addressShow} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Correct Address
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                        <Col sm={2}></Col>
                    </Row>

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
*/