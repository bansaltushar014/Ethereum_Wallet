import Web3 from 'web3';

const web3 = {
    gweb: 'null',
    isDefine : function() {
        console.log("called");

        
        // this.gweb = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + "<project id from infura.io>"));
        
        this.gweb = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    }
}

web3.isDefine();
export default web3.gweb;

