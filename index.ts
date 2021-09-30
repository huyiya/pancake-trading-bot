
import 'dotenv/config'
import { Transaction } from 'web3-eth'
import { buyToken } from './src/helpers/exchangeToken'
import { getBUSDAddress, getPancakeRouterAddress, getWBNBAddress, getZeroAddress } from './src/utils/addressHelpers'
import decoder from './src/utils/decoder'
import { getPair } from './src/utils/liquidity'
import { getBNBPath, getBUSDPath } from './src/utils/path'
import getWeb3 from './src/utils/web3'

const privateKey = process.env.PRIVATE_KEY as string
const targetToken = process.env.TARGET_TOKEN as string
const gasLimit = Number(process.env.GAS_LIMIT)
const amountBNB = Number(process.env.AMOUNT_BNB) || 0.01
const amountBUSD = Number(process.env.AMOUNT_BUSD) || 10
const liquidityInBNB = Boolean(process.env.LIQUIDITY_IN_BNB === 'true')

if (!privateKey || !targetToken) {
  console.log('Missing Private Key or Target Token')
  process.exit(0)
}

const main = async () => {
  const web3 = getWeb3()
  
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  const path = liquidityInBNB ? getBNBPath(targetToken) : getBUSDPath(targetToken)
  const purchaseAmount = liquidityInBNB ? amountBNB : amountBUSD

  const methodName = liquidityInBNB ? 'addLiquidityETH' : 'addLiquidity'
  const tokenPair = liquidityInBNB ? getWBNBAddress() : getBUSDAddress()

  web3.eth.subscribe('pendingTransactions')
    .on('connected', () => {
      console.log('Connected')
      console.log(`- Buyer: ${account.address}`)
      console.log(`- Target Token: ${targetToken}`)
      console.log(`- Liquidity in BNB: ${liquidityInBNB}`)
      console.log(`- Purchase Amount: ${purchaseAmount} ${liquidityInBNB ? 'BNB' : 'BUSD'}`)
    })
    .on('data', async (txHash: string) => {
      const tx: Transaction = await web3.eth.getTransaction(txHash)
      
      if (tx?.to === getPancakeRouterAddress()) {
        const gasPrice = Number(tx?.gasPrice)
        const txInputDecoded = decoder(tx.input)

        if (txInputDecoded?.name === methodName) {
          // token2 exist if liquidity is not BNB
          // if liquidity is BNB: token2 = amountTokenDesired
          const [token, token2] = txInputDecoded.params
          const pair = await getPair(token?.value as string, tokenPair)

          const checkTokenPair = liquidityInBNB
            ? path.includes(token?.value)
            : path.includes(token?.value) && path.includes(token2?.value)
          if (checkTokenPair && pair === getZeroAddress()) {
            console.log(`[${Date.now()}] Target Token was added: https://bscscan.com/tx/${tx.hash}`)

            const result = await buyToken(account, path, gasPrice, gasLimit, purchaseAmount, liquidityInBNB)
            result
              ? console.log(`Buy success: https://bscscan.com/tx/${result}`)
              : console.log('Fail')

            process.exit(0)
          }
        }
      }
    })
    .on('error', err => {
      console.log(err)
      process.exit(0)
    })
}

main()