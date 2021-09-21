
import 'dotenv/config'
import { Transaction } from 'web3-eth'
import buyToken from './src/helpers/exchangeToken'
import { getPancakeRouterAddress, getWBNBAddress, getZeroAddress } from './src/utils/addressHelpers'
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
      console.log(tx)
      
      if (tx?.to === getPancakeRouterAddress()) {
        const gasPrice = Number(tx?.gasPrice)
        const txInputDecoded = decoder(tx.input)

        if (txInputDecoded?.name === 'addLiquidityETH') {
          const [token] = txInputDecoded.params
          const pair = await getPair(token?.value as string, getWBNBAddress())

          if (path.includes(token?.value) && pair === getZeroAddress()) {
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