import { Client, PrivateKey } from 'dsteem';
import { accounts } from '../../configuration';

//define network parameters
let opts = {};
opts.addressPrefix = 'STX';
opts.chainId =
    '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673';
//connect to a steem node, testnet in this case
const client = new Client('https://testnet.steem.vc', opts);

// const dsteem = require('dsteem');
// let opts = {};
// //define network parameters
// opts.addressPrefix = 'STM';
// opts.chainId =
//     '0000000000000000000000000000000000000000000000000000000000000000';
// //connect to a steem node, production in this case
// const client = new dsteem.Client('https://api.steemit.com');

//submit transfer function executes when you click "Transfer" button
window.submitTransfer = async () => {
    //get all values from the UI
    //get account name of sender
    const username = document.getElementById('username').value;
    //get private active key
    const privateKey = PrivateKey.fromString(
        document.getElementById('privateKey').value
    );
    //get recipient
    const recipient = document.getElementById('recipient').value;
    //get comments
    const comments = document.getElementById('comments').value;
    //get transfer amount
    const quantity = document.getElementById('quantity').value;
    //get transfer type
    const type = document.getElementById('type').value;

    const transfer = quantity.concat(' ', type);

    //create transfer object
    const transf = new Object();
    transf.from = username;
    transf.to = recipient;
    transf.amount = transfer;
    transf.memo = comments;

    //broadcast the transfer

    client.broadcast.transfer(transf, privateKey).then(
        function(result) {
            console.log(
                'included in block: ' + result.block_num,
                'expired: ' + result.expired
            );
            document.getElementById('transferResultContainer').style.display =
                'flex';
            document.getElementById('transferResult').className =
                'form-control-plaintext alert alert-success';
            document.getElementById('transferResult').innerHTML = 'Success';
        },
        function(error) {
            console.error(error);
            document.getElementById('transferResultContainer').style.display =
                'flex';
            document.getElementById('transferResult').className =
                'form-control-plaintext alert alert-danger';
            document.getElementById('transferResult').innerHTML =
                error.jse_shortmsg;
        }
    );
};

window.onload = async () => {
    const account = accounts.testnet[0];
    document.getElementById('username').value = account.username;
    document.getElementById('postingKey').value = account.privPosting;
    document.getElementById('recipient').value = accounts.testnet[1].username;
};
