import { getBUSDAddress, getWBNBAddress } from './addressHelpers'

export const getBNBPath = (token: string, isSell?: boolean): string[] => {
  return isSell
    ? [token.toLocaleLowerCase(), getWBNBAddress()]
    : [getWBNBAddress(), token.toLocaleLowerCase()]
}

export const getBUSDPath = (token: string, isSell?: boolean): string[] => {
  return isSell
    ? [token.toLocaleLowerCase(), getBUSDAddress()]
    : [getBUSDAddress(), token.toLocaleLowerCase()]
}
