import 'dotenv/config'
import Web3 from 'web3'

const getWeb3 = () => {
  /**
   * 56: Mainnet
   * 97: Testnet
   */
  const chainId = Number(process.env.CHAIN_ID)
  const provider = chainId === 56
    ? process.env.BSC_WSS_MAINNET as string
    : process.env.BSC_WSS_TESTNET as string

  return new Web3(new Web3.providers.WebsocketProvider(provider, {
    reconnect: {
      auto: true,
      delay: 1, // ms
      maxAttempts: 5,
      onTimeout: false
    }
  }))
}

export default getWeb3