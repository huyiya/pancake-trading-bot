
import 'dotenv/config'
import { Transaction } from 'web3-eth'
import { PANCAKE_ROUTER } from './src/constants/constants'
import decoder from './src/utils/decoder'
import getPath from './src/utils/path'
import getWeb3 from './src/utils/web3'

const {
  TARGET_TOKEN
} = process.env

const main = async () => {
  const web3 = getWeb3()
  
  web3.eth.subscribe('pendingTransactions')
    .on('connected', () => console.log('Connected'))
    .on('data', async (txHash: string) => {
      const tx: Transaction = await web3.eth.getTransaction(txHash)
      
      if (tx?.to === PANCAKE_ROUTER) {
        const txInputDecoded = decoder(tx.input)

        if (txInputDecoded?.name === 'addLiquidity') {
          const [token0, token1] = txInputDecoded.params
          const path = getPath(TARGET_TOKEN as string)

          if (path.includes(token0) && path.includes(token1)) {
            console.log(txInputDecoded)
          }
        }
      }
    })
    .on('error', err => console.log(err))
}

main()