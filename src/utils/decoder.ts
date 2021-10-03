const abiDecoder = require('abi-decoder')
import { PancakeRouterABI } from '../abis'
import logger from './logger'

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
    logger.error(err)
    return
  }
}

export default decoder