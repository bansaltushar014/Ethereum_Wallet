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

function Import(props) {

    const [priv, setPriv] = useState('')
    const [account, setAccount] = useState('')
    const [amount, setAmount] = useState('')
    const [receiver, setReceiver] = useState('')
    const [eth, setEth] = useState('')
    const [show, setShow] = useState(false);
    const [modalShow, setmodalShow] = useState(false);
    const target = useRef(null);


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
        handleSecondShow();
        console.log("make transaction with " + receiver + " and " + eth + "sender " + account.address + "existing amount " + amount);
        if (eth < amount) {
            sendEth.sendTransaction(account.address, account.privateKey, receiver, eth)
                .then(r => {
                    getBalance(account);
                    handleSecondYes();
                })

        } else {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 5000);
        }
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

    const getBalance = (result) => {
        console.log("Get Balance" + result.address);
        web3.eth.getBalance(result.address)
            .then(r => {
                setAmount(web3.utils.fromWei(r, 'ether'));
            })
    }

    const privateAccount = (prive) => {
        try {
            var result = web3.eth.accounts.privateKeyToAccount(prive);
            console.log(result);
            setAccount(result);
            getBalance(result);
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
                            <FormControl aria-label="Small" onChange={handleKey} placeholder="Priv Key" aria-describedby="inputGroup-sizing-sm" />
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
                        <Col  sm={2}></Col>
                        <Col  sm={8}>
                            <p> Amount is : {amount}</p>
                            <form onSubmit={onSendEther}>
                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">Send Ether</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" onChange={handleAddress} placeholder="Receiver Address" aria-describedby="inputGroup-sizing-sm" />
                                    <FormControl aria-label="Small" type="number" step="0.000000000000000001" ref={target} onChange={handleEther} placeholder="Ether" aria-describedby="inputGroup-sizing-sm" />
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
                        </Col>
                        <Col  sm={2}></Col>
                    </Row>
                </div>
            ) : (
                    <p></p>
                )}
        </div>
    )
}

export default Import;

