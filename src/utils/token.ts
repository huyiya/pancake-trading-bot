import { getERC20 } from './contract'

export const getNameOfToken = async (address: string): Promise<string> => {
  const token = getERC20(address)
  const name = await token.methods.name().call()

  return name
}

export const getSymbolOfToken = async (address: string): Promise<string> => {
  const token = getERC20(address)
  const symbol = await token.methods.symbol().call()

  return symbol
}