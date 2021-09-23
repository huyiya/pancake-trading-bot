import Web3 from 'web3'
import getWeb3 from './web3'
import { ERC20ABI, PancakeFactoryABI, PancakeRouterABI, WBNB_ABI } from '../abis'
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

export const getERC20 = (erc20Address: string) => {
  return getContract(ERC20ABI, erc20Address)
}

export default getContract