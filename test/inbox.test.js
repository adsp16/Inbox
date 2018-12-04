const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {
    interface,
    bytecode
} = require('../compile');

let accounts;
let inbox;
const firstString = 'Hello You Cunt'

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [firstString]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('creates Default Message', async () => {

        const message = await inbox.methods.message().call();
        assert.equal(message, firstString);


    })

    it('changes a message', async () => {

        await inbox.methods.setMessage('GoodBye').send({
            from: accounts[0]
        });
        const message = await inbox.methods.message().call();

        assert.equal(message, 'GoodBye');

    });


});