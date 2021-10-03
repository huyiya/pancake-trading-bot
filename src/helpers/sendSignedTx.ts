import { Account } from 'web3-core'
import logger from '../utils/logger'
import getWeb3 from '../utils/web3'

const sendSignedTransaction = async (
  account: Account,
  receiver: string,
  tx: any,
  gasPrice?: number,
  gasLimit?: number,
  amountBNB?: number
): Promise<string | undefined> => {
  try {
    const web3 = getWeb3()
    const nonce = await web3.eth.getTransactionCount(account.address, 'latest')

    const transaction = {
      to: receiver,
      value: amountBNB || 0,
      gas: gasLimit || 100000,
      gasPrice: gasPrice || 5000000000, // 5 Gwei
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
    logger.error(err)
    process.exit(0)
  }
}

export default sendSignedTransaction