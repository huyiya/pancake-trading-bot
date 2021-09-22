import { getWBNBAddress } from './addressHelpers'

const getPath = (token: string, isSell?: boolean): string[] => {
  return isSell ? [token, getWBNBAddress()] : [getWBNBAddress(), token]
}

export default getPath