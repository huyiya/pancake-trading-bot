import Web3 from 'web3'
import getWeb3 from './web3'
import { PancakeFactoryABI, PancakeRouterABI, WBNB_ABI } from '../abis'
import { PANCAKE_FACTORY, PANCAKE_ROUTER, WBNB } from '../constants/constants'

const getContract = (abi: any, address: string) => {
  const web3: Web3 = getWeb3()

  return new web3.eth.Contract(abi, address)
}

export const getPancakeFactory = () => {
  return getContract(PancakeFactoryABI, PANCAKE_FACTORY)
}

export const getPancakeRouter = () => {
  return getContract(PancakeRouterABI, PANCAKE_ROUTER)
}

export const getWBNB = () => {
  return getContract(WBNB_ABI, WBNB)
}

export default getContract