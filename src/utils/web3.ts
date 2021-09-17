import 'dotenv/config'
import Web3 from 'web3'

const provider = process.env.BSC_WSS as string

const getWeb3 = () => {
  return new Web3(new Web3.providers.WebsocketProvider(provider, {
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false
    }
  }))
}

export default getWeb3