const abiDecoder = require('abi-decoder')
import { PancakeRouterABI } from '../abis'

const decoder = (input: string | undefined) => {
  if (input === undefined) {
    return
  }

  abiDecoder.addABI(PancakeRouterABI)

  const result = abiDecoder.decodeMethod(input);

  return result
}

export default decoder