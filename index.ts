
import 'dotenv/config'
import { Transaction } from 'web3-eth'
import { ADDRESS_ZERO, PANCAKE_ROUTER, WBNB } from './src/constants/constants'
import buyToken from './src/helpers/exchangeToken'
import decoder from './src/utils/decoder'
import { getPair } from './src/utils/liquidity'
import getPath from './src/utils/path'
import getWeb3 from './src/utils/web3'

const sender = process.env.SENDER as string
const targetToken = process.env.TARGET_TOKEN as string
const amountBNB = Number(process.env.AMOUNT_BNB)

const main = async () => {
  const web3 = getWeb3()
  const path = getPath(targetToken)
  
  web3.eth.subscribe('pendingTransactions')
    .on('connected', () => console.log('Connected'))
    .on('data', async (txHash: string) => {
      const tx: Transaction = await web3.eth.getTransaction(txHash)
      
      if (tx?.to === PANCAKE_ROUTER) {
        const gasPrice = Number(tx?.gasPrice) - .05 * Number(tx?.gasPrice)
        const txInputDecoded = decoder(tx.input)

        if (txInputDecoded?.name === 'addLiquidityETH') {
          const [token] = txInputDecoded.params
          const pair = await getPair(token?.value as string, WBNB)

          if (path.includes(token?.value) && pair === ADDRESS_ZERO) {
            console.log(tx.hash)
            console.log(txInputDecoded)

            const result = await buyToken(sender, path, gasPrice, amountBNB)
            console.log('Buy success: ' + result)
          }
        }
      }
    })
    .on('error', err => console.log(err))
}

main()