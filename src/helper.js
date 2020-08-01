import Web3 from 'web3';

const web3 = {
    gweb: 'null',
    isDefine : function() {
        console.log("called");

        // CorrectOne in .env
        // this.gweb = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/"));
        
        this.gweb = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    }
}

web3.isDefine();
export default web3.gweb;

