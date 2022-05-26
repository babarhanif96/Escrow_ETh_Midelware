//This module help to listen request
var express = require("express");
var router = express.Router();
var axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3();
const Tx = require('ethereumjs-tx').Transaction;
const InputDataDecoder = require('ethereum-input-data-decoder');






web3.setProvider(
    new web3.providers.HttpProvider(
     "https://speedy-nodes-nyc.moralis.io/d67ea2c319957b719814f79a/eth/rinkeby"
    //"https://rinkeby.infura.io/v3/0a48491f07ee459a9528d0942444bafa"
	 )
);

//===================================   ESCROW  ===========================================================
var abi = [{"inputs":[],"name":"buyer","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"confirmDelivery","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currState","outputs":[{"internalType":"enum Escrow.State","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address payable","name":"_buyer","type":"address"},{"internalType":"address","name":"_seller","type":"address"}],"name":"getSeller_Buyer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"trading_data","outputs":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"address payable","name":"buyer","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"}];
const decoder = new InputDataDecoder(abi)

var contractAddress = "0xB5ce52394fE6B275bF77F0bd421dc85a39C1B9b6";
//===================================   ESCROW END  ===========================================================



//===================================   USDT  ===========================================================
var abi_USDT = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
const decoder_USDT = new InputDataDecoder(abi_USDT)

var contractAddress_USDT = "0xA73a1332904af7D9D533626C339495BAC0B9a967";

//===================================   USDT END ===========================================================





 

//******************************************** */ SET SELLER & BUYER ***************************************************************


router.post("/setuser", async function (request, response) {
var ResponseCode = 200;
	var ResponseMessage = ``;
	var ResponseData = null;
	
	try {
		if(request.body) {
			var ValidationCheck = true;
			if (!request.body.trading_id) {
				ResponseMessage = "Trading id is missing \n";
				ValidationCheck = false;
			}
			if (!request.body.seller_address) {
				ResponseMessage = "seller address is missing \n";
				ValidationCheck = false;
			}
			if (!request.body.buyer_address) {
				ResponseMessage += "buyer address is missing \n";
				ValidationCheck = false;
			}

			if (!request.body.from_private_key) {
				ResponseMessage += "private key is missing \n";
				ValidationCheck = false;
			}
			if (!request.body.from_address) {
				ResponseMessage += "from address is missing \n";
				ValidationCheck = false;
			} else if (!request.body.value === parseInt(request.body.value)) {
				ResponseMessage += "value must be a number \n";
				ValidationCheck = false;
			}
			
			if(ValidationCheck == true) {
				let tradingId = request.body.trading_id;
				let sellerAddress = request.body.seller_address;
				let privateKey = request.body.from_private_key;
				let  buyerAddress = request.body.buyer_address;
				 let fromAddress = request.body.from_address;


				if (sellerAddress.length < 42) {
					ResponseMessage = "Invalid seller Address";
					ResponseCode = 400;
					return;
				} else if (buyerAddress.length < 42) {
					ResponseMessage = "Invalid buyer Address";
					ResponseCode = 400;
					return;
				}else if (fromAddress.length < 42) {
					ResponseMessage = "Invalid from Address";
					ResponseCode = 400;
					return;
				}


    
			web3.eth.defaultAccount = fromAddress;
			let contract = new web3.eth.Contract( abi , contractAddress );
			let count = await web3.eth.getTransactionCount(fromAddress , 'latest');
			let data = contract.methods.getSeller_Buyer(tradingId, buyerAddress, sellerAddress).encodeABI();
			
				
				let gasPrice = web3.eth.gasPrice ;
				let gasLimit =  200000;
				//let gasLimit = web3.utils.toHex(6721975) ;
                var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

				// var xmlHttp = new XMLHttpRequest();
				// xmlHttp.open( "GET", "https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
				// 	contractAddress +
				// 	"&address=" +
				// 	fromAddress +
				// 	"&tag=latest&apikey=YourApiKeyToken", false ); // false for synchronous request
				// xmlHttp.send();
				//var transactions = JSON.parse(xmlHttp.responseText);
			
					let rawTransaction = {
						"from": fromAddress,
						"nonce": web3.utils.toHex(count),
						"gasPrice": web3.utils.toHex(200000000000),
						"gasLimit": web3.utils.toHex(gasLimit),
						
						"to": contractAddress,
						"data": data,
						//"chainId": 0x04
					};
					privateKey = Buffer.from(privateKey, 'hex');
					let tx = new Tx(rawTransaction , {'chain':'rinkeby'}) ;
					console.log("This is tx", tx);

					tx.sign(privateKey);
					let serializedTx = tx.serialize();
					console.log( "This is serial" , serializedTx);
					let hashObj = await sendrawtransaction(serializedTx);
					//console.log(hashObj);
					console.log("This is hashobj" , hashObj);
				
					if (hashObj.response == '') {
						let hash = hashObj.hash;
						ResponseData = await getTransactionn(hash);
						ResponseMessage = "Transaction successfully completed";
						ResponseCode = 200;
					} else {
						ResponseMessage = hashObj.response;
						ResponseCode = 400;
						return;
					}
			
				
		 	} 
			 
		}
	} catch (error) {
		ResponseMessage = `Transaction signing stops with the error  ${error}`;
		ResponseCode = 400
	} finally {
		return response.status(200).json({
			code : ResponseCode,
			data : ResponseData,
			msg : ResponseMessage
		});
	}
});

// ************************************ DEPOSIT VALUE IN ESCROW *************************************************************************************************

router.post("/depositeth", async function (request, response) {
	var ResponseCode = 200;
		var ResponseMessage = ``;
		var ResponseData = null;
		
		try {
			if(request.body) {
				var ValidationCheck = true;
				if (!request.body.value) {
					ResponseMessage = "value is missing \n";
					ValidationCheck = false;
				}
				if (!request.body.trading_id) {
					ResponseMessage = "Trading id is missing \n";
					ValidationCheck = false;
				}
				if (!request.body.from_private_key) {
					ResponseMessage += "private key is missing \n";
					ValidationCheck = false;
				}
				if (!request.body.from_address) {
					ResponseMessage += "from address is missing \n";
					ValidationCheck = false;
				}
				 else if (!request.body.value === parseInt(request.body.value)) {
					ResponseMessage += "value must be a number \n";
					ValidationCheck = false;
				}
				
				if(ValidationCheck == true) {
					
					let tradingId = request.body.trading_id;
					let Value = request.body.value;
					let privateKey = request.body.from_private_key;
				
				  let fromAddress = request.body.from_address;


				  if (fromAddress.length < 42) {
					ResponseMessage = "Invalid from Address";
					ResponseCode = 400;
					return;
				}
	
	
		
					web3.eth.defaultAccount = fromAddress;
		
	
					let contract = new web3.eth.Contract( abi , contractAddress );
				let count = await web3.eth.getTransactionCount(fromAddress , 'latest');
					let data = contract.methods.deposit(tradingId).encodeABI();

					//console.log(data);
					
					let gasPrice = web3.eth.gasPrice ;
					let gasLimit =  200000;
					//let gasLimit = web3.utils.toHex(6721975) ;
					// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
					// var xmlHttp = new XMLHttpRequest();
					// xmlHttp.open( "GET", "https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
					// 	contractAddress +
					// 	"&address=" +
					// 	fromAddress +
					// 	"&tag=latest&apikey=YourApiKeyToken", false ); // false for synchronous request
					// xmlHttp.send();
					// var transactions = JSON.parse(xmlHttp.responseText);
					
						let rawTransaction = {
							"from": fromAddress,
							"nonce": web3.utils.toHex(count),
							"gasPrice": web3.utils.toHex(20000000000),
							"gasLimit": web3.utils.toHex(gasLimit),
							"value": web3.utils.toHex(web3.utils.toWei(Value, "ether")),
							
							"to": contractAddress,
							//"to": toAddress,
							"data": data,
							//"chainId": 0x04
						};

		// ===================================================================================

		// let contract_USDT = new web3.eth.Contract( abi_USDT , contractAddress_USDT );
		// let count_USDT = await web3.eth.getTransactionCount(fromAddress , 'latest');
		// let data_USDT = contract_USDT.methods.transfer("0xB5ce52394fE6B275bF77F0bd421dc85a39C1B9b6", "10").encodeABI();
				
		// 		let gasPrice_USDT = web3.eth.gasPrice ;
		// 		let gasLimit_USDT =  200000;
		// 		//let gasLimit = web3.utils.toHex(6721975) ;
        //         var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

		// 		var xmlHttp = new XMLHttpRequest();
		// 				var xmlHttp = new XMLHttpRequest();
		// 		xmlHttp.open( "GET", "https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
		// 			contractAddress +
		// 			"&address=" +
		// 			fromAddress +
		// 			"&tag=latest&apikey=YourApiKeyToken", false ); // false for synchronous request
		// 		xmlHttp.send();
		// 		var transactions = JSON.parse(xmlHttp.responseText);
		// 		let balance = transactions.result;

		// 		//let balance = 1000000000000000000000000000000;
		// 		console.log(balance);
		// 		if(balance >= 10 + gasLimit_USDT) {
		// 			let rawTransaction_USDT = {
		// 				"from": fromAddress,
		// 				"nonce": web3.utils.toHex(count_USDT),
		// 				"gasPrice": web3.utils.toHex(200000000000),
		// 				"gasLimit": web3.utils.toHex(gasLimit_USDT),
						
		// 				"to": contractAddress_USDT,
		// 				//"to": toAddress,
		// 				"data": data_USDT,
		// 				"chainId": 0x04
		// 			};
			// ================================================================================================
						privateKey = Buffer.from(privateKey, 'hex');
						let tx = new Tx(rawTransaction , {'chain':'rinkeby'}) ;
				// ================================================================
						//let tx_USDT = new Tx(rawTransaction_USDT , {'chain':'rinkeby'}) ;
				// ==============================================================
						console.log("This is tx", tx);
						//console.log("This is tx_USDT", tx_USDT);
	
						tx.sign(privateKey);
						//tx_USDT.sign(privateKey);
						let serializedTx = tx.serialize();
						//let serializedTx_USDT = tx_USDT.serialize();
						let hashObj = await sendrawtransaction(serializedTx);
						//let hashObj_USDT = await sendrawtransaction_USDT(serializedTx_USDT);
						console.log("This is hashobj" , hashObj);
						//console.log("This is hashobj_USDT" , hashObj_USDT);
					
						if (hashObj.response == '') {
							let hash = hashObj.hash;
							ResponseData = await getTransaction(hash);
							ResponseMessage = "Transaction successfully completed";
							ResponseCode = 200;
						} else {
							ResponseMessage = hashObj.response;
							ResponseCode = 400;
							return;
						}

						// if (hashObj_USDT.response == '') {
						// 	let hash_USDT = hashObj_USDT.hash;
						// 	ResponseData = await getTransactionnn(hash_USDT);
						// 	ResponseMessage = "Transaction successfully completed USDT";
						// 	ResponseCode = 200;
						// } else {
						// 	ResponseMessage = hashObj_USDT.response;
						// 	ResponseCode = 400;
						// 	return;
						// }


		// ==============================  USDT ================================================================================================


   var abi_USDT = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
const decoder_USDT = new InputDataDecoder(abi_USDT)

var contractAddress_USDT = "0xA73a1332904af7D9D533626C339495BAC0B9a967";
  let tokenValueee = 10;       
var toAddressss = "0xB5ce52394fE6B275bF77F0bd421dc85a39C1B9b6";
		let contract_USDT = new web3.eth.Contract( abi_USDT , contractAddress_USDT , {
			from: fromAddress
		});
		//let count = web3.eth.getTransactionCount(web3.eth.defaultAccount);
	let count_USDT = await web3.eth.getTransactionCount(fromAddress , 'latest') + 1;
		let data_USDT = contract_USDT.methods.transfer(toAddressss, tokenValueee).encodeABI();
		
		let gasPrice_USDT = web3.eth.gasPrice ;
		let gasLimit_USDT =  200000;
		//let gasLimit = web3.utils.toHex(6721975) ;
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", "https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
			contractAddress_USDT +
			"&address=" +
			fromAddress +
			"&tag=latest&apikey=YourApiKeyToken", false ); // false for synchronous request
		xmlHttp.send();
		var transactions = JSON.parse(xmlHttp.responseText);
		let balance = transactions.result;

		//let balance = 1000000000000000000000000000000;
		console.log(balance);
		if(balance >= tokenValueee + gasLimit_USDT) {
			let rawTransactionn = {
				"from": fromAddress,
				"nonce": web3.utils.toHex(count_USDT),
				"gasPrice": web3.utils.toHex(200000000000),
				"gasLimit": web3.utils.toHex(gasLimit_USDT),
				
				"to": contractAddress_USDT,
				//"to": toAddress,
				"data": data_USDT,
				"chainId": 0x04
			};
			privateKey = Buffer.from(privateKey, 'hex');
			let txx = new Tx(rawTransactionn , {'chain':'rinkeby'}) ;
			console.log("ye hai tx USDT", txx);

			txx.sign(privateKey);
			let serializedTxx = txx.serialize();
			let hashObj_USDT = await sendrawtransactionn(serializedTxx);
			console.log("ye hai hashobj" , hashObj_USDT);
		
			if (hashObj_USDT.response == '') {
				let hash_USDT = hashObj_USDT.hash;
				ResponseData = await getTransactionnn(hash_USDT);
				ResponseMessage = "Transaction successfully completed";
				ResponseCode = 200;
			} else {
				ResponseMessage = hashObj_USDT.response;
				ResponseCode = 400;
				return;
			}
		} else {
			ResponseMessage = "Balance is insufficent";
			ResponseCode = 400;
			return;
		}


		// ================================ USDT END ==================================================================================================
				
					
				 } 
				 
			
		}
	 } catch (error) {
			ResponseMessage = `Transaction signing stops with the error  ${error}`;
			ResponseCode = 400
		} finally {
			return response.status(200).json({
				code : ResponseCode,
				data : ResponseData,
				msg : ResponseMessage
			});
		}
	});
 //================= Deposit end====================================



// ********************************* RELEASE VALUE FROM ESCROW ************************************************************************************

router.get("/deliveryeth", async function (request, response) {
	var ResponseCode = 200;
		var ResponseMessage = ``;
		var ResponseData = null;
		
		try {
			if(request.body) {
				var ValidationCheck = true;
			
				if (!request.body.from_private_key) {
					ResponseMessage += "private key is missing \n";
					ValidationCheck = false;
				}
				if (!request.body.from_address) {
					ResponseMessage += "from address is missing \n";
					ValidationCheck = false;
				}
				if (!request.body.trading_id) {
					ResponseMessage = "Trading id is missing \n";
					ValidationCheck = false;
				}
			
				
				if(ValidationCheck == true) {
					let tradingId = request.body.trading_id;
					let privateKey = request.body.from_private_key;
				
				  let fromAddress = request.body.from_address;


				  if (fromAddress.length < 42) {
					ResponseMessage = "Invalid from Address";
					ResponseCode = 400;
					return;
				}
	
	
					
	
	
		
					web3.eth.defaultAccount = fromAddress;
					
	
					let contract = new web3.eth.Contract( abi , contractAddress );
					//let count = web3.eth.getTransactionCount(web3.eth.defaultAccount);
				let count = await web3.eth.getTransactionCount(fromAddress , 'latest');
					let data = contract.methods.confirmDelivery(tradingId).encodeABI();
					//console.log(data);
					
					let gasPrice = web3.eth.gasPrice ;
					let gasLimit =  200000;
					//let gasLimit = web3.utils.toHex(6721975) ;
					var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
					var xmlHttp = new XMLHttpRequest();
					xmlHttp.open( "GET", "https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
						contractAddress +
						"&address=" +
						fromAddress +
						"&tag=latest&apikey=YourApiKeyToken", false ); // false for synchronous request
					xmlHttp.send();
					var transactions = JSON.parse(xmlHttp.responseText);
					
						let rawTransaction = {
							"from": fromAddress,
							"nonce": web3.utils.toHex(count),
							"gasPrice": web3.utils.toHex(200000000000),
							"gasLimit": web3.utils.toHex(gasLimit),
						//	"value": web3.utils.toHex(web3.utils.toWei(Value, "ether")),
							
							"to": contractAddress,
							//"to": toAddress,
							"data": data,
							"chainId": 0x04
						};
						privateKey = Buffer.from(privateKey, 'hex');
						let tx = new Tx(rawTransaction , {'chain':'rinkeby'}) ;
						console.log("This is tx", tx);
	
						tx.sign(privateKey);
						let serializedTx = tx.serialize();
						let hashObj = await sendrawtransaction(serializedTx);
						console.log("This is hashobj" , hashObj);
					
						if (hashObj.response == '') {
							let hash = hashObj.hash;
							ResponseData = await getTransaction(hash);
							ResponseMessage = "Transaction successfully completed";
							ResponseCode = 200;
						} else {
							ResponseMessage = hashObj.response;
							ResponseCode = 400;
							return;
						}
			
					
				 } 
				 
			}
		} catch (error) {
			ResponseMessage = `Transaction signing stops with the error  ${error}`;
			ResponseCode = 400
		} finally {
			return response.status(200).json({
				code : ResponseCode,
				data : ResponseData,
				msg : ResponseMessage
			});
		}
	});
 //=================+======================== Release alue end ====================================

// ===============================================================================================================================================

router.get("/getBalance/:walletAddress", (req, response) => {
	var ResponseCode = 200;
	var ResponseMessage = ``;
	var ResponseData = null;
	try {
		if(req.params) {
			if (!req.params.walletAddress) {
				ResponseMessage = "wallet address is missing \n";
				ResponseCode = 206;
			} else {
				let walletAddress = req.params.walletAddress;
				var date = new Date();
				var timestamp = date.getTime();
                var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
				// var xmlHttp = new XMLHttpRequest();
				// xmlHttp.open( "GET",  "https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
				// 	contractAddress +
				// 	"&address=" +
				// 	walletAddress +
				// 	"&tag=latest&apikey=YourApiKeyToken", false ); // false for synchronous request
				// xmlHttp.send();
				var transactions = JSON.parse(xmlHttp.responseText);
				let balance = transactions.result;
				//balance = balance / 10 ** 6;
				balance = balance;
				ResponseData = {
					wallet: {
						balance: balance
					},
					message: "",
					timestamp: timestamp,
					status: 200,
					success: true
				};
				ResponseMessage = "Completed";
				ResponseCode = 200;
			}
		} else {
				ResponseMessage = "Transaction cannot proceeds as request params is empty";
				ResponseCode = 204;
		}
	} catch (error) {
		ResponseMessage = `Transaction signing stops with the error ${error}`;
		ResponseCode = 400;
	} finally {
		return response.status(200).json({
			code : ResponseCode,
			data : ResponseData,
			msg : ResponseMessage
		});
	}
    
});
// ===========================================================================================================================================================






function getTransaction(hash) {
	var data;
	return new Promise(function(resolve, reject) {
		web3.eth.getTransaction(hash, function (err, transaction) {
			console.log("This is transaction" , transaction);
			console.log("This is transaction error " , err);
			var date = new Date();
			var timestamp = date.getTime();
			let inputdecode = decoder.decodeData(transaction.input);
			console.log("This is input " ,inputdecode);
			data = {
				transaction: {
					hash: transaction.hash,
					from: transaction.from,
					// buyer: inputdecode.inputs[0],
					// seller: inputdecode.inputs[1],
				//	amount: parseInt(inputdecode.inputs[1]) ,
				//	amount: parseInt(inputdecode.inputs[0]),
					//currency: "USDT",
					fee: transaction.gasPrice,
					n_confirmation: transaction.transactionIndex,
					link: `https://rinkeby.etherscan.io/tx/${hash}`
				},
				message: "",
				timestamp: timestamp,
				status: 200,
				success: true
			};
			resolve(data);
		})
	});
}

 function  getTransactionn(hash) {
	var data;
	return new Promise(  function(resolve, reject) {
		console.log("This is hash" , hash);
	 	web3.eth.getTransaction(hash, function (err, transaction) {
			console.log("This is transaction " , transaction);
			console.log("This is error" , err);
			var date = new Date();
			var timestamp = date.getTime();
			let inputdecode = decoder.decodeData(transaction.input)
			//web3.utils.toAscii(transaction.input);
			//decoder.decodeData(transaction.input);
			console.log("This is input " ,inputdecode);
			data = {
				transaction: {
					hash: transaction.hash,
					from: transaction.from,
					id :  parseInt(inputdecode.inputs[0]._hex, 16),
					 //parseInt(hexString, 16)

					 buyer: inputdecode.inputs[1],
					 seller: inputdecode.inputs[2],
					// yourNumber = parseInt(hexString, 16);
				//	amount: parseInt(inputdecode.inputs[1]) ,
				//	amount: parseInt(inputdecode.inputs[0]),
					//currency: "USDT",
					fee: transaction.gasPrice,
					n_confirmation: transaction.transactionIndex,
					link: `https://rinkeby.etherscan.io/tx/${hash}`
				},
				message: "",
				timestamp: timestamp,
				status: 200,
				success: true
			};
			resolve(data);
		})
	});
}


function  getTransactionnn(hash_USDT) {
	var data;
	return new Promise(  function(resolve, reject) {
		console.log("This is hash" , hash_USDT);
	 	web3.eth.getTransaction(hash_USDT, function (err, transaction) {
			console.log("This is transaction " , transaction);
			console.log("This is error" , err);
			var date = new Date();
			var timestamp = date.getTime();
			let inputdecode = decoder_USDT.decodeData(transaction.input)
			//web3.utils.toAscii(transaction.input);
			//decoder.decodeData(transaction.input);
			console.log("This is input USDT " ,inputdecode);
			data = {
				transaction: {
					hash: transaction.hash,
					from: transaction.from,
					id :  parseInt(inputdecode.inputs[0]._hex, 16),
					 //parseInt(hexString, 16)

					 buyer: inputdecode.inputs[1],
					 seller: inputdecode.inputs[2],
					// yourNumber = parseInt(hexString, 16);
				//	amount: parseInt(inputdecode.inputs[1]) ,
				//	amount: parseInt(inputdecode.inputs[0]),
					//currency: "USDT",
					fee: transaction.gasPrice,
					n_confirmation: transaction.transactionIndex,
					link: `https://rinkeby.etherscan.io/tx/${hash_USDT}`
				},
				message: "",
				timestamp: timestamp,
				status: 200,
				success: true
			};
			resolve(data);
		})
	});
}

function sendrawtransaction(serializedTx) {
	var hash;
	var response = "";
	return new Promise(function(resolve, reject) {
		web3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"), function ( err, hsh ) {
			if (err) {
				response = `send Bad Request ${err}`;
			} else {
				hash = hsh;
			} 
			var obj = {
				response:  response,
				hash: hash
			};
			resolve(obj);
		});
	});
}

function sendrawtransactionn(serializedTxx) {
	var hash;
	var response = "";
	return new Promise(function(resolve, reject) {
		web3.eth.sendSignedTransaction("0x" + serializedTxx.toString("hex"), function ( err, hsh ) {
			if (err) {
				response = `send Bad Request ${err}`;
			} else {
				hash = hsh;
			} 
			var obj = {
				response:  response,
				hash: hash
			};
			resolve(obj);
		});
	});
}
module.exports = router;