import Web3 from 'web3'
import getWeb3 from './web3'
import { PancakeFactoryABI, PancakeRouterABI, WBNB_ABI } from '../abis'
import { getPancakeFactoryAddress, getPancakeRouterAddress, getWBNBAddress } from './addressHelpers'

const getContract = (abi: any, address: string) => {
  const web3: Web3 = getWeb3()

  return new web3.eth.Contract(abi, address)
}

export const getPancakeFactory = () => {
  return getContract(PancakeFactoryABI, getPancakeFactoryAddress())
}

export const getPancakeRouter = () => {
  return getContract(PancakeRouterABI, getPancakeRouterAddress())
}

export const getWBNB = () => {
  return getContract(WBNB_ABI, getWBNBAddress())
}

export default getContract