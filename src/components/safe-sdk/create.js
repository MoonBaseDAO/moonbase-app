import { SafeAccountConfig } from '@safe-global/safe-core-sdk'

const safeAccountConfig: SafeAccountConfig = {
  owners: [
    await owner1Signer.getAddress(),
    await owner2Signer.getAddress(),
    await owner3Signer.getAddress()
  ],
  threshold: 2,
  // ... (Optional params)
}

/* This Safe is tied to owner 1 because the factory was initialized with
an adapter that had owner 1 as the signer. */
const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })

const safeAddress = safeSdkOwner1.getAddress()

console.log('Your Safe has been deployed:')
console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
console.log(`https://app.safe.global/gor:${safeAddress}`)


