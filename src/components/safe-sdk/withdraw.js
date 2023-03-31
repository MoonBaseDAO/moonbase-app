import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'

// Any address can be used. In this example you will use vitalik.eth
const destination = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
const amount = ethers.utils.parseUnits('0.005', 'ether').toString()

const safeTransactionData: SafeTransactionDataPartial = {
  to: destination,
  data: '0x',
  value: amount
}
// Create a Safe transaction with the provided parameters
const safeTransaction = await safeSdkOwner1.createTransaction({ safeTransactionData })
// Deterministic hash based on transaction parameters
const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction)

// Sign transaction to verify that the transaction is coming from owner 1
const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash)

await safeService.proposeTransaction({
  safeAddress,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: await owner1Signer.getAddress(),
  senderSignature: senderSignature.data,
})
const pendingTransactions = await safeService.getPendingTransactions(safeAddress).results
// Assumes that the first pending transaction is the transaction you want to confirm
const transaction = pendingTransactions[0]
const safeTxHash = transaction.safeTxHash

const ethAdapterOwner2 = new EthersAdapter({
  ethers,
  signerOrProvider: owner2Signer
})

const safeSdkOwner2 = await Safe.create({
  ethAdapter: ethAdapterOwner2,
  safeAddress
})

const signature = await safeSdkOwner2.signTransactionHash(safeTxHash)
const response = await safeService.confirmTransaction(safeTxHash, signature.data)
const safeTransaction = await safeService.getTransaction(safeTxHash)
const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
const receipt = await executeTxResponse.transactionResponse?.wait()

console.log('Transaction executed:')
console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`)
const afterBalance = await safeSdk.getBalance()

console.log(`The final balance of the Safe: ${ethers.utils.formatUnits(afterBalance, 'ether')} ETH`)
