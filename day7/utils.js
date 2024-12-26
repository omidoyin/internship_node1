const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");

// Replace with your Alchemy API key
const alchemy = new Alchemy({
  apiKey: "MkI3METXZ_SaxAfLDPExL9nzVzbLXo9G",
  network: Network.ETH_MAINNET, // Specify the network you're working with
});

// Example: Creating a wallet
function createWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

// Example: Getting balance
async function getBalance(address) {
  const balance = await alchemy.core.getBalance(address);
  return Utils.formatEther(balance);
}
// Example: Signing a payload
function signPayload(privateKey, payload) {
  try {
    const wallet = new Wallet(privateKey);
    const signedPayload = wallet.signMessage(payload); // Sign the payload
    return signedPayload;
  } catch (error) {
    console.error("Error signing payload:", error);
    throw new Error("Failed to sign payload");
  }
}

let walletInstance = null;

async function getWallet(privateKey) {
  // Check if the wallet instance already exists
  if (!walletInstance) {
    walletInstance = new Wallet(privateKey, alchemy);
  }
  return walletInstance;
}
// Example: Transferring tokens
async function transferTokens(privateKey, toAddress, amount) {
  // Validate the Ethereum address format
  if (!isAddress(toAddress)) {
    throw new Error("Invalid Ethereum address provided.");
  }

  
  const wallet = await getWallet(privateKey)
  const fromAddress = wallet.address;


    // Check balance
    const balance = await getBalance(fromAddress);
    console.log(`Balance of ${fromAddress}: ${balance} ETH`);

    // Convert amount to Ether for comparison
  const amountInEther = Utils.parseEther(amount.toString());
  
  

  // Check if balance is sufficient
  if (balance < amountInEther) {
    throw new Error("Insufficient funds for the transaction.");
    
  }
    
  const tx = {
    to: toAddress,
    value: Utils.parseEther(amount.toString()),
 
  };

   // Estimate gas limit
   const gasLimit = await wallet.estimateGas(tx);
   tx.gasLimit = gasLimit;

  const response = await wallet.sendTransaction(tx);
  return response.hash;
}

function isAddress(address) {
  // Check if the address is a valid Ethereum address
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

module.exports = {
  createWallet,
  getBalance,
  transferTokens,
  signPayload
};
