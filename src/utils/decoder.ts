const abiDecoder = require('abi-decoder')
import { PancakeRouterABI } from '../abis'

const decoder = (input: string | undefined) => {
  if (input === undefined) {
    return
  }

  try {
    abiDecoder.addABI(PancakeRouterABI)
  
    const result = abiDecoder.decodeMethod(input);
  
    return result
  }
  catch (err) {
    console.log(err)
    return
  }
}

export default decoder