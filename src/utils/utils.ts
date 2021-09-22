import BigNumber from 'bignumber.js'

export const getBalanceNummber = (balance: number | string): number => {
  return Number(new BigNumber(balance).div(1e18))
}
