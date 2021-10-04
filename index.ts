
import 'dotenv/config'
import { Transaction } from 'web3-eth'
import { buyToken } from './src/helpers/exchangeToken'
import { getBUSDAddress, getPancakeRouterAddress, getWBNBAddress, getZeroAddress } from './src/utils/addressHelpers'
import { getBscscanUrl } from './src/utils/bscscan'
import decoder from './src/utils/decoder'
import { getLiquidity, getPair } from './src/utils/liquidity'
import { getBNBPath, getBUSDPath } from './src/utils/path'
import getNameOfToken from './src/utils/token'
import getWeb3 from './src/utils/web3'
import logger from './src/utils/logger'

const privateKey = process.env.PRIVATE_KEY as string
const targetToken = process.env.TARGET_TOKEN as string
const gasLimit = Number(process.env.GAS_LIMIT)
const amountBNB = Number(process.env.AMOUNT_BNB) || 0.01
const amountBUSD = Number(process.env.AMOUNT_BUSD) || 10
const liquidityInBNB = Boolean(process.env.LIQUIDITY_IN_BNB === 'true')

if (!privateKey || !targetToken) {
  logger.error('Missing Private Key or Target Token')
  process.exit(0)
}

const main = async () => {
  const web3 = getWeb3()
  
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  const path = liquidityInBNB ? getBNBPath(targetToken) : getBUSDPath(targetToken)
  const purchaseAmount = liquidityInBNB ? amountBNB : amountBUSD

  const methodName = liquidityInBNB ? 'addLiquidityETH' : 'addLiquidity'
  const liquidityToken = liquidityInBNB ? getWBNBAddress() : getBUSDAddress()
  const liquidityTokenSymbol = liquidityInBNB ? 'BNB' : 'BUSD'

  const tokenName = await getNameOfToken(targetToken)
  const lpPair = await getPair(targetToken, liquidityToken)
  let liquidity: number
  if (lpPair !== getZeroAddress()) {
    liquidity = await getLiquidity(targetToken, liquidityToken)
  }

  web3.eth.subscribe('pendingTransactions')
    .on('connected', async () => {
      logger.info('Connected')

      logger.info(`- Buyer: ${account.address}`)
      logger.info(`- Target Token: ${targetToken} - ${tokenName}`)
      logger.info(`- Liquidity in BNB: ${liquidityInBNB}`)
      logger.info(`- LP Pair: ${tokenName}-${liquidityTokenSymbol}: ${lpPair}`)
      if (liquidity > 0) {
        logger.warn(`- Total Liquidity: ${liquidity.toFixed(3)} ${liquidityTokenSymbol}`)
      }
      logger.info(`- Purchase Amount: ${purchaseAmount} ${liquidityTokenSymbol}`)
    })
    .on('data', async (txHash: string) => {
      const tx: Transaction = await web3.eth.getTransaction(txHash)
      
      if (tx?.to === getPancakeRouterAddress()) {
        const gasPrice = Number(tx?.gasPrice)
        const txInputDecoded = decoder(tx?.input)
        // logger.info(`${txHash}: ${txInputDecoded?.name}`)

        if (txInputDecoded?.name === methodName) {
          // token2 exist if liquidity is not BNB
          // if liquidity is BNB: token2 = amountTokenDesired
          const [token, token2] = txInputDecoded.params
          const pair = await getPair(token?.value as string, liquidityToken)

          const checkTokenPair = liquidityInBNB
            ? path.includes(token?.value)
            : path.includes(token?.value) && path.includes(token2?.value)
          if (checkTokenPair && pair === getZeroAddress()) {
            logger.info(`[${Date.now()}] Target Token was added: ${getBscscanUrl()}/tx/${tx.hash}`)

            const result = await buyToken(account, path, gasPrice, gasLimit, purchaseAmount, liquidityInBNB)
            result
              ? logger.info(`Buy success: ${getBscscanUrl()}/tx/${result}`)
              : logger.error('Fail')

            process.exit(0)
          }
        }
      }
    })
    .on('error', err => {
      logger.error(err)
    })
}

main()