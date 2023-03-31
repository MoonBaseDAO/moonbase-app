const safeAddress = safeSdk.getAddress()

const safeAmount = ethers.utils.parseUnits('0.01', 'ether').toHexString()

const transactionParameters = {
  to: safeAddress,
  value: safeAmount
}

const tx = await owner1Signer.sendTransaction(transactionParameters)

console.log('Fundraising.')
console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
