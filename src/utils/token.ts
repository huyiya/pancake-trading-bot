import { getERC20 } from './contract'

const getNameOfToken = async (address: string): Promise<string> => {
  const token = getERC20(address)
  const name = await token.methods.name().call()

  return name
}

export default getNameOfToken