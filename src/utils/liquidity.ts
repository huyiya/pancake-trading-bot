import BigNumber from 'bignumber.js'
import { getZeroAddress } from './addressHelpers'
import { getPancakeFactory, getWBNB } from './contract'

export const getPair = async (token0: string, token1: string): Promise<string> => {
  const pancakeFactory = getPancakeFactory()
  const pair = await pancakeFactory.methods.getPair(token0, token1).call()

  return pair
}

const getLiquidity = async (token0: string, token1: string): Promise<number> => {
  const pair = await getPair(token0, token1)

  if (pair === getZeroAddress()) {
    return 0
  }

  const wbnb = getWBNB()
  const liquidity = await wbnb.methods.balanceOf(pair).call()

  return Number(new BigNumber(liquidity).div(1e18))
}

export default getLiquidity
