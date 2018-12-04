const HdWalletProvider = require('hd-wallet-provider');
const Web3 = require('web3');
const {
    interface,
    bytecode
} = require('./compile');

const provider = newHdwalletProvider(
    'volume hybrid science grape essay code guide cradle eye oppose edit talk', 'https: //rinkeby.infura.io/v3/9d67111fc3f0417b94f4e6dc3d80d12d'

);

const web3 = newWeb3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    console.log('Which account you are using',
        accounts[0]);

    const result = await web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode,
        arguments: ['You cunt']
    }).send({
        gas: '1000000',
        from: accounts[0]
    });

    console.log('Contract deployed to', result.options.address);

};

deploy();