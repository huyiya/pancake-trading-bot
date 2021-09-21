import { Account } from 'web3-core'
import BigNumber from 'bignumber.js'
import { getPancakeRouterAddress } from '../utils/addressHelpers'
import { getPancakeRouter } from '../utils/contract'
import getDeadline from '../utils/deadline'
import getWeb3 from '../utils/web3'

const sendSignedTransaction = async (
  account: Account,
  receiver: string,
  tx: any,
  gasPrice: number,
  gasLimit: number,
  amountBNB?: number
): Promise<string | undefined> => {
  try {
    const web3 = getWeb3()
    const nonce = await web3.eth.getTransactionCount(account.address, 'latest')

    const transaction = {
      to: receiver,
      value: amountBNB || 0,
      gas: gasLimit,
      gasPrice: gasPrice,
      nonce: nonce,
      data: tx.encodeABI()
    }

    const signed = await web3.eth.accounts.signTransaction(
      transaction,
      account.privateKey
    )

    const hash = await web3.eth.sendSignedTransaction(signed.rawTransaction as string)

    return hash.transactionHash
  }
  catch (err) {
    console.log(err)
    return
  }
}

const buyToken = async (
  account: Account,
  path: string[],
  gasPrice: number,
  gasLimit: number,
  amount: number
): Promise<string | undefined> => {
  const pancakeRouter = getPancakeRouter()

  const params = {
    amountOutMin: 0,
    path,
    to: account.address,
    deadline: getDeadline()
  }

  /**
   * @function swapExactETHForTokens (uint amountOutMin, address[] calldata path, address to, uint deadline)
   * @param {number} amountOutMin - The minimum amount of output tokens that must be received for the transaction not to revert
   * @param {string[]} path - Pools for each consecutive pair of addresses must exist and have liquidity
   * @param {string} to - Recipient of the output tokens
   * @param {number} deadline - Unix timestamp after which the transaction will revert
   */
  const transaction = await pancakeRouter.methods.swapExactETHForTokens(
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
    gasLimit,
    Number(new BigNumber(amount).multipliedBy(1e18)),
  )

  return txHash
}

export default buyToken