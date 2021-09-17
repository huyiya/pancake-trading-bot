import 'dotenv/config'
import getWeb3 from '../utils/web3'

const sendSignedTransaction = async (
  sender: string,
  receiver: string,
  data: any,
  errCount = 0
): Promise<string | undefined> => {
  const { GAS, PRIVATE_KEY, LIMIT_TX_ERROR } = process.env
  
  while (errCount <= Number(LIMIT_TX_ERROR)) {
    try {
      const web3 = getWeb3()
      const nonce = await web3.eth.getTransactionCount(sender, 'latest')
  
      const transaction = {
        to: receiver,
        gas: GAS,
        nonce: nonce,
        data: data
      }
  
      const signed = await web3.eth.accounts.signTransaction(
        transaction,
        PRIVATE_KEY as string
      )
  
      const hash = await web3.eth.sendSignedTransaction(signed.rawTransaction as string)
  
      return hash.transactionHash
    }
    catch (err) {
      console.log(err)
      errCount++
      return sendSignedTransaction(sender, receiver, data, errCount)
    }
  }
}

const buyToken = async () => {

}

export default buyToken