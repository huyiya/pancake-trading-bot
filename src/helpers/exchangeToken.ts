import { Account } from 'web3-core'
import BigNumber from 'bignumber.js'
import { getPancakeRouterAddress } from '../utils/addressHelpers'
import { getPancakeRouter } from '../utils/contract'
import getDeadline from '../utils/deadline'
import sendSignedTransaction from './sendSignedTx'

export const buyToken = async (
  account: Account,
  path: string[],
  gasPrice: number,
  gasLimit: number,
  amount: number,
  isPurchaseWithBNB: boolean
): Promise<string | undefined> => {
  const pancakeRouter = getPancakeRouter()

  const params = {
    amountOutMin: 0,
    amountIn: amount, // If buy with BUSD or other tokens
    path,
    to: account.address,
    deadline: getDeadline()
  }
  
  let transaction
  if (isPurchaseWithBNB) {
    /**
     * @function swapExactETHForTokens (uint amountOutMin, address[] calldata path, address to, uint deadline)
     * @param {number} amountOutMin - The minimum amount of output tokens that must be received for the transaction not to revert
     * @param {string[]} path - Pools for each consecutive pair of addresses must exist and have liquidity
     * @param {string} to - Recipient of the output tokens
     * @param {number} deadline - Unix timestamp after which the transaction will revert
     */
    transaction = await pancakeRouter.methods.swapExactETHForTokens(
      params.amountOutMin,
      params.path,
      params.to,
      params.deadline
    )
  }
  else {
    /**
     * @function swapExactTokensForTokens (uint amountIn,uint amountOutMin, address[] calldata path, address to, uint deadline)
     * @param {number} amountIn - The amount of input tokens to send
     * @param {number} amountOutMin - The minimum amount of output tokens that must be received for the transaction not to revert
     * @param {string[]} path - Pools for each consecutive pair of addresses must exist and have liquidity
     * @param {string} to - Recipient of the output tokens
     * @param {number} deadline - Unix timestamp after which the transaction will revert
     */
    transaction = await pancakeRouter.methods.swapExactTokensForTokens(
      new BigNumber(params.amountIn).multipliedBy(1e18),
      params.amountOutMin,
      params.path,
      params.to,
      params.deadline
    )
  }

  const txHash = await sendSignedTransaction(
    account,
    getPancakeRouterAddress(),
    transaction,
    gasPrice,
    gasLimit,
    isPurchaseWithBNB ? Number(new BigNumber(amount).multipliedBy(1e18)) : 0
  )

  return txHash
}

export const sellToken = async (
  account: Account,
  path: string[],
  gasPrice: number,
  gasLimit: number,
  amountTokenSell: number
) => {
  const pancakeRouter = getPancakeRouter()

  const params = {
    amountIn: new BigNumber(amountTokenSell).multipliedBy(1e18),
    amountOutMin: 0,
    path,
    to: account.address,
    deadline: getDeadline()
  }

  /**
   * @function swapExactTokensForETH (uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
   */
  const transaction = await pancakeRouter.methods.swapExactTokensForETH(
    params.amountIn,
    params.amountOutMin,
    params.path,
    params.to,
    params.deadline
  )

  const txHash = await sendSignedTransaction(
    account,
    getPancakeRouterAddress(),
    transaction,
    gasPrice,
    gasLimit
  )

  return txHash
}
