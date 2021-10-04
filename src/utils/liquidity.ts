import BigNumber from 'bignumber.js'
import { getWBNBAddress, getZeroAddress } from './addressHelpers'
import { getERC20, getPancakeFactory, getWBNB } from './contract'

export const getPair = async (token0: string, token1: string): Promise<string> => {
  const pancakeFactory = getPancakeFactory()
  const pair = await pancakeFactory.methods.getPair(token0, token1).call()

  return pair
}

export const getLiquidity = async (targetToken: string, liquidityToken: string): Promise<number> => {
  const pair = await getPair(targetToken, liquidityToken)

  if (pair === getZeroAddress()) {
    return 0
  }

  const liquidityTokenContract = liquidityToken === getWBNBAddress()
    ? getWBNB()
    : getERC20(liquidityToken)
  const liquidity = await liquidityTokenContract.methods.balanceOf(pair).call()

  return Number(new BigNumber(liquidity).div(1e18))
}
