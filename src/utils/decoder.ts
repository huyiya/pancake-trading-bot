const abiDecoder = require('abi-decoder')
import { PancakeRouterABI } from '../abis'

const decoder = (input: string) => {
  abiDecoder.addABI(PancakeRouterABI)

  const result = abiDecoder.decodeMethod(input);

  return result
}

export default decoder