import Web3 from 'web3';

const web3 = {
    gweb: 'null',
    isDefine : function() {
        console.log("called");
        this.gweb = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cdfba71cda344898bfcfeaee923cf849"));
        // this.gweb = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    }
}

web3.isDefine();
export default web3.gweb;

// torus
// 6d46cdcbc43dcb18fdd4d77c6ce0a89a685dff8aa02b11bc3dfdac7fb9aca73e