import 'dotenv/config'
import Web3 from 'web3'

const getWeb3 = () => {
  const provider = process.env.BSC_WSS as string
  return new Web3(new Web3.providers.WebsocketProvider(provider, {
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false
    }
  }))
}

export const getWeb3HTTP = () => {
  const provider = process.env.BSC_HTTP as string
  return new Web3(new Web3.providers.HttpProvider(provider))
}

export default getWeb3