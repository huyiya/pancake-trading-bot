
import 'dotenv/config'
import { Transaction } from 'web3-eth'
import buyToken from './src/helpers/exchangeToken'
import { getPancakeRouterAddress, getWBNBAddress, getZeroAddress } from './src/utils/addressHelpers'
import decoder from './src/utils/decoder'
import { getPair } from './src/utils/liquidity'
import getPath from './src/utils/path'
import getWeb3 from './src/utils/web3'

const privateKey = process.env.PRIVATE_KEY as string
const targetToken = process.env.TARGET_TOKEN as string
const gasLimit = Number(process.env.GAS_LIMIT)
const amountBNB = Number(process.env.AMOUNT_BNB) || 0.01


if (!privateKey || !targetToken) {
  console.log('Missing Private Key or Target Token')
  process.exit(0)
}

const main = async () => {
  const web3 = getWeb3()
  const path = getPath(targetToken)
  
  web3.eth.subscribe('pendingTransactions')
    .on('connected', () => console.log('Connected'))
    .on('data', async (txHash: string) => {
      const tx: Transaction = await web3.eth.getTransaction(txHash)
      
      if (tx?.to === getPancakeRouterAddress()) {
        const gasPrice = Number(tx?.gasPrice)
        const txInputDecoded = decoder(tx.input)

        if (txInputDecoded?.name === 'addLiquidityETH') {
          const [token] = txInputDecoded.params
          const pair = await getPair(token?.value as string, getWBNBAddress())

          if (path.includes(token?.value) && pair === getZeroAddress()) {
            console.log(tx.hash)
            console.log(txInputDecoded)
            
            const account = web3.eth.accounts.privateKeyToAccount(privateKey)
            const result = await buyToken(account, path, gasPrice, gasLimit, amountBNB)
            result ? console.log('Buy success: ' + result) : console.log('Fail')
          }
        }
      }
    })
    .on('error', err => console.log(err))
}

main()