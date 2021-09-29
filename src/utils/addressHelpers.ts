import 'dotenv/config'
import addresses from '../constants/addresses'

interface Address {
  56: string
  97: string
}

const getAddress = (address: Address): string => {
  const chainId = Number(process.env.CHAIN_ID)

  return chainId === 56 ? address[56] : address[97] 
}

export const getPancakeFactoryAddress = () => {
  return getAddress(addresses.PANCAKE_FACTORY)
}

export const getPancakeRouterAddress = () => {
  return getAddress(addresses.PANCAKE_ROUTER)
}

export const getZeroAddress = () => {
  return getAddress(addresses.ADDRESS_ZERO)
}

export const getWBNBAddress = () => {
  return getAddress(addresses.WBNB)
}

export const getBUSDAddress = () => {
  return getAddress(addresses.BUSD)
}