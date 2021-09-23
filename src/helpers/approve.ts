import { Account } from 'web3-core'
import BigNumber from 'bignumber.js'
import { MAX_UINT256 } from '../constants/constants'
import { getERC20 } from '../utils/contract'
import sendSignedTransaction from './sendSignedTx'

const approve = async (account: Account, token: string, spender: string, amount?: number) => {
  const erc20 = getERC20(token)
  const amountApprove = amount
    ? new BigNumber(amount).multipliedBy(1e18)
    : MAX_UINT256
  const transaction = await erc20.methods.approve(spender, amountApprove)

  const txHash = await sendSignedTransaction(account, token, transaction)

  return txHash
}

export default approve